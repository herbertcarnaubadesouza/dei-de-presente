import Link from "next/link";
import router from "next/router";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

export interface Gift {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  userId: string;
}

export interface WeddingInterface {
  nomeRua: string;
  cep: string;
  mensagemCurta: string;
  horaCasamento: string;
  fotosCasalText: string;
  dataCasamento: string;
  nextHandlerIndex: number;
  numeroRua: string;
  nomeCasal: string;
  complemento: string;
  event: string;
  sobreCasal: string;
  slug: string;
  fotoMosaico1Url: string;
  fotoLocalUrl: string;
  fotoCasalUrl: string;
  bannerUrl: string;
  fotoMosaico6Url: string;
  fotoMosaico5Url: string;
  fotoMosaico3Url: string;
  fotoMosaico4Url: string;
  fotoMosaico2Url: string;
  gifts: Gift[];
}

export default function WeddingWebsite({
  nomeRua,
  mensagemCurta,
  horaCasamento,
  fotosCasalText,
  dataCasamento,
  nextHandlerIndex,
  numeroRua,
  nomeCasal,
  complemento,
  event,
  sobreCasal,
  slug,
  fotoMosaico1Url,
  fotoLocalUrl,
  fotoCasalUrl,
  bannerUrl,
  fotoMosaico6Url,
  fotoMosaico5Url,
  fotoMosaico3Url,
  fotoMosaico4Url,
  fotoMosaico2Url,
  cep,
  gifts,
}: WeddingInterface) {
  const [currentPage, setCurrentPage] = useState(1);
  const giftsPerPage = 12;

  const totalPages = Math.ceil(gifts.length / giftsPerPage);
  const indexOfLastGift = currentPage * giftsPerPage;
  const indexOfFirstGift = indexOfLastGift - giftsPerPage;
  const [mapUrl, setMapUrl] = useState("");
  const currentGifts = gifts.slice(indexOfFirstGift, indexOfLastGift);

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    let targetDate: any;

    if (dataCasamento) {
      targetDate = new Date(`${dataCasamento}T00:00:00`).getTime();
    } else {
      targetDate = new Date("December 31, 2023 00:00:00").getTime();
    }

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
  }, [dataCasamento]);

  const smoothScroll = (targetId: any) => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const encodedAddress = encodeURIComponent(
      `${nomeRua}, ${numeroRua}, ${cep}`
    );
    const newUrl = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
    setMapUrl(newUrl);
  }, [nomeRua, numeroRua, cep]);

  return (
    <>
      <div className={styles.templateContainer}>
        <section
          className={styles.banner}
          id="home"
          style={{ backgroundImage: `url(${bannerUrl})` }}
        >
          <div className={styles.overlay}>
            <div className={styles.headerWebsite}>
              <img src="/logoPresente.svg" />
              <ul className={styles.menu}>
                <li onClick={() => smoothScroll("historia")}>sobre nós</li>
                <li onClick={() => smoothScroll("fotoscasal")}>fotos</li>
                <li onClick={() => smoothScroll("localdocasamento")}>
                  local do casamento
                </li>
                <button onClick={() => smoothScroll("confirmacao")}>
                  confirmar presença
                </button>
              </ul>
            </div>
            <div className={styles.middleContent}>
              <div className={styles.divisorBlock}>
                <hr />
                <p>salvem a data</p>
                <hr />
              </div>
              <div className={styles.titleBlock}>
                <h1>{nomeCasal}</h1>
              </div>
              <div className={styles.descriptionEvent}>
                <p>{mensagemCurta}</p>
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
              <h3>{nomeCasal}</h3>
              <p>{sobreCasal}</p>
              <button>confirmar presença</button>
            </div>
            <div className={styles.rightSideHistoryContent}>
              <div className={styles.firstMoldura}>
                <img src={fotoCasalUrl} />
              </div>
              <div className={`${styles.firstMoldura} ${styles.secondMoldura}`}>
                <img src={fotoCasalUrl} />
              </div>
              <div className={`${styles.firstMoldura} ${styles.thirdMoldura}`}>
                <img src={fotoCasalUrl} />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.sectionFotos}>
          <div className={styles.sectionFotosContent}>
            <div className={styles.titleSectionFotos}>
              <div className={styles.sectionFotosDivisor}>
                <p>fotos do casal</p>
                <hr />
              </div>
              <div className={styles.titleSectionFotos}>
                <h2>Um pouco do nosso amor em fotos</h2>
                <p>{fotosCasalText}</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.mosaico} id="fotoscasal">
          <div className={styles.firstMosaico}>
            <img src={fotoMosaico1Url} />
          </div>
          <div className={styles.secondMosaico}>
            <img src={fotoMosaico2Url} />
            <img src={fotoMosaico3Url} />
          </div>
          <div className={styles.thirdMosaico}>
            <img src={fotoMosaico4Url} />
            <img src={fotoMosaico5Url} />
          </div>
          <div className={styles.lastMosaico}>
            <img src={fotoMosaico6Url} />
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
                  <span>
                    {formatDate(dataCasamento)} às {horaCasamento}
                  </span>
                </div>
              </div>
              <div className={styles.mapsFooterBlock}>
                <img src="/location.svg" />
                <div className={styles.dataHora}>
                  <p>Endereço</p>
                  <span>
                    {`${nomeRua}, ${complemento} ${numeroRua}, ${cep}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className={styles.formSectionCasamento}
          id="confirmacao"
          style={{ backgroundImage: `url(${fotoLocalUrl})` }}
        >
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
                  <button type="button" /*onClick={decrementar}*/>-</button>
                  <input type="number" /*value={acompanhantes}*/ readOnly />
                  <button type="button" /*onClick={incrementar}*/>+</button>
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
                      src={gift.imageUrl}
                      alt="logo"
                    />
                    <p>{gift.name}</p>
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
