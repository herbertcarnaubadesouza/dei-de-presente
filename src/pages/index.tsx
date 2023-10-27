import { defaultOptions } from "@/animation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { XCircle } from "phosphor-react";
import { useState } from "react";
import Lottie from "react-lottie";
import { toast } from "react-toastify";
import styles from "../styles/Login.module.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      toast.error("Usuário ou senha inválidos!", {
        icon: <XCircle size={32} color="#ff3838" weight="fill" />,
      });
      setIsLoading(false);
    } else {
      toast.success("Autenticado com sucesso!", {
        icon: "🎉",
      });
      setIsLoading(false);
      router.push("/admin/dashboard");
    }
  };

  return (
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
          <input
            id="email"
            className={styles.field}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <p className={styles.label}>Senha</p>
          <input
            id="senha"
            className={styles.field}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Link href="/recuperar" className={styles.forget}>
            Esqueci minha senha
          </Link>

          <button onClick={handleLogin} className={styles.button}>
            {isLoading ? (
              /*@ts-ignore*/
              <Lottie options={defaultOptions} height={40} width={50} />
            ) : (
              "Entrar"
            )}
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
  );
}
