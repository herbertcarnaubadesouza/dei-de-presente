
import { NextApiRequest, NextApiResponse } from "next";
import firebaseAdmin from "../../../server/firebaseAdmin";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        return res.status(405).end();
    }

    const { slug } = req.query;

    try {
        const db = firebaseAdmin.firestore();

        const querySnapshot = await db.collection('Website').where('slug', '==', slug).get();

        if (querySnapshot.empty) {
            return res.status(404).json({ error: 'Website not found' });
        }

        const websiteData = querySnapshot.docs[0].data();

        return res.status(200).json(websiteData);
    } catch (error: any) {
        console.error("Error fetching website:", error);
        return res.status(500).json({ error: error.message });
    }
};

export default handler;
