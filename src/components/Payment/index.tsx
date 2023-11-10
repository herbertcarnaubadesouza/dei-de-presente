import { useCallback, useEffect, useState } from 'react';

import { PaymentFormDataType } from '@/types/utils';
import { initMercadoPago, Payment, StatusScreen } from '@mercadopago/sdk-react';
import {
    IPaymentBrickCustomization,
    TPaymentType,
} from '@mercadopago/sdk-react/bricks/payment/type';
import { IStatusScreenBrickCustomization } from '@mercadopago/sdk-react/bricks/statusScreen/types';
import { Gift } from '../Web/Birthday';

type PaymentMercadoPagoProps = Pick<TPaymentType, 'initialization'> & {
    website: {
        slug: string;
        websiteId: string;
    };
    gift: Gift;
    onProcessing?: (paymentData: PaymentResponse) => void;
};

const paymentCustomization: IPaymentBrickCustomization = {
    paymentMethods: {
        creditCard: 'all',
        bankTransfer: ['pix'],
        maxInstallments: 1,
    },
    visual: {
        hideFormTitle: true,
        // hidePaymentButton: true,
        style: {
            customVariables: {
                formBackgroundColor: '#2f3f8',
                baseColor: '#09a9b5',
                borderRadiusFull: '5px',
                borderRadiusLarge: '5px',
                borderRadiusMedium: '5px',
                borderRadiusSmall: '5px',
            },
        },
    },
};

const statusCustomization: IStatusScreenBrickCustomization = {
    visual: {
        style: {
            customVariables: {
                formBackgroundColor: '#2f3f8',
                baseColor: '#09a9b5',
                // formPadding: '0px',
                successColor: 'transparent',
                warningColor: 'transparent',
                errorColor: 'transparent',
                borderRadiusFull: '5px',
                borderRadiusLarge: '5px',
                borderRadiusMedium: '5px',
                borderRadiusSmall: '5px',
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
    const [paymentId, setPaymentId] = useState('');

    useEffect(() => {
        initMercadoPago('TEST-962c3a0f-ac01-4efb-910c-c609b32ed98a', {
            locale: 'pt-BR',
        });

        return () => {
            if (window.paymentBrickController) {
                window.paymentBrickController.unmount();
            }
        };
    }, []);

    const handleSubmit = useCallback(
        async (formData: PaymentFormDataType) => {
            try {
                const response = await fetch('/api/payment/process', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ website, gift, formData }),
                });

                const data = await response.json();

                if (response.status !== 200) {
                    throw new Error(data.error.message);
                }
                onSuccess?.(data);
                setPaymentId(data.paymentId);
            } catch (error) {
                console.error(error);
                setPaymentId('');
            }
        },
        [onSuccess]
    );

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
