import styles from "./styles.module.scss";

const Sidebar = ({ showSidebar, setShowSidebar }: any) => {
  return (
    <div className={`${styles.sidebar} ${showSidebar ? styles.show : ""}`}>
      <div className={styles.contentSidebar}>
        <div className={styles.firstBlockSideBar}>
          <img src="/giftImage.png" alt="Gift"></img>
          <span>Enviar foto</span>
        </div>
        <div className={styles.title}>
          <p>Adicionar presente</p>
        </div>
        <div className={styles.secondBlockSideBar}>
          <div className={styles.inputblock}>
            <span>Nome do presente</span>
            <input placeholder="Forma de bolo" type="text" />
          </div>
          <div className={styles.inputblock}>
            <span>Valor</span>
            <input placeholder="Digite um valor" type="number" />
          </div>
        </div>
        <div className={styles.buttonsBlockSideBar}>
          <button className={styles.addButton}>ADICIONAR</button>
          <button
            className={styles.cancel}
            onClick={() => setShowSidebar(false)}
          >
            CANCELAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
