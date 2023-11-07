import React, { InputHTMLAttributes, useRef, useState } from 'react';

interface MaskedInputProps extends InputHTMLAttributes<HTMLInputElement> {
    mask: string;
}

const MaskedInput = ({ mask = '_______-_', ...props }: MaskedInputProps) => {
    const [value, setValue] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    // Function to format CPF/CNPJ with the mask
    const applyMask = (val: string, oldVal: string) => {
        const cleaned = val.replace(/\D/g, '');
        const oldCleaned = oldVal.replace(/\D/g, '');
        const isDeleting = cleaned.length < oldCleaned.length;
        console.log(isDeleting, cleaned, oldCleaned);

        let formattedValue = '';
        let maskIndex = 0;
        let valueIndex = 0;

        if (cleaned.length === 0) {
            return { formattedValue: '', raw: '' };
        }

        while (maskIndex < mask.length && valueIndex < cleaned.length) {
            console.log(maskIndex, valueIndex, formattedValue);
            if (mask[maskIndex] === '_') {
                if (valueIndex < cleaned.length) {
                    formattedValue += cleaned[valueIndex++];
                } else if (!isDeleting) {
                    formattedValue += mask[maskIndex];
                }
                maskIndex++;
            } else {
                formattedValue += mask[maskIndex++];
                if (isDeleting && valueIndex === cleaned.length) {
                    break; // Stop adding mask characters if deleting at the end of input
                }
            }
        }

        return { formattedValue, raw: cleaned };
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value: newValue } = event.target;
        const { formattedValue } = applyMask(newValue, value);

        setValue(formattedValue);

        // Keep cursor position
        // const cursorPosition = event.target.selectionStart;
        // setTimeout(() => {
        //     if (cursorPosition != null && inputRef.current) {
        //         inputRef.current.setSelectionRange(
        //             cursorPosition,
        //             cursorPosition
        //         );
        //     }
        // }, 0);
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
            console.log(isNumber, deletedChar);

            let rawValue = value.replace(/[^\d]/g, '');
            let nextPosition = selectionStart - (!isNumber ? 1 : 0);
            console.log(rawValue, nextPosition, selectionEnd);

            const position = currentValue.length - rawValue.length;

            if (e.key === 'Backspace' && selectionStart > 0) {
                // Shift characters to the right
                rawValue = rawValue.slice(0, -1);
            } else if (e.key === 'Delete' && selectionStart < rawValue.length) {
                rawValue =
                    rawValue.substring(0, selectionStart) +
                    rawValue.substring(selectionStart + 1);

                console.log(rawValue);
            }

            const { formattedValue } = applyMask(rawValue, value);
            console.log(formattedValue, nextPosition, rawValue);
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

    const maxLength = mask.length;

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

export default MaskedInput;
