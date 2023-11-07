import GiftsList from '@/components/Admin/GiftsList';
import Header from '@/components/Admin/Header';
import Sidebar from '@/components/Admin/Sidebar';
import SidebarEdit from '@/components/Admin/SidebarEdit';
import Modal from '@/components/Modal';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styles from '../../styles/Dashboard.module.scss';

interface Gift {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
}

export default function Dashboard() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [showSidebarEdit, setShowSidebarEdit] = useState(false);
    const [giftCounter, setGiftCounter] = useState(0);
    const [gifts, setGifts] = useState<Gift[]>([]);
    const [selectedGiftId, setSelectedGiftId] = useState<string | null>(null);
    const session = useSession();

    const handleGiftAdded = () => {
        setGiftCounter((prevCounter) => prevCounter + 1);
    };

    const handleEditGift = (id: string) => {
        setSelectedGiftId(id);
        setShowSidebarEdit(true);
    };

    useEffect(() => {
        const userId = session.data?.id;
        const fetchGifts = async () => {
            const res = await axios.get<Gift[]>('/api/gifts/getGifts', {
                params: { userId },
            });
            setGifts(res.data);
        };

        fetchGifts();
    }, [giftCounter]);

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
                            <p>R$ 2.497,90</p>
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
                            <p>Total: 156 pessoas</p>
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
            <Modal />
        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
        },
    };
}
