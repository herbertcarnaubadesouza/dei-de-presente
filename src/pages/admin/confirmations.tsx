import Header from "@/components/Admin/Header";
import TableUsers from "@/components/Admin/Table";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "../../styles/Dashboard.module.scss";

export default function Confirmations() {
  const session = useSession();
  const [slug, setSlug] = useState(null);
  const [confirmedGuestsCount, setConfirmedGuestsCount] = useState(0);
  const [confirmedGuests, setConfirmedGuests] = useState([]);

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
  useEffect(() => {
    if (slug) {
      axios
        .get(`/api/websites/getAcompanhantes?slug=${slug}`)
        .then((response) => {
          console.log(response.data);
          setConfirmedGuestsCount(response.data.totalCount);
          setConfirmedGuests(response.data.confirmations);
        })
        .catch((error) =>
          console.error("Failed to fetch confirmed guests:", error)
        );
    }
  }, [slug]);
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
      <TableUsers confirmedGuests={confirmedGuests} />
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
