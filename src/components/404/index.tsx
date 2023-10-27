import router from "next/router";
import styles from "./styles.module.scss";

export default function NotFound() {
  const handleButtonClick = () => {
    router.push("/");
  };
  return (
    <div className={styles.container}>
      <div className={styles.triangle}></div>
      <div className={styles.containerContent}>
        <div className={styles.leftSide}>
          <h1>Ops , algo deu errado!</h1>
          <button onClick={handleButtonClick}>Voltar para Home</button>
        </div>
        <div className={styles.rightSide}>
          <img src="/404.svg" />
        </div>
      </div>
    </div>
  );
}
