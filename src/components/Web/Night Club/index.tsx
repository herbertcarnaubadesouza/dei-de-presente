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

export interface NightClubInterface {
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

export default function NightClubWebsite({
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
  fotoMosaico7Url,
  fotoMosaico8Url,
  fotoMosaico9Url,
  fotoMosaico10Url,
  fotoMosaico11Url,
  fotoMosaico12Url,
  fotoLocalUrl,
  gifts,
  slug,
}: NightClubInterface) {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
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
      <main className={styles.nightClubContent}>
        <section
          className={styles.banner}
          style={
            bannerUrl
              ? { backgroundImage: `url(${bannerUrl})` }
              : { backgroundImage: `url(/banner-website-night-club.webp)` }
          }
          id="home"
        >
          <div className={styles.headerWebsite}>
            <img src="/logoPresente.svg" />
            <ul className={styles.menu}>
              <li onClick={() => smoothScroll("sobre")}>sobre nós</li>
              <li onClick={() => smoothScroll("mosaico")}>fotos</li>
              <li onClick={() => smoothScroll("local")}>local do evento</li>
              <button onClick={() => smoothScroll("confirmar")}>
                confirmar presença
              </button>
            </ul>
            <div className={styles.hamburguer}>
              <img src="/hamburguer.svg" alt="logo" onClick={toggleDrawer} />
            </div>
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
            fotoEventoUrl
              ? { backgroundImage: `url(${fotoEventoUrl})` }
              : { backgroundImage: `url(/background-alcool.png)` }
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
        <section className={styles.bannerAlcoolMobile}>
          <img src={fotoEventoUrl ? fotoEventoUrl : "/background-alcool.png"} />
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
                    {nomeRua && complemento && numeroRua
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
                src={fotoMosaico1Url ? fotoMosaico1Url : "/night-club-1.webp"}
              />
              <img
                className={styles.photo2}
                src={fotoMosaico2Url ? fotoMosaico2Url : "/night-club-2.webp"}
              />
              <img
                className={styles.photo3}
                src={fotoMosaico3Url ? fotoMosaico3Url : "/night-club-3.webp"}
              />
              <img
                className={styles.photo4}
                src={fotoMosaico4Url ? fotoMosaico4Url : "/night-club-4.webp"}
              />
              <img
                className={styles.photo5}
                src={fotoMosaico5Url ? fotoMosaico5Url : "/night-club-5.webp"}
              />
              <img
                className={styles.photo6}
                src={fotoMosaico6Url ? fotoMosaico6Url : "/night-club-6.webp"}
              />
            </div>
            <div className={styles.row1}>
              <img
                className={styles.photo7}
                src={fotoMosaico7Url ? fotoMosaico7Url : "/night-club-7.webp"}
              />
              <img
                className={styles.photo8}
                src={fotoMosaico8Url ? fotoMosaico8Url : "/night-club-8.webp"}
              />
              <img
                className={styles.photo9}
                src={fotoMosaico9Url ? fotoMosaico9Url : "/night-club-9.webp"}
              />
              <img
                className={styles.photo10}
                src={
                  fotoMosaico10Url ? fotoMosaico10Url : "/night-club-10.webp"
                }
              />
              <img
                className={styles.photo11}
                src={
                  fotoMosaico11Url ? fotoMosaico11Url : "/night-club-11.webp"
                }
              />
              <img
                className={styles.photo12}
                src={fotoMosaico12Url ? fotoMosaico12Url : "/night-club-1.webp"}
              />
            </div>
          </div>
          <div className={styles.mosaicoGridMobile}>
            <div className={styles.row1Mobile}>
              <img
                className={styles.photo1Mobile}
                src={fotoMosaico1Url ? fotoMosaico1Url : "/night-club-1.webp"}
              />
              <img
                className={styles.photo2Mobile}
                src={fotoMosaico2Url ? fotoMosaico2Url : "/night-club-2.webp"}
              />
            </div>
            <div className={styles.row2Mobile}>
              <img
                className={styles.photo2Mobile}
                src={fotoMosaico3Url ? fotoMosaico3Url : "/night-club-3.webp"}
              />
              <img
                className={styles.photo1Mobile}
                src={fotoMosaico4Url ? fotoMosaico4Url : "/night-club-4.webp"}
              />
            </div>
            <div className={styles.row1Mobile}>
              <img
                className={styles.photo1Mobile}
                src={fotoMosaico5Url ? fotoMosaico5Url : "/night-club-5.webp"}
              />
              <img
                className={styles.photo2Mobile}
                src={fotoMosaico6Url ? fotoMosaico6Url : "/night-club-6.webp"}
              />
            </div>
            <div className={styles.row2Mobile}>
              <img
                className={styles.photo2Mobile}
                src={fotoMosaico7Url ? fotoMosaico7Url : "/night-club-7.webp"}
              />
              <img
                className={styles.photo1Mobile}
                src={fotoMosaico8Url ? fotoMosaico8Url : "/night-club-8.webp"}
              />
            </div>
            <div className={styles.row1Mobile}>
              <img
                className={styles.photo1Mobile}
                src={fotoMosaico9Url ? fotoMosaico9Url : "/night-club-9.webp"}
              />
              <img
                className={styles.photo2Mobile}
                src={
                  fotoMosaico10Url ? fotoMosaico10Url : "/night-club-10.webp"
                }
              />
            </div>
            <div className={styles.row2Mobile}>
              <img
                className={styles.photo2Mobile}
                src={
                  fotoMosaico11Url ? fotoMosaico11Url : "/night-club-11.webp"
                }
              />
              <img
                className={styles.photo1Mobile}
                src={fotoMosaico12Url ? fotoMosaico12Url : "/night-club-1.webp"}
              />
            </div>
          </div>
        </section>
        <section
          className={styles.formSectionEvento}
          style={
            fotoLocalUrl
              ? { backgroundImage: `url(${fotoLocalUrl})` }
              : {
                  backgroundImage: `url(/night-club-confirmation-background.webp)`,
                }
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
function setDrawerOpen(arg0: boolean) {
  throw new Error("Function not implemented.");
}
