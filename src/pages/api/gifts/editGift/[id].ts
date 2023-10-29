import { NextApiRequest, NextApiResponse } from "next";
import firebaseAdmin from "../../../../server/firebaseAdmin";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== "PUT") {
        return res.status(405).end();
    }

    const { id } = req.query;

    const updatedData = req.body;

    try {
        const db = firebaseAdmin.firestore();

        const querySnapshot = await db.collection('Gifts').where('id', '==', id).get();

        if (querySnapshot.empty) {
            return res.status(409).json({ error: 'Gift does not exist' });
        }

        const docRef = querySnapshot.docs[0].ref;
        const userId = querySnapshot.docs[0].data().userId;
        await docRef.set(updatedData, { merge: true });


        const userSnapshot = await db.collection("Users").doc(userId).get();
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
            const websiteQuerySnapshot = await db.collection('Website').where('slug', '==', websiteSlug).get();
            if (!websiteQuerySnapshot.empty) {
                const websiteDoc = websiteQuerySnapshot.docs[0];
                const websiteData = websiteDoc.data();

                const updatedGifts = websiteData.gifts.map((gift: any) => {
                    if (gift.id === id) {
                        console.log("Gift found, updating...", { ...gift, ...updatedData }); // Debug
                        return { ...gift, ...updatedData };
                    }
                    return gift;
                });

                await websiteDoc.ref.update({ gifts: updatedGifts });
            }
        }

        return res.status(200).json({ message: 'Gift and website updated successfully' });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export default handler;
