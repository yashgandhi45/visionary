import { Canvas } from "./_components/canvas";
import { Room} from "@/components/room";
import { Loading } from "./_components/canvasloading";

interface BoardIdPageProps{
    params: Promise<{
        boardId: string;
    }>;
};

const BoardIdPage = async (props:BoardIdPageProps) => {
    const params = await props.params;
    return (
        <Room roomId={params.boardId} fallback={<Loading/>}>
        <Canvas boardId = {params.boardId}/>
        </Room>
    )
}

export default BoardIdPage;