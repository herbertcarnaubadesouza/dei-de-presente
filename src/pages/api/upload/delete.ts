import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { fileName } = req.body;

            if (!fileName) {
                return res.status(400).json({ error: 'File name is required' });
            }


            const filePath = path.join(process.cwd(), 'public', 'temp', fileName);


            if (!fs.existsSync(filePath)) {
                return res.status(404).json({ error: 'File not found' });
            }

            fs.unlinkSync(filePath);

            return res.status(200).json({ message: 'File deleted successfully' });

        } catch (error) {
            console.error('Error deleting file:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}
