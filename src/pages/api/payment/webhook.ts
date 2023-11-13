import { MercadoPagoConfig, Payment } from 'mercadopago';
import { NextApiRequest, NextApiResponse } from 'next';
import firebaseAdmin from '../../../server/firebaseAdmin';

export interface WebhookResponse {
    action: string;
    api_version: string;
    application_id: string;
    date_created: string;
    id: string;
    live_mode: string;
    type: string;
    user_id: number;
    data: {
        id: string;
    };
}

const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN as string,
    options: {
        timeout: 5000,
    },
});

const payment = new Payment(client);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' });
    }

    const body = req.body as WebhookResponse;
    const db = firebaseAdmin.firestore();
    console.log(`Webhook ${body.id}`);

    switch (body.type) {
        case 'payment':
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
            } = await payment.get({ id: body.data.id });

            const paymentSnapshot = await db
                .collection('Payments')
                .where('mp_paymentId', '==', id)
                .get();

            if (paymentSnapshot.empty) {
                return res.status(404).json({
                    error: 'payment_not_found',
                    message: 'Pagamento não encontrado',
                });
            }
            console.log(paymentSnapshot.docs[0]);

            await db.runTransaction(async (transaction) => {
                const paymentDoc = await transaction.get(
                    paymentSnapshot.docs[0].ref
                );
                if (!paymentDoc.exists) {
                    return res.status(404).json({
                        error: 'payment_not_found',
                        message: 'Pagamento não encontrado',
                    });
                }

                transaction.update(paymentSnapshot.docs[0].ref, {
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
                });
            });

            if (status !== 'approved') {
                return res.status(200).send({ paymentId: id });
            }

            const paymentData = paymentSnapshot.docs[0].data();

            const userRef = db.collection('Users').doc(`${paymentData.userId}`);

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

            break;
        default:
            return res.status(200).send('ok');
    }

    res.send('ok');

    const { formData, giftId, websiteSlug } = req.body;

    const URL = 'http://localhost:3000';
    try {
        const response = await payment.create({
            body: formData,
        });

        if (!response.id) {
            return res.status(500).json({
                error: 'payment_error',
                message: 'Não foi possível criar pagamento',
            });
        }
    } catch (error) {
        res.status(500).send({ error });
    }
};

export default handler;
