import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import path from 'node:path';
import sharp from 'sharp';

import firebaseAdmin from '../../../server/firebaseAdmin';

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 1,
    },
});

const fireStorage = firebaseAdmin
    .storage()
    .bucket('dei-de-presente-software.appspot.com');

export const config = {
    api: {
        bodyParser: false,
    },
};

const uploadImageToStorage = async (fileName: string, fileBuffer: Buffer) => {
    const hash =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        Date.now().toString();

    const destinationWithHash = `temp/${fileName}-${hash}.webp`;
    const file = fireStorage.file(destinationWithHash);

    await file.save(fileBuffer, {
        contentType: 'image/webp',
    });

    await file.makePublic();

    return decodeURIComponent(file.publicUrl());
};

interface NextApiRequestWithMulter extends NextApiRequest {
    file: Express.Multer.File;
    files:
        | {
              [fieldname: string]: Express.Multer.File[];
          }
        | Express.Multer.File[];
}

const router = createRouter<NextApiRequestWithMulter, NextApiResponse>();

router
    // @ts-ignore
    .use(expressWrapper(upload.single('file')))
    .post(async (req, res) => {
        try {
            const file = req.file;
            let fileContentBuffer = await sharp(file.buffer)
                .resize({
                    width: 1920,
                    withoutEnlargement: true,
                })
                .webp()
                .toBuffer();

            const fileName = path.parse(file.originalname).name;

            const uniqueId =
                Math.floor(Math.random() * 1000000) +
                '-' +
                Date.now() +
                fileName;

            const uploadImage = await uploadImageToStorage(
                uniqueId,
                fileContentBuffer
            );
            console.log(uploadImage);

            res.status(200).json({ success: true, file: uploadImage });
        } catch (err) {
            console.log(err);
            res.status(400).send({ message: 'Bad Request' });
        }
    });

export default router.handler({
    onError: (err: any, req, res) => {
        return res.status(500).json(err);
    },
});
