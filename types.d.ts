import 'next-auth';

declare module 'next-auth' {
    interface Session {
        id: string;
    }
}

declare global {
    interface Window {
        paymentBrickController: any;
    }
}
