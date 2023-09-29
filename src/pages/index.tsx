import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Login.module.scss";

interface Login {
  id: string;
  Login: string;

  Senha: string;
}

export default function Login() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/dashboard");
  };

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
            <p className={styles.title}>Login</p>
            <p className={styles.subtitle}>Informe seu acesso para entrar</p>

            <p className={styles.label}>Email</p>
            <input id="email" className={styles.field} type="email" />

            <p className={styles.label}>Senha</p>
            <input id="senha" className={styles.field} type="password" />

            <Link href="/recuperar" className={styles.forget}>
              Esqueci minha senha
            </Link>

            <button onClick={handleLogin} className={styles.button}>
              Entrar
            </button>

            <div className={styles.linha}></div>

            <div className={styles.sign}>
              <p className={styles.signNew}>Ainda não tem uma conta? </p>
              <Link href="/create" className={styles.create}>
                Criar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
