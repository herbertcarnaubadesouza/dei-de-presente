import axios from "axios";
import Link from "next/link";
import router from "next/router";
import { XCircle } from "phosphor-react";
import { useState } from "react";
import { toast } from "react-toastify";
import styles from "../styles/Create.module.scss";

export default function Create() {
  // Declare estados para cada input
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleCreateAccount = async () => {
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem", {
        icon: <XCircle size={32} color="#ff3838" />,
      });
      return;
    }

    try {
      const response = await axios.post("/api/createUser", {
        nome,
        email,
        password,
      });

      toast.success("Conta criada com sucesso!", {
        icon: <XCircle size={32} color="#32CD32" />,
      });

      router.push("/");
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        toast.error("Este email já está cadastrado!", {
          icon: <XCircle size={32} color="#ff3838" />,
        });
        return false;
      }
      console.error("Erro na criação da conta:", error);
    }
  };

  return (
    <div className={styles.Container}>
      <div className={styles.LoginContainer}>
        <div className={styles.Login}>
          <p className={styles.title}>Criar conta</p>
          <p className={styles.subtitle}>Preencha abaixo para criar conta</p>

          <p className={styles.label}>Seu nome</p>
          <input
            className={styles.field}
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <p className={styles.label}>Email</p>
          <input
            className={styles.field}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <p className={styles.label}>Senha</p>
          <input
            className={styles.field}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <p className={styles.label}>Confirmar Senha</p>
          <input
            className={styles.field}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button onClick={handleCreateAccount} className={styles.button}>
            Criar conta
          </button>

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
  );
}
