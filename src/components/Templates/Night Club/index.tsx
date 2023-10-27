import Link from "next/link";
import router from "next/router";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

const gifts = Array(20).fill({
  title: "forma de bolo",
  price: "R$ 68,90",
  img: "/defaultMarried.png",
});

export default function NightClub() {
  const [currentPage, setCurrentPage] = useState(1);
  const giftsPerPage = 12;

  const totalPages = Math.ceil(gifts.length / giftsPerPage);
  const indexOfLastGift = currentPage * giftsPerPage;
  const indexOfFirstGift = indexOfLastGift - giftsPerPage;
  const [mapUrl, setMapUrl] = useState("");
  const currentGifts = gifts.slice(indexOfFirstGift, indexOfLastGift);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const targetDate = new Date("2023-12-31T23:59:59").getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        // Quando a data alvo for alcançada, limpe o intervalo
        clearInterval(interval);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <main className={styles.nightClubContent}>
        <section className={styles.banner} id="home">
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
            <span>prepare-se para a experiência</span>
            <h1>A melhor festa de todas</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur. Amet ullamcorper quam
              maecenas ac placerat porttitor porttitor mi. Ipsum volutpat proin
              quisque urna tortor et. Praesent porttitor aliquam a tristique
              tortor et eget. Potenti eu maecenas diam aenean nec.{" "}
            </p>
            <button>confirmar presença</button>
          </div>
        </section>
        <section className={styles.sobre} id="date">
          <div className={styles.hourCounterWrap}>
            <h2>contado os minutos para o grande dia</h2>

            <div className={styles.rowDateBlock}>
              <div className={styles.cardHour}>
                <span>{timeLeft.days}</span>
                <p>dias</p>
              </div>
              <div className={styles.cardHour}>
                <span>{timeLeft.hours}</span>
                <p>horas</p>
              </div>
              <div className={styles.cardHour}>
                <span>{timeLeft.minutes}</span>
                <p>minutos</p>
              </div>
              <div className={styles.cardHour}>
                <span>{timeLeft.seconds}</span>
                <p>segundos</p>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.bannerAlcool} id="sobre">
          <div className={styles.textContent}>
            <span>sobre</span>
            <h2>Sobre a grande festa da vez</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur. Amet ullamcorper quam
              maecenas ac placerat porttitor porttitor mi. Ipsum volutpat proin
              quisque urna tortor et. Praesent porttitor aliquam a tristique
              tortor et eget. Potenti eu maecenas diam aenean nec.{" "}
            </p>
            <button>confirmar presença</button>
          </div>
        </section>
        <section className={styles.local} id="local">
          <div className={styles.localContent}>
            <span>local</span>
            <h2>Um lugar pra ficar na memória</h2>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14412.243674757572!2d-49.2850157!3d-25.4362268!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce38abdce30c1%3A0x8f70fe44b648dabf!2s%2B55%20Bar!5e0!3m2!1spt-BR!2sbr!4v1698233868404!5m2!1spt-BR!2sbr"
              width="600"
              height="450"
              loading="lazy"
            ></iframe>
            <div className={styles.mapsFooter}>
              <div className={styles.mapsFooterBlock}>
                <img src="/calendarBranco.svg" />
                <div className={styles.dataHora}>
                  <p>Data e horário</p>
                  <span>24/10/2023 às 16:00h</span>
                </div>
              </div>
              <div className={styles.mapsFooterBlock}>
                <img src="/mapBranco.svg" />
                <div className={styles.dataHora}>
                  <p>Endereço</p>
                  <span>
                    Rua das laranjeiras, Lote 1420/1520 chácara Recanto dos
                    sabiás, Brasília - DF
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.mosaico} id="mosaico">
          <div className={styles.mosaicoContent}>
            <span>fotos</span>
            <h2>Uma lembrança das últimas vezes</h2>
          </div>
          <div className={styles.mosaicoGrid}>
            <div className={styles.row1}>
              <img className={styles.photo1} src="/night-club-1.webp" />
              <img className={styles.photo2} src="/night-club-2.webp" />
              <img className={styles.photo3} src="/night-club-3.webp" />
              <img className={styles.photo4} src="/night-club-4.webp" />
              <img className={styles.photo5} src="/night-club-5.webp" />
              <img className={styles.photo6} src="/night-club-6.webp" />
            </div>
            <div className={styles.row1}>
              <img className={styles.photo7} src="/night-club-7.webp" />
              <img className={styles.photo8} src="/night-club-8.webp" />
              <img className={styles.photo9} src="/night-club-9.webp" />
              <img className={styles.photo10} src="/night-club-10.webp" />
              <img className={styles.photo11} src="/night-club-11.webp" />
              <img className={styles.photo12} src="/night-club-12.webp" />
            </div>
          </div>
        </section>
        <section className={styles.formSectionCasamento} id="confirmar">
          <div className={styles.formContainer}>
            <div className={styles.formDivisorBlock}>
              <p>Confirmação de presença</p>
            </div>
            <div className={styles.titleFormSection}>
              <h2>Vem comemorar conosco?</h2>
            </div>
            <form className={styles.form}>
              <div className={styles.formInputBlock}>
                <label>Nome completo</label>
                <input placeholder="Escreva aqui seu nome..." type="text" />
              </div>
              <div className={styles.formInputBlock}>
                <label>Você irá ao casamento?</label>
                <select>
                  <option value="" disabled selected>
                    Selecione uma opção...
                  </option>
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                </select>
              </div>
              <div className={styles.acompanhantesInputBlock}>
                <label>Quantos acompanhantes:</label>
                <div className={styles.decrement}>
                  <button type="button" /*onClick={decrementar}*/>-</button>
                  <input type="number" value="2" readOnly />
                  <button type="button" /* onClick={incrementar} */>+</button>
                </div>
              </div>
              <button className={styles.submitButton} type="submit">
                Enviar
              </button>
            </form>
          </div>
        </section>
        <section className={styles.giftsSection}>
          <div className={styles.divisorGiftsSection}>
            <p>presentes</p>
          </div>
          <div className={styles.titleGiftsSection}>
            <h2>Vai salvar o que dessa vez?</h2>
          </div>
          <div className={styles.gifts}>
            <div className={styles.giftsListContainer}>
              {gifts.map((gift, index) => (
                <div key={index} className={styles.tableGift}>
                  <div className={styles.card}>
                    <img className={styles.logo} src={gift.img} alt="logo" />
                    <p>{gift.title}</p>
                    <span>
                      {parseFloat(
                        (gift.price / 0.925).toString()
                      ).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                    <button onClick={() => router.push(`/checkout/${gift.id}`)}>
                      comprar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.pagination}>
              {currentPage > 1 && (
                <img
                  /*onClick={prevPage}*/
                  className={styles.logo}
                  src="/leftArrowCasamento.svg"
                  alt="logo"
                />
              )}
              {[...Array(totalPages).keys()].map((page) => (
                <span
                  key={page + 1}
                  /*onClick={() => goToPage(page + 1)}*/
                  className={currentPage === page + 1 ? styles.active : ""}
                >
                  {page + 1}
                </span>
              ))}

              {indexOfLastGift < gifts.length && (
                <img
                  className={styles.logo}
                  src="/rightArrowCasamento.svg"
                  alt="logo"
                />
              )}
            </div>
          </div>
        </section>
        <section className={styles.footerCasamento}>
          <div className={styles.divisorFooter}>
            <hr />
          </div>
          <div className={styles.footerBlock}>
            <div className={styles.leftSideFooter}>
              <p>© 2023 Deidepresente. </p>
              <p>Todos os direitos reservados</p>
            </div>
            <div className={styles.middleSideFooter}>
              <img src="/logoAmarela.webp" />
            </div>
            <div className={styles.rightSideFooter}>
              <Link href="">Termos de serviço </Link>
              <Link href="">Política de privacidade</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
