import { Liveblocks} from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
    secret: "sk_dev_C-4Bo7NT-YoboC6QxYWPl3CZafXeYjmj5DUb2Qz9rNQEhPibungtYTwWWE2q9Pnk"
})



export async function POST(request: Request){
    const authoriation = await auth();
    const user = await currentUser();


    if(!authoriation || !user){
        return new Response("Unauthorized", { status: 403})
    }
    const {room } = await request.json();
    const board = await convex.query(api.board.get, {id: room});


    if(board?.orgId!== authoriation.orgId){
        return new Response("Unauthorized");
    }

    const userInfo = {
        name: user.firstName || "Anonymous",
        picture : user.imageUrl,
    };



    const session = liveblocks.prepareSession(
        user.id,
        { userInfo}
    );

    if(room){
        session.allow(room, session.FULL_ACCESS);
    }
    const { status, body} = await session.authorize();

    return new Response(body, { status});
}