import { useEffect, useState } from 'react';
import ReactSelect from 'react-select';

import styles from './styles.module.scss';

type Bank = {
    ispb: string;
    name: string;
    code?: number;
    fullName: string;
};

interface SelectProps {
    name?: string;
}

export default function Select({ ...props }: SelectProps) {
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);
    const [banks, setBanks] = useState<Bank[]>([]);

    useEffect(() => {
        const fetchBanks = async () => {
            try {
                const response = await fetch(
                    'https://brasilapi.com.br/api/banks/v1'
                );
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: Bank[] = await response.json();
                setBanks(data);
            } catch (error) {
                console.error('Error fetching banks:', error);
            }
        };

        fetchBanks();
    }, []);

    const options = banks
        .reduce((acc, bank) => {
            if (!bank.code) {
                return acc;
            }
            const code = String(bank.code).padStart(3, '0');
            acc.push({
                label: `${code} - ${bank.fullName}`,
                value: `${code} - ${bank.fullName}`,
            });
            return acc;
        }, new Array<{ label: string; value: string }>())
        .sort((a, b) => {
            if (a.value < b.value) {
                return -1;
            }
            if (a.value > b.value) {
                return 1;
            }
            return 0;
        });

    return (
        <ReactSelect
            className={styles.select}
            classNamePrefix="select"
            isDisabled={isDisabled}
            isLoading={isLoading}
            isClearable={isClearable}
            isRtl={isRtl}
            isSearchable={isSearchable}
            options={options}
            required
            placeholder="Selecione um banco..."
            theme={(theme) => ({
                ...theme,
                colors: {
                    ...theme.colors,
                    primary: '#09a9b5',
                },
            })}
            {...props}
        />
    );
}
