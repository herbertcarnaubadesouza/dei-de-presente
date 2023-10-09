import MarriedTemplate from "@/components/Templates/Married";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "../../styles/Customize.module.scss";

export default function Customize() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("Home");

  const [cep, setCep] = useState("");

  const handleCepChange = (e: any) => {
    let value = e.target.value;

    value = value.replace(/\D/g, "");

    if (value.length <= 5) {
      value = value.replace(/^(\d{0,5})/, "$1");
    } else {
      value = value.replace(/^(\d{0,5})(\d{0,3})/, "$1-$2");
    }

    setCep(value.substring(0, 9));
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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);

    if (file) {
      setIsFileSelected(true);
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

  return (
    <>
      <div className={styles.headerCustomize}>
        <p>Personalize o tema escolhido </p>
        <img src="/close.svg" />
      </div>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <MarriedTemplate />
        </div>
        <div className={styles.rightSide}>
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
                <label>Nome do casal</label>
                <input placeholder="LAURA & LEONARDO" type="text" />
              </div>
              <div className={styles.inputAccordion}>
                <label>Mensagem curta</label>
                <textarea placeholder="Noivos, convidados e amigos, sejam todos bem-vindos a um lugar onde sonhos se tornam realidade. Nossa plataforma de presentes de casamento é o seu guia para uma jornada inesquecível rumo ao altar." />
              </div>
              <div className={styles.inputAccordion}>
                <label>Data do casamento</label>
                <input type="date" />
              </div>
              <div className={styles.inputAccordion}>
                <label>Hora do casamento</label>
                <input type="time" />
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
                  accept=".pdf, .jpeg, .jpg, .png"
                  onChange={handleFileChange}
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
                <textarea placeholder="Noivos, convidados e amigos, sejam todos bem-vindos a um lugar onde sonhos se tornam realidade. Nossa plataforma de presentes de casamento é o seu guia para uma jornada inesquecível rumo ao altar." />
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
                  accept=".pdf, .jpeg, .jpg, .png"
                  onChange={handleFileChange}
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
                <textarea placeholder="Noivos, convidados e amigos, sejam todos bem-vindos a um lugar onde sonhos se tornam realidade. Nossa plataforma de presentes de casamento é o seu guia para uma jornada inesquecível rumo ao altar." />
              </div>
              <div className={styles.PrintContainer}>
                <img src="/upload.png" className={styles.Upload} />
                <label htmlFor="fileInput" className={styles.LabelUpload}>
                  Arraste e jogue seu anexo aqui ou se preferir{" "}
                </label>
                <input
                  type="file"
                  accept=".pdf, .jpeg, .jpg, .png"
                  onChange={handleFileChange}
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
                {[1, 2, 3, 4, 5, 6].map((item, index) => (
                  <div key={index} className={styles.gridImage}>
                    <img src="/defaultMarried.png" alt={`Image ${index}`} />
                    <div className={styles.trashIcon}>
                      <img src="/TrashSimple.svg" alt="Delete" />
                    </div>
                  </div>
                ))}
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
                <input placeholder="Avenida Iguaçu" type="text" />
              </div>
              <div className={styles.inputAccordion}>
                <label>Número</label>
                <input placeholder="3001" type="number" />
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
            </div>
          )}
        </div>
      </div>
    </>
  );
}
