import React, { InputHTMLAttributes, useRef, useState } from 'react';

interface MaskedInputProps extends InputHTMLAttributes<HTMLInputElement> {
    mask: string;
}

const MaskedInput = ({ mask, ...props }: MaskedInputProps) => {
    const [value, setValue] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    const applyMask = (val: string, oldVal: string) => {
        const cleaned = val.replace(/\D/g, '');
        const oldCleaned = oldVal.replace(/\D/g, '');
        const isDeleting = cleaned.length < oldCleaned.length;

        let formattedValue = '';
        let maskIndex = 0;
        let valueIndex = 0;

        if (cleaned.length === 0) {
            return { formattedValue: '', raw: '' };
        }

        while (maskIndex < mask.length && valueIndex < cleaned.length) {
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

            const { formattedValue } = applyMask(rawValue, value);
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
