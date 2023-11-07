import { useRef } from 'react';
import CpfCnpjInput from '../CpfCnpjInput';
import MaskedInput from '../MaskedInput';
import Select from '../Select';
import styles from './styles.module.scss';
import useDialog from './useDialog';

export default function Modal() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    useDialog(dialogRef);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e.currentTarget);
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
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
                            />
                        </div>
                        <div className={styles.inputblock}>
                            <span>Conta</span>
                            <MaskedInput
                                name="account"
                                mask="_______-_"
                                placeholder="0000000-0"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className={styles.inputblock}>
                        <span>Tipo de conta</span>
                        <select name="account-type">
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
                            name="receiver-name"
                            placeholder="Nome de quem irá receber"
                            type="text"
                        />
                    </div>
                    <div className={styles.inputblock}>
                        <span>CPF/CNPJ</span>
                        <CpfCnpjInput
                            name="cpfCnpj"
                            placeholder="CPF/CNPJ de quem irá receber"
                            type="text"
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
