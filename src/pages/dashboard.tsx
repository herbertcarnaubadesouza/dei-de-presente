import GiftsList from "@/components/Admin/GiftsList";
import Header from "@/components/Admin/Header";
import styles from "../styles/Dashboard.module.scss";

// Definir um array de presentes
const gifts = Array(50).fill({
  title: "forma de bolo",
  price: "R$ 68,90",
});

export default function Dashboard() {
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
                <span>Presentes recebidos</span>
              </div>
              <p>1.235</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.presentesRecebidosText}>
        <p>Presentes recebidos</p>
        <button>Adicionar presente</button>
      </div>
      <GiftsList />
    </>
  );
}
