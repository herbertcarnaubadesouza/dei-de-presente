import { NextApiRequest, NextApiResponse } from 'next';
import firebaseAdmin from '../../../server/firebaseAdmin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const db = firebaseAdmin.firestore();
        const giftRef = db.collection('Gifts').where('userId', '==', userId);
        const giftDoc = await giftRef.get();

        if (giftDoc.empty) {
            return res.status(404).json({ message: 'No gifts found' });
        }

        const gifts: any = [];
        giftDoc.forEach(doc => {
            gifts.push({ id: doc.id, ...doc.data() });
        });

        return res.status(200).json(gifts);

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export default handler;
