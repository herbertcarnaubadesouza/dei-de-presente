import { NextApiRequest, NextApiResponse } from 'next';
import firebaseAdmin from '../../../../server/firebaseAdmin';

const storage = firebaseAdmin
    .storage()
    .bucket('dei-de-presente-software.appspot.com');

const uploadImage = async (imageUrl: string, destination: string) => {
    const hash =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        Date.now().toString();

    const fileName = imageUrl.replace(
        `https://storage.googleapis.com/${storage.name}/`,
        ''
    );
    const tempFile = storage.file(fileName);

    const destinationWithHash = destination.replace('.jpg', `-${hash}.webp`);
    const file = (await tempFile.move(destinationWithHash))[0];

    file.makePublic();

    return decodeURIComponent(file.publicUrl());
};

const isUrl = (s: string) => {
    try {
        new URL(s);
        return true;
    } catch (_) {
        return false;
    }
};

const uploadImageAndGetData = async (
    fieldData: string | null,
    docRefId: string
) => {
    if (fieldData) {
        const fileUrl = decodeURIComponent(fieldData);
        if (
            isUrl(fieldData) &&
            !fileUrl.startsWith(
                `https://storage.googleapis.com/${storage.name}/temp/`
            )
        ) {
            return fieldData;
        } else {
            return await uploadImage(
                fileUrl,
                `websites/${docRefId}/fotoCasal.jpg`
            );
        }
    }
    return null;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'PUT') {
        return res.status(405).end();
    }

    const { slug } = req.query;

    const updatedData = req.body;

    try {
        const db = firebaseAdmin.firestore();

        const querySnapshot = await db
            .collection('Website')
            .where('slug', '==', slug)
            .get();

        if (querySnapshot.empty) {
            return res.status(409).json({ error: 'Website does not exist' });
        }

        const docRef = querySnapshot.docs[0].ref;

        const imageFields = [
            'bannerUrl',
            'fotoEventoUrl',
            'fotoMosaico1Url',
            'fotoMosaico2Url',
            'fotoMosaico3Url',
            'fotoMosaico4Url',
            'fotoMosaico5Url',
            'fotoMosaico6Url',
            'fotoMosaico7Url',
            'fotoMosaico8Url',
            'fotoMosaico9Url',
            'fotoMosaico10Url',
            'fotoMosaico11Url',
            'fotoMosaico12Url',
            'fotoLocalUrl',
        ];
        const updatedUrls: { [key: string]: string } = {};

        await Promise.all(
            imageFields.map(async (field) => {
                console.log(`Verificando campo: ${field}`);
                if (updatedData[field]) {
                    console.log(
                        `Campo ${field} foi atualizado, fazendo upload...`
                    );
                    console.log(updatedData[field]);
                    const newUrl = await uploadImageAndGetData(
                        updatedData[field],
                        docRef.id
                    );
                    console.log(newUrl);

                    if (newUrl) updatedUrls[field] = newUrl;
                }
            })
        );

        console.log('Fazendo merge dos dados atualizados');

        await docRef.set({ ...updatedData, ...updatedUrls }, { merge: true });

        return res
            .status(200)
            .json({ message: 'Website updated successfully' });
    } catch (error: any) {
        console.log(`Erro: ${error.message}`);
        return res.status(500).json({ error: error.message });
    }
};

export default handler;
