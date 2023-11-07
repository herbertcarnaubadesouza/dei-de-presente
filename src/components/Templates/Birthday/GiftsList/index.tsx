import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

interface Gift {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
}

export default function GiftsList() {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const giftsPerPage = 12;
  const session = useSession();

  useEffect(() => {
    const userId = session.data?.id;
    const fetchGifts = async () => {
      const res = await axios.get<Gift[]>("/api/gifts/getGifts", {
        params: { userId },
      });
      setGifts(res.data);
    };

    fetchGifts();
  }, []);

  const totalPages = Math.ceil(gifts.length / giftsPerPage);

  const indexOfLastGift = currentPage * giftsPerPage;
  const indexOfFirstGift = indexOfLastGift - giftsPerPage;
  const currentGifts = gifts.slice(indexOfFirstGift, indexOfLastGift);

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  const goToPage = (page: any) => setCurrentPage(page);

  return (
    <>
      <section className={styles.container}>
        <div className={styles.divisorGiftsSection}>
          <hr />
          <p>lista de presentes</p>
          <hr />
        </div>
        <div className={styles.titleGiftsSection}>
          <h2>hora de surpreender os noivos</h2>
        </div>
        <div className={styles.giftsList}>
          <div className={styles.giftsListContainer}>
            {currentGifts.map((gift) => (
              <div key={gift.id} className={styles.tableGift}>
                <div className={styles.card}>
                  <img
                    className={styles.logo}
                    src={gift.imageUrl}
                    alt={gift.name}
                  />
                  <p>{gift.name}</p>
                  <span>
                    {parseFloat(gift.price).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                  <button>comprar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.pagination}>
          {currentPage > 1 && (
            <img
              onClick={prevPage}
              className={styles.logo}
              src="/leftArrow.svg"
              alt="Previous"
            />
          )}
          {[...Array(totalPages).keys()].map((page) => (
            <span
              key={page + 1}
              onClick={() => goToPage(page + 1)}
              className={currentPage === page + 1 ? styles.active : ""}
            >
              {page + 1}
            </span>
          ))}
          {indexOfLastGift < gifts.length && (
            <img
              onClick={nextPage}
              className={styles.logo}
              src="/rightArrow.svg"
              alt="Next"
            />
          )}
        </div>
      </section>
    </>
  );
}
