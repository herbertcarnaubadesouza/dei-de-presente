import { defaultOptionsGift } from "@/animation";
import MarriedTemplate from "@/components/Templates/Wedding";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/react";
import router from "next/router";
import { XCircle } from "phosphor-react";
import { ChangeEvent, useEffect, useState } from "react";
import Lottie from "react-lottie";
import { toast } from "react-toastify";
import styles from "../../../styles/Customize.module.scss";

export default function CustomizeWedding() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isRightSideVisible, setIsRightSideVisible] = useState(true);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("Home");
  const [slug, setSlug] = useState("");
  const [nomeCasal, setNomeCasal] = useState("");
  const [mensagemCurta, setMensagemCurta] = useState("");
  const [dataCasamento, setDataCasamento] = useState("");
  const [horaCasamento, setHoraCasamento] = useState("");
  const [sobreCasal, setSobreCasal] = useState("");
  const [fotosCasalText, setFotosCasalText] = useState("");
  const [nomeRua, setNomeRua] = useState("");
  const [complemento, setComplementoRua] = useState("");
  const [numeroRua, setNumeroRua] = useState("");
  const [nextHandlerIndex, setNextHandlerIndex] = useState(1);
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const [fotoCasalUrl, setFotoCasalUrl] = useState<string | null>(null);
  const [fotoMosaico1Url, setFotoMosaico1Url] = useState<string | null>(null);
  const [fotoMosaico2Url, setFotoMosaico2Url] = useState<string | null>(null);
  const [fotoMosaico3Url, setFotoMosaico3Url] = useState<string | null>(null);
  const [fotoMosaico4Url, setFotoMosaico4Url] = useState<string | null>(null);
  const [fotoMosaico5Url, setFotoMosaico5Url] = useState<string | null>(null);
  const [fotoMosaico6Url, setFotoMosaico6Url] = useState<string | null>(null);
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

  const handleClearFile = () => {
    setSelectedFile(null);

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
        localStorage.setItem("fotoLocal", response.data.file);
        setFotoLocalUrl(`/temp/${response.data.file}`);
      }
    } catch (err) {
      console.error("Ocorreu um erro durante o upload:", err);
    }
  };

  const handleDeleteImage = async (index: number) => {
    const fileName = localStorage.getItem(`fotosCasal${index + 1}`);
    localStorage.removeItem(`fotosCasal${index + 1}`);

    if (fileName) {
      try {
        await axios.post("/api/upload/delete", { fileName });
        window.location.reload();
      } catch (err) {
        console.error("Erro ao deletar o arquivo", err);
      }
    }
  };

  const handleImageFotoCasalChange = async (e: any) => {
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
        localStorage.setItem("fotoCasal", response.data.file);
        setFotoCasalUrl(`/temp/${response.data.file}`);
      }
    } catch (err) {
      console.error("Ocorreu um erro durante o upload:", err);
    }
  };

  const handleImageCasalGeneric = async (e: any) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    switch (nextHandlerIndex) {
      case 1:
        await handleImageFotosCasal1(file);
        break;
      case 2:
        await handleImageFotosCasal2(file);
        break;
      case 3:
        await handleImageFotosCasal3(file);
        break;
      case 4:
        await handleImageFotosCasal4(file);
        break;
      case 5:
        await handleImageFotosCasal5(file);
        break;
      case 6:
        await handleImageFotosCasal6(file);
        break;
      default:
        break;
    }

    setNextHandlerIndex(nextHandlerIndex + 1);
  };

  const handleImageFotosCasal1 = async (file: File) => {
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
        localStorage.setItem("fotosCasal1", response.data.file);
        setFotoMosaico1Url(`/temp/${response.data.file}`);
      }
    } catch (err) {
      console.error("Ocorreu um erro durante o upload:", err);
    }
  };

  const handleImageFotosCasal2 = async (file: File) => {
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
        localStorage.setItem("fotosCasal2", response.data.file);
        setFotoMosaico2Url(`/temp/${response.data.file}`);
      }
    } catch (err) {
      console.error("Ocorreu um erro durante o upload:", err);
    }
  };

  const handleImageFotosCasal3 = async (file: File) => {
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
        localStorage.setItem("fotosCasal3", response.data.file);
        setFotoMosaico3Url(`/temp/${response.data.file}`);
      }
    } catch (err) {
      console.error("Ocorreu um erro durante o upload:", err);
    }
  };
  const handleImageFotosCasal4 = async (file: File) => {
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
        localStorage.setItem("fotosCasal4", response.data.file);
        setFotoMosaico4Url(`/temp/${response.data.file}`);
      }
    } catch (err) {
      console.error("Ocorreu um erro durante o upload:", err);
    }
  };
  const handleImageFotosCasal5 = async (file: File) => {
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
        localStorage.setItem("fotosCasal5", response.data.file);
        setFotoMosaico5Url(`/temp/${response.data.file}`);
      }
    } catch (err) {
      console.error("Ocorreu um erro durante o upload:", err);
    }
  };

  const handleImageFotosCasal6 = async (file: File) => {
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
        localStorage.setItem("fotosCasal6", response.data.file);
        setFotoMosaico6Url(`/temp/${response.data.file}`);
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

  useEffect(() => {
    const savedNomeCasal = localStorage.getItem("nomeCasal");
    if (savedNomeCasal) {
      setNomeCasal(savedNomeCasal);
    }
    const savedMensagemCurta = localStorage.getItem("mensagemCurta");
    if (savedMensagemCurta) {
      setMensagemCurta(savedMensagemCurta);
    }
    const savedDataCasamento = localStorage.getItem("dataCasamento");
    if (savedDataCasamento) {
      setDataCasamento(savedDataCasamento);
    }
    const savedHoraCasamento = localStorage.getItem("horaCasamento");
    if (savedHoraCasamento) {
      setHoraCasamento(savedHoraCasamento);
    }
    const savedSobreCasal = localStorage.getItem("sobreCasal");
    if (savedSobreCasal) {
      setSobreCasal(savedSobreCasal);
    }
    const savedFotosCasalText = localStorage.getItem("fotosCasalText");
    if (savedFotosCasalText) {
      setFotosCasalText(savedFotosCasalText);
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
    localStorage.setItem("nomeCasal", nomeCasal);
    localStorage.setItem("slug", slug);
    localStorage.setItem("mensagemCurta", mensagemCurta);
    localStorage.setItem("dataCasamento", dataCasamento);
    localStorage.setItem("horaCasamento", horaCasamento);
    localStorage.setItem("sobreCasal", sobreCasal);
    localStorage.setItem("fotosCasalText", fotosCasalText);
    localStorage.setItem("nomeDaRua", nomeRua);
    localStorage.setItem("complemento", complemento);
    localStorage.setItem("numeroDaRua", numeroRua);
    localStorage.setItem("cep", cep);
  }, [
    nomeCasal,
    mensagemCurta,
    dataCasamento,
    horaCasamento,
    sobreCasal,
    fotosCasalText,
    nomeRua,
    numeroRua,
    cep,
    complemento,
    slug,
  ]);

  const handleNomeCasalChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNomeCasal(value);
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
  const handleDataCasamentoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDataCasamento(value);
  };
  const handleHoraCasamentoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHoraCasamento(value);
  };
  const handleSobreCasalChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setSobreCasal(value);
  };
  const handleFotosCasalTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setFotosCasalText(value);
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
      nomeCasal,
      slug,
      mensagemCurta,
      dataCasamento,
      horaCasamento,
      sobreCasal,
      fotosCasalText,
      nomeRua,
      complemento,
      numeroRua,
      nextHandlerIndex,
      bannerUrl,
      fotoCasalUrl,
      fotoMosaico1Url,
      fotoMosaico2Url,
      fotoMosaico3Url,
      fotoMosaico4Url,
      fotoMosaico5Url,
      fotoMosaico6Url,
      fotoLocalUrl,
      event,
      cep,
    };

    for (const [key, value] of Object.entries(fields)) {
      if (!value) {
        let errorMessage = "Todos os campos devem ser preenchidos";

        switch (key) {
          case "fotoMosaico1Url":
          case "fotoMosaico2Url":
          case "fotoMosaico3Url":
          case "fotoMosaico4Url":
          case "fotoMosaico5Url":
          case "fotoMosaico6Url":
            errorMessage = "Insira 6 imagens do casal";
            break;
          case "fotoLocalUrl":
            errorMessage = "Insira uma foto do local";
            break;
          case "bannerUrl":
            errorMessage = "Insira uma foto para a capa do site";
            break;
          case "fotoCasalUrl":
            errorMessage = "Insira uma do casal para o site";
            break;
        }

        toast.error(errorMessage, {
          icon: <XCircle size={32} color="#ff3838" />,
        });

        return;
      }
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
          <MarriedTemplate
            nomeCasal={nomeCasal}
            dataCasamento={dataCasamento}
            horaCasamento={horaCasamento}
            mensagemCurta={mensagemCurta}
            sobreCasal={sobreCasal}
            fotosCasalText={fotosCasalText}
            nomeRua={nomeRua}
            complemento={complemento}
            numeroRua={numeroRua}
            cep={cep}
            bannerUrl={bannerUrl}
            fotoCasalUrl={fotoCasalUrl}
            fotoMosaico1Url={fotoMosaico1Url}
            fotoMosaico2Url={fotoMosaico2Url}
            fotoMosaico3Url={fotoMosaico3Url}
            fotoMosaico4Url={fotoMosaico4Url}
            fotoMosaico5Url={fotoMosaico5Url}
            fotoMosaico6Url={fotoMosaico6Url}
            fotoLocalUrl={fotoLocalUrl}
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
                <label>
                  Nome do seu site (www.deidepresente.com/nomedosite)
                </label>
                <input
                  placeholder="Exemplo: lauraeleonardo"
                  type="text"
                  value={slug}
                  onChange={handleSlugChange}
                />
              </div>
              <div className={styles.inputAccordion}>
                <label>Nome do casal</label>
                <input
                  placeholder="LAURA & LEONARDO"
                  type="text"
                  value={nomeCasal}
                  onChange={handleNomeCasalChange}
                />
              </div>
              <div className={styles.inputAccordion}>
                <label>Mensagem curta</label>
                <textarea
                  placeholder="Noivos, convidados e amigos, sejam todos bem-vindos a um lugar onde sonhos se tornam realidade. Nossa plataforma de presentes de casamento é o seu guia para uma jornada inesquecível rumo ao altar."
                  value={mensagemCurta}
                  onChange={handleMensagemCurtaChange}
                />
              </div>
              <div className={styles.inputAccordion}>
                <label>Data do casamento</label>
                <input
                  type="date"
                  value={dataCasamento}
                  min={nextDay}
                  onChange={handleDataCasamentoChange}
                />
              </div>
              <div className={styles.inputAccordion}>
                <label>Hora do casamento</label>
                <input
                  type="time"
                  value={horaCasamento}
                  onChange={handleHoraCasamentoChange}
                />
              </div>
              <div className={styles.inputAccordion}>
                <label>Banner do site</label>
              </div>
              <div className={styles.PrintContainer}>
                <img src="/upload.png" className={styles.Upload} />
                <label htmlFor="fileInput" className={styles.LabelUpload}>
                  Arraste e jogue seu anexo aqui ou se preferir{" "}
                </label>
                <input
                  type="file"
                  accept=" .jpeg, .jpg, .png"
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
                  onClick={handleClearFile}
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
                <label>Texto sobre o casal</label>
                <textarea
                  placeholder="Noivos, convidados e amigos, sejam todos bem-vindos a um lugar onde sonhos se tornam realidade. Nossa plataforma de presentes de casamento é o seu guia para uma jornada inesquecível rumo ao altar."
                  value={sobreCasal}
                  onChange={handleSobreCasalChange}
                />
              </div>
              <div className={styles.inputAccordion}>
                <label>Foto do casal</label>
              </div>
              <div className={styles.PrintContainer}>
                <img src="/upload.png" className={styles.Upload} />
                <label htmlFor="fileInput" className={styles.LabelUpload}>
                  Arraste e jogue seu anexo aqui ou se preferir{" "}
                </label>
                <input
                  type="file"
                  accept=".jpeg, .jpg, .png"
                  onChange={handleImageFotoCasalChange}
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
                  onClick={handleClearFile}
                />
              </div>
            </div>
          )}
          <div
            className={getAccordionClass(activeAccordion === "FotosCasal")}
            onClick={() => toggleAccordion("FotosCasal")}
          >
            <p>Fotos do casal</p>
            {activeAccordion === "FotosCasal" ? (
              <img src="/arrowUp.svg" />
            ) : (
              <img src="/arrowDown.svg" />
            )}
          </div>
          {activeAccordion === "FotosCasal" && (
            <div className={styles.accordionContent}>
              <div className={styles.inputAccordion}>
                <label>Mensagem curta</label>
                <textarea
                  placeholder="Noivos, convidados e amigos, sejam todos bem-vindos a um lugar onde sonhos se tornam realidade. Nossa plataforma de presentes de casamento é o seu guia para uma jornada inesquecível rumo ao altar."
                  value={fotosCasalText}
                  onChange={handleFotosCasalTextChange}
                />
              </div>
              <div className={styles.PrintContainer}>
                <img src="/upload.png" className={styles.Upload} />
                <label htmlFor="fileInput" className={styles.LabelUpload}>
                  Arraste e jogue seu anexo aqui ou se preferir{" "}
                </label>
                <input
                  type="file"
                  accept=".jpeg, .jpg, .png"
                  onChange={handleImageCasalGeneric}
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
                  onClick={handleClearFile}
                />
              </div>
              <div className={styles.gridFotos}>
                {[1, 2, 3, 4, 5, 6].map((item, index) => {
                  const fileNameFromLocalStorage = localStorage.getItem(
                    `fotosCasal${item}`
                  );
                  const imageSource = fileNameFromLocalStorage
                    ? `/temp/${fileNameFromLocalStorage}`
                    : "/defaultMarried.png";
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
            className={getAccordionClass(
              activeAccordion === "LocalDoCasamento"
            )}
            onClick={() => toggleAccordion("LocalDoCasamento")}
          >
            <p>Local do casamento</p>
            {activeAccordion === "LocalDoCasamento" ? (
              <img src="/arrowUp.svg" />
            ) : (
              <img src="/arrowDown.svg" />
            )}
          </div>
          {activeAccordion === "LocalDoCasamento" && (
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
