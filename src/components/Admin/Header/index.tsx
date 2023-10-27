import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

export default function Header() {
  const router = useRouter();
  const session = useSession();
  const [slug, setSlug] = useState(null);
  const [buttonLabel, setButtonLabel] = useState("Criar meu site");

  const isActive = (route: any) => {
    return route === router.pathname
      ? `${styles.menulink} ${styles.active}`
      : styles.menulink;
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  useEffect(() => {
    const userId = session.data?.id;

    fetch(`/api/websites/checkWebsites?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.slug) {
          setSlug(data.slug);
        }
      })

      .catch((error) => console.error("Failed to fetch websites:", error));
  }, []);

  const handleButtonClick = () => {
    if (slug) {
      window.open(`/${slug}`, "_blank");
    } else {
      router.push("/admin/event");
    }
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
            <button onClick={handleButtonClick}>
              {slug ? "Ver meu site" : "Criar meu site"}
            </button>
            <button onClick={handleSignOut} className={styles.logout}>
              Sair
            </button>
          </div>
        </div>
      </div>
      <div className={styles.stylewebsiteSection}>
        <Link href="/admin/event">
          <img className={styles.logo} src="/Pencil.svg" alt="logo" />
        </Link>
        {slug ? (
          <Link href={`/${slug}`}>Editar site criado</Link>
        ) : (
          <Link href="/admin/event">Personalizar um site</Link>
        )}
      </div>
    </>
  );
}
