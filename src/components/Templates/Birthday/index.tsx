import Link from "next/link";
import { useEffect, useState } from "react";
import GiftsList from "./GiftsList";
import styles from "./styles.module.scss";

interface BirthdayInterface {
  nomeEvento: string;
  mensagemCurta: string;
  dataEvento: string;
  sobreEvento: string;
  fotosEventoText: string;
  horaEvento: string;
  nomeRua: string;
  complemento: string;
  numeroRua: string;
  cep: string;
  bannerUrl: string | null;
  fotoEventoUrl: string | null;
  fotoMosaico1Url: string | null;
  fotoMosaico2Url: string | null;
  fotoMosaico3Url: string | null;
  fotoMosaico4Url: string | null;
  fotoMosaico5Url: string | null;
  fotoMosaico6Url: string | null;
  fotoLocalUrl: string | null;
  filledIndices: any[];
}

const gifts = Array(50).fill({
  title: "forma de bolo",
  price: "R$ 68,90",
});

export default function BirthdayTemplate({
  nomeEvento,
  mensagemCurta,
  dataEvento,
  sobreEvento,
  fotosEventoText,
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
  fotoLocalUrl,
  filledIndices,
}: BirthdayInterface) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [acompanhantes, setAcompanhantes] = useState(0);
  const [internalBannerUrl, setInternalBannerUrl] = useState<string | null>();

  const [internalFotoEventoUrl, setInternalFotoEventoUrl] = useState<
    string | null
  >();

  const [internalFotoLocalUrl, setInternalFotoLocalUrl] = useState<
    string | null
  >();

  const [internalMosaico1lUrl, setInternalMosaico1Url] = useState<
    string | null
  >();

  const [internalMosaico2lUrl, setInternalMosaico2Url] = useState<
    string | null
  >();

  const [internalMosaico3lUrl, setInternalMosaico3Url] = useState<
    string | null
  >();

  const [internalMosaico4lUrl, setInternalMosaico4Url] = useState<
    string | null
  >();

  const [internalMosaico5lUrl, setInternalMosaico5Url] = useState<
    string | null
  >();

  const [internalMosaico6lUrl, setInternalMosaico6Url] = useState<
    string | null
  >();
  const [mapUrl, setMapUrl] = useState("");

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (!bannerUrl) {
      const storedBannerUrl = localStorage.getItem("fotoBanner");
      if (storedBannerUrl) {
        setInternalBannerUrl(`${storedBannerUrl}`);
      }
    } else {
      setInternalBannerUrl(bannerUrl);
    }

    if (!fotoEventoUrl) {
      const storedEventoUrl = localStorage.getItem("fotoEvento");
      if (storedEventoUrl) {
        setInternalFotoEventoUrl(`${storedEventoUrl}`);
      }
    } else {
      setInternalFotoEventoUrl(fotoEventoUrl);
    }

    if (!fotoMosaico1Url) {
      const storedMosaico1Url = localStorage.getItem("fotosEvento1");
      if (storedMosaico1Url) {
        setInternalMosaico1Url(`${storedMosaico1Url}`);
      } else {
        setInternalMosaico1Url("");
      }
    } else {
      setInternalMosaico1Url(fotoMosaico1Url);
    }

    if (!fotoMosaico2Url) {
      const storedMosaico2Url = localStorage.getItem("fotosEvento2");
      if (storedMosaico2Url) {
        setInternalMosaico2Url(`${storedMosaico2Url}`);
      }
    } else {
      setInternalMosaico2Url(fotoMosaico2Url);
    }

    if (!fotoMosaico3Url) {
      const storedMosaico3Url = localStorage.getItem("fotosEvento3");
      if (storedMosaico3Url) {
        setInternalMosaico3Url(`${storedMosaico3Url}`);
      }
    } else {
      setInternalMosaico3Url(fotoMosaico3Url);
    }

    if (!fotoMosaico4Url) {
      const storedMosaico4Url = localStorage.getItem("fotosEvento4");
      if (storedMosaico4Url) {
        setInternalMosaico4Url(`${storedMosaico4Url}`);
      }
    } else {
      setInternalMosaico4Url(fotoMosaico4Url);
    }

    if (!fotoMosaico5Url) {
      const storedMosaico5Url = localStorage.getItem("fotosEvento5");
      if (storedMosaico5Url) {
        setInternalMosaico5Url(`${storedMosaico5Url}`);
      }
    } else {
      setInternalMosaico5Url(fotoMosaico5Url);
    }

    if (!fotoMosaico6Url) {
      const fotoMosaico6Url = localStorage.getItem("fotosEvento6");
      if (fotoMosaico6Url) {
        setInternalMosaico6Url(`${fotoMosaico6Url}`);
      }
    } else {
      setInternalMosaico6Url(fotoMosaico6Url);
    }

    if (!fotoLocalUrl) {
      const fotoLocalUrl = localStorage.getItem("fotoLocal");
      if (fotoLocalUrl) {
        setInternalFotoLocalUrl(`${fotoLocalUrl}`);
      }
    } else {
      setInternalFotoLocalUrl(fotoLocalUrl);
    }
  }, [
    bannerUrl,
    fotoEventoUrl,
    fotoMosaico1Url,
    fotoMosaico2Url,
    fotoMosaico3Url,
    fotoMosaico4Url,
    fotoMosaico5Url,
    fotoMosaico6Url,
    fotoLocalUrl,
    filledIndices,
  ]);

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

  useEffect(() => {
    let fullAddress;

    if (nomeRua && numeroRua && cep) {
      fullAddress = `${nomeRua}, ${numeroRua}, ${cep}`;
    } else {
      fullAddress = "avenida paulista, cep 01310-930";
    }

    const encodedAddress = encodeURIComponent(fullAddress);
    const newUrl = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
    setMapUrl(newUrl);
  }, [nomeRua, numeroRua, cep]);

  return (
    <>
      <div className={styles.templateContainer}>
        <section className={styles.banner} id="home">
          <div className={styles.headerWebsite}>
            <img src="/blueDei.svg" />
            <ul className={styles.menu}>
              <li>sobre nós</li>
              <li>fotos</li>
              <li>presentes</li>
              <button>confirmar presença</button>
            </ul>
          </div>
          <div className={styles.middleContent}>
            <div className={styles.leftSide}>
              <h4>prepare-se para a experiência</h4>
              <h1>{nomeEvento || "A melhor festa de todas"}</h1>
              <p>
                {mensagemCurta ||
                  "Lorem ipsum dolor sit amet consectetur. Amet ullamcorper quam maecenas ac placerat porttitor porttitor mi. Ipsum volutpat proin quisque urna tortor et. Praesent porttitor aliquam a tristique tortor et eget. Potenti eu maecenas diam aenean nec. Lorem ipsum dolor sit amet consectetur."}
              </p>
              <button>confirmar presença</button>
            </div>
            <div className={styles.rightSide}>
              <img src="/giftTemplateImage3.png" />
            </div>
          </div>
          <div className={styles.timerblock}>
            <h2>falta pouco para o grande dia</h2>
            <div className={styles.blockTimeContainer}>
              <div className={styles.blockTime}>
                <p>{days}</p>
                <span>dias</span>
              </div>
              <div className={styles.blockTime}>
                <p>{hours}</p>
                <span>horas</span>
              </div>
              <div className={styles.blockTime}>
                <p>{minutes}</p>
                <span>minutos</span>
              </div>
              <div className={styles.blockTime}>
                <p>{seconds}</p>
                <span>segundos</span>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.sobre} id="sobre">
          <div className={styles.sobreContent}>
            <div className={styles.leftSideSobre}>
              <h4>sobre</h4>
              <h2>um pouco sobre a aniversariante</h2>
              <div className={styles.leftSideSobreMobile}>
                <img
                  src={
                    internalFotoEventoUrl
                      ? internalFotoEventoUrl
                      : "/defaultBirthdayTemplate.png"
                  }
                />
              </div>
              <p>
                {sobreEvento ||
                  "Lorem ipsum dolor sit amet consectetur. Amet ullamcorper quam maecenas ac placerat porttitor porttitor mi. Ipsum volutpat proin quisque urna tortor et. Praesent porttitor aliquam a tristique tortor et eget. Potenti eu maecenas diam aenean nec."}
              </p>
              <button>confirmar presença</button>
            </div>
            <div className={styles.rightSideSobre}>
              <img
                src={
                  internalFotoEventoUrl
                    ? internalFotoEventoUrl
                    : "/defaultBirthdayTemplate.png"
                }
              />
            </div>
          </div>
        </section>
        <section className={styles.map} id="local">
          <div className={styles.mapBlock}>
            <div className={styles.leftSideSobre}>
              <h4>local</h4>
              <h2>salve bem esse lugar especial</h2>
              <iframe
                src={mapUrl}
                width="600"
                height="689"
                loading="lazy"
              ></iframe>
              <div className={styles.mapsFooter}>
                <div className={styles.mapsFooterBlock}>
                  <img src="/calendarAzul.svg" />
                  <div className={styles.dataHora}>
                    <p>Data e horário</p>
                    <span>
                      {dataEvento ? formatDate(dataEvento) : "24/10/2023"} às{" "}
                      {horaEvento || "16:00h"}
                    </span>
                  </div>
                </div>
                <div className={styles.mapsFooterBlock}>
                  <img src="/mapAzul.svg" />
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
          </div>
        </section>
        <section className={styles.mosaico} id="mosaico">
          <div className={styles.mosaicoContent}>
            <p>fotos</p>
            <h2>galeria do aniversariante</h2>
            <div className={styles.fotosGrid}>
              <div className={styles.blockImageContainer}>
                <img
                  src={
                    internalMosaico1lUrl
                      ? internalMosaico1lUrl
                      : "/defaultMarried.png"
                  }
                  className={styles.foto}
                />
              </div>
              <div className={styles.blockImageContainer}>
                <img
                  src={
                    internalMosaico2lUrl
                      ? internalMosaico2lUrl
                      : "/defaultMarried.png"
                  }
                  className={styles.foto}
                />
              </div>
              <div className={styles.blockImageContainer}>
                <img
                  src={
                    internalMosaico3lUrl
                      ? internalMosaico3lUrl
                      : "/defaultMarried.png"
                  }
                  className={styles.foto}
                />
              </div>
            </div>
          </div>
        </section>
        <section
          className={styles.formSectionCasamento}
          style={
            internalFotoLocalUrl
              ? {
                  backgroundImage: `url(${internalFotoLocalUrl})`,
                }
              : {
                  backgroundImage: "url(/backgroundLocalBirthday.png)",
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
                confirmar presença
              </button>
            </form>
          </div>
        </section>
        <GiftsList />
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
              <img src="/blueDei.svg" />
            </div>
            <div className={styles.rightSideFooter}>
              <Link href="">Termos de serviço </Link>
              <Link href="">Política de privacidade</Link>
            </div>
          </div>
        </section>
        <section className={styles.footerEventoMobile}>
          <div className={styles.divisorFooter}>
            <hr />
          </div>
          <div className={styles.footerBlockMobile}>
            <img src="/blueDei.svg" />
            <div className={styles.rightSideFooterMobile}>
              <Link href="">© 2023 Deidepresente.</Link>
              <Link href="">Todos os direitos reservados</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
