
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import sharp from 'sharp';
import firebaseAdmin from '../../../server/firebaseAdmin';

interface Gift {
    imageUrl: string;
    name: string;
    price: number;
    userId: string;
}

const storage = firebaseAdmin.storage().bucket("dei-de-presente-software.appspot.com");

const uploadImage = async (imageUrl: string, destination: string) => {
    const hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Date.now().toString();
    const projectRoot = path.resolve(__dirname, '../../../../../');
    const filePath = path.join(projectRoot, 'public', imageUrl);


    let fileBuffer = fs.readFileSync(filePath);

    fileBuffer = await sharp(fileBuffer).webp().toBuffer();

    const destinationWithHash = destination.replace('.jpg', `-${hash}.webp`);
    const file = storage.file(destinationWithHash);

    await file.save(fileBuffer, {
        contentType: 'image/webp',
    });

    await file.makePublic();

    const publicUrl = `https://storage.googleapis.com/${storage.name}/${file.name}`;
    return publicUrl;
};

const uploadImageAndGetData = async (fieldData: string | null, docRefId: string) => {
    if (fieldData) {
        return await uploadImage(fieldData, `websites/${docRefId}/fotoCasal.jpg`);
    }
    return null;
};


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    try {
        const db = firebaseAdmin.firestore();
        const { slug, userId, ...otherFields } = req.body;

        const slugAlreadyExists = await db.collection('Website').where('slug', '==', slug).get();

        if (!slugAlreadyExists.empty) {
            return res.status(400).json({ error: 'slug_already_exists', message: 'Esta slug já está sendo usada. Escolha outra.' });
        }

        const docRef = await db.collection('Website').add({ slug, ...otherFields });

        const imageFields = [
            'bannerUrl', 'fotoCasalUrl', 'fotoMosaico1Url', 'fotoMosaico2Url',
            'fotoMosaico3Url', 'fotoMosaico4Url', 'fotoMosaico5Url', 'fotoMosaico6Url',
            'fotoLocalUrl'
        ];

        const updatedUrls: { [key: string]: string } = {};

        await Promise.all(imageFields.map(async field => {
            const newUrl = await uploadImageAndGetData(req.body[field], docRef.id);
            if (newUrl) updatedUrls[field] = newUrl;
        }));

        const giftsRef = db.collection('Gifts');
        const giftsQuery = giftsRef.where('userId', '==', userId);
        const giftsSnapshot = await giftsQuery.get();

        const gifts: Gift[] = [];
        giftsSnapshot.forEach(doc => {
            const data = doc.data();
            if ('imageUrl' in data && 'name' in data && 'price' in data && 'userId' in data) {
                gifts.push(data as Gift);
            }
        });


        await db.collection('Website').doc(docRef.id).update({
            ...updatedUrls,
            gifts: gifts
        });

        const userRef = db.collection('Users').doc(userId);

        await db.runTransaction(async (transaction) => {
            const userDoc = await transaction.get(userRef);
            if (!userDoc.exists) {
                throw new Error("User does not exist!");
            }

            const websites = userDoc.data()?.websites || [];
            websites.push({ slug: slug, websiteId: docRef.id });

            transaction.update(userRef, { websites: websites });
        });

        return res.status(200).json({ id: docRef.id, message: 'Website salvo com sucesso' });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};


export default handler;


