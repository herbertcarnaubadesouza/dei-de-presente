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
import NightClubForEdit from "./NightClubForEdit";

export default function EditNightClub() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isRightSideVisible, setIsRightSideVisible] = useState(true);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("Home");
  const [slug, setSlug] = useState("");
  const [nomeEvento, setNomeEvento] = useState("");
  const [mensagemCurta, setMensagemCurta] = useState("");
  const [dataEvento, setDataEvento] = useState("");
  const [horaEvento, setHoraEvento] = useState("");
  const [sobreEvento, setSobreEvento] = useState("");
  const [fotosEventoText, setFotosEventoText] = useState("");
  const [nomeRua, setNomeRua] = useState("");
  const [complemento, setComplementoRua] = useState("");
  const [numeroRua, setNumeroRua] = useState("");
  const [nextHandlerIndex, setNextHandlerIndex] = useState(1);

  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const [fotoEventoUrl, setFotoEventoUrl] = useState<string | null>(null);
  const [fotoMosaico1Url, setFotoMosaico1Url] = useState<string | null>(null);
  const [fotoMosaico2Url, setFotoMosaico2Url] = useState<string | null>(null);
  const [fotoMosaico3Url, setFotoMosaico3Url] = useState<string | null>(null);
  const [fotoMosaico4Url, setFotoMosaico4Url] = useState<string | null>(null);
  const [fotoMosaico5Url, setFotoMosaico5Url] = useState<string | null>(null);
  const [fotoMosaico6Url, setFotoMosaico6Url] = useState<string | null>(null);
  const [fotoMosaico7Url, setFotoMosaico7Url] = useState<string | null>(null);
  const [fotoMosaico8Url, setFotoMosaico8Url] = useState<string | null>(null);
  const [fotoMosaico9Url, setFotoMosaico9Url] = useState<string | null>(null);
  const [fotoMosaico10Url, setFotoMosaico10Url] = useState<string | null>(null);
  const [fotoMosaico11Url, setFotoMosaico11Url] = useState<string | null>(null);
  const [fotoMosaico12Url, setFotoMosaico12Url] = useState<string | null>(null);
  const [fotoLocalUrl, setFotoLocalUrl] = useState<string | null>(null);
  const [cep, setCep] = useState("");
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
    localStorage.removeItem("fotoEventoUrl");

    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }

    setIsFileSelected(false);
  };

  const handleClearFileFotoLocalUrl = () => {
    setFotoLocalUrl(null);

    localStorage.removeItem("fotoLocalUrl");

    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }

    setIsFileSelected(false);
  };

  const handleClearFileBanner = () => {
    setBannerUrl(null);

    localStorage.removeItem("fotoBanner");

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
        localStorage.setItem("fotoBanner", response.data.file);
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
        localStorage.setItem("fotoLocalUrl", response.data.file);
        setFotoLocalUrl(`/temp/${response.data.file}`);
      }
    } catch (err) {
      console.error("Ocorreu um erro durante o upload:", err);
    }
  };

  const handleDeleteImage = async (index: number) => {
    const fileName = localStorage.getItem(`fotoMosaico${index + 1}Url`);
    localStorage.removeItem(`fotoMosaico${index + 1}Url`);

    if (fileName) {
      try {
        await axios.post("/api/upload/delete", { fileName });
        window.location.reload();
      } catch (err) {
        console.error("Erro ao deletar o arquivo", err);
      }
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
        localStorage.setItem("fotoEventoUrl", response.data.file);
        setFotoEventoUrl(`/temp/${response.data.file}`);
      }
    } catch (err) {
      console.error("Ocorreu um erro durante o upload:", err);
    }
  };

  const handleImageEventoGeneric = async (e: any) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    switch (nextHandlerIndex) {
      case 1:
        await handleImageFotosEvento1(file);
        break;
      case 2:
        await handleImageFotosEvento2(file);
        break;
      case 3:
        await handleImageFotosEvento3(file);
        break;
      case 4:
        await handleImageFotosEvento4(file);
        break;
      case 5:
        await handleImageFotosEvento5(file);
        break;
      case 6:
        await handleImageFotosEvento6(file);
        break;
      case 7:
        await handleImageFotosEvento7(file);
        break;
      case 8:
        await handleImageFotosEvento8(file);
        break;
      case 9:
        await handleImageFotosEvento9(file);
        break;
      case 10:
        await handleImageFotosEvento10(file);
        break;
      case 11:
        await handleImageFotosEvento11(file);
        break;
      case 12:
        await handleImageFotosEvento12(file);
        break;
      default:
        break;
    }

    setNextHandlerIndex(nextHandlerIndex + 1);
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
        localStorage.setItem("fotoMosaico1Url", response.data.file);
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
        localStorage.setItem("fotoMosaico2Url", response.data.file);
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
        localStorage.setItem("fotoMosaico3Url", response.data.file);
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
        localStorage.setItem("fotoMosaico4Url", response.data.file);
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
        localStorage.setItem("fotoMosaico5Url", response.data.file);
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
        localStorage.setItem("fotoMosaico6Url", response.data.file);
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
        localStorage.setItem("fotoMosaico7Url", response.data.file);
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
        localStorage.setItem("fotoMosaico8Url", response.data.file);
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
        localStorage.setItem("fotoMosaico9Url", response.data.file);
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
        localStorage.setItem("fotoMosaico10Url", response.data.file);
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
        localStorage.setItem("fotoMosaico11Url", response.data.file);
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
        localStorage.setItem("fotoMosaico12Url", response.data.file);
        setFotoMosaico12Url(`/temp/${response.data.file}`);
      }
    } catch (err) {
      console.error("Ocorreu um erro durante o upload:", err);
    }
  };

  useEffect(() => {
    const originalBackgroundColor = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#09a9b5";
    return () => {
      document.body.style.backgroundColor = originalBackgroundColor;
    };
  }, []);

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
  useEffect(() => {
    if (bannerUrl) {
      setBannerUrl(localStorage.getItem("fotoBanner"));
    }
    if (fotoEventoUrl) {
      setFotoEventoUrl(localStorage.getItem("fotoEventoUrl"));
    }
    if (fotoLocalUrl) {
      setFotoLocalUrl(localStorage.getItem("fotoLocalUrl"));
    }
  }, []);

  useEffect(() => {
    const savedNomeEvento = localStorage.getItem("nomeEvento");
    if (savedNomeEvento) {
      setNomeEvento(savedNomeEvento);
    }
    const savedMensagemCurta = localStorage.getItem("mensagemCurta");
    if (savedMensagemCurta) {
      setMensagemCurta(savedMensagemCurta);
    }
    const savedDataEvento = localStorage.getItem("dataEvento");
    if (savedDataEvento) {
      setDataEvento(savedDataEvento);
    }
    const savedHoraEvento = localStorage.getItem("horaEvento");
    if (savedHoraEvento) {
      setHoraEvento(savedHoraEvento);
    }
    const savedSobreEvento = localStorage.getItem("sobreEvento");
    if (savedSobreEvento) {
      setSobreEvento(savedSobreEvento);
    }
    const savedFotosEventoText = localStorage.getItem("fotosEventoText");
    if (savedFotosEventoText) {
      setFotosEventoText(savedFotosEventoText);
    }
    const savedNomeRua = localStorage.getItem("nomeDaRua");
    if (savedNomeRua) {
      setNomeRua(savedNomeRua);
    }
    const savedNumeroRua = localStorage.getItem("numeroDaRua");
    if (savedNumeroRua) {
      setNumeroRua(savedNumeroRua);
    }
    const savedComplemento = localStorage.getItem("complemento");
    if (savedComplemento) {
      setComplementoRua(savedComplemento);
    }
    const savedCep = localStorage.getItem("cep");
    if (savedCep) {
      setCep(savedCep);
    }
    const savedSlug = localStorage.getItem("slug");
    if (savedSlug) {
      setSlug(savedSlug);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("nomeEvento", nomeEvento);
    localStorage.setItem("slug", slug);
    localStorage.setItem("mensagemCurta", mensagemCurta);
    localStorage.setItem("dataEvento", dataEvento);
    localStorage.setItem("horaEvento", horaEvento);
    localStorage.setItem("sobreEvento", sobreEvento);
    localStorage.setItem("fotosEventoText", fotosEventoText);
    localStorage.setItem("nomeDaRua", nomeRua);
    localStorage.setItem("complemento", complemento);
    localStorage.setItem("numeroDaRua", numeroRua);
    localStorage.setItem("cep", cep);
  }, [
    nomeEvento,
    mensagemCurta,
    dataEvento,
    horaEvento,
    sobreEvento,
    fotosEventoText,
    nomeRua,
    numeroRua,
    cep,
    complemento,
    slug,
  ]);

  const handleNomeEventoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNomeEvento(value);
  };
  const handleSlugChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.toLowerCase();
    value = value.replace(/\s+/g, "");
    value = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    setSlug(value);
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
      slug,
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

    if (!fields.slug) {
      toast.error("O nome do site é obrigatório!", {
        icon: <XCircle size={32} color="#ff3838" />,
      });
      return;
    }
    setLoading(true);

    const payload = {
      ...fields,
    };

    const res = await fetch("/api/websites/saveWebsite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Seu site foi criado com sucesso!", {
        icon: "🎉",
      });
    } else {
      if (data.error === "slug_already_exists") {
        toast.error(
          `O nome do site ${fields.slug} já está sendo usado. Por favor, escolha outro.`,
          {
            icon: <XCircle size={32} color="#ff3838" />,
          }
        );
        setLoading(false);
        return;
      } else {
        toast.error(data.message || "Um erro ocorreu", {
          icon: <XCircle size={32} color="#ff3838" />,
        });
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    router.push({
      pathname: "/admin/congratulations",
      query: { slug: fields.slug },
    });
  };

  useEffect(() => {
    if (loading) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }
  }, [loading]);

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
          <NightClubForEdit
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
            slug={""}
            fotoMosaico1Url={""}
            fotoLocalUrl={""}
            fotoEventoUrl={""}
            bannerUrl={""}
            fotoMosaico6Url={""}
            fotoMosaico5Url={""}
            fotoMosaico3Url={""}
            fotoMosaico4Url={""}
            fotoMosaico2Url={""}
            fotoMosaico7Url={""}
            fotoMosaico8Url={""}
            fotoMosaico9Url={""}
            fotoMosaico10Url={""}
            fotoMosaico11Url={""}
            fotoMosaico12Url={""}
            gifts={[]}
          />
        </div>
        <div
          className={`${styles.rightSide} ${
            isRightSideVisible ? "" : styles.exit
          }`}
        >
          <div className={styles.headerAccordion}>
            <p>Edite seu site</p>
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
                <label>
                  Nome do seu site (www.deidepresente.com/nomedosite)
                </label>
                <input
                  placeholder="Exemplo: festacountry"
                  type="text"
                  value={slug}
                  onChange={handleSlugChange}
                />
              </div>
              <div className={styles.inputAccordion}>
                <label>Nome do evento</label>
                <input
                  placeholder="Venha comemorar meus 18 anos"
                  type="text"
                  value={nomeEvento}
                  onChange={handleNomeEventoChange}
                />
              </div>
              <div className={styles.inputAccordion}>
                <label>Mensagem curta</label>
                <textarea
                  placeholder="Fala, galera! Preparados pra curtir a noite toda? Aqui é onde a festa acontece, do pré ao after! Vem com a gente e torna essa balada inesquecível! Apenas amigos mais próximos foram convidados!"
                  value={mensagemCurta}
                  onChange={handleMensagemCurtaChange}
                />
              </div>
              <div className={styles.inputAccordion}>
                <label>Data do evento</label>
                <input
                  type="date"
                  value={dataEvento}
                  min={nextDay}
                  onChange={handleDataEventoChange}
                />
              </div>
              <div className={styles.inputAccordion}>
                <label>Hora do evento</label>
                <input
                  type="time"
                  value={horaEvento}
                  onChange={handleHoraEventoChange}
                />
              </div>
              <div className={styles.inputAccordion}>
                <label>Banner do site (opcional)</label>
              </div>
              <div className={styles.PrintContainer}>
                <img src="/upload.png" className={styles.Upload} />
                <label htmlFor="fileInput" className={styles.LabelUpload}>
                  Arraste e jogue seu anexo aqui ou se preferir{" "}
                </label>
                <input
                  type="file"
                  accept=" .jpeg, .jpg, .png, .webp"
                  onChange={handleImageBannerChange}
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

              {bannerUrl && (
                <div className={styles.FileSelected}>
                  <img src="/file.png" className={styles.FileImg} />
                  <div className={styles.FileSelectedStats}>
                    <div className={styles.FileSelectedName}>
                      <p className={styles.FileInfo}>{bannerUrl}</p>
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
              )}
            </div>
          )}
          <div
            className={getAccordionClass(activeAccordion === "Historia")}
            onClick={() => toggleAccordion("Historia")}
          >
            <p>Sobre o evento</p>
            {activeAccordion === "Historia" ? (
              <img src="/arrowUp.svg" />
            ) : (
              <img src="/arrowDown.svg" />
            )}
          </div>
          {activeAccordion === "Historia" && (
            <div className={styles.accordionContent}>
              <div className={styles.inputAccordion}>
                <label>Texto sobre o evento</label>
                <textarea
                  placeholder="Fala, galera! Preparados pra curtir a noite toda? Aqui é onde a festa acontece, do pré ao after! Vem com a gente e torna essa balada inesquecível! Apenas amigos mais próximos foram convidados!"
                  value={sobreEvento}
                  onChange={handleSobreEventoChange}
                />
              </div>
              <div className={styles.inputAccordion}>
                <label>Foto do evento (opcional)</label>
              </div>
              <div className={styles.PrintContainer}>
                <img src="/upload.png" className={styles.Upload} />
                <label htmlFor="fileInput" className={styles.LabelUpload}>
                  Arraste e jogue seu anexo aqui ou se preferir{" "}
                </label>
                <input
                  type="file"
                  accept=".jpeg, .jpg, .png, .webp"
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
              {fotoEventoUrl && (
                <div className={styles.FileSelected}>
                  <img src="/file.png" className={styles.FileImg} />
                  <div className={styles.FileSelectedStats}>
                    <div className={styles.FileSelectedName}>
                      <p className={styles.FileInfo}>{fotoEventoUrl}</p>
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
              )}
            </div>
          )}
          <div
            className={getAccordionClass(activeAccordion === "FotosEvento")}
            onClick={() => toggleAccordion("FotosEvento")}
          >
            <p>Fotos do evento</p>
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
                  accept=".jpeg, .jpg, .png, .webp"
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
              <div className={styles.gridFotos}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => {
                  const fileNameFromLocalStorage = localStorage.getItem(
                    `fotoMosaico${item}Url`
                  );
                  const imageSource = fileNameFromLocalStorage
                    ? `/temp/${fileNameFromLocalStorage}`
                    : "/night-club-3.webp";
                  return (
                    <div key={index} className={styles.gridImage}>
                      <img src={imageSource} alt={`Image ${index}`} />
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
            <p>Local do evento</p>
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
                  accept=".jpeg, .jpg, .png, .webp"
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
              {fotoLocalUrl && (
                <div className={styles.FileSelected}>
                  <img src="/file.png" className={styles.FileImg} />
                  <div className={styles.FileSelectedStats}>
                    <div className={styles.FileSelectedName}>
                      <p className={styles.FileInfo}>{fotoLocalUrl}</p>
                      <p className={styles.FileInfo}>100%</p>
                    </div>
                    <div className={styles.FileSelectedBar}></div>
                  </div>
                  <img
                    src="/trash.png"
                    className={styles.FileDelete}
                    onClick={handleClearFileFotoLocalUrl}
                  />
                </div>
              )}
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
