import { useState } from "react";
import styles from "./styles.module.scss";

// Definir um array de presentes
const gifts = Array(50).fill({
  title: "forma de bolo",
  price: "R$ 68,90",
});

export default function GiftsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const giftsPerPage = 12;

  // Calcular o número total de páginas
  const totalPages = Math.ceil(gifts.length / giftsPerPage);

  const indexOfLastGift = currentPage * giftsPerPage;
  const indexOfFirstGift = indexOfLastGift - giftsPerPage;
  const currentGifts = gifts.slice(indexOfFirstGift, indexOfLastGift);

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  // Ir para uma página específica
  const goToPage = (page: any) => setCurrentPage(page);

  return (
    <>
      <div className={styles.giftsList}>
        <div className={styles.giftsListContainer}>
          {currentGifts.map((gift, index) => (
            <div key={index} className={styles.tableGift}>
              <div className={styles.card}>
                <img className={styles.logo} src="/Rectangle.png" alt="logo" />
                <p>{gift.title}</p>
                <span>{gift.price}</span>
                <button>editar</button>
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
            alt="logo"
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
            alt="logo"
          />
        )}
      </div>
    </>
  );
}
