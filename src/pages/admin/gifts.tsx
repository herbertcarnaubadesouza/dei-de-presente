import GiftsList from "@/components/Admin/GiftsList";
import Header from "@/components/Admin/Header";
import Sidebar from "@/components/Admin/Sidebar";
import { useState } from "react";
import styles from "../../styles/Dashboard.module.scss";

export default function Gifts() {
  const [showSidebar, setShowSidebar] = useState(false);

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
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <div
          className={`${styles.overlay} ${
            showSidebar ? styles.showOverlay : ""
          }`}
          onClick={() => setShowSidebar(false)}
        ></div>
      </div>
      <GiftsList />
    </>
  );
}
