import firebaseAdmin from "@/server/firebaseAdmin";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        return res.status(405).end();
    }

    const { slug, confirmedData } = req.body;

    try {
        const db = firebaseAdmin.firestore();

        // Encontrar o website pela slug
        const websiteQuerySnapshot = await db.collection('Website').where('slug', '==', slug).get();

        if (websiteQuerySnapshot.empty) {
            return res.status(404).json({ error: 'Website not found' });
        }

        const websiteDocRef = websiteQuerySnapshot.docs[0].ref;

        await websiteDocRef.update({
            confirmations: firebaseAdmin.firestore.FieldValue.arrayUnion(confirmedData)
        });


        return res.status(200).json({ message: 'Confirmation added successfully' });

    } catch (error: any) {
        console.error('Error adding confirmation: ', error);
        return res.status(500).json({ error: error.message });
    }
};

export default handler;
