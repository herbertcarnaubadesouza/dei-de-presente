import GiftsListFromSavedWebsite from "@/components/Web/Wedding/GiftsFromSavedWebsite";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

//testa

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
  horaEvento: string;
  fotosEventoText: string;
  dataEvento: string;
  nextHandlerIndex: number;
  numeroRua: string;
  nomeEvento: string;
  complemento: string;
  event: string;
  sobreEvento: string;
  slug: string;
  fotoMosaico1Url: string;
  fotoLocalUrl: string;
  fotoEventoUrl: string;
  bannerUrl: string;
  fotoMosaico6Url: string;
  fotoMosaico5Url: string;
  fotoMosaico3Url: string;
  fotoMosaico4Url: string;
  fotoMosaico2Url: string;
  fotoMosaico7Url: string;
  fotoMosaico8Url: string;
  fotoMosaico9Url: string;
  fotoMosaico10Url: string;
  fotoMosaico11Url: string;
  fotoMosaico12Url: string;
  gifts: Gift[];
}

export default function WeddingForEdit({
  nomeEvento,
  mensagemCurta,
  dataEvento,
  sobreEvento,
  horaEvento,
  nomeRua,
  complemento,
  numeroRua,
  cep,
  bannerUrl,
  fotoEventoUrl,
  fotoMosaico1Url,
  fotoMosaico2Url,
  fotoMosaico3Url,
  fotoMosaico4Url,
  fotoMosaico5Url,
  fotoMosaico6Url,
  fotosEventoText,
  fotoLocalUrl,
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
  const [acompanhantes, setAcompanhantes] = useState(0);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const decrementar = () => {
    if (acompanhantes > 0) {
      setAcompanhantes(acompanhantes - 1);
    }
  };

  const incrementar = () => {
    setAcompanhantes(acompanhantes + 1);
  };

  useEffect(() => {
    let targetDate: any;

    if (dataEvento) {
      targetDate = new Date(`${dataEvento}T00:00:00`).getTime();
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
  }, [dataEvento]);

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
          style={
            bannerUrl
              ? { backgroundImage: `url(${bannerUrl})` }
              : { backgroundImage: `url(/casamentoBanner.png)` }
          }
        >
          <div className={styles.overlay}>
            <div className={styles.headerWebsite}>
              <img src="/logoPresente.svg" />
              <ul className={styles.menu}>
                <li onClick={() => smoothScroll("historia")}>sobre nós</li>
                <li onClick={() => smoothScroll("fotosevento")}>fotos</li>
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
                <h1>{nomeEvento || "Laura & Leonardo"}</h1>
              </div>
              <div className={styles.descriptionEvent}>
                <p>
                  {mensagemCurta ||
                    "Lorem ipsum dolor sit amet consectetur. Amet ullamcorper quam maecenas ac placerat porttitor porttitor mi. Ipsum volutpat proin quisque urna tortor et. Praesent porttitor aliquam a tristique tortor et eget. Potenti eu maecenas diam aenean nec. Lorem ipsum dolor sit amet consectetur."}
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
              <h3>{nomeEvento || "Laura & Leonardo"}</h3>
              <p>
                {sobreEvento ||
                  "Lorem ipsum dolor sit amet consectetur. Amet ullamcorper quam maecenas ac placerat porttitor porttitor mi. Ipsum volutpat proin quisque urna tortor et. Praesent porttitor aliquam a tristique tortor et eget."}
              </p>
              <button>confirmar presença</button>
            </div>
            <div className={styles.rightSideHistoryContent}>
              <div className={styles.firstMoldura}>
                <img
                  src={fotoEventoUrl ? fotoEventoUrl : "/defaultMarried.png"}
                />
              </div>
              <div className={`${styles.firstMoldura} ${styles.secondMoldura}`}>
                <img
                  src={fotoEventoUrl ? fotoEventoUrl : "/defaultMarried.png"}
                />
              </div>
              <div className={`${styles.firstMoldura} ${styles.thirdMoldura}`}>
                <img
                  src={fotoEventoUrl ? fotoEventoUrl : "/defaultMarried.png"}
                />
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
                <p>
                  {fotosEventoText ||
                    "Lorem ipsum dolor sit amet consectetur. Amet ullamcorper quam maecenas ac placerat porttitor porttitor mi. Ipsum volutpat proin quisque urna tortor et. Praesent porttitor aliquam a tristique tortor et eget."}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.mosaico} id="fotosevento">
          <div className={styles.firstMosaico}>
            <img
              src={fotoMosaico1Url ? fotoMosaico1Url : "/mosaicoImage2.png"}
            />
          </div>
          <div className={styles.secondMosaico}>
            <img
              src={fotoMosaico2Url ? fotoMosaico2Url : "/mosaicoImage3.png"}
            />
            <img
              src={fotoMosaico3Url ? fotoMosaico3Url : "/mosaicoImage4.png"}
            />
          </div>
          <div className={styles.thirdMosaico}>
            <img
              src={fotoMosaico4Url ? fotoMosaico4Url : "/mosaicoImage1.png"}
            />
            <img
              src={fotoMosaico5Url ? fotoMosaico5Url : "/mosaicoImage4.png"}
            />
          </div>
          <div className={styles.lastMosaico}>
            <img
              src={fotoMosaico6Url ? fotoMosaico6Url : "/mosaicoImage3.png"}
            />
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
                    {dataEvento ? formatDate(dataEvento) : "24/10/2023"} às{" "}
                    {horaEvento || "16:00h"}
                  </span>
                </div>
              </div>
              <div className={styles.mapsFooterBlock}>
                <img src="/location.svg" />
                <div className={styles.dataHora}>
                  <p>Endereço</p>
                  <span>
                    {nomeRua || complemento || numeroRua
                      ? `${nomeRua}, ${complemento} ${numeroRua}, ${cep}`
                      : "Rua das laranjeiras, Lote 1420/1520 chácara Recanto dos sabiás, Brasília - DF"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className={styles.formSectionCasamento}
          id="confirmacao"
          style={
            fotoLocalUrl
              ? { backgroundImage: `url(${fotoLocalUrl})` }
              : {
                  backgroundImage: `url(/casamentoBackground.png)`,
                }
          }
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
        <GiftsListFromSavedWebsite gifts={gifts} />
        <section className={styles.footerEvento}>
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
