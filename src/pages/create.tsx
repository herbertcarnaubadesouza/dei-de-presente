import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Create.module.scss";

export default function Create() {
  return (
    <>
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap');
        `}</style>
      </Head>

      <div className={styles.Container}>
        <div className={styles.LoginContainer}>
          <div className={styles.Login}>
            <p className={styles.title}>Criar conta</p>
            <p className={styles.subtitle}>Preencha abaixo para criar conta</p>

            <p className={styles.label}>Seu nome</p>
            <input id="nome" className={styles.field} type="text" />

            <p className={styles.label}>Email</p>
            <input id="email" className={styles.field} type="email" />

            <p className={styles.label}>Senha</p>
            <input id="password" className={styles.field} type="password" />

            <p className={styles.label}>Confirmar Senha</p>
            <input id="password" className={styles.field} type="password" />

            <button className={styles.button}>Criar conta</button>

            <div className={styles.linha}></div>

            <div className={styles.sign}>
              <p className={styles.signNew}>Já possui uma conta?</p>
              <Link href="/" className={styles.create}>
                Fazer login
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.ImageContainer}>
          <img className={styles.logo} src="/logoPresente.svg" alt="logo" />
          <div className={styles.Social}>
            <img src="facebook.svg" alt="facebook" />
            <img src="instagram.svg" alt="instagram" />
            <img src="twitter.svg" alt="twitter" />
          </div>
        </div>
      </div>
    </>
  );
}
