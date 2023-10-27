import PaymentMercadoPago from "@/components/Payment";
import { Gift } from "@/components/Web/Wedding";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/Teste.module.scss";

export default function Checkout() {
  const router = useRouter();
  const { id } = router.query;
  const [gift, setGift] = useState<Gift | null>(null);
  const session = useSession();

  useEffect(() => {
    if (id) {
      const userId = session.data?.id;

      fetch(`/api/gifts/getGiftById/${id}?userId=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setGift(data);
        })
        .catch((error) => {
          console.error("Houve um erro ao buscar o presente:", error);
        });
    }
  }, [id]);

  const handleClose = () => {
    const userConfirmed = window.confirm(
      "Você tem certeza de que deseja fechar? Todos os seus dados serão perdidos!"
    );
    if (userConfirmed) {
      window.history.back();
    }
  };

  return (
    <>
      <div className={styles.headerPayment}>
        <div className={styles.headerContent}>
          <p>pagamento</p>
          <img src="/CloseDei.svg" onClick={handleClose} />
        </div>
      </div>
      <div className={styles.paymentContentContainer}>
        <div className={styles.paymentContent}>
          <div className={styles.leftSide}>
            <div className={styles.titleBlock}>
              <div className={styles.pedidoTitleBlock}>
                <h2>Resumo do pedido</h2>
                <p>Confira abaixo os valores cobrados</p>
              </div>
              <div className={styles.compraSeguraCard}>
                <img src="/compraSegura.svg" />
                <span>Compra segura</span>
              </div>
            </div>
            <div className={styles.middleContentPaymentMethod}>
              <img src={gift?.imageUrl} />
              <h3>{gift?.name}</h3>
            </div>
            <div className={styles.resumoCompraFooter}>
              <h4>Resumo da compra</h4>
              <div className={styles.footerPayments}>
                <div className={styles.rowPayment}>
                  <p>Valor do presente</p>
                  <p>
                    {gift &&
                      parseFloat(
                        (gift.price / 0.925).toString()
                      ).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                  </p>
                </div>
                <hr className={styles.paymentDivisor} />
              </div>
            </div>
            <div className={styles.totalPayment}>
              <h4>Total a pagar</h4>
              <h4>
                {gift &&
                  parseFloat((gift.price / 0.925).toString()).toLocaleString(
                    "pt-BR",
                    {
                      style: "currency",
                      currency: "BRL",
                    }
                  )}
              </h4>
            </div>
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.rightSideContent}>
            <div className={styles.titleBlockPayment}>
              <h2>Dados do pagamento</h2>
              <p>Preencha os dados abaixo para prosseguir</p>
            </div>

            <div className={styles.paymentMethod}>
              <PaymentMercadoPago />
            </div>
            <div className={styles.buttonFooterPaymentmethod}>
              <button className={styles.finishButton}>finalizar compra</button>
              <button className={styles.cancelButton}>cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
