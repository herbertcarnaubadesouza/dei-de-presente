import { useState } from "react";
import styles from "./styles.module.scss";

export default function GiftsListFromSavedWebsite({ gifts }: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const giftsPerPage = 12;

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
          <p>presentes</p>
        </div>
        <div className={styles.titleGiftsSection}>
          <h2>Vai salvar o que dessa vez?</h2>
        </div>
        <div className={styles.giftsList}>
          <div className={styles.giftsListContainer}>
            {currentGifts.map((gift: any) => (
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
