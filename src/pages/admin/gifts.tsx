import GiftsList from "@/components/Admin/GiftsList";
import Header from "@/components/Admin/Header";
import Sidebar from "@/components/Admin/Sidebar";
import SidebarEdit from "@/components/Admin/SidebarEdit";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "../../styles/Dashboard.module.scss";

interface Gift {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
}
export default function Gifts() {
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
      const res = await axios.get<Gift[]>("/api/gifts/getGifts", {
        params: { userId },
      });
      setGifts(res.data);
    };

    fetchGifts();
  }, [giftCounter]);

  return (
    <>
      <div className={styles.container}>
        <Header />

        <div className={styles.presentesRecebidosGifts}>
          <div className={styles.textSection}>
            <p>Presentes</p>
            <span>
              Abaixo você vai encontrar os presentes cadastrados e a opção de
              alterar ou incluir.
            </span>
          </div>
          <button onClick={() => setShowSidebar(true)}>
            Adicionar presente
          </button>
        </div>
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
        />

        <div
          className={`${styles.overlay} ${
            showSidebar || showSidebarEdit ? styles.showOverlay : ""
          }`}
          onClick={() => {
            setShowSidebar(false);
            setShowSidebarEdit(false);
          }}
        ></div>
      </div>
      <GiftsList
        gifts={gifts}
        setShowSidebarEdit={setShowSidebarEdit}
        onEditGift={handleEditGift}
      />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
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
