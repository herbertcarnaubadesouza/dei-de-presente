import { sendWithdrawalRequestEmail } from '@/server/email';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' });
    }

    const {
        amount,
        bank,
        agency,
        accountType,
        accountNumber,
        accountHolder,
        cpfCnpj,
    } = req.body;

    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user) {
        res.status(401);
    }

    const user = session?.user;

    if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    // Send an email with the new password
    await sendWithdrawalRequestEmail({
        email: user.email!,
        nome: user.name!,
        amount,
        bank,
        agency,
        accountType,
        accountNumber,
        accountHolder,
        cpfCnpj,
    });

    res.status(200).json({ message: 'New password has been sent' });
};

export default handler;
