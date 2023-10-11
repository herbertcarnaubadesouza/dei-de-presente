import Header from "@/components/Admin/Header";
import TableUsers from "@/components/Admin/Table";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import styles from "../../styles/Dashboard.module.scss";

export default function Confirmations() {
  return (
    <>
      <div className={styles.container}>
        <Header />

        <div className={styles.presentesRecebidos}>
          <div className={styles.textSection}>
            <p>Confirmações</p>
            <span>
              Abaixo você vai visualizar quem confirmou presença no evento.
            </span>
          </div>
        </div>
      </div>
      <TableUsers />
    </>
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
