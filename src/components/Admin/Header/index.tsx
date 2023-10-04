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
            <Link href="/admin/dashboard">
              <img className={styles.logo} src="/logoPresente.svg" alt="logo" />
            </Link>
            <Link href="/admin/gifts" className={isActive("/admin/gifts")}>
              Presentes
            </Link>
            <Link
              href="/admin/confirmations"
              className={isActive("/admin/confirmations")}
            >
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
        <Link href="/admin/event">
          <img className={styles.logo} src="/Pencil.svg" alt="logo" />
        </Link>
        <Link href="/admin/event">Personalizar site</Link>
      </div>
    </>
  );
}
