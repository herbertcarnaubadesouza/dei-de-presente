import { Gift } from '@/components/Web/Birthday';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import firebaseAdmin from '../../../server/firebaseAdmin';
import { authOptions } from '../auth/[...nextauth]';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        console.log('Método não permitido');
        return res.status(405).end();
    }

    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { user } = session;

    if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const db = firebaseAdmin.firestore();
        const querySnapshot = await db
            .collection('Users')
            .where('email', '==', user.email)
            .get();

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];

            const approvedPayments = userDoc.data().approvedPayments as {
                gift: Gift;
            }[];

            const receivedGifts = approvedPayments.reduce(
                (
                    acc,
                    payment: {
                        gift: Gift;
                    }
                ) => {
                    acc.gifts.push(payment.gift);
                    acc.totalReceived += payment.gift.price;
                    return acc;
                },
                { gifts: [], totalReceived: 0 } as {
                    gifts: Gift[];
                    totalReceived: number;
                }
            );

            const websites = userDoc.data()?.websites || [];
            const slug: string = websites.length > 0 ? websites[0].slug : null;

            return res.status(200).json({ receivedGifts, slug });
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error: any) {
        console.log(`Erro: ${error.message}`);
        return res.status(500).json({ error: error.message });
    }
};

export default handler;
