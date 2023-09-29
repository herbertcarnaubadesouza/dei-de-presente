import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";

export default function Header() {
  const router = useRouter();

  const isActive = (route: any) => {
    return route === router.pathname
      ? `${styles.menulink} ${styles.active}`
      : styles.menulink;
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.leftSide}>
            <Link href="/dashboard">
              <img className={styles.logo} src="/logoPresente.svg" alt="logo" />
            </Link>
            <Link href="/gifts" className={isActive("/gifts")}>
              Presentes
            </Link>
            <Link href="/confirmations" className={isActive("/confirmations")}>
              Confirmações
            </Link>
          </div>
          <div className={styles.rightSide}>
            <Link href="/confirmacoes">Meu perfil</Link>
            <button>ver meu site</button>
          </div>
        </div>
      </div>
      <div className={styles.stylewebsiteSection}>
        <img className={styles.logo} src="/Pencil.svg" alt="logo" />
        <Link href="">Personalizar site</Link>
      </div>
    </>
  );
}
