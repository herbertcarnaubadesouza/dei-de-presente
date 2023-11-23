import Link from "next/link";
import { useEffect, useState } from "react";
import GiftsList from "./GiftsList";
import styles from "./styles.module.scss";

interface NighClubInterface {
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
  fotoMosaico7Url: string | null;
  fotoMosaico8Url: string | null;
  fotoMosaico9Url: string | null;
  fotoMosaico10Url: string | null;
  fotoMosaico11Url: string | null;
  fotoMosaico12Url: string | null;
  fotoLocalUrl: string | null;
  filledIndices: any[];
}

export default function NightClub({
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
  fotoMosaico7Url,
  fotoMosaico8Url,
  fotoMosaico9Url,
  fotoMosaico10Url,
  fotoMosaico11Url,
  fotoMosaico12Url,
  fotoLocalUrl,
  filledIndices,
}: NighClubInterface) {
  const [currentPage, setCurrentPage] = useState(1);
  const giftsPerPage = 12;
  const [acompanhantes, setAcompanhantes] = useState(0);

  const indexOfLastGift = currentPage * giftsPerPage;
  const indexOfFirstGift = indexOfLastGift - giftsPerPage;
  const [mapUrl, setMapUrl] = useState("");
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

  const [internalMosaico7lUrl, setInternalMosaico7Url] = useState<
    string | null
  >();

  const [internalMosaico8lUrl, setInternalMosaico8Url] = useState<
    string | null
  >();

  const [internalMosaico9lUrl, setInternalMosaico9Url] = useState<
    string | null
  >();

  const [internalMosaico10lUrl, setInternalMosaico10Url] = useState<
    string | null
  >();

  const [internalMosaico11lUrl, setInternalMosaico11Url] = useState<
    string | null
  >();

  const [internalMosaico12lUrl, setInternalMosaico12Url] = useState<
    string | null
  >();

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
    if (!bannerUrl) {
      const storedBannerUrl = localStorage.getItem("fotoBanner");
      if (storedBannerUrl) {
        setInternalBannerUrl(`${storedBannerUrl}`);
      }
    } else {
      setInternalBannerUrl(bannerUrl);
    }

    console.log(fotoMosaico1Url);

    if (!fotoEventoUrl) {
      const storedEventoUrl = localStorage.getItem("fotoEventoUrl");
      if (storedEventoUrl) {
        setInternalFotoEventoUrl(`${storedEventoUrl}`);
      } else {
        setInternalFotoEventoUrl(`/background-alcool.png`);
      }
    } else {
      setInternalFotoEventoUrl(fotoEventoUrl);
    }

    if (!fotoMosaico1Url) {
      const storedMosaico1Url = localStorage.getItem("fotoMosaico1Url");
      if (storedMosaico1Url) {
        setInternalMosaico1Url(`${storedMosaico1Url}`);
      }
    } else {
      setInternalMosaico1Url(fotoMosaico1Url);
    }

    if (!fotoMosaico2Url) {
      const storedMosaico2Url = localStorage.getItem("fotoMosaico2Url");
      if (storedMosaico2Url) {
        setInternalMosaico2Url(`${storedMosaico2Url}`);
      }
    } else {
      setInternalMosaico2Url(fotoMosaico2Url);
    }

    if (!fotoMosaico3Url) {
      const storedMosaico3Url = localStorage.getItem("fotoMosaico3Url");
      if (storedMosaico3Url) {
        setInternalMosaico3Url(`${storedMosaico3Url}`);
      }
    } else {
      setInternalMosaico3Url(fotoMosaico3Url);
    }

    if (!fotoMosaico4Url) {
      const storedMosaico4Url = localStorage.getItem("fotoMosaico4Url");
      if (storedMosaico4Url) {
        setInternalMosaico4Url(`${storedMosaico4Url}`);
      }
    } else {
      setInternalMosaico4Url(fotoMosaico4Url);
    }

    if (!fotoMosaico5Url) {
      const storedMosaico5Url = localStorage.getItem("fotoMosaico5Url");
      if (storedMosaico5Url) {
        setInternalMosaico5Url(`${storedMosaico5Url}`);
      }
    } else {
      setInternalMosaico5Url(fotoMosaico5Url);
    }

    if (!fotoMosaico6Url) {
      const fotoMosaico6Url = localStorage.getItem("fotoMosaico6Url");
      if (fotoMosaico6Url) {
        setInternalMosaico6Url(`${fotoMosaico6Url}`);
      }
    } else {
      setInternalMosaico6Url(fotoMosaico6Url);
    }

    if (!fotoMosaico7Url) {
      const fotoMosaico7Url = localStorage.getItem("fotoMosaico7Url");
      if (fotoMosaico7Url) {
        setInternalMosaico7Url(`${fotoMosaico7Url}`);
      }
    } else {
      setInternalMosaico7Url(fotoMosaico7Url);
    }

    if (!fotoMosaico8Url) {
      const fotoMosaico8Url = localStorage.getItem("fotoMosaico8Url");
      if (fotoMosaico8Url) {
        setInternalMosaico8Url(`${fotoMosaico8Url}`);
      }
    } else {
      setInternalMosaico8Url(fotoMosaico8Url);
    }

    if (!fotoMosaico9Url) {
      const fotoMosaico9Url = localStorage.getItem("fotoMosaico9Url");
      if (fotoMosaico9Url) {
        setInternalMosaico9Url(`${fotoMosaico9Url}`);
      }
    } else {
      setInternalMosaico9Url(fotoMosaico9Url);
    }

    if (!fotoMosaico10Url) {
      const fotoMosaico10Url = localStorage.getItem("fotoMosaico10Url");
      if (fotoMosaico10Url) {
        setInternalMosaico10Url(`${fotoMosaico10Url}`);
      }
    } else {
      setInternalMosaico10Url(fotoMosaico10Url);
    }

    if (!fotoMosaico11Url) {
      const fotoMosaico11Url = localStorage.getItem("fotoMosaico11Url");
      if (fotoMosaico11Url) {
        setInternalMosaico11Url(`${fotoMosaico11Url}`);
      }
    } else {
      setInternalMosaico11Url(fotoMosaico11Url);
    }

    if (!fotoMosaico12Url) {
      const fotoMosaico12Url = localStorage.getItem("fotoMosaico12Url");
      if (fotoMosaico12Url) {
        setInternalMosaico12Url(`${fotoMosaico12Url}`);
      }
    } else {
      setInternalMosaico12Url(fotoMosaico12Url);
    }

    if (!fotoLocalUrl) {
      const fotoLocalUrl = localStorage.getItem("fotoLocalUrl");
      if (fotoLocalUrl) {
        setInternalFotoLocalUrl(`${fotoLocalUrl}`);
      } else {
        setInternalFotoLocalUrl(`/night-club-confirmation-background.webp`);
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
    fotoMosaico7Url,
    fotoMosaico8Url,
    fotoMosaico9Url,
    fotoMosaico10Url,
    fotoMosaico11Url,
    fotoMosaico12Url,
    fotoLocalUrl,
    filledIndices,
  ]);

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
  }, [dataEvento, horaEvento]);

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

  useEffect(() => {
    // if (!bannerUrl) {
    setInternalBannerUrl(localStorage.getItem("fotoBanner"));
    console.log(internalBannerUrl);
    // }
  }, []);

  return (
    <>
      <main className={styles.nightClubContent}>
        <section
          className={styles.banner}
          style={
            internalBannerUrl
              ? { backgroundImage: `url(${internalBannerUrl})` }
              : {}
          }
          id="home"
        >
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
            <h1>{nomeEvento || "A melhor festa de todas"}</h1>
            <p>
              {mensagemCurta ||
                "Lorem ipsum dolor sit amet consectetur. Amet ullamcorper quam maecenas ac placerat porttitor porttitor mi. Ipsum volutpat proin quisque urna tortor et. Praesent porttitor aliquam a tristique tortor et eget. Potenti eu maecenas diam aenean nec. Lorem ipsum dolor sit amet consectetur."}
            </p>
            <button>confirmar presença</button>
          </div>
        </section>
        <section className={styles.sobre} id="date">
          <div className={styles.hourCounterWrap}>
            <h2>contado os minutos para o grande dia</h2>

            <div className={styles.rowDateBlock}>
              <div className={styles.cardHour}>
                <span>{days}</span>
                <p>dias</p>
              </div>
              <div className={styles.cardHour}>
                <span>{hours}</span>
                <p>horas</p>
              </div>
              <div className={styles.cardHour}>
                <span>{minutes}</span>
                <p>minutos</p>
              </div>
              <div className={styles.cardHour}>
                <span>{seconds}</span>
                <p>segundos</p>
              </div>
            </div>
          </div>
        </section>
        <section
          className={styles.bannerAlcool}
          style={
            internalFotoEventoUrl
              ? { backgroundImage: `url(${internalFotoEventoUrl})` }
              : {}
          }
          id="sobre"
        >
          <div className={styles.textContent}>
            <span>sobre</span>
            <h2>{"Sobre o evento"}</h2>
            <p>
              {sobreEvento ||
                "Lorem ipsum dolor sit amet consectetur. Amet ullamcorper quam maecenas ac placerat porttitor porttitor mi. Ipsum volutpat proin quisque urna tortor et. Praesent porttitor aliquam a tristique tortor et eget. Potenti eu maecenas diam aenean nec."}
            </p>
            <button>confirmar presença</button>
          </div>
        </section>

        {/*MOBILE*/}

        <section className={styles.bannerAlcoolMobile}>
          <img
            src={
              internalFotoEventoUrl
                ? internalFotoEventoUrl
                : "/background-alcool.png"
            }
          />
          <div className={styles.textContent}>
            <span>sobre</span>
            <h2>{"Sobre o evento"}</h2>
            <p>
              {sobreEvento ||
                "Lorem ipsum dolor sit amet consectetur. Amet ullamcorper quam maecenas ac placerat porttitor porttitor mi. Ipsum volutpat proin quisque urna tortor et. Praesent porttitor aliquam a tristique tortor et eget. Potenti eu maecenas diam aenean nec."}
            </p>
            <button>confirmar presença</button>
          </div>
        </section>

        <section className={styles.local} id="local">
          <div className={styles.localContent}>
            <span>local</span>
            <h2>Um lugar pra ficar na memória</h2>
            <iframe
              src={mapUrl}
              width="600"
              height="450"
              loading="lazy"
            ></iframe>
            <div className={styles.mapsFooter}>
              <div className={styles.mapsFooterBlock}>
                <img src="/calendarBranco.svg" />
                <div className={styles.dataHora}>
                  <p>Data e horário</p>
                  <span>
                    {dataEvento ? formatDate(dataEvento) : "24/10/2023"} às{" "}
                    {horaEvento || "16:00h"}
                  </span>
                </div>
              </div>
              <div className={styles.mapsFooterBlock}>
                <img src="/mapBranco.svg" />
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
        <section className={styles.mosaico} id="mosaico">
          <div className={styles.mosaicoContent}>
            <span>fotos</span>
            <h2>Uma lembrança das últimas vezes</h2>
          </div>
          <div className={styles.mosaicoGrid}>
            <div className={styles.row1}>
              <img
                className={styles.photo1}
                src={
                  internalMosaico1lUrl
                    ? internalMosaico1lUrl
                    : "/night-club-1.webp"
                }
              />
              <img
                className={styles.photo2}
                src={
                  internalMosaico2lUrl
                    ? internalMosaico2lUrl
                    : "/night-club-2.webp"
                }
              />
              <img
                className={styles.photo4}
                src={
                  internalMosaico3lUrl
                    ? internalMosaico3lUrl
                    : "/night-club-3.webp"
                }
              />
              <img
                className={styles.photo5}
                src={
                  internalMosaico4lUrl
                    ? internalMosaico4lUrl
                    : "/night-club-4.webp"
                }
              />
              <img
                className={styles.photo6}
                src={
                  internalMosaico5lUrl
                    ? internalMosaico5lUrl
                    : "/night-club-5.webp"
                }
              />
            </div>
            <div className={styles.row1}>
              <img
                className={styles.photo7}
                src={
                  internalMosaico6lUrl
                    ? internalMosaico6lUrl
                    : "/night-club-6.webp"
                }
              />
              <img
                className={styles.photo8}
                src={
                  internalMosaico7lUrl
                    ? internalMosaico7lUrl
                    : "/night-club-7.webp"
                }
              />
              <img
                className={styles.photo9}
                src={
                  internalMosaico8lUrl
                    ? internalMosaico8lUrl
                    : "/night-club-8.webp"
                }
              />
              <img
                className={styles.photo10}
                src={
                  internalMosaico9lUrl
                    ? internalMosaico9lUrl
                    : "/night-club-9.webp"
                }
              />
              <img
                className={styles.photo11}
                src={
                  internalMosaico10lUrl
                    ? internalMosaico10lUrl
                    : "/night-club-10.webp"
                }
              />
              <img
                className={styles.photo12}
                src={
                  internalMosaico11lUrl
                    ? internalMosaico11lUrl
                    : "/night-club-11.webp"
                }
              />
              <img
                className={styles.photo3}
                src={
                  internalMosaico12lUrl
                    ? internalMosaico12lUrl
                    : "/night-club-1.webp"
                }
              />
            </div>
          </div>
          <div className={styles.mosaicoGridMobile}>
            <div className={styles.row1Mobile}>
              <img
                className={styles.photo1Mobile}
                src={
                  internalMosaico1lUrl
                    ? internalMosaico1lUrl
                    : "/night-club-1.webp"
                }
              />
              <img
                className={styles.photo2Mobile}
                src={
                  internalMosaico2lUrl
                    ? internalMosaico2lUrl
                    : "/night-club-2.webp"
                }
              />
            </div>
            <div className={styles.row2Mobile}>
              <img
                className={styles.photo2Mobile}
                src={
                  internalMosaico3lUrl
                    ? internalMosaico3lUrl
                    : "/night-club-3.webp"
                }
              />
              <img
                className={styles.photo1Mobile}
                src={
                  internalMosaico4lUrl
                    ? internalMosaico4lUrl
                    : "/night-club-4.webp"
                }
              />
            </div>
            <div className={styles.row1Mobile}>
              <img
                className={styles.photo1Mobile}
                src={
                  internalMosaico5lUrl
                    ? internalMosaico5lUrl
                    : "/night-club-5.webp"
                }
              />
              <img
                className={styles.photo2Mobile}
                src={
                  internalMosaico6lUrl
                    ? internalMosaico6lUrl
                    : "/night-club-6.webp"
                }
              />
            </div>
            <div className={styles.row2Mobile}>
              <img
                className={styles.photo2Mobile}
                src={
                  internalMosaico7lUrl
                    ? internalMosaico7lUrl
                    : "/night-club-7.webp"
                }
              />
              <img
                className={styles.photo1Mobile}
                src={
                  internalMosaico8lUrl
                    ? internalMosaico8lUrl
                    : "/night-club-8.webp"
                }
              />
            </div>
            <div className={styles.row1Mobile}>
              <img
                className={styles.photo1Mobile}
                src={
                  internalMosaico9lUrl
                    ? internalMosaico9lUrl
                    : "/night-club-9.webp"
                }
              />
              <img
                className={styles.photo2Mobile}
                src={
                  internalMosaico10lUrl
                    ? internalMosaico10lUrl
                    : "/night-club-10.webp"
                }
              />
            </div>
            <div className={styles.row2Mobile}>
              <img
                className={styles.photo2Mobile}
                src={
                  internalMosaico11lUrl
                    ? internalMosaico11lUrl
                    : "/night-club-11.webp"
                }
              />
              <img
                className={styles.photo1Mobile}
                src={
                  internalMosaico12lUrl
                    ? internalMosaico12lUrl
                    : "/night-club-1.webp"
                }
              />
            </div>
          </div>
        </section>
        <section
          className={styles.formSectionEvento}
          style={
            internalFotoLocalUrl
              ? { backgroundImage: `url(${internalFotoLocalUrl})` }
              : {}
          }
          id="confirmar"
        >
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
                <label>Você irá ao Evento?</label>
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
                  <input type="number" value="2" readOnly />
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
              <img src="/logoAmarela.webp" />
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
            <img src="/logoPresente.svg" />
            <div className={styles.rightSideFooterMobile}>
              <Link href="">© 2023 Deidepresente.</Link>
              <Link href="">Todos os direitos reservados</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
