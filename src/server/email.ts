// utils/email.ts

import nodemailer from 'nodemailer';

// Configure your email settings
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

export async function sendWithdrawalRequestEmail(data: {
    email: string;
    nome: string;
    amount: number;
    bank: string;
    agency: string;
    accountType: string;
    accountNumber: string;
    accountHolder: string;
    cpfCnpj: string;
}) {
    const {
        email,
        nome,
        amount,
        bank,
        agency,
        accountType,
        accountNumber,
        accountHolder,
        cpfCnpj,
    } = data;

    const mailOptions = {
        from: process.env.SMTP_FROM_EMAIL,
        to: ['thihxm@gmail.com'],
        subject: 'Dei de presente - Nova solicitação de saque',
        text: `Solicitação de saque de ${nome} recebida!`,
        html: `
            <p>Solicitação de saque de ${nome} recebida!</p>
            <p>Valor: ${amount}</p>
            <p>Banco: ${bank}</p>
            <p>Agência: ${agency}</p>
            <p>Tipo de conta: ${accountType}</p>
            <p>Número da conta: ${accountNumber}</p>
            <p>Titular da conta: ${accountHolder}</p>
            <p>CPF/CNPJ: ${cpfCnpj}</p>
        `,
    };

    // Send the email
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error sending email: %s', error.message);
        } else {
            console.error('Error sending email:', error);
        }
    }
}
