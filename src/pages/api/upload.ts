import multer from 'multer';
import path from 'path';

export const config = {
    api: {
        bodyParser: false,
    },
};

const storage = multer.diskStorage({
    destination: './public/temp/',
    filename: function (req, file, cb) {
        const uniqueId = Math.floor(Math.random() * 1000000) + '-' + Date.now() + path.extname(file.originalname);
        cb(null, uniqueId);
    },
});
const upload = multer({ storage: storage }).single('file');

export default function handler(req: any, res: any) {
    if (req.method === 'POST') {
        upload(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err);
            } else if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json({ success: true, file: req.file.filename });
        });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
