import { useCallback, useEffect, useState } from "react";

import { PaymentFormDataType } from "@/types/utils";
import { initMercadoPago, Payment, StatusScreen } from "@mercadopago/sdk-react";
import {
  IPaymentBrickCustomization,
  TPaymentType,
} from "@mercadopago/sdk-react/bricks/payment/type";
import { IStatusScreenBrickCustomization } from "@mercadopago/sdk-react/bricks/statusScreen/types";
import { Gift } from "../Web/Birthday";

type PaymentResponse = {
  status: string;
  paymentId: string;
  pixQrCode?: string;
  pixQrCodeBase64?: string;
  externalResourceUrl?: string;
  ticketUrl?: string;
};

type PaymentMercadoPagoProps = Pick<TPaymentType, "initialization"> & {
  website: {
    slug: string;
    websiteId: string;
  };
  gift: Gift;
  onProcessing?: (paymentData: PaymentResponse) => void;
};

const paymentCustomization: IPaymentBrickCustomization = {
  paymentMethods: {
    creditCard: "all",
    bankTransfer: ["pix"],
    maxInstallments: 1,
  },
  visual: {
    hideFormTitle: true,
    // hidePaymentButton: true,
    style: {
      customVariables: {
        formBackgroundColor: "#2f3f8",
        baseColor: "#09a9b5",
        borderRadiusFull: "5px",
        borderRadiusLarge: "5px",
        borderRadiusMedium: "5px",
        borderRadiusSmall: "5px",
      },
    },
  },
};

const statusCustomization: IStatusScreenBrickCustomization = {
  visual: {
    style: {
      customVariables: {
        formBackgroundColor: "#2f3f8",
        baseColor: "#09a9b5",
        // formPadding: '0px',
        successColor: "transparent",
        warningColor: "transparent",
        errorColor: "transparent",
        borderRadiusFull: "5px",
        borderRadiusLarge: "5px",
        borderRadiusMedium: "5px",
        borderRadiusSmall: "5px",
      },
    },
  },
};

export default function PaymentMercadoPago({
  initialization,
  website,
  gift,
  onProcessing: onSuccess,
}: PaymentMercadoPagoProps) {
  const [paymentId, setPaymentId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pixInfo, setPixInfo] = useState<PaymentResponse | null>(null);
  const [paymentDocId, setPaymentDocId] = useState("");
  const [userDocId, setUserDocId] = useState("");

  useEffect(() => {
    initMercadoPago("TEST-962c3a0f-ac01-4efb-910c-c609b32ed98a", {
      locale: "pt-BR",
    });

    return () => {
      if (window.paymentBrickController) {
        window.paymentBrickController.unmount();
      }
    };
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let timeoutId: NodeJS.Timeout;

    if (pixInfo && pixInfo.status === "pending") {
      const checkStatus = async () => {
        try {
          const response = await fetch(
            `/api/payment/checkPaymentStatus?paymentId=${pixInfo.paymentId}&paymentDocId=${paymentDocId}&userDocId=${userDocId}`
          );
          const data = await response.json();

          if (response.ok && data.status === "approved") {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
            setPixInfo(data);
            onSuccess?.(data);
            alert("Pagamento aprovado"); // Exibir toast de sucesso
          }
        } catch (error) {
          console.error("Error checking payment status:", error);
          clearInterval(intervalId);
        }
      };

      intervalId = setInterval(checkStatus, 30000);

      // Configurar timeout de 5 minutos
      timeoutId = setTimeout(() => {
        clearInterval(intervalId);
        alert("Tempo de pagamento esgotado"); // Exibir toast de erro
      }, 300000); // 5 minutos em milissegundos
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [pixInfo, onSuccess, paymentDocId, userDocId]);

  const handleSubmit = useCallback(
    async (formData: PaymentFormDataType) => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/payment/process", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ website, gift, formData }),
        });

        const data = await response.json();

        if (
          response.status === 200 &&
          data.status === "pending" &&
          data.paymentMethod === "pix"
        ) {
          setPixInfo(data);
          setPaymentDocId(data.paymentDocId);
          setUserDocId(data.userDocId);
        } else if (response.status !== 200) {
          throw new Error(data.error.message);
        } else {
          onSuccess?.(data);
          setPaymentId(data.paymentId);
        }
      } catch (error) {
        console.error(error);
        setPaymentId("");
      }
      setIsLoading(false);
    },
    [gift, onSuccess, website]
  );

  if (pixInfo) {
    return (
      <div>
        <h2>Pagamento PIX Pendente</h2>
        {pixInfo.pixQrCodeBase64 && (
          <img
            src={`data:image/png;base64,${pixInfo.pixQrCodeBase64}`}
            alt="PIX QR Code"
            style={{
              height: "400px",
              width: "400px",
              padding: "32px",
              backgroundColor: "#fff",
              marginTop: "16px",
            }}
          />
        )}
        {pixInfo.ticketUrl && (
          <div
            style={{
              height: "40px",
              width: "400px",
              padding: "32px",
              backgroundColor: "#fff",
              marginBottom: "16px",
              marginTop: "-48px",
            }}
          >
            <a
              href={pixInfo.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginBottom: "24px",
                color: "blue",
              }}
            >
              Pagar pelo link de pagamento
            </a>
          </div>
        )}
        {pixInfo.externalResourceUrl && (
          <div>
            <a
              href={pixInfo.externalResourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Clique aqui para pagar
            </a>
          </div>
        )}
      </div>
    );
  }

  return paymentId.length === 0 ? (
    <Payment
      initialization={initialization}
      customization={paymentCustomization}
      onSubmit={async ({ formData }) => {
        handleSubmit(formData);
      }}
      onError={(error) => {
        console.error(error);
      }}
    />
  ) : (
    <StatusScreen
      initialization={{
        paymentId,
      }}
      customization={statusCustomization}
    />
  );
}
