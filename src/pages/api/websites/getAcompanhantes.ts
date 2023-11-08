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

        // Check if confirmationsArray is an array and has items
        if (!Array.isArray(confirmationsArray) || confirmationsArray.length === 0) {
            return res.status(200).json({ totalCount: 0, confirmations: [] });
        }

        console.log(confirmationsArray);

        // Calculate the total count
        const totalCount = confirmationsArray.reduce((acc, confirmation) => {
            const accompanyCount = parseInt(confirmation.acompanhantes) || 0;
            return acc + accompanyCount + 1; // Add 1 for the primary individual
        }, 0);

        // Return both the total count and the confirmations details
        return res.status(200).json({ totalCount, confirmations: confirmationsArray });

    } catch (error) {
        console.error('Error retrieving confirmation count: ', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default handler;



