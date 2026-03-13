import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";

export const POST = async ({ request, redirect }) => {
    const formData = await request.formData();
    const name = formData.get("name")?.toString();
    const time = formData.get("time")?.toString();
    const moves = formData.get("moves")?.toString();
    const cards = formData.get("cards")?.toString();

    if (!name || !time || !moves || !cards) {
        return new Response("Missing required fields", {
            status: 400,
        });
    }
    try {
        const db = getFirestore(app);
        const leaderboardRef = db.collection("leaderboard");
        await leaderboardRef.add({
            name,
            time: parseInt(time),
            moves: parseInt(moves),
            cards: parseInt(cards)
        });
    } catch (error) {
        return new Response("Something went wrong", {
            status: 500,
        });
    }
    return redirect("/leaderboard");
};