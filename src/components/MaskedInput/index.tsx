import { useRef } from 'react';
import { IMaskInput } from 'react-imask';

interface MaskedInputProps {
    name?: string;
    placeholder?: string;
    mask: { mask: string; maxLength?: number; blocks?: any }[];
    max?: number;
    min?: number;
}

const MaskedInput = ({ mask, ...inputProps }: MaskedInputProps) => {
    const ref = useRef(null);
    const inputRef = useRef(null);

    return (
        <IMaskInput
            mask={mask}
            unmask={true}
            ref={ref}
            inputRef={inputRef} // access to nested input
            onAccept={(value, mask) => console.log(value)}
            {...inputProps}
        />
    );
};

export default MaskedInput;
