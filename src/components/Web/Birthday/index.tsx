import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import GiftsListFromSavedWebsite from "./GiftsFromSavedWebsite";
import styles from "./styles.module.scss";

export interface Gift {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  userId: string;
}

export interface BirthdayInterface {
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

export default function BirthdayWebsite({
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
  fotoLocalUrl,
  gifts,
  slug,
}: BirthdayInterface) {
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
  const [nome, setNome] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

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

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/websites/addAcompanhantes", {
        slug,
        confirmedData: {
          nome,
          acompanhantes,
        },
      });
      toast.success("Acompanhantes enviados com sucesso!", {
        icon: "🎉",
      });
      console.log(response.data.message);
    } catch (error: any) {
      toast.error("Ocorreu um erro ao enviar os acompanhantes.");
      console.error(error.response.data.error);
    }
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

  console.log(bannerUrl);

  return (
    <>
      <div className={styles.templateContainer}>
        <section className={styles.banner} id="home">
          <div className={styles.headerWebsite}>
            <img src="/blueDei.svg" />
            <ul className={styles.menu}>
              <li onClick={() => smoothScroll("sobre")}>sobre nós</li>
              <li onClick={() => smoothScroll("mosaico")}>fotos</li>
              <li onClick={() => smoothScroll("local")}>local do evento</li>
              <button onClick={() => smoothScroll("confirmar")}>
                confirmar presença
              </button>
            </ul>
            <div className={styles.hamburguer}>
              <img
                src="/hamburguerazul.svg"
                alt="logo"
                onClick={toggleDrawer}
              />
            </div>
            <div
              className={`${styles.drawer} ${drawerOpen ? styles.open : ""}`}
            >
              <div className={styles.contentDrawer}>
                <div className={styles.topContentDrawer}>
                  <img
                    className={styles.logo}
                    src="/logoPresente.svg"
                    alt="logo"
                  />
                  <img
                    className={styles.close}
                    src="/close.svg"
                    alt="logo"
                    onClick={toggleDrawer}
                  />
                </div>
                <div className={styles.middleContentDrawer}>
                  <ul>
                    <li onClick={() => smoothScroll("sobre")}>sobre nós</li>

                    <li onClick={() => smoothScroll("mosaico")}>fotos</li>

                    <li onClick={() => smoothScroll("local")}>
                      local do evento
                    </li>
                  </ul>
                  <button onClick={() => smoothScroll("confirmar")}>
                    confirmar presença
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.middleContent}>
            <div className={styles.leftSide}>
              <h4>prepare-se para a experiência</h4>
              <h1>{nomeEvento || "A melhor festa de todas"}</h1>
              <p>
                {mensagemCurta ||
                  "Lorem ipsum dolor sit amet consectetur. Amet ullamcorper quam maecenas ac placerat porttitor porttitor mi. Ipsum volutpat proin quisque urna tortor et. Praesent porttitor aliquam a tristique tortor et eget. Potenti eu maecenas diam aenean nec. Lorem ipsum dolor sit amet consectetur."}
              </p>
              <button onClick={() => smoothScroll("confirmar")}>
                confirmar presença
              </button>
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
                    fotoEventoUrl
                      ? fotoEventoUrl
                      : "/defaultBirthdayTemplate.png"
                  }
                />
              </div>
              <p>
                {sobreEvento ||
                  "Lorem ipsum dolor sit amet consectetur. Amet ullamcorper quam maecenas ac placerat porttitor porttitor mi. Ipsum volutpat proin quisque urna tortor et. Praesent porttitor aliquam a tristique tortor et eget. Potenti eu maecenas diam aenean nec."}
              </p>
              <button onClick={() => smoothScroll("confirmar")}>
                confirmar presença
              </button>
            </div>
            <div className={styles.rightSideSobre}>
              <img
                src={
                  fotoEventoUrl ? fotoEventoUrl : "/defaultBirthdayTemplate.png"
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
                    fotoMosaico1Url ? fotoMosaico1Url : "/defaultMarried.png"
                  }
                  className={styles.foto}
                />
              </div>
              <div className={styles.blockImageContainer}>
                <img
                  src={
                    fotoMosaico2Url ? fotoMosaico2Url : "/defaultMarried.png"
                  }
                  className={styles.foto}
                />
              </div>
              <div className={styles.blockImageContainer}>
                <img
                  src={
                    fotoMosaico3Url ? fotoMosaico3Url : "/defaultMarried.png"
                  }
                  className={styles.foto}
                />
              </div>
            </div>
          </div>
        </section>
        <section
          className={styles.formSectionCasamento}
          id="confirmar"
          style={
            fotoLocalUrl
              ? { backgroundImage: `url(${fotoLocalUrl})` }
              : { backgroundImage: "url(/backgroundLocalBirthday.png)" }
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
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formInputBlock}>
                <label>Nome completo</label>
                <input
                  placeholder="Escreva aqui seu nome..."
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
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
