import { XCircle } from 'phosphor-react';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import MaskedInput from '../MaskedInput/index';
import Select from '../Select';
import styles from './styles.module.scss';
import useDialog from './useDialog';

interface ModalProps {
    maxWithdrawAmount: number;
}

export default function Modal({ maxWithdrawAmount }: ModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    useDialog(dialogRef);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e.currentTarget);
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/withdraw/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.status === 200) {
                toast.success('Nova solicitação de saque enviada!', {
                    icon: '🎉',
                });
                // @ts-ignore
                window.MegaDialog.close('submit');
            } else if (response.status === 401) {
                toast.error('Usuário não autorizado', {
                    icon: <XCircle size={32} color="#ff3838" />,
                });
                // @ts-ignore
                window.MegaDialog.close('error');
            }
        } catch (error) {
            toast.error('Não foi possivel realizar a solicitação no momento!', {
                icon: <XCircle size={32} color="#ff3838" />,
            });
            // @ts-ignore
            window.MegaDialog.close('error');
        }
    };

    return (
        <dialog
            className={styles.dialog}
            id="MegaDialog"
            modal-mode="mega"
            ref={dialogRef}
        >
            <form method="dialog" onSubmit={handleSubmit}>
                <header>
                    <h3>Sacar saldo</h3>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            // @ts-ignore
                            window.MegaDialog.close('close');
                        }}
                    >
                        &#x2715;
                    </button>
                </header>
                <article>
                    <div className={styles.inputblock}>
                        <span>Valor</span>
                        <MaskedInput
                            name="amount"
                            mask={[
                                {
                                    mask: 'R$num',
                                    blocks: {
                                        num: {
                                            mask: Number,
                                            thousandsSeparator: '.',
                                            min: 0,
                                            max: maxWithdrawAmount,
                                        },
                                    },
                                },
                            ]}
                            placeholder="R$0,00"
                            required
                        />
                    </div>
                    <div className={styles.inputblock}>
                        <span>Instituição</span>
                        <Select name="bank" />
                    </div>
                    <div className={styles.inputGroup}>
                        <div className={styles.inputblock}>
                            <span>Agência</span>
                            <input
                                name="agency"
                                placeholder="0000"
                                type="text"
                                maxLength={4}
                                required
                            />
                        </div>
                        <div className={styles.inputblock}>
                            <span>Conta</span>
                            <MaskedInput
                                name="accountNumber"
                                mask={[
                                    {
                                        mask: '0000000-0',
                                    },
                                ]}
                                placeholder="0000000-0"
                                required
                            />
                        </div>
                    </div>
                    <div className={styles.inputblock}>
                        <span>Tipo de conta</span>
                        <select name="accountType" required>
                            <option value="" disabled selected>
                                Selecione uma opção...
                            </option>
                            <option value="corrente">Corrente</option>
                            <option value="poupanca">Poupança</option>
                        </select>
                    </div>
                    <div className={styles.inputblock}>
                        <span>Nome completo</span>
                        <input
                            name="accountHolder"
                            placeholder="Nome de quem irá receber"
                            type="text"
                            required
                        />
                    </div>
                    <div className={styles.inputblock}>
                        <span>CPF/CNPJ</span>
                        <MaskedInput
                            name="cpfCnpj"
                            mask={[
                                {
                                    mask: '000.000.000-00',
                                    maxLength: 11,
                                },
                                {
                                    mask: '00.000.000/0000-00',
                                },
                            ]}
                            placeholder="CPF/CNPJ de quem irá receber"
                            required
                        />
                    </div>
                </article>
                <footer>
                    <menu>
                        <button type="submit">Solicitar saque</button>
                    </menu>
                </footer>
            </form>
        </dialog>
    );
}
