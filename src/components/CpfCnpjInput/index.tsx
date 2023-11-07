import React, { InputHTMLAttributes, useRef, useState } from 'react';

const CNPJ_Mask = '__.___.___/____-__'; // Mask for both CPF and CNPJ
const CPF_Mask = '___.___.___-__'; // Mask for both CPF and CNPJ

interface CpfCnpjInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const CpfCnpjInput = ({ ...props }: CpfCnpjInputProps) => {
    const [value, setValue] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    const applyMask = (rawValue: string, mask: string) => {
        let formattedValue = '';
        let rawValueIndex = 0;
        let maskIndex = 0;

        while (maskIndex < mask.length) {
            if (mask[maskIndex] !== '_' && rawValueIndex < rawValue.length) {
                formattedValue += mask[maskIndex];
                maskIndex++;
            } else if (rawValueIndex < rawValue.length) {
                formattedValue += rawValue[rawValueIndex];
                maskIndex++;
                rawValueIndex++;
            } else {
                // formattedValue += mask.slice(maskIndex);
                break;
            }
        }
        return formattedValue;
    };

    const formatValue = (val: string) => {
        const numericValue = val.replace(/\D/g, '');
        const mask = numericValue.length > 11 ? CNPJ_Mask : CPF_Mask;
        return applyMask(numericValue, mask);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { selectionStart, selectionEnd } = e.currentTarget;
        if (
            (e.key === 'Backspace' || e.key === 'Delete') &&
            selectionStart !== null
        ) {
            e.preventDefault();
            const currentValue = e.currentTarget.value;
            const deletedChar = currentValue[selectionStart - 1];
            const isNumber = deletedChar && !isNaN(Number(deletedChar));

            let rawValue = value.replace(/[^\d]/g, '');
            const charDiff = currentValue.length - rawValue.length;
            let nextPosition = selectionStart - (!isNumber ? 1 : 0);
            const deletePosition =
                selectionStart - charDiff > 0
                    ? selectionStart - charDiff + 1
                    : selectionStart;

            if (e.key === 'Backspace' && selectionStart > 0) {
                // Shift characters to the right
                rawValue =
                    rawValue.substring(0, selectionStart - charDiff - 1) +
                    rawValue.substring(selectionStart - charDiff);
                nextPosition--;
            } else if (e.key === 'Delete') {
                if (deletePosition < rawValue.length) {
                    rawValue =
                        rawValue.substring(0, deletePosition) +
                        rawValue.substring(deletePosition + 1);
                } else {
                    rawValue =
                        rawValue.substring(0, deletePosition - 1) +
                        rawValue.substring(deletePosition);
                }
                nextPosition = selectionStart;
            }

            const formattedValue = formatValue(rawValue);
            setValue(formattedValue);

            // Set cursor position after state update
            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.setSelectionRange(
                        nextPosition,
                        nextPosition
                    );
                }
            }, 0);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { selectionStart } = e.target;
        let inputValue = e.target.value;
        if (inputValue.length <= CNPJ_Mask.length) {
            inputValue = formatValue(inputValue);
            setValue(inputValue);
        }

        // Adjust cursor after formatting
        setTimeout(() => {
            if (inputRef.current && selectionStart !== null) {
                let newPosition = selectionStart;
                if (/\D/.test(inputValue[selectionStart - 1])) {
                    newPosition++;
                }
                inputRef.current.setSelectionRange(newPosition, newPosition);
            }
        }, 0);
    };

    const maxLength = value.length > 14 ? CNPJ_Mask.length : CPF_Mask.length;

    return (
        <input
            ref={inputRef}
            type="text"
            value={value}
            maxLength={maxLength + 1}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            {...props}
        />
    );
};

export default CpfCnpjInput;
