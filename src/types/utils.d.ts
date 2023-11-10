import { IPaymentFormData } from '@mercadopago/sdk-react/bricks/payment/type';

export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];
export type PaymentFormDataType = PropType<IPaymentFormData, 'formData'>;
