import firebaseAdmin from "@/server/firebaseAdmin";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        return res.status(405).end();
    }

    const { slug } = req.query;

    try {
        const db = firebaseAdmin.firestore();

        const websiteQuerySnapshot = await db.collection('Website').where('slug', '==', slug).get();

        if (websiteQuerySnapshot.empty) {
            return res.status(404).json({ error: 'Website not found' });
        }

        const confirmationsArray = websiteQuerySnapshot.docs[0].data().confirmations;

        console.log(confirmationsArray);

        const totalCount = confirmationsArray.reduce((acc: any, confirmation: any) => {
            return acc + confirmation.acompanhantes + 1;
        }, 0);

        return res.status(200).json({ totalCount });

    } catch (error: any) {
        console.error('Error retrieving confirmation count: ', error);
        return res.status(500).json({ error: error.message });
    }
};

export default handler;
