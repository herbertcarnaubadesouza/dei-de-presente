import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

export default function Header() {
  const router = useRouter();
  const session = useSession();
  const [slug, setSlug] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isActive = (route: any) => {
    return route === router.pathname
      ? `${styles.menulink} ${styles.active}`
      : styles.menulink;
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  const handleLinkClick = () => {
    setDrawerOpen(false);
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
      <section className={styles.headerblock}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.logoBlock}>
              <Link href="/admin/dashboard">
                <img
                  className={styles.logo}
                  src="/logoPresente.svg"
                  alt="logo"
                />
              </Link>
            </div>
            <div className={styles.leftSide}>
              <Link href="/admin/dashboard">
                <img
                  className={styles.logo}
                  src="/logoPresente.svg"
                  alt="logo"
                />
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
            <div className={styles.hamburguer}>
              <img src="/hamburguer.svg" alt="logo" onClick={toggleDrawer} />
            </div>
          </div>
        </div>
        <div className={styles.stylewebsiteSection}>
          <Link href="/admin/event">
            <img className={styles.logo} src="/Pencil.svg" alt="logo" />
          </Link>
          {slug ? (
            <Link href={`/admin/edit/${slug}`}>Editar site criado</Link>
          ) : (
            <Link href="/admin/event">Personalizar um site</Link>
          )}
        </div>
        <div className={`${styles.drawer} ${drawerOpen ? styles.open : ""}`}>
          <div className={styles.contentDrawer}>
            <div className={styles.topContentDrawer}>
              <img className={styles.logo} src="/logoPresente.svg" alt="logo" />
              <img
                className={styles.close}
                src="/close.svg"
                alt="logo"
                onClick={toggleDrawer}
              />
            </div>
            <div className={styles.middleContentDrawer}>
              <ul>
                {slug && (
                  <Link href={`/${slug}`}>
                    <li onClick={handleLinkClick}>ver meu site</li>
                  </Link>
                )}
                <Link href="/admin/gifts">
                  <li onClick={handleLinkClick}>presentes</li>
                </Link>
                <Link href="/admin/confirmations">
                  <li onClick={handleLinkClick}>confirmações</li>
                </Link>
              </ul>
              <button onClick={handleSignOut}>sair</button>
            </div>
          </div>
        </div>
        <div
          className={`${styles.overlay} ${drawerOpen ? styles.visible : ""}`}
          onClick={toggleDrawer}
        ></div>
      </section>
    </>
  );
}
