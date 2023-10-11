// pages/api/saveWebsite.ts
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import firebaseAdmin from '../../server/firebaseAdmin';

const storage = firebaseAdmin.storage().bucket();

const uploadImage = async (imageUrl: string, destination: string) => {
    const hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Date.now().toString();

    const projectRoot = path.resolve(__dirname, '../../../../');  // Ajuste o número de '..' conforme necessário para chegar à raiz do projeto
    const filePath = path.join(projectRoot, 'public', imageUrl);


    console.log(filePath);
    const fileBuffer = fs.readFileSync(filePath);
    const destinationWithHash = destination.replace('.jpg', `-${hash}.jpg`);
    const file = storage.file(destinationWithHash);
    await file.save(fileBuffer, {
        contentType: 'image/jpeg',
    });
    return file.publicUrl();
};


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const {
        nomeCasal,
        slug,
        mensagemCurta,
        dataCasamento,
        horaCasamento,
        sobreCasal,
        fotosCasalText,
        nomeRua,
        complemento,
        numeroRua,
        nextHandlerIndex,
        bannerUrl,
        fotoCasalUrl,
        fotoMosaico1Url,
        fotoMosaico2Url,
        fotoMosaico3Url,
        fotoMosaico4Url,
        fotoMosaico5Url,
        fotoMosaico6Url,
        fotoLocalUrl
    } = req.body;

    try {
        const db = firebaseAdmin.firestore();

        const docRef = await db.collection('Website').add({
            nomeCasal,
            slug,
            mensagemCurta,
            dataCasamento,
            horaCasamento,
            sobreCasal,
            fotosCasalText,
            nomeRua,
            complemento,
            numeroRua,
            nextHandlerIndex,
            bannerUrl,
            fotoCasalUrl,
            fotoMosaico1Url,
            fotoMosaico2Url,
            fotoMosaico3Url,
            fotoMosaico4Url,
            fotoMosaico5Url,
            fotoMosaico6Url,
            fotoLocalUrl
        });

        const newBannerUrl = await uploadImage(bannerUrl, `websites/${docRef.id}/banner.jpg`);
        const newFotoCasalUrl = await uploadImage(fotoCasalUrl, `websites/${docRef.id}/fotoCasal.jpg`);
        const newFotoMosaico1Url = await uploadImage(fotoMosaico1Url, `websites/${docRef.id}/fotoCasal.jpg`);
        const newFotoMosaico2Url = await uploadImage(fotoMosaico2Url, `websites/${docRef.id}/fotoCasal.jpg`);
        const newFotoMosaico3Url = await uploadImage(fotoMosaico3Url, `websites/${docRef.id}/fotoCasal.jpg`);
        const newFotoMosaico4Url = await uploadImage(fotoMosaico4Url, `websites/${docRef.id}/fotoCasal.jpg`);
        const newFotoMosaico5Url = await uploadImage(fotoMosaico5Url, `websites/${docRef.id}/fotoCasal.jpg`);
        const newFotoMosaico6Url = await uploadImage(fotoMosaico6Url, `websites/${docRef.id}/fotoCasal.jpg`);
        const newFotoLocalUrl = await uploadImage(fotoLocalUrl, `websites/${docRef.id}/fotoCasal.jpg`);

        // await db.collection('Website').doc(docRef.id).update({
        //     bannerUrl: newBannerUrl,
        //     fotoCasalUrl: newFotoCasalUrl,
        //     fotoMosaico1Url: newFotoMosaico1Url,
        //     fotoMosaico2Url: newFotoMosaico2Url,
        //     fotoMosaico3Url: newFotoMosaico3Url,
        //     fotoMosaico4Url: newFotoMosaico4Url,
        //     fotoMosaico5Url: newFotoMosaico5Url,
        //     fotoMosaico6Url: newFotoMosaico6Url,
        //     fotoLocalUrl: newFotoLocalUrl
        // });

        return res.status(200).json({ id: docRef.id, message: 'Website salvo com sucesso' });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export default handler;
