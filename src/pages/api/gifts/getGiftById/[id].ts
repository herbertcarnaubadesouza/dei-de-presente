import { NextApiRequest, NextApiResponse } from "next";
import firebaseAdmin from "../../../../server/firebaseAdmin";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log("Handler iniciado");

    if (req.method !== "GET") {
        console.log("Método não permitido");
        return res.status(405).end();
    }

    const { id } = req.query;
    const { userId } = req.query;
    console.log(`ID recebido: ${id}`);

    try {
        const db = firebaseAdmin.firestore();

        const userSnapshot = await db.collection("Users").doc(userId as string).get();
        let websiteSlug: string = "";
        let foundGift: any = null;

        if (userSnapshot.exists) {
            const userData = userSnapshot.data();
            if (userData && userData.websites) {
                for (const website of userData.websites) {
                    if (website.slug) {
                        websiteSlug = website.slug;
                    }
                }
            }
        }

        if (websiteSlug !== "") {
            const websiteQuerySnapshot = await db.collection('Website').where('slug', '==', websiteSlug).get();

            if (!websiteQuerySnapshot.empty) {
                const websiteDoc = websiteQuerySnapshot.docs[0];
                const websiteData = websiteDoc.data();

                foundGift = websiteData.gifts.find((gift: any) => gift.id === id);
            }
        }

        if (foundGift) {
            return res.status(200).json(foundGift);
        } else {
            return res.status(404).json({ error: 'Gift not found' });
        }

    } catch (error: any) {
        console.log(`Erro: ${error.message}`);
        return res.status(500).json({ error: error.message });
    }
};

export default handler;
