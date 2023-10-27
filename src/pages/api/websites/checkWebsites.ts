
import { NextApiRequest, NextApiResponse } from 'next';
import firebaseAdmin from '../../../server/firebaseAdmin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    const { userId } = req.query;

    try {
        const db = firebaseAdmin.firestore();
        const userRef = db.collection('Users').doc(userId as string);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const websites = userDoc.data()?.websites || [];
        const slug = websites.length > 0 ? websites[0].slug : null;

        return res.status(200).json({ slug });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export default handler;
