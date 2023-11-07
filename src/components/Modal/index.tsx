import { useRef } from 'react';
import CpfCnpjInput from '../CpfCnpjInput';
import MaskedInput from '../MaskedInput';
import Select from '../Select';
import styles from './styles.module.scss';
import useDialog from './useDialog';

export default function Modal() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    useDialog(dialogRef);

    return (
        <dialog
            className={styles.dialog}
            id="MegaDialog"
            modal-mode="mega"
            ref={dialogRef}
        >
            <form method="dialog">
                <header>
                    <h3>Sacar saldo</h3>
                    <button>&#x2715;</button>
                </header>
                <article>
                    <div className={styles.inputblock}>
                        <span>Instituição</span>
                        <Select />
                    </div>
                    <div className={styles.inputGroup}>
                        <div className={styles.inputblock}>
                            <span>Agência</span>
                            <input
                                placeholder="0000"
                                type="text"
                                maxLength={4}
                            />
                        </div>
                        <div className={styles.inputblock}>
                            <span>Conta</span>
                            <MaskedInput
                                mask="_______-_"
                                placeholder="0000000-0"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className={styles.inputblock}>
                        <span>Tipo de conta</span>
                        <select>
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
                            placeholder="Nome de quem irá receber"
                            type="text"
                        />
                    </div>
                    <div className={styles.inputblock}>
                        <span>CPF/CNPJ</span>
                        <CpfCnpjInput
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
