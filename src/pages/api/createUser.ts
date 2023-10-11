// pages/api/createUser.ts
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import firebaseAdmin from "../../server/firebaseAdmin";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        return res.status(405).end();
    }

    const { email, password, nome } = req.body;

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const db = firebaseAdmin.firestore();

        const querySnapshot = await db.collection('Users').where('email', '==', email).get();

        if (!querySnapshot.empty) {
            return res.status(409).json({ error: 'Email já cadastrado' });
        }

        const userRecord = await firebaseAdmin.auth().createUser({
            email,
            password: hashedPassword,
        });

        await db.collection("Users").doc(userRecord.uid).set({ nome, email, password: hashedPassword });

        return res.status(200).json({ uid: userRecord.uid });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export default handler;
