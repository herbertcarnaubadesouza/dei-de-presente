import { MercadoPagoConfig, Payment } from 'mercadopago';
import { NextApiRequest, NextApiResponse } from 'next';
import firebaseAdmin from '../../../server/firebaseAdmin';



const client = new MercadoPagoConfig({
    accessToken: process.env.ACCESS_TOKEN as string,
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
    console.log("Received request with body:", req.body);

    if (req.method !== 'POST') {
        console.error("Method not allowed");
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }

    const { formData, gift, website } = req.body;

    try {
        console.log("Creating payment with formData:", formData);
        const paymentResponse = await payment.create({
            body: formData,
        });

        console.log("Payment Response:", paymentResponse);

        if (!paymentResponse.id) {
            console.error("Payment ID not found in response");
            return res.status(500).json({
                error: 'payment_error',
                message: 'ID do pagamento não encontrado',
            });
        }

        const db = firebaseAdmin.firestore();
        const querySnapshot = await db
            .collection('Payments')
            .where('mp_paymentId', '==', paymentResponse.id)
            .get();

        if (!querySnapshot.empty) {
            console.error("Payment already exists");
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
            mp_paymentId: paymentResponse.id,
            ...paymentResponse,
        };

        await db.collection('Payments').add(paymentData);

        if (paymentResponse.status === 'pending' && paymentResponse.payment_method_id === 'pix') {
            return res.status(200).json({
                status: 'pending',
                paymentId: paymentResponse.id,
                paymentMethod: paymentResponse.payment_method_id,
                pixQrCode: paymentResponse.point_of_interaction?.transaction_data?.qr_code,
                pixQrCodeBase64: paymentResponse.point_of_interaction?.transaction_data?.qr_code_base64,
                externalResourceUrl: paymentResponse.transaction_details?.external_resource_url,
                ticketUrl: paymentResponse.point_of_interaction?.transaction_data?.ticket_url,
            });
        }

        await db.collection('Payments').add(paymentData);

        if (paymentResponse.status !== 'approved') {
            console.log("Payment not approved");
            return res.status(200).send({ paymentId: paymentResponse.id });
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

        res.status(200).send({ paymentId: paymentResponse.id });
    } catch (error: any) {
        console.error("Error in payment processing:", error);
        res.status(500).send({ error: 'Erro no processamento de pagamento', details: error.message });
    }
};

export default handler;
