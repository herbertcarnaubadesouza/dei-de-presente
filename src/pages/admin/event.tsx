import StepsHeader from "@/components/Admin/StepsHeader";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Event.module.scss";

export default function Event() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const router = useRouter();

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleChoose = () => {
    if (activeIndex === null) {
      alert("Antes de prosseguir, selecione um tema para seu site!");
    } else {
      router.push("/admin/customize");
    }
  };

  return (
    <>
      <StepsHeader />
      <div className={styles.progressBarPresentes}>
        <div className={styles.secondStep}>
          <div className={styles.card}>
            <span>
              <img src="/Check.svg"></img>
            </span>
          </div>
          <p>Criar conta</p>
        </div>
        <div className={styles.firstStep}>
          <div className={styles.card}>
            <span>2</span>
          </div>
          <p>Escolher tema</p>
        </div>
        <div className={styles.secondStep}>
          <div className={styles.cardDesactive}>
            <span>3</span>
          </div>
          <p>Personalizar</p>
        </div>
        <div className={styles.secondStep}>
          <div className={styles.cardDesactive}>
            <span>4</span>
          </div>
          <p>Publicar</p>
        </div>
      </div>
      <div className={styles.titleSection}>
        <div className={styles.leftSide}>
          <p>Qual será o tema?</p>
          <span>Escolha abaixo um tema para começar</span>
        </div>
        <button onClick={handleChoose}>Escolher</button>
      </div>
      <div className={styles.optionsWebsites}>
        <p>Ocasiões</p>
        <div className={styles.options}>
          {["login1.png", "login2.png", "login3.png"].map((src, index) => (
            <div
              key={src}
              className={`${styles.optionsImage} ${
                activeIndex === index ? styles.active : ""
              }`}
              onClick={() => handleClick(index)}
            >
              <img src={`/${src}`} />
              <p>{["Casamento", "Aniversário", "Festa"][index]}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.footer}>
        <p>© DEI DE PRESENTE 2023, todos os direitos reservados</p>
      </div>
    </>
  );
}