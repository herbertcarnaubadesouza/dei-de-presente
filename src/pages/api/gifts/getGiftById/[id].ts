import { NextApiRequest, NextApiResponse } from "next";
import firebaseAdmin from "../../../../server/firebaseAdmin";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== "GET") {
        console.log("Método não permitido");
        return res.status(405).end();
    }

    const { id } = req.query;
    const { userId } = req.query;


    try {
        const db = firebaseAdmin.firestore();
        const querySnapshot = await db.collection('Gifts').where('id', '==', id as string).get();

        if (!querySnapshot.empty) {
            const giftDoc = querySnapshot.docs[0];
            const giftData = giftDoc.data();

            if (giftData) {
                return res.status(200).json(giftData);
            } else {
                return res.status(403).json({ error: "Unauthorized" });
            }
        } else {
            return res.status(404).json({ error: "Gift not found" });
        }

    } catch (error: any) {
        console.log(`Erro: ${error.message}`);
        return res.status(500).json({ error: error.message });
    }
};

export default handler;
