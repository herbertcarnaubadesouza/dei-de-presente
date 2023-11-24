import PaymentMercadoPago from "@/components/Payment";
import { Gift } from "@/components/Web/Wedding";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useMemo, useState } from "react";
import styles from "../../../styles/Teste.module.scss";

export const getServerSideProps = (async (context) => {
  const { slug, id } = context.query;

  const userId = context.req.cookies["next-auth.session-token"];

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const websiteResponse = await fetch(
    `${apiUrl}/api/websites/getWebsiteBySlug?slug=${slug}`
  );

  const websiteData = await websiteResponse.json();

  if (websiteResponse.status === 404) {
    return {
      notFound: true,
    };
  }

  const giftResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/gifts/getGiftById/${id}?userId=${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (giftResponse.status === 404) {
    return {
      notFound: true,
    };
  }

  const gift = (await giftResponse.json()) as Gift;

  return {
    props: {
      gift,
      website: {
        slug: websiteData.slug,
        websiteId: websiteData.id,
      },
    },
  };
}) satisfies GetServerSideProps<{
  gift: Gift;
  website: {
    slug: string;
    websiteId: string;
  };
}>;

function formatPrice(price: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
}

export default function Checkout({
  gift,
  website,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [paymentResponse, setPaymentResponse] = useState<
    PaymentResponse | undefined
  >(undefined);

  function handlePaymentProcessing(paymentData: PaymentResponse) {
    setPaymentResponse(paymentData);
  }

  function handleClose() {
    let userConfirmed = true;
    if (!paymentResponse) {
      userConfirmed = window.confirm(
        "Você tem certeza de que deseja fechar? Todos os seus dados serão perdidos!"
      );
    }
    if (userConfirmed) {
      window.history.back();
    }
  }

  const { giftPriceFormatted, paymentData } = useMemo(() => {
    const giftPrice =
      Math.round((gift.price / 0.925 + Number.EPSILON) * 100) / 100;
    return {
      giftPriceFormatted: formatPrice(giftPrice),
      paymentData: {
        amount: giftPrice,
        items: {
          totalItemsAmount: giftPrice,
          itemsList: [
            {
              units: 1,
              value: giftPrice,
              name: gift.name,
              imageURL: gift.imageUrl,
            },
          ],
        },
      },
    };
  }, [gift]);

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
                  <p>{giftPriceFormatted}</p>
                </div>
                <hr className={styles.paymentDivisor} />
              </div>
            </div>
            <div className={styles.totalPayment}>
              <h4>Total a pagar</h4>
              <h4>{giftPriceFormatted}</h4>
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
              <PaymentMercadoPago
                initialization={paymentData}
                onProcessing={handlePaymentProcessing}
                website={website}
                gift={gift}
              />
            </div>
            <div className={styles.rowPaymentImages}>
              <p>Métodos de pagamento</p>
              <div className={styles.firstRow}>
                <img src="/ae.webp" />
                <img src="/diners.webp" />
                <img src="/elo.webp" />
                <img src="/hipercard.webp" />
                <img src="/mastercard.webp" />
                <img src="/pixMethod.webp" />
              </div>
              <div className={styles.secondRow}>
                <img src="/visa.webp" />
                <img src="/wireCard.webp" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
