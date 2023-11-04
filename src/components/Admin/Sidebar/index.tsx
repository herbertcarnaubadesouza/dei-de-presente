import { defaultOptions } from "@/animation";
import axios from "axios";
import { useSession } from "next-auth/react";
import { XCircle } from "phosphor-react";
import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";

const Sidebar = ({ showSidebar, setShowSidebar, onGiftAdded }: any) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [giftName, setGiftName] = useState<string>("");
  const [giftValue, setGiftValue] = useState<number | null>(null);
  const [formattedGiftValue, setFormattedGiftValue] = useState<string>("");
  const [isFileSelected, setIsFileSelected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const session = useSession();

  useEffect(() => {
    setIsFileSelected(false);
    setImageFile(null);
    setGiftName("");
    setFormattedGiftValue("");
    setIsLoading(false);
  }, [showSidebar, setShowSidebar, onGiftAdded]);

  const clearStates = () => {
    setImageFile(null);
    setGiftName("");
    setGiftValue(null);
    setIsFileSelected(false);
    setIsLoading(false);
  };

  const handleClearFile = () => {
    setImageFile(null);
    setIsFileSelected(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setIsFileSelected(true);
    }
  };

  const handleAdd = async () => {
    const userId = session.data?.id;

    setIsLoading(true);
    if (!imageFile || !giftName || !giftValue) {
      toast.error("Preencha todos os campos, por favor!", {
        icon: <XCircle size={32} color="#ff3838" />,
      });
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const uploadResponse = await axios.post("/api/upload/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (uploadResponse.data.file) {
        const imageUrl = `/temp/${uploadResponse.data.file}`;
        await axios.post("/api/gifts/saveGift", {
          imageUrl,
          giftName,
          giftValue,
          userId,
        });

        toast.success("Presente salvo com sucesso!", {
          icon: "🎉",
        });
        setShowSidebar(false);
        onGiftAdded();
      }
    } catch (error) {
      console.error("Ocorreu um problema ao salvar os dados:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (value.startsWith("R$ ")) {
      value = value.substring(3);
    }

    value = value.replace(/[^\d]/g, "");

    if (value === "") {
      setGiftValue(null);
      setFormattedGiftValue("R$ ");
      return;
    }

    const parsedValue = parseFloat(value) / 100;
    setGiftValue(parsedValue);
    setFormattedGiftValue(
      `R$ ${parsedValue
        .toFixed(2)
        .replace(".", ",")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
    );
  };

  return (
    <div className={`${styles.sidebar} ${showSidebar ? styles.show : ""}`}>
      <div className={styles.contentSidebar}>
        <div className={styles.firstBlockSideBar}>
          <label htmlFor="giftFileInput">
            <img src="/giftImage.png" alt="Gift"></img>
            <span>Enviar foto</span>
          </label>
          <input
            type="file"
            id="giftFileInput"
            style={{ display: "none" }}
            onChange={handleImageChange}
            accept=".jpg, .jpeg, .png"
          />
        </div>
        <div
          className={styles.FileSelected}
          style={{ display: isFileSelected ? "flex" : "none" }}
        >
          <img src="/file.png" className={styles.FileImg} />
          <div className={styles.FileSelectedStats}>
            <div className={styles.FileSelectedName}>
              {imageFile && <p className={styles.FileInfo}>{imageFile.name}</p>}
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
        <div className={styles.title}>
          <p>Adicionar presente</p>
        </div>
        <div className={styles.secondBlockSideBar}>
          <div className={styles.inputblock}>
            <span>Nome do presente</span>
            <input
              placeholder="Forma de bolo"
              type="text"
              value={giftName}
              onChange={(e) => setGiftName(e.target.value)}
            />
          </div>
          <div className={styles.inputblock}>
            <span>Valor</span>
            <input
              placeholder="Digite um valor"
              type="text"
              onChange={handleValueChange}
              value={formattedGiftValue}
            />
            <span
              style={{ marginTop: "8px", fontSize: "10px", marginLeft: "5px" }}
            >
              *Observação: O valor dos presente será acrescentado uma taxa de
              7.5%
            </span>
          </div>
        </div>
        <div className={styles.buttonsBlockSideBar}>
          <button className={styles.addButton} onClick={handleAdd}>
            {isLoading ? (
              /*@ts-ignore*/
              <Lottie
                style={{ marginTop: "-10px" }}
                options={defaultOptions}
                height={40}
                width={50}
              />
            ) : (
              "ADICIONAR"
            )}
          </button>
          <button
            className={styles.cancel}
            onClick={() => {
              setShowSidebar(false);
              clearStates();
            }}
          >
            CANCELAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
