import { useState } from "react";
import styles from "./styles.module.scss";

interface Gift {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
}

interface GiftsListProps {
  gifts: Gift[];
  setShowSidebarEdit: React.Dispatch<React.SetStateAction<boolean>>;
  onEditGift: (id: string) => void;
}

export default function GiftsList({
  gifts,
  setShowSidebarEdit,
  onEditGift,
}: GiftsListProps) {
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
      <div className={styles.giftsList}>
        <div className={styles.giftsListContainer}>
          {currentGifts.map((gift, index) => (
            <div key={index} className={styles.tableGift}>
              <div className={styles.card}>
                <img className={styles.logo} src={gift?.imageUrl} alt="logo" />
                <p>{gift.name}</p>
                <span>
                  {parseFloat(gift.price?.toString()).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>

                <button
                  onClick={() => {
                    setShowSidebarEdit(true);
                    onEditGift(gift.id);
                  }}
                >
                  editar
                </button>
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
