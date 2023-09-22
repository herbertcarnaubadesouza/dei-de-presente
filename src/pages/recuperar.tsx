import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Login.module.scss";

export default function Login() {
  return (
    <>
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap');
        `}</style>
      </Head>

      <div className={styles.Container}>
        <div className={styles.ImageContainer}>
          <img className={styles.logo} src="/logoPresente.svg" alt="logo" />
          <div className={styles.Social}>
            <img src="facebook.svg" alt="facebook" />
            <img src="instagram.svg" alt="instagram" />
            <img src="twitter.svg" alt="twitter" />
          </div>
        </div>
        <div className={styles.LoginContainer}>
          <div className={styles.Login}>
            <p className={styles.title}>Recuperar senha</p>
            <p className={styles.subtitle}>Informe seu email de cadastro</p>

            <p className={styles.label}>Email</p>
            <input id="email" className={styles.field} type="email" />

            <button className={styles.button}>
              Enviar link de recuperação
            </button>

            <div className={styles.linha}></div>

            <div className={styles.sign}>
              <Link href="/" className={styles.create}>
                Voltar ao login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
