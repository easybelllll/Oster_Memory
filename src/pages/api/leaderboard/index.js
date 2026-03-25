import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";

export const prerender = false;

export const POST = async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get("name")?.toString();
    const time = formData.get("time")?.toString();
    const moves = formData.get("moves")?.toString();
    const cards = formData.get("cards")?.toString();

    if (!name || !time || !moves || !cards) {
        return new Response("Ungültige Angaben", { status: 400 });
    }

    try {
        const db = getFirestore(app);
        await db.collection("leaderboard").add({
            name,
            time: parseInt(time),
            moves: parseInt(moves),
            cards: parseInt(cards)
        });
    } catch (error) {
        return new Response("Error", { status: 500 });
    }

    return new Response(JSON.stringify({ cards: parseInt(cards) }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
};