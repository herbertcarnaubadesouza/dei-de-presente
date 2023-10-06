import MarriedTemplate from "@/components/Templates/Married";
import { useState } from "react";
import styles from "../../styles/Customize.module.scss";

export default function Customize() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <MarriedTemplate />
        </div>
        <div className={styles.rightSide}>
          <div className={`${styles.accordion} ${isOpen ? styles.open : ""}`}>
            <button
              className={styles["accordion-button"]}
              onClick={() => setIsOpen(!isOpen)}
            >
              Seção 1
            </button>
            {isOpen && (
              <div className={styles["accordion-content"]}>
                Conteúdo da Seção 1
              </div>
            )}
          </div>
          {/* Mais acordeões */}
        </div>
      </div>
    </>
  );
}
