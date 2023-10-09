import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

const gifts = Array(50).fill({
  title: "forma de bolo",
  price: "R$ 68,90",
});

export default function MarriedTemplate() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [acompanhantes, setAcompanhantes] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const giftsPerPage = 12;

  const totalPages = Math.ceil(gifts.length / giftsPerPage);

  const indexOfLastGift = currentPage * giftsPerPage;
  const indexOfFirstGift = indexOfLastGift - giftsPerPage;
  const currentGifts = gifts.slice(indexOfFirstGift, indexOfLastGift);

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  const goToPage = (page: any) => setCurrentPage(page);

  const decrementar = () => {
    if (acompanhantes > 0) {
      setAcompanhantes(acompanhantes - 1);
    }
  };

  const incrementar = () => {
    setAcompanhantes(acompanhantes + 1);
  };

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

  const [mapUrl, setMapUrl] = useState("");
  const [address, setAddress] = useState("Avenida Iguaçu 3001");

  useEffect(() => {
    const encodedAddress = encodeURIComponent(address);
    const newUrl = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
    setMapUrl(newUrl);
  }, [address]);

  return (
    <>
      <div className={styles.templateContainer}>
        <section className={styles.banner} id="home">
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
                  Noivos, convidados e amigos, sejam todos bem-vindos a um lugar
                  onde sonhos se tornam realidade. Nossa plataforma de presentes
                  de casamento é o seu guia para uma jornada inesquecível rumo
                  ao altar.
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

        <section className={styles.history} id="historia">
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
              <div className={`${styles.firstMoldura} ${styles.secondMoldura}`}>
                <img src="/defaultMarried.png" />
              </div>
              <div className={`${styles.firstMoldura} ${styles.thirdMoldura}`}>
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
        <section className={styles.mosaico} id="fotoscasal">
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
        <section className={styles.mapsSection} id="localdocasamento">
          <div className={styles.mapsSectionContent}>
            <div className={styles.sectionFotosDivisor}>
              <p>local do casamento</p>
              <hr />
            </div>
            <div className={styles.titleMaps}>
              <h2>como chegar no nosso dia especial</h2>
            </div>
            <div className={styles.map}>
              <iframe src={mapUrl} loading="lazy"></iframe>
            </div>
            <div className={styles.mapsFooter}>
              <div className={styles.mapsFooterBlock}>
                <img src="/CalendarBlank.svg" />
                <div className={styles.dataHora}>
                  <p>data e horário</p>
                  <span>24/10/2023 às 16:00h</span>
                </div>
              </div>
              <div className={styles.mapsFooterBlock}>
                <img src="/location.svg" />
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

        <section className={styles.formSectionCasamento}>
          <div className={styles.formContainer}>
            <div className={styles.formDivisorBlock}>
              <hr />
              <p>Confirmação de presença</p>
              <hr />
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
                  <button type="button" onClick={decrementar}>
                    -
                  </button>
                  <input type="number" value={acompanhantes} readOnly />
                  <button type="button" onClick={incrementar}>
                    +
                  </button>
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
            <hr />
            <p>lista de presentes</p>
            <hr />
          </div>
          <div className={styles.titleGiftsSection}>
            <h2>hora de surpreender os noivos</h2>
          </div>
          <div className={styles.gifts}>
            <div className={styles.giftsListContainer}>
              {currentGifts.map((gift, index) => (
                <div key={index} className={styles.tableGift}>
                  <div className={styles.card}>
                    <img
                      className={styles.logo}
                      src="/Rectangle.png"
                      alt="logo"
                    />
                    <p>{gift.title}</p>
                    <span>{gift.price}</span>
                    <button>comprar</button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.pagination}>
              {currentPage > 1 && (
                <img
                  onClick={prevPage}
                  className={styles.logo}
                  src="/leftArrowCasamento.svg"
                  alt="logo"
                />
              )}
              {[...Array(totalPages).keys()].map((page) => (
                <span
                  key={page + 1}
                  onClick={() => goToPage(page + 1)}
                  className={currentPage === page + 1 ? styles.active : ""}
                >
                  {page + 1}
                </span>
              ))}

              {indexOfLastGift < gifts.length && (
                <img
                  onClick={nextPage}
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
              <img src="/orangeLogo.svg" />
            </div>
            <div className={styles.rightSideFooter}>
              <Link href="">Termos de serviço </Link>
              <Link href="">Política de privacidade</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
