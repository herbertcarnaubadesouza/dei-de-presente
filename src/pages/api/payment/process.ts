import { MercadoPagoConfig, Payment } from 'mercadopago';
import { NextApiRequest, NextApiResponse } from 'next';
import firebaseAdmin from '../../../server/firebaseAdmin';

const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN as string,
    options: {
        timeout: 5000,
    },
});

const payment = new Payment(client);

async function getUserByWebsite(website: { slug: string; websiteId: string }) {
    const db = firebaseAdmin.firestore();
    const userRef = db.collection('Users');

    const userQuery = userRef.where('websites', 'array-contains', website);

    const querySnapshot = await userQuery.get();

    if (querySnapshot.empty || !querySnapshot.docs[0].exists) {
        throw new Error('User not found');
    }

    return querySnapshot.docs[0].ref;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' });
    }

    const { formData, gift, website } = req.body;

    try {
        const {
            id,
            card,
            status,
            status_detail,
            authorization_code,
            charges_details,
            date_approved,
            date_created,
            date_last_updated,
            date_of_expiration,
            money_release_date,
            fee_details,
            payer,
            payment_method,
            refunds,
            transaction_amount,
            transaction_amount_refunded,
            transaction_details,
        } = await payment.create({
            body: formData,
        });

        if (!id) {
            return res.status(500).json({
                error: 'payment_error',
                message: 'Não foi possível criar pagamento',
            });
        }

        const db = firebaseAdmin.firestore();

        const querySnapshot = await db
            .collection('Payments')
            .where('mp_paymentId', '==', id)
            .get();

        if (!querySnapshot.empty) {
            return res.status(409).json({
                error: 'payment_already_exists',
                message: 'Pagamento já registrado',
            });
        }

        const userRef = await getUserByWebsite(website);

        const paymentData = {
            gift,
            website,
            userId: userRef.id,
            mp_paymentId: id,
            card,
            status,
            status_detail,
            authorization_code,
            charges_details,
            date_approved,
            date_created,
            date_last_updated,
            date_of_expiration,
            money_release_date,
            fee_details,
            payer,
            payment_method,
            refunds,
            transaction_amount,
            transaction_amount_refunded,
            transaction_details,
        };

        const paymentRef = await db.collection('Payments').add(paymentData);

        if (status !== 'approved') {
            return res.status(200).send({ paymentId: id });
        }

        await db.runTransaction(async (transaction) => {
            const userDoc = await transaction.get(userRef);
            if (!userDoc.exists) {
                throw new Error('User does not exist!');
            }

            transaction.update(userRef, {
                approvedPayments: [
                    ...(userDoc.data()?.approvedPayments || []),
                    paymentData,
                ],
            });
        });

        res.status(200).send({ paymentId: id });
    } catch (error) {
        res.status(500).send({ error });
    }
};

export default handler;
