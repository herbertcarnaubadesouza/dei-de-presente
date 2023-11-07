import { defaultOptionsGift } from "@/animation";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/react";
import router from "next/router";
import { XCircle } from "phosphor-react";
import { ChangeEvent, useEffect, useState } from "react";
import Lottie from "react-lottie";
import { toast } from "react-toastify";
import styles from "../../../../styles/Customize.module.scss";
import BirthdayForEdit from "./EditBirthday";

export interface Gift {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  userId: string;
}

export interface BirthdayInterface {
  nomeRua: string;
  slug: string;
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

export default function EditBirthday({
  nomeEvento: propNomeEvento,
  mensagemCurta: propMensagemCurta,
  dataEvento: propDataEvento,
  sobreEvento: propSobreEvento,
  horaEvento: propHoraEvento,
  nomeRua: propNomeRua,
  complemento: propComplemento,
  numeroRua: propNumeroRua,
  cep: propCep,
  bannerUrl: propBannerUrl,
  fotoEventoUrl: propFotoEventoUrl,
  fotoMosaico1Url: propFotoMosaico1Url,
  fotoMosaico2Url: propFotoMosaico2Url,
  fotoMosaico3Url: propFotoMosaico3Url,
  fotoMosaico4Url: propFotoMosaico4Url,
  fotoMosaico5Url: propFotoMosaico5Url,
  fotoMosaico6Url: propFotoMosaico6Url,
  fotoMosaico7Url: propFotoMosaico7Url,
  fotoMosaico8Url: propFotoMosaico8Url,
  fotoMosaico9Url: propFotoMosaico9Url,
  fotoMosaico10Url: propFotoMosaico10Url,
  fotoMosaico11Url: propFotoMosaico11Url,
  fotoMosaico12Url: propFotoMosaico12Url,
  fotoLocalUrl: propFotoLocalUrl,
  gifts: propGifts,
  slug: propSlug,
}: BirthdayInterface) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isRightSideVisible, setIsRightSideVisible] = useState(true);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("Home");
  const [nomeEvento, setNomeEvento] = useState(propNomeEvento);
  const [mensagemCurta, setMensagemCurta] = useState(propMensagemCurta);
  const [dataEvento, setDataEvento] = useState(propDataEvento);
  const [horaEvento, setHoraEvento] = useState(propHoraEvento);
  const [sobreEvento, setSobreEvento] = useState(propSobreEvento);
  const [fotosEventoText, setFotosEventoText] = useState(propSobreEvento);
  const [nomeRua, setNomeRua] = useState(propNomeRua);
  const [complemento, setComplementoRua] = useState(propComplemento);
  const [numeroRua, setNumeroRua] = useState(propNumeroRua);
  const [nextHandlerIndex, setNextHandlerIndex] = useState(1);

  const [bannerUrl, setBannerUrl] = useState<string | null>(propBannerUrl);
  const [fotoEventoUrl, setFotoEventoUrl] = useState<string | null>(
    propFotoEventoUrl
  );
  const [fotoMosaico1Url, setFotoMosaico1Url] = useState<string | null>(
    propFotoMosaico1Url
  );
  const [fotoMosaico2Url, setFotoMosaico2Url] = useState<string | null>(
    propFotoMosaico2Url
  );
  const [fotoMosaico3Url, setFotoMosaico3Url] = useState<string | null>(
    propFotoMosaico3Url
  );
  const [fotoMosaico4Url, setFotoMosaico4Url] = useState<string | null>(
    propFotoMosaico4Url
  );
  const [fotoMosaico5Url, setFotoMosaico5Url] = useState<string | null>(
    propFotoMosaico5Url
  );
  const [fotoMosaico6Url, setFotoMosaico6Url] = useState<string | null>(
    propFotoMosaico6Url
  );
  const [fotoMosaico7Url, setFotoMosaico7Url] = useState<string | null>(
    propFotoMosaico7Url
  );
  const [fotoMosaico8Url, setFotoMosaico8Url] = useState<string | null>(
    propFotoMosaico8Url
  );
  const [fotoMosaico9Url, setFotoMosaico9Url] = useState<string | null>(
    propFotoMosaico9Url
  );
  const [fotoMosaico10Url, setFotoMosaico10Url] = useState<string | null>(
    propFotoMosaico10Url
  );
  const [fotoMosaico11Url, setFotoMosaico11Url] = useState<string | null>(
    propFotoMosaico11Url
  );
  const [fotoMosaico12Url, setFotoMosaico12Url] = useState<string | null>(
    propFotoMosaico12Url
  );
  const [fotoLocalUrl, setFotoLocalUrl] = useState<string | null>(
    propFotoLocalUrl
  );
  const [filledIndices, setFilledIndices] = useState(new Array(12).fill(false));
  const allFotoMosaicoUrls = [
    fotoMosaico1Url,
    fotoMosaico2Url,
    fotoMosaico3Url,
  ];

  const [cep, setCep] = useState(propCep);
  const [loading, setLoading] = useState(false);

  const session = useSession();

  const today = new Date();
  today.setDate(today.getDate() + 1);
  const nextDay = today.toISOString().split("T")[0];

  const handleCepChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    value = value.replace(/\D/g, "");

    if (value.length <= 5) {
      value = value.replace(/^(\d{0,5})/, "$1");
    } else {
      value = value.replace(/^(\d{0,5})(\d{0,3})/, "$1-$2");
    }

    setCep(value.substring(0, 9));
  };

  const handlePreviewClick = () => {
    setIsRightSideVisible(!isRightSideVisible);
  };

  const handleContinueEditingClick = () => {
    setIsRightSideVisible(!isRightSideVisible);
  };

  const toggleAccordion = (name: string) => {
    if (activeAccordion === name) {
      setActiveAccordion(null);
      window.location.hash = "";
    } else {
      setActiveAccordion(name);
      window.location.hash = name.toLowerCase();
    }
  };

  const handleClearFileFotoEventoUrl = () => {
    setFotoEventoUrl(null);

    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }

    setIsFileSelected(false);
  };

  const handleClearFileFotoLocalUrl = () => {
    setFotoLocalUrl(null);

    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }

    setIsFileSelected(false);
  };

  const handleClearFileBanner = () => {
    setBannerUrl(null);

    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }

    setIsFileSelected(false);
  };

  const handleClick = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const getAccordionClass = (isActive: boolean) => {
    return isActive ? `${styles.accordion} ${styles.active}` : styles.accordion;
  };

  const handleImageBannerChange = async (e: any) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.file) {
        setBannerUrl(`/temp/${response.data.file}`);
      }
    } catch (err) {
      console.error("Ocorreu um erro durante o upload:", err);
    }
  };

  const handleImageLocalChange = async (e: any) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.file) {
        setFotoLocalUrl(`/temp/${response.data.file}`);
      }
    } catch (err) {
      console.error("Ocorreu um erro durante o upload:", err);
    }
  };

  const handleDeleteImage = async (index: number) => {
    const setFotoMosaicoUrlFunctions: {
      [key: number]: React.Dispatch<React.SetStateAction<string | null>>;
    } = {
      0: setFotoMosaico1Url,
      1: setFotoMosaico2Url,
      2: setFotoMosaico3Url,
      3: setFotoMosaico4Url,
      4: setFotoMosaico5Url,
      5: setFotoMosaico6Url,
      6: setFotoMosaico7Url,
      7: setFotoMosaico8Url,
      8: setFotoMosaico9Url,
      9: setFotoMosaico10Url,
      10: setFotoMosaico11Url,
      11: setFotoMosaico12Url,
    };

    const setStateFunc = setFotoMosaicoUrlFunctions[index];
    if (setStateFunc) {
      setStateFunc(null);
      const newFilledIndices = [...filledIndices];
      newFilledIndices[index] = false;
      setFilledIndices(newFilledIndices);
    }
  };

  const handleImageFotoEventoChange = async (e: any) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.file) {
        setFotoEventoUrl(`/temp/${response.data.file}`);
      }
    } catch (err) {
      console.error("Ocorreu um erro durante o upload:", err);
    }
  };

  const handleImageFotosEvento1 = async (file: File) => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.file) {
        setFotoMosaico1Url(`/temp/${response.data.file}`);
      }
    } catch (err) {
      console.error("Ocorreu um erro durante o upload:", err);
    }
  };

  const handleImageFotosEvento2 = async (file: File) => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.file) {
        setFotoMosaico2Url(`/temp/${response.data.file}`);
      }
    } catch (err) {
      console.error("Ocorreu um erro durante o upload:", err);
    }
  };

  const handleImageFotosEvento3 = async (file: File) => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.file) {
        setFotoMosaico3Url(`/temp/${response.data.file}`);
      }
    } catch (err) {
      console.error("Ocorreu um erro durante o upload:", err);
    }
  };
  const handleImageFotosEvento4 = async (file: File) => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.file) {
        setFotoMosaico4Url(`/temp/${response.data.file}`);
      }
    } catch (err) {
      console.error("Ocorreu um erro durante o upload:", err);
    }
  };
  const handleImageFotosEvento5 = async (file: File) => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.file) {
        setFotoMosaico5Url(`/temp/${response.data.file}`);
      }
    } catch (err) {
      console.error("Ocorreu um erro durante o upload:", err);
    }
  };

  const handleImageFotosEvento6 = async (file: File) => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.file) {
        setFotoMosaico6Url(`/temp/${response.data.file}`);
      }
    } catch (err) {
      console.error("Ocorreu um erro durante o upload:", err);
    }
  };
  const handleImageFotosEvento7 = async (file: File) => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.file) {
        setFotoMosaico7Url(`/temp/${response.data.file}`);
      }
    } catch (err) {
      console.error("Ocorreu um erro durante o upload:", err);
    }
  };
  const handleImageFotosEvento8 = async (file: File) => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.file) {
        setFotoMosaico8Url(`/temp/${response.data.file}`);
      }
    } catch (err) {
      console.error("Ocorreu um erro durante o upload:", err);
    }
  };
  const handleImageFotosEvento9 = async (file: File) => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.file) {
        setFotoMosaico9Url(`/temp/${response.data.file}`);
      }
    } catch (err) {
      console.error("Ocorreu um erro durante o upload:", err);
    }
  };
  const handleImageFotosEvento10 = async (file: File) => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.file) {
        setFotoMosaico10Url(`/temp/${response.data.file}`);
      }
    } catch (err) {
      console.error("Ocorreu um erro durante o upload:", err);
    }
  };
  const handleImageFotosEvento11 = async (file: File) => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.file) {
        setFotoMosaico11Url(`/temp/${response.data.file}`);
      }
    } catch (err) {
      console.error("Ocorreu um erro durante o upload:", err);
    }
  };
  const handleImageFotosEvento12 = async (file: File) => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.file) {
        setFotoMosaico12Url(`/temp/${response.data.file}`);
      }
    } catch (err) {
      console.error("Ocorreu um erro durante o upload:", err);
    }
  };

  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;

      if (hash === "#historia") {
        const element = document.querySelector("#historia");

        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    };

    checkHash();

    window.addEventListener("hashchange", checkHash);

    return () => {
      window.removeEventListener("hashchange", checkHash);
    };
  }, []);

  const handleNomeEventoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNomeEvento(value);
  };

  const handleMensagemCurtaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMensagemCurta(value);
  };
  const handleDataEventoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDataEvento(value);
  };
  const handleHoraEventoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHoraEvento(value);
  };
  const handleSobreEventoChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setSobreEvento(value);
  };
  const handleFotosEventoTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setFotosEventoText(value);
  };
  const handleNomeDaRuaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNomeRua(value);
  };
  const handleComplementoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setComplementoRua(value);
  };
  const handleNumeroDaRuaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNumeroRua(value);
  };

  const handlePublishClick = async () => {
    const { event } = router.query;
    const userId = session.data?.id;

    const fields = {
      userId,
      nomeEvento,
      mensagemCurta,
      dataEvento,
      horaEvento,
      sobreEvento,
      fotosEventoText,
      nomeRua,
      complemento,
      numeroRua,
      nextHandlerIndex,
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
      event,
      cep,
    };

    setLoading(true);

    const payload = {
      ...fields,
    };

    const res = await axios.put(
      `/api/websites/editWebsite/${propSlug}`,
      payload
    );

    const data = await res.data;

    if (res.status === 200) {
      toast.success("Seu site foi criado com sucesso!", {
        icon: "🎉",
      });
    } else {
      toast.error(data.message || "Um erro ocorreu", {
        icon: <XCircle size={32} color="#ff3838" />,
      });
      setLoading(false);
      return;
    }

    setLoading(false);
    router.push({
      pathname: "/admin/congratulations",
      query: { slug: propSlug },
    });
  };

  useEffect(() => {
    if (loading) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }
  }, [loading]);

  const allHandlers = [
    handleImageFotosEvento1,
    handleImageFotosEvento2,
    handleImageFotosEvento3,
    handleImageFotosEvento4,
    handleImageFotosEvento5,
    handleImageFotosEvento6,
    handleImageFotosEvento7,
    handleImageFotosEvento8,
    handleImageFotosEvento9,
    handleImageFotosEvento10,
    handleImageFotosEvento11,
    handleImageFotosEvento12,
  ];

  const handleImageEventoGeneric = async (e: any) => {
    const file = e.target.files[0];
    console.log("Índices preenchidos antes:", filledIndices);

    if (!file) {
      return;
    }

    const nextUnfilledIndex = filledIndices.findIndex((isFilled) => !isFilled);

    if (nextUnfilledIndex === -1) return;

    const handlerFunction = allHandlers[nextUnfilledIndex];

    if (handlerFunction) {
      await handlerFunction(file);
      const newFilledIndices = [...filledIndices];
      newFilledIndices[nextUnfilledIndex] = true;
      setFilledIndices(newFilledIndices);
    }
  };

  return (
    <>
      {loading && (
        <div id="publishLoader">
          {/*@ts-ignore*/}
          <Lottie options={defaultOptionsGift} height={300} width={300} />
        </div>
      )}
      <div className={styles.headerCustomize}>
        <p>Personalize o tema escolhido </p>
        <img
          src="/close.svg"
          onClick={() => {
            if (
              window.confirm("Todos os dados serão apagados. Você tem certeza?")
            ) {
              localStorage.clear();
              router.push("/admin/dashboard");
            }
          }}
        />
      </div>

      {isRightSideVisible ? (
        <></>
      ) : (
        <div
          className={styles.continueEditing}
          onClick={handleContinueEditingClick}
        >
          <button>Continuar editando</button>
        </div>
      )}
      <div
        className={`${styles.container} ${
          isRightSideVisible ? "" : styles.exitContainer
        }`}
      >
        <div
          className={`${styles.leftSide} ${
            isRightSideVisible ? "" : styles.exitLeft
          }`}
        >
          <BirthdayForEdit
            nomeEvento={nomeEvento}
            dataEvento={dataEvento}
            horaEvento={horaEvento}
            mensagemCurta={mensagemCurta}
            sobreEvento={sobreEvento}
            fotosEventoText={fotosEventoText}
            nomeRua={nomeRua}
            complemento={complemento}
            numeroRua={numeroRua}
            cep={cep}
            nextHandlerIndex={0}
            event={""}
            slug={propSlug}
            fotoMosaico1Url={fotoMosaico1Url as string}
            fotoLocalUrl={fotoLocalUrl as string}
            fotoEventoUrl={fotoEventoUrl as string}
            bannerUrl={bannerUrl as string}
            fotoMosaico6Url={fotoMosaico6Url as string}
            fotoMosaico5Url={fotoMosaico5Url as string}
            fotoMosaico3Url={fotoMosaico3Url as string}
            fotoMosaico4Url={fotoMosaico4Url as string}
            fotoMosaico2Url={fotoMosaico2Url as string}
            fotoMosaico7Url={fotoMosaico7Url as string}
            fotoMosaico8Url={fotoMosaico8Url as string}
            fotoMosaico9Url={fotoMosaico9Url as string}
            fotoMosaico10Url={fotoMosaico10Url as string}
            fotoMosaico11Url={fotoMosaico11Url as string}
            fotoMosaico12Url={fotoMosaico12Url as string}
            gifts={propGifts}
          />
        </div>
        <div
          className={`${styles.rightSide} ${
            isRightSideVisible ? "" : styles.exit
          }`}
        >
          <div className={styles.headerAccordion}>
            <p>Personalize seu site</p>
          </div>

          <div
            className={getAccordionClass(activeAccordion === "Home")}
            onClick={() => toggleAccordion("Home")}
          >
            <p>Home / Início</p>
            {activeAccordion === "Home" ? (
              <img src="/arrowUp.svg" />
            ) : (
              <img src="/arrowDown.svg" />
            )}
          </div>
          {activeAccordion === "Home" && (
            <div className={styles.accordionContent}>
              <div className={styles.inputAccordion}>
                <label>Nome do Evento</label>
                <input
                  placeholder="A MELHOR FESTA DE TODAS"
                  type="text"
                  value={nomeEvento}
                  onChange={handleNomeEventoChange}
                />
              </div>
              <div className={styles.inputAccordion}>
                <label>Mensagem curta</label>
                <textarea
                  placeholder="Convidados e amigos, sejam todos bem-vindos a um lugar onde sonhos se tornam realidade. Nossa plataforma de presentes de Evento é o seu guia para uma jornada inesquecível rumo ao altar."
                  value={mensagemCurta}
                  onChange={handleMensagemCurtaChange}
                />
              </div>
              <div className={styles.inputAccordion}>
                <label>Data do Evento</label>
                <input
                  type="date"
                  value={dataEvento}
                  min={nextDay}
                  onChange={handleDataEventoChange}
                />
              </div>
              <div className={styles.inputAccordion}>
                <label>Hora do Evento</label>
                <input
                  type="time"
                  value={horaEvento}
                  onChange={handleHoraEventoChange}
                />
              </div>
            </div>
          )}
          <div
            className={getAccordionClass(activeAccordion === "Historia")}
            onClick={() => toggleAccordion("Historia")}
          >
            <p>Nossa história</p>
            {activeAccordion === "Historia" ? (
              <img src="/arrowUp.svg" />
            ) : (
              <img src="/arrowDown.svg" />
            )}
          </div>
          {activeAccordion === "Historia" && (
            <div className={styles.accordionContent}>
              <div className={styles.inputAccordion}>
                <label>Texto sobre o Evento</label>
                <textarea
                  placeholder="Noivos, convidados e amigos, sejam todos bem-vindos a um lugar onde sonhos se tornam realidade. Nossa plataforma de presentes de Evento é o seu guia para uma jornada inesquecível rumo ao altar."
                  value={sobreEvento}
                  onChange={handleSobreEventoChange}
                />
              </div>
              <div className={styles.inputAccordion}>
                <label>Foto do Aniversariante</label>
              </div>
              <div className={styles.PrintContainer}>
                <img src="/upload.png" className={styles.Upload} />
                <label htmlFor="fileInput" className={styles.LabelUpload}>
                  Arraste e jogue seu anexo aqui ou se preferir{" "}
                </label>
                <input
                  type="file"
                  accept=".jpeg, .jpg, .png"
                  onChange={handleImageFotoEventoChange}
                  id="fileInput"
                  style={{ display: "none" }}
                />
                <button className={styles.UploadButton} onClick={handleClick}>
                  Escolher arquivo
                </button>
                <p className={styles.UploadInfo}>
                  Formatos aceitos PDF, JPEG e PNG
                </p>
              </div>
              <div
                className={styles.FileSelected}
                style={{ display: isFileSelected ? "flex" : "none" }}
              >
                <img src="/file.png" className={styles.FileImg} />
                <div className={styles.FileSelectedStats}>
                  <div className={styles.FileSelectedName}>
                    {selectedFile && (
                      <p className={styles.FileInfo}>{selectedFile.name}</p>
                    )}
                    <p className={styles.FileInfo}>100%</p>
                  </div>

                  <div className={styles.FileSelectedBar}></div>
                </div>
                <img
                  src="/trash.png"
                  className={styles.FileDelete}
                  onClick={handleClearFileFotoEventoUrl}
                />
              </div>
            </div>
          )}
          <div
            className={getAccordionClass(activeAccordion === "FotosEvento")}
            onClick={() => toggleAccordion("FotosEvento")}
          >
            <p>Fotos do Evento</p>
            {activeAccordion === "FotosEvento" ? (
              <img src="/arrowUp.svg" />
            ) : (
              <img src="/arrowDown.svg" />
            )}
          </div>
          {activeAccordion === "FotosEvento" && (
            <div className={styles.accordionContent}>
              <div className={styles.PrintContainer}>
                <img src="/upload.png" className={styles.Upload} />
                <label htmlFor="fileInput" className={styles.LabelUpload}>
                  Arraste e jogue seu anexo aqui ou se preferir{" "}
                </label>
                <input
                  type="file"
                  accept=".jpeg, .jpg, .png"
                  onChange={handleImageEventoGeneric}
                  id="fileInput"
                  style={{ display: "none" }}
                />
                <button className={styles.UploadButton} onClick={handleClick}>
                  Escolher arquivo
                </button>
                <p className={styles.UploadInfo}>
                  Formatos aceitos PDF, JPEG e PNG
                </p>
              </div>
              <div
                className={styles.FileSelected}
                style={{ display: isFileSelected ? "flex" : "none" }}
              >
                <img src="/file.png" className={styles.FileImg} />
                <div className={styles.FileSelectedStats}>
                  <div className={styles.FileSelectedName}>
                    {selectedFile && (
                      <p className={styles.FileInfo}>{selectedFile.name}</p>
                    )}
                    <p className={styles.FileInfo}>100%</p>
                  </div>

                  <div className={styles.FileSelectedBar}></div>
                </div>
                <img
                  src="/trash.png"
                  className={styles.FileDelete}
                  onClick={handleClearFileBanner}
                />
              </div>
              <div className={styles.gridFotosBirthday}>
                {allFotoMosaicoUrls.map((imageSource, index) => {
                  return (
                    <div key={index} className={styles.gridImage}>
                      <img
                        src={imageSource || "/defaultMarried.png"}
                        alt={`Image ${index + 1}`}
                      />
                      <div
                        className={styles.trashIcon}
                        onClick={() => handleDeleteImage(index)}
                      >
                        <img src="/TrashSimple.svg" alt="Delete" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <div
            className={getAccordionClass(activeAccordion === "LocalDoEvento")}
            onClick={() => toggleAccordion("LocalDoEvento")}
          >
            <p>Local do Evento</p>
            {activeAccordion === "LocalDoEvento" ? (
              <img src="/arrowUp.svg" />
            ) : (
              <img src="/arrowDown.svg" />
            )}
          </div>
          {activeAccordion === "LocalDoEvento" && (
            <div className={styles.accordionContent}>
              <div className={styles.inputAccordion}>
                <label>Nome da rua</label>
                <input
                  placeholder="Avenida Iguaçu"
                  type="text"
                  value={nomeRua}
                  onChange={handleNomeDaRuaChange}
                />
              </div>
              <div className={styles.inputAccordion}>
                <label>Complemento</label>
                <input
                  placeholder="Próximo ao supermercado"
                  type="text"
                  value={complemento}
                  onChange={handleComplementoChange}
                />
              </div>
              <div className={styles.inputAccordion}>
                <label>Número</label>
                <input
                  placeholder="3001"
                  type="number"
                  value={numeroRua}
                  onChange={handleNumeroDaRuaChange}
                />
              </div>
              <div className={styles.inputAccordion}>
                <label>Digite o CEP</label>
                <input
                  value={cep}
                  onChange={handleCepChange}
                  placeholder="80240-031"
                  type="text"
                />
              </div>
              <div className={styles.inputAccordion}>
                <label>Foto do local</label>
              </div>
              <div className={styles.PrintContainer}>
                <img src="/upload.png" className={styles.Upload} />
                <label htmlFor="fileInput" className={styles.LabelUpload}>
                  Arraste e jogue seu anexo aqui ou se preferir{" "}
                </label>
                <input
                  type="file"
                  accept=".jpeg, .jpg, .png"
                  onChange={handleImageLocalChange}
                  id="fileInput"
                  style={{ display: "none" }}
                />
                <button className={styles.UploadButton} onClick={handleClick}>
                  Escolher arquivo
                </button>
                <p className={styles.UploadInfo}>
                  Formatos aceitos PDF, JPEG e PNG
                </p>
              </div>
            </div>
          )}
          <div className={styles.footerAccordion}>
            <button onClick={handlePublishClick}>Publicar</button>
            <button onClick={handlePreviewClick}>Ver prévia do site</button>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
