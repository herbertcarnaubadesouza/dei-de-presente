import { useEffect } from "react";

import dynamic from "next/dynamic";

const Payment = dynamic(
  () => import("@mercadopago/sdk-react").then((mod) => mod.Payment),
  {
    ssr: false,
  }
);

const initialization = {
  amount: 100,
  //   preferenceId: "TEST-9be97765-6864-4fb2-8ea5-743c4a87f475",
};
const customization = {
  paymentMethods: {
    ticket: "all",
    bankTransfer: "all",
    creditCard: "all",
    debitCard: "all",
    mercadoPago: "all",
  },
  visual: {
    hideFormTitle: true,
    hidePaymentButton: true,
    style: {
      customVariables: {
        formBackgroundColor: "#2f3f8",
        fontFamily: "Outfit",
      },
    },
  },
};

const onSubmit = async ({ selectedPaymentMethod, formData }: any) => {};

const onError = async (error: any) => {};

const onReady = async () => {};

export default function PaymentMercadoPago() {
  useEffect(() => {
    return () => {
      if ((window as any).paymentBrickController) {
        (window as any).paymentBrickController.unmount();
      }
    };
  }, []);

  useEffect(() => {
    import("@mercadopago/sdk-react")
      .then((mod) => {
        const initMercadoPago = mod.initMercadoPago;
        initMercadoPago("TEST-9be97765-6864-4fb2-8ea5-743c4a87f475", {
          locale: "pt-BR",
        });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {/*@ts-ignore*/}
      <Payment
        initialization={initialization}
        customization={customization as any}
        onSubmit={onSubmit}
        onReady={onReady}
        onError={onError}
      />
    </>
  );
}
