import GiftsList from "@/components/Admin/GiftsList";
import Header from "@/components/Admin/Header";
import Sidebar from "@/components/Admin/Sidebar";
import { useState } from "react";
import styles from "../styles/Dashboard.module.scss";

export default function Dashboard() {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <>
      <div className={styles.container}>
        <Header />
        <div className={styles.presentesRecebidos}>
          <div className={styles.textSection}>
            <p>Olá, Leonardo!</p>
            <span>
              Abaixo você vai encontrar algumas estatísticas e opções de
              personalização do seu site
            </span>
          </div>
          <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
          <div
            className={`${styles.overlay} ${
              showSidebar ? styles.showOverlay : ""
            }`}
            onClick={() => setShowSidebar(false)}
          ></div>
          <div className={styles.secondSectionPresentesRecebidos}>
            <div className={styles.containerPresentes}>
              <div className={styles.firstPresentes}>
                <div className={styles.containerLogo}>
                  <img className={styles.logo} src="/Gift.svg" alt="logo" />
                </div>
                <span>Presentes recebidos</span>
              </div>
              <p>R$ 2.497,90</p>
            </div>
            <div className={styles.containerPresentes}>
              <div className={styles.firstPresentes}>
                <div className={styles.containerLogo}>
                  <img className={styles.logo} src="/Users.svg" alt="logo" />
                </div>
                <span>Pessoas confirmadas</span>
              </div>
              <p>156</p>
            </div>
            <div className={styles.containerPresentes}>
              <div className={styles.firstPresentes}>
                <div className={styles.containerLogo}>
                  <img className={styles.logo} src="/Eye.svg" alt="logo" />
                </div>
                <span>Visitas</span>
              </div>
              <p>1.235</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.presentesRecebidosText}>
        <p>Presentes recebidos</p>
        <button onClick={() => setShowSidebar(true)}>Adicionar presente</button>
      </div>
      <GiftsList />
    </>
  );
}
