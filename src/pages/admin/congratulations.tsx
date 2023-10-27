import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/Congratulations.module.scss";

export default function Congratulations() {
  const router = useRouter();
  const { slug } = router.query;

  const handleButtonClick = () => {
    router.push(`/${slug}`);
  };

  const handleCancel = () => {
    localStorage.clear();
    router.push("/admin/dashboard");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <p>site no ar!</p>
          <img src="/close.svg" onClick={handleCancel} />
        </div>
      </div>

      <div className={styles.content}>
        <img src="/congratulations.svg" />
        <h2>Parabéns, Seu site já está no ar!</h2>
        <p>Compartilhe com com quiser, seu site está abaixo:</p>
        <Link href={`/${slug}`}>www.deidepresente.com.br/{slug}</Link>
        <p>Observação: Após 21 dias do evento, o site {slug} sairá do ar!</p>
        <button onClick={handleButtonClick}>ver site</button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
