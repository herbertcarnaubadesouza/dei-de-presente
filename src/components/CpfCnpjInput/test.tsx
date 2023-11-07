import React, { InputHTMLAttributes, useRef, useState } from 'react';

const CNPJ_Mask = '__.___.___/____-__'; // Mask for both CPF and CNPJ
const CPF_Mask = '___.___.___-__'; // Mask for both CPF and CNPJ

interface CpfCnpjInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const CpfCnpjInput = ({ ...props }: CpfCnpjInputProps) => {
    const [value, setValue] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    const formatCpfCnpj = (val: string) => {
        const cleaned = val.replace(/\D/g, '');
        const mask = cleaned.length > 11 ? CNPJ_Mask : CPF_Mask;
        let formatted = '';
        let valueIndex = 0;

        for (let maskIndex = 0; maskIndex < mask.length; maskIndex++) {
            if (mask[maskIndex] === '_') {
                if (valueIndex < cleaned.length) {
                    formatted += cleaned[valueIndex++];
                } else {
                    formatted += mask[maskIndex];
                }
            } else {
                formatted += mask[maskIndex];
            }
        }
        return formatted;
    };

    const updateValue = (newVal: string) => {
        const formattedValue = formatCpfCnpj(newVal);
        setValue(formattedValue);

        // Set cursor position after state update
        const cursorPosition = newVal.length;
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.setSelectionRange(
                    cursorPosition,
                    cursorPosition
                );
            }
        }, 0);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { selectionStart, selectionEnd } = e.currentTarget;

        if (!selectionStart || !selectionEnd) return;

        if (e.key === 'Backspace' && selectionStart === selectionEnd) {
            // Handle backspace
            const prevChar = value[selectionStart - 1];
            if (prevChar && /[\d]/.test(prevChar)) {
                // If it's a number or underscore, delete normally
                updateValue(
                    value.slice(0, selectionStart - 1) +
                        value.slice(selectionStart)
                );
            }
        } else if (e.key === 'Delete' && selectionStart !== null) {
            // Handle delete
            const nextChar = value[selectionStart];
            if (nextChar && /[\d]/.test(nextChar)) {
                // If it's a number or underscore, delete normally
                updateValue(
                    value.slice(0, selectionStart) +
                        value.slice(selectionStart + 1)
                );
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value: newValue } = e.target;
        if (newValue.length <= CNPJ_Mask.length) {
            updateValue(newValue);
        }
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
