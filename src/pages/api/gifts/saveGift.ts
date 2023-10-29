import fs from 'fs';
import { NextApiRequest, NextApiResponse } from "next";
import path from 'path';
import sharp from "sharp";
import { v4 as uuidv4 } from 'uuid';
import firebaseAdmin from "../../../server/firebaseAdmin";


const storage = firebaseAdmin.storage().bucket("dei-de-presente-software.appspot.com");

const uploadImage = async (imageUrl: string, destination: string) => {
    const destinationWithHash = `${Date.now().toString()}-${destination}`;
    const file = storage.file(destinationWithHash);

    const projectRoot = path.resolve(__dirname, '../../../../../');
    const filePath = path.join(projectRoot, 'public', imageUrl);

    const fileBuffer = fs.readFileSync(filePath);
    const optimizedBuffer = await sharp(fileBuffer).webp().toBuffer();

    await file.save(optimizedBuffer, {
        contentType: 'image/webp',
    });

    await file.makePublic();

    const publicUrl = `https://storage.googleapis.com/${storage.name}/${file.name}`;
    return publicUrl;
};


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        return res.status(405).end();
    }

    const { imageUrl, giftName, giftValue, userId } = req.body;

    try {
        const uploadedImageUrl = await uploadImage(imageUrl, `${giftName}.webp`);

        const db = firebaseAdmin.firestore();

        const userRef = db.collection("Users").doc(userId);
        const userSnapshot = await userRef.get();
        const newGiftId = uuidv4();

        let websiteSlug: string = "";

        if (userSnapshot.exists) {
            const userData = userSnapshot.data();
            if (userData && userData.websites) {
                for (const website of userData.websites) {
                    if (website.slug) {
                        websiteSlug = website.slug;
                    }
                }
            }
        }

        if (websiteSlug !== "") {
            const querySnapshot = await db.collection('Website').where('slug', '==', websiteSlug).get();

            if (querySnapshot.empty) {
                return res.status(404).json({ error: 'Website not found' });
            }

            const websiteDoc = querySnapshot.docs[0];
            const websiteData = websiteDoc.data();

            // Você pode criar uma estrutura para o "gift", dependendo de como deseja armazená-lo.
            const newGift = {
                id: newGiftId,
                name: giftName,
                price: giftValue,
                imageUrl: uploadedImageUrl,
                userId: userId
            };

            const updatedGifts = [...(websiteData.gifts || []), newGift];

            await websiteDoc.ref.update({ gifts: updatedGifts });
        }

        const giftRef = await db.collection("Gifts").add({
            id: newGiftId,
            name: giftName,
            price: giftValue,
            imageUrl: uploadedImageUrl,
            userId: userId
        });

        return res.status(200).json({ giftId: giftRef.id });
    } catch (error: any) {
        console.error("Erro ao salvar o presente:", error);
        return res.status(500).json({ error: error.message });
    }
};


export default handler;
