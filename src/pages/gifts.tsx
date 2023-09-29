import GiftsList from "@/components/Admin/GiftsList";
import Header from "@/components/Admin/Header";
import styles from "../styles/Dashboard.module.scss";

export default function Gifts() {
  return (
    <>
      <div className={styles.container}>
        <Header />

        <div className={styles.presentesRecebidos}>
          <div className={styles.textSection}>
            <p>Presentes</p>
            <span>
              Abaixo você vai encontrar os presentes cadastrados e a opção de
              alterar ou incluir.
            </span>
          </div>
        </div>
      </div>
      <GiftsList />
    </>
  );
}
