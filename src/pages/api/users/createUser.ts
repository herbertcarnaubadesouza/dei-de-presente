// pages/api/createUser.ts
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from 'uuid';
import firebaseAdmin from "../../../server/firebaseAdmin";

const defaultGifts = [
    { name: "Tenis Jordan", imageUrl: "https://firebasestorage.googleapis.com/v0/b/dei-de-presente-software.appspot.com/o/tenis%20jordan.webp?alt=media&token=fbd9d72c-bd73-4293-8b8f-eaadf87052ea&_gl=1*3piqah*_ga*MTI4MjkzNjc3Ni4xNjg2NjAyODU3*_ga_CW55HF8NVT*MTY5NzY0MDEyMS43NC4xLjE2OTc2NDE1MzcuMy4wLjA.", price: 150 },
    { name: "Spa", imageUrl: "https://firebasestorage.googleapis.com/v0/b/dei-de-presente-software.appspot.com/o/spa.jpeg?alt=media&token=3341a681-40f8-4561-a7f4-2c1655ca4450&_gl=1*193gwrf*_ga*MTI4MjkzNjc3Ni4xNjg2NjAyODU3*_ga_CW55HF8NVT*MTY5NzY0MDEyMS43NC4xLjE2OTc2NDE1NzEuNjAuMC4w", price: 100 },
    {
        name: "Relogio Rolex", imageUrl: "https://firebasestorage.googleapis.com/v0/b/dei-de-presente-software.appspot.com/o/relogioRolex.webp?alt=media&token=2b7bda71-e8b2-4a22-9096-c2714c302df1&_gl=1*box8b5*_ga*MTI4MjkzNjc3Ni4xNjg2NjAyODU3*_ga_CW55HF8NVT*MTY5NzY0MDEyMS43NC4xLjE2OTc2NDE2NTIuNDAuMC4w"
        , price: 5000
    },
    { name: "Miami Beach", imageUrl: "https://firebasestorage.googleapis.com/v0/b/dei-de-presente-software.appspot.com/o/miamiBeach.jpg?alt=media&token=a5b54044-d1e4-4608-b046-aff9413f4488&_gl=1*r1pk69*_ga*MTI4MjkzNjc3Ni4xNjg2NjAyODU3*_ga_CW55HF8NVT*MTY5NzY0MDEyMS43NC4xLjE2OTc2NDE1ODkuNDIuMC4w.", price: 2000 },
    { name: "Livro Pai Rico, Pai Pobre", imageUrl: "https://firebasestorage.googleapis.com/v0/b/dei-de-presente-software.appspot.com/o/livroPaiRico.jpg?alt=media&token=feb66402-0d0e-46b1-bbc2-a24ae0d2960a&_gl=1*4icpq3*_ga*MTI4MjkzNjc3Ni4xNjg2NjAyODU3*_ga_CW55HF8NVT*MTY5NzY0MDEyMS43NC4xLjE2OTc2NDE2NzAuMjIuMC4w", price: 20 },
    { name: "Jack Daniels", imageUrl: "https://firebasestorage.googleapis.com/v0/b/dei-de-presente-software.appspot.com/o/jackDaniels.png?alt=media&token=ba944e87-2f60-4638-b36e-a7d8d1572241&_gl=1*13dyrnr*_ga*MTI4MjkzNjc3Ni4xNjg2NjAyODU3*_ga_CW55HF8NVT*MTY5NzY0MDEyMS43NC4xLjE2OTc2NDE2ODkuMy4wLjA.", price: 40 },
    { name: "Iphone 15 Pro Max", imageUrl: "https://firebasestorage.googleapis.com/v0/b/dei-de-presente-software.appspot.com/o/iphone15.jpg?alt=media&token=a76cdea0-2df2-4ce8-ab17-2a123dc08210&_gl=1*pb4pgs*_ga*MTI4MjkzNjc3Ni4xNjg2NjAyODU3*_ga_CW55HF8NVT*MTY5NzY0MDEyMS43NC4xLjE2OTc2NDE3MTQuNjAuMC4w", price: 1200 },
    { name: "Baralho", imageUrl: "https://firebasestorage.googleapis.com/v0/b/dei-de-presente-software.appspot.com/o/baralho.jpg?alt=media&token=6db23530-34d6-4edf-b85b-4cc0c2594b63&_gl=1*1quj9lz*_ga*MTI4MjkzNjc3Ni4xNjg2NjAyODU3*_ga_CW55HF8NVT*MTY5NzY0MDEyMS43NC4xLjE2OTc2NDE3NDguMjYuMC4w", price: 10 },
    { name: "Árvore de Natal", imageUrl: "https://firebasestorage.googleapis.com/v0/b/dei-de-presente-software.appspot.com/o/arvoreNatal.jpg?alt=media&token=a14f1fb6-e64e-4f3b-b233-39b503d5fc4b&_gl=1*a7ap8i*_ga*MTI4MjkzNjc3Ni4xNjg2NjAyODU3*_ga_CW55HF8NVT*MTY5NzY0MDEyMS43NC4xLjE2OTc2NDE3NjUuOS4wLjA.", price: 80 },
];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        return res.status(405).end();
    }

    const { email, password, name } = req.body;

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

        await db.collection("Users").doc(userRecord.uid).set({ name, email, password: hashedPassword });

        const userUid = userRecord.uid;
        const giftCollection = db.collection("Gifts");

        const giftPromises = defaultGifts.map(gift => {
            return giftCollection.add({
                id: uuidv4(),
                name: gift.name,
                imageUrl: gift.imageUrl,
                userId: userUid,
                price: gift.price,
            });
        });

        await Promise.all(giftPromises);

        return res.status(200).json({ uid: userRecord.uid });
    } catch (error: any) {
        console.error("Erro ao criar usuário:", error);
        return res.status(500).json({ error: error.message });
    }
};

export default handler;
