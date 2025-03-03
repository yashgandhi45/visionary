import {
  createClient,
  LiveList,
  LiveMap,
  LiveObject,
} from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

import { Layer, Color} from "@/types/canvas";

const client = createClient({
  throttle: 16,
  authEndpoint: "/api/liveblocks-auth",
  async resolveUsers({ userIds }) {
    // Implement fetching user data based on userIds
    return [];
  },
  async resolveMentionSuggestions({ text }) {
    // Implement searching for userIds based on text
    return [];
  },
  async resolveRoomsInfo({ roomIds }) {
    // Implement fetching room info based on roomIds
    return [];
  },
});

// Define Presence type
type Presence = {
  // Example: cursor, selection, etc.
  cursor: { x: number; y: number } | null;
  selection?: string[];
};

// Define Storage type
type Storage = {
  layers?: LiveMap<string, LiveObject<Layer>>;
  layerIds: LiveList<string>;
};

// Define UserMeta type
type UserMeta = {
  id?: string;
  info?: {
    name?: string;
    picture?: string;
  };
};

// Define RoomEvent type for custom events
type RoomEvent = {
  type: "NOTIFICATION";
};

// Define ThreadMetadata for comments
export type ThreadMetadata = {
  resolved?: boolean;
  quote?: string;
  time?: number;
};

export const {
  suspense: {
    RoomProvider,
    useRoom,
    useMyPresence,
    useUpdateMyPresence,
    useSelf,
    useOthers,
    useOthersMapped,
    useOthersListener,
    useOthersConnectionIds,
    useOther,
    useBroadcastEvent,
    useEventListener,
    useStorage,
    useBatch,
    useHistory,
    useUndo,
    useRedo,
    useCanUndo,
    useCanRedo,
    useMutation,
    useStatus,
    useLostConnectionListener,
    useThreads,
    useCreateThread,
    useEditThreadMetadata,
    useCreateComment,
    useEditComment,
    useDeleteComment,
    useAddReaction,
    useRemoveReaction,
    useThreadSubscription,
    useMarkThreadAsRead,
    useRoomNotificationSettings,
    useUpdateRoomNotificationSettings,
  },
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent, ThreadMetadata>(
  client
);
