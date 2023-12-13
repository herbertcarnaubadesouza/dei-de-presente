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

export default async function checkPaymentStatus(req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'GET') {
      console.log("Method not allowed");
      return res.status(405).json({ message: 'Method not allowed' });
   }

   const { paymentId, paymentDocId, userDocId } = req.query;

   try {
      console.log(`Checking payment status for ID: ${paymentId}`);
      const paymentDetails = await payment.get({ id: paymentId as string });

      if (!paymentDetails) {
         console.log(`Payment ID ${paymentId} not found`);
         return res.status(404).json({ message: 'Payment not found' });
      }

      console.log(`Payment ID ${paymentId} found with status: ${paymentDetails.status}`);

      if (paymentDetails.status === 'approved') {
         const db = firebaseAdmin.firestore();

         const paymentDocRef = db.collection('Payments').doc(paymentDocId as string);
         const paymentDoc = await paymentDocRef.get();
         if (!paymentDoc.exists) {
            console.log(`No Firestore document found for paymentDocId ${paymentDocId}`);
            return res.status(404).json({ message: 'Payment document not found' });
         }

         const userRef = db.collection('Users').doc(userDocId as string);
         const userDoc = await userRef.get();
         if (!userDoc.exists) {
            console.log(`User not found for userDocId ${userDocId}`);
            return res.status(404).json({ message: 'User document not found' });
         }

         await db.runTransaction(async (transaction) => {
            const userApprovedPayments = userDoc.data()?.approvedPayments || [];
            transaction.update(userRef, {
               approvedPayments: [...userApprovedPayments, paymentDoc.data()],
            });

            transaction.update(paymentDocRef, { status: 'approved' });
         });

         console.log(`Payment and user records updated for payment ID ${paymentId}`);
      }

      return res.status(200).json(paymentDetails);
   } catch (error) {
      console.error(`Error fetching payment status for ID ${paymentId}`, error);
      return res.status(500).json({ error: 'Error fetching payment status', details: error });
   }
}
