import { useEffect, useState } from "react";
import styles from "../../styles/Customize.module.scss";

export default function Customize() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const targetDate = new Date("December 31, 2023 00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
      setHours(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <section className={styles.banner}>
            <div className={styles.overlay}>
              <div className={styles.headerWebsite}>
                <img src="/logoPresente.svg" />
                <ul className={styles.menu}>
                  <li>sobre nós</li>
                  <li>fotos</li>
                  <li>presentes</li>
                  <button>confirmar presença</button>
                </ul>
              </div>
              <div className={styles.middleContent}>
                <div className={styles.divisorBlock}>
                  <hr />
                  <p>salvem a data</p>
                  <hr />
                </div>
                <div className={styles.titleBlock}>
                  <h1>Laura & Leonardo</h1>
                </div>
                <div className={styles.descriptionEvent}>
                  <p>
                    Noivos, convidados e amigos, sejam todos bem-vindos a um
                    lugar onde sonhos se tornam realidade. Nossa plataforma de
                    presentes de casamento é o seu guia para uma jornada
                    inesquecível rumo ao altar.
                  </p>
                </div>
              </div>
              <div className={styles.counterBlock}>
                <div className={styles.counter}>
                  <div className={styles.timeBlock}>
                    <p>{days} </p>
                    <span>Dias </span>
                  </div>
                  <p className={styles.miniDivisor}>:</p>
                  <div className={styles.timeBlock}>
                    <p>{hours} </p>
                    <span> Horas </span>
                  </div>
                  <p className={styles.miniDivisor}>:</p>
                  <div className={styles.timeBlock}>
                    <p>{minutes} </p>
                    <span> Minutos </span>
                  </div>
                  <p className={styles.miniDivisor}>:</p>
                  <div className={styles.timeBlock}>
                    <p>{seconds} </p>
                    <span>Segundos </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.history}>
            <div className={styles.historyTitle}>
              <div className={styles.hrBlockHistory}>
                <hr />
                <p>nossa história</p>
                <hr />
              </div>
              <h2>era uma vez...</h2>
            </div>
            <div className={styles.historyContent}>
              <div className={styles.leftSideHistoryContent}>
                <h3>laura & leonardo</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Amet ullamcorper quam
                  maecenas ac placerat porttitor porttitor mi. Ipsum volutpat
                  proin quisque urna tortor et. Praesent porttitor aliquam a
                  tristique tortor et eget. Potenti eu maecenas diam aenean nec.
                  Lorem ipsum dolor sit amet consectetur. Amet ullamcorper quam
                  maecenas ac placerat porttitor porttitor mi. Ipsum volutpat
                  proin quisque urna tortor et. Praesent porttitor aliquam a
                  tristique tortor et eget. Potenti eu maecenas diam aenean nec.
                </p>
                <button>confirmar presença</button>
              </div>
              <div className={styles.rightSideHistoryContent}>
                <div className={styles.firstMoldura}>
                  <img src="/defaultMarried.png" />
                </div>
                <div
                  className={`${styles.firstMoldura} ${styles.secondMoldura}`}
                >
                  <img src="/defaultMarried.png" />
                </div>
                <div
                  className={`${styles.firstMoldura} ${styles.thirdMoldura}`}
                >
                  <img src="/defaultMarried.png" />
                </div>
              </div>
            </div>
          </section>

          <section className={styles.sectionFotos}>
            <div className={styles.titleSectionFotos}>
              <div className={styles.sectionFotosDivisor}>
                <p>fotos do casal</p>
                <hr />
              </div>
              <div className={styles.titleSectionFotos}>
                <h2>Um pouco do nosso amor em fotos</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Amet ullamcorper quam
                  maecenas ac placerat porttitor porttitor mi. Ipsum volutpat
                  proin quisque urna tortor et. Praesent porttitor aliquam a
                  tristique tortor et eget. Potenti eu maecenas diam aenean nec.
                </p>
              </div>
            </div>
          </section>
          <section className={styles.mosaico}>
            <div className={styles.firstMosaico}>
              <img src="/mosaicoImage2.png" />
            </div>
            <div className={styles.secondMosaico}>
              <img src="/mosaicoImage3.png" />
              <img src="/mosaicoImage4.png" />
            </div>
            <div className={styles.thirdMosaico}>
              <img src="/mosaicoImage1.png" />
              <img src="/mosaicoImage4.png" />
            </div>
            <div className={styles.lastMosaico}>
              <img src="/mosaicoImage3.png" />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
