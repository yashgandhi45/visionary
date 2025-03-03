"use client";
import { useCallback, useMemo, useState } from "react";
import { Camera, CanvasMode, CanvasState, Color, LayerType, Point, Side, XYWH } from "@/types/canvas";
import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";
import { useHistory, useCanRedo, useCanUndo, useMutation, useStorage, useOthersMapped } from "@/liveblocks.config";
import { CursorsPresence } from "./cursorspresence";
import { connectionIdToColor, pointerEventToCanvasPoint, resizeBounds } from "@/lib/utils";
import { nanoid} from "nanoid";
import { LayerPreview } from "./layerpreview";
import { LiveObject } from "@liveblocks/client";
import { SelectionBox } from "./selectionbox";

const MAX_LAYERS = 100;

interface CanvasProps {
    boardId: string;

}

export const Canvas = ({boardId}: CanvasProps) => {
    const layerIds = useStorage((root)=> root.layerIds);

    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode : CanvasMode.None,
    })
    const [camera, setCamera] = useState<Camera>({x:0, y:0});
    const [lastUsedColor, setLastUsedColor] = useState<Color>({
        r:0,
        g:0,
        b:0,
    });
    const history = useHistory();
    const canUndo = useCanUndo();
    const canRedo = useCanRedo();

    const insertLayer = useMutation((
        { storage, setMyPresence},
        layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Text | LayerType.Note,
        position: Point,
) => {
    const liveLayers = storage.get("layers");
    const liveLayersIds = storage.get("layerIds");
    
    if (!liveLayers || !liveLayersIds) {
        console.error("liveLayers or liveLayersIds is undefined");
        return;
    }
    if(liveLayers.size>=MAX_LAYERS){
        return;
    }

    const layerId = nanoid();
    const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColor,
    })
    liveLayersIds.push(layerId);
    liveLayers.set(layerId, layer);

    setMyPresence({ selection: [layerId]}, { addToHistory: true});
    setCanvasState({ mode: CanvasMode.None});
},[lastUsedColor]);

const translateSelectedLayers = useMutation(
    ({ storage, self }, point: Point) => {
        // Ensure we're in Translating mode and canvasState.current is defined
        if (canvasState.mode !== CanvasMode.Translating || !canvasState.current) {
            return;
        }

        // Calculate the offset
        const offset = {
            x: point.x - canvasState.current.x,
            y: point.y - canvasState.current.y,
        };

        // Get the layers from storage
        const liveLayers = storage.get("layers");

        // Ensure liveLayers and self.presence.selection are defined
        if (!liveLayers || !self.presence.selection || self.presence.selection.length === 0) {
            return;
        }

        // Update each selected layer
        for (const id of self.presence.selection) {
            const layer = liveLayers.get(id);

            // Ensure the layer exists and has valid x and y properties
            if (layer) {
                const currentX = layer.get("x");
                const currentY = layer.get("y");

                if (typeof currentX === "number" && typeof currentY === "number") {
                    layer.update({
                        x: currentX + offset.x,
                        y: currentY + offset.y,
                    });
                }
            }
        }

        // Update canvas state
        setCanvasState({
            mode: CanvasMode.Translating,
            current: point,
        });
    },
    [canvasState]
);

const unselectLayer = useMutation(({ self, setMyPresence }) => {
    if (!self.presence.selection) {
        console.warn("self.presence.selection is undefined.");
        return;
    }

    if (self.presence.selection.length > 0) {
        setMyPresence({ selection: [] }, { addToHistory: true });
    }
}, []);


const resizeSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
        // Ensure we're in Resizing mode
        if (canvasState.mode !== CanvasMode.Resizing) {
            return;
        }

        // Calculate the new bounds
        const bounds = resizeBounds(
            canvasState.initialBounds,
            canvasState.corner,
            point,
        );

        // Get the layers from storage
        const liveLayers = storage.get("layers");

        // Ensure liveLayers and self.presence.selection are defined and not empty
        if (!liveLayers || !self.presence.selection || self.presence.selection.length === 0) {
            return;
        }

        // Get the first selected layer
        const layerId = self.presence.selection[0];
        const layer = liveLayers.get(layerId);

        // Update the layer if it exists
        if (layer) {
            layer.update(bounds);
        }
    },
    [canvasState]
);

    const onResizeHandlePointerDown = useCallback((
        corner: Side,
        initialBounds: XYWH,
    )=> {
        history.pause();
        setCanvasState({
            mode: CanvasMode.Resizing,
            initialBounds,
            corner
        })
    },[history])

    const onWheel = useCallback((e: React.WheelEvent)=> {
        setCamera((camera)=> ({
            x: camera.x - e.deltaX,
            y: camera.y - e.deltaY
        }))
    },[])

    const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
            e.preventDefault();
            const current = pointerEventToCanvasPoint(e, camera);

            if( canvasState.mode === CanvasMode.Translating){
                translateSelectedLayers(current);
            }

            else if( canvasState.mode === CanvasMode.Resizing){
                resizeSelectedLayer(current);
            }
            setMyPresence({ cursor: current });
    },[
        canvasState,
        resizeSelectedLayer,
        camera,
        translateSelectedLayers
    ]);

    const onPointerLeave = useMutation((
        {setMyPresence}
    ) => {
        setMyPresence({cursor: null});
    },[]);

    const onPointerDown = useCallback((
        e: React.PointerEvent,
    ) => {
        const point = pointerEventToCanvasPoint(e, camera);
        if( canvasState.mode === CanvasMode.Inserting){
            return;
        }


        setCanvasState({origin: point, mode: CanvasMode.Pressing});
    }, [camera, canvasState.mode, setCanvasState]);

    const onPointerUp = useMutation((
        {},
        e
    )=> {
        const point = pointerEventToCanvasPoint(e, camera);

        if( canvasState.mode === CanvasMode.None || canvasState.mode === CanvasMode.Pressing){
            unselectLayer();
            setCanvasState({
                mode: CanvasMode.None,
            })
        }
        else if(canvasState.mode === CanvasMode.Inserting){
            insertLayer(canvasState.layerType, point);
        }else {
            setCanvasState({
                mode: CanvasMode.None,
            });
        }
        history.resume();
    },[
        camera, canvasState, history, insertLayer, unselectLayer
    ]);

    const selections = useOthersMapped((other)=> other.presence.selection);

    const onLayerPointerDown = useMutation((
        {self, setMyPresence},
        e: React.PointerEvent,
        layerId: string
    )=> {
        if(
            canvasState.mode === CanvasMode.Pencil ||
            canvasState.mode === CanvasMode.Inserting
        )
        {
            return;
        }

        history.pause();
        e.stopPropagation();

        const point = pointerEventToCanvasPoint(e, camera);
        if(!self.presence.selection?.includes(layerId)){
            setMyPresence({ selection: [layerId]}, { addToHistory: true});
        }
        setCanvasState({ mode: CanvasMode.Translating, current: point});
    },[
        setCanvasState,
        camera,
        history,
        canvasState.mode,
    ])

    const layerIsToColorSelection = useMemo(()=> {
        const layerIdsToColorSelection: Record<string, string> = {}

        for (const user of selections){
            const [connectionId, selection] = user;
            if (selection) {
                for (const layerId of selection) {
                    layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId);
                }
            }
        }

        return layerIdsToColorSelection;
    },[selections])

    return (
        <main className="h-full w-full relative bg-neutral-100 touch-none">
            <Info boardId={boardId}/>
            <Participants/>
            <Toolbar canvasState={canvasState} setCanvasState={setCanvasState} canRedo={canRedo} canUndo={canUndo} undo= {history.undo} redo={history.redo} />
            <svg className="h-[100vh] w-[100vw]" onWheel={onWheel} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} onPointerUp={onPointerUp} onPointerDown={onPointerDown}>
                <g style = {{
                    transform: `translate(${camera.x}px, ${camera.y}px)`
                }}>
                    {layerIds.map((layerId)=> (
                        <LayerPreview
                         key = {layerId}
                         id = {layerId}
                         onLayerPointerDown = {onLayerPointerDown}
                         selectionColor =  {layerIsToColorSelection[layerId]}
                        />
                    ))}
                    <SelectionBox
                        onResizeHandlePointerDown = {onResizeHandlePointerDown}
                    />
                    <CursorsPresence/>
                </g>
            </svg>
        </main>
    )
}