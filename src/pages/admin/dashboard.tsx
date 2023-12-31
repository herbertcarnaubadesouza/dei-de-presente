import GiftsList from '@/components/Admin/GiftsList';
import Header from '@/components/Admin/Header';
import Sidebar from '@/components/Admin/Sidebar';
import SidebarEdit from '@/components/Admin/SidebarEdit';
import Modal from '@/components/Modal';
import axios from 'axios';
import {
    GetServerSideProps,
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
} from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styles from '../../styles/Dashboard.module.scss';

interface Gift {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
}

function formatPrice(price: number) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(price);
}

export default function Dashboard({
    receivedGifts,
    slug,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [showSidebar, setShowSidebar] = useState(false);
    const [showSidebarEdit, setShowSidebarEdit] = useState(false);
    const [giftCounter, setGiftCounter] = useState(0);
    const [gifts, setGifts] = useState<Gift[]>([]);
    const [selectedGiftId, setSelectedGiftId] = useState<string | null>(null);
    const session = useSession();
    const [confirmedGuestsCount, setConfirmedGuestsCount] = useState(0);

    const handleGiftAdded = () => {
        setGiftCounter((prevCounter) => prevCounter + 1);
    };

    const handleEditGift = (id: string) => {
        setSelectedGiftId(id);
        setShowSidebarEdit(true);
    };

    useEffect(() => {
        if (slug) {
            axios
                .get(`/api/websites/getAcompanhantes?slug=${slug}`)
                .then((response) => {
                    setConfirmedGuestsCount(response.data.totalCount);
                })
                .catch((error) =>
                    console.error('Failed to fetch confirmed guests:', error)
                );
        }
    }, [slug]);

    useEffect(() => {
        const userId = session.data?.id;
        const fetchGifts = async () => {
            const res = await axios.get<Gift[]>('/api/gifts/getGifts', {
                params: { userId },
            });
            setGifts(res.data);
        };

        fetchGifts();
    }, [giftCounter, session.data?.id]);

    function capitalizeFirstLetter(name: string) {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }

    return (
        <>
            <div className={styles.container}>
                <Header />
                <div className={styles.presentesRecebidos}>
                    <header className={styles.pageHeader}>
                        <div className={styles.textSection}>
                            <p>
                                Olá,{' '}
                                {capitalizeFirstLetter(
                                    session.data?.user?.name || ''
                                )}
                                !
                            </p>
                            <span>
                                Abaixo você vai encontrar algumas estatísticas e
                                opções de personalização do seu site
                            </span>
                        </div>

                        <button
                            onClick={() =>
                                // @ts-ignore
                                window.MegaDialog.showModal()
                            }
                        >
                            Solicitar saque
                        </button>
                    </header>

                    <Sidebar
                        showSidebar={showSidebar}
                        setShowSidebar={setShowSidebar}
                        onGiftAdded={handleGiftAdded}
                    />
                    <SidebarEdit
                        showSidebar={showSidebarEdit}
                        setShowSidebar={setShowSidebarEdit}
                        onGiftAdded={handleGiftAdded}
                        selectedGiftId={selectedGiftId}
                        userId={session.data?.id}
                    />

                    <div
                        className={`${styles.overlay} ${
                            showSidebar || showSidebarEdit
                                ? styles.showOverlay
                                : ''
                        }`}
                        onClick={() => {
                            setShowSidebar(false);
                            setShowSidebarEdit(false);
                        }}
                    ></div>
                    <div className={styles.secondSectionPresentesRecebidos}>
                        <div className={styles.containerPresentes}>
                            <div className={styles.firstPresentes}>
                                <div className={styles.containerLogo}>
                                    <img
                                        className={styles.logo}
                                        src="/Gift.svg"
                                        alt="logo"
                                    />
                                </div>
                                <span>Presentes recebidos</span>
                            </div>
                            <p>{formatPrice(receivedGifts.totalReceived)}</p>
                        </div>
                        <div className={styles.containerPresentes}>
                            <div className={styles.firstPresentes}>
                                <div className={styles.containerLogo}>
                                    <img
                                        className={styles.logo}
                                        src="/Users.svg"
                                        alt="logo"
                                    />
                                </div>
                                <span>Pessoas confirmadas</span>
                            </div>
                            <p>Total: {confirmedGuestsCount} pessoas</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.presentesRecebidosText}>
                <p>Presentes recebidos</p>
                <button onClick={() => setShowSidebar(true)}>
                    Adicionar presente
                </button>
            </div>
            <GiftsList
                gifts={gifts}
                setShowSidebarEdit={setShowSidebarEdit}
                onEditGift={handleEditGift}
            />
            <Modal maxWithdrawAmount={receivedGifts.totalReceived} />
        </>
    );
}

export const getServerSideProps = (async (
    context: GetServerSidePropsContext
) => {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const dashboardDataResponse = await fetch(
        `${apiUrl}/api/users/getDashboardData`,
        {
            headers: context.req.headers as any,
        }
    );

    const dashboardDataData = (await dashboardDataResponse.json()) as {
        receivedGifts: {
            gifts: Gift[];
            totalReceived: number;
        };
        slug: string;
    };

    if (dashboardDataResponse.status === 404) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            session,
            ...dashboardDataData,
        },
    };
}) satisfies GetServerSideProps<{
    receivedGifts: {
        gifts: Gift[];
        totalReceived: number;
    };
}>;
