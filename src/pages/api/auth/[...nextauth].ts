import bcrypt from 'bcrypt';
import * as admin from 'firebase-admin';
import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import firebaseAdmin from "../../../server/firebaseAdmin";

interface CustomSession extends Session {
    id: string;
    email: string;
    role: string;
}


export default NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                const { email, password } = credentials as { email: string; password: string };

                try {
                    const db = firebaseAdmin.firestore();

                    const querySnapshot = await db.collection('Users').where('email', '==', email).get();

                    if (querySnapshot.empty) {
                        return null;
                    }

                    const docSnap = querySnapshot.docs[0];
                    const userRecord = docSnap.data();

                    if (userRecord && await passwordMatches(password as string, userRecord)) {
                        return { email: userRecord.email, id: docSnap.id };
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error(error);
                    return null;
                }
            }
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },
        session: async ({ session, token }) => {
            const customSession = session as CustomSession;
            if (token) {
                customSession.id = token.id as string;
                customSession.email = token.email as string;
                customSession.role = token.role as string;
            }
            return customSession;
        }
    }

});

const passwordMatches = async (password: string, userRecord: admin.firestore.DocumentData) => {
    if (userRecord.password) {
        return bcrypt.compare(password, userRecord.password);
    }
    return false;
};
