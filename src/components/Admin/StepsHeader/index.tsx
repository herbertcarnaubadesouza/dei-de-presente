import { useRouter } from "next/router";
import styles from "./styles.module.scss";

export default function StepsHeader() {
  const router = useRouter();

  const handleCancel = () => {
    const userConfirmed = window.confirm(
      "Tem certeza que deseja cancelar a criação do seu site?"
    );
    if (userConfirmed) {
      router.push("/admin/dashboard");
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <p>Novo evento</p>
          <img
            src="/CloseDei.svg"
            onClick={handleCancel}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </>
  );
}
