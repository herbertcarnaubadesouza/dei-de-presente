import { defaultOptions } from '@/animation';
import axios from 'axios';
import { XCircle } from 'phosphor-react';
import { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import { toast } from 'react-toastify';
import styles from './styles.module.scss';

interface SidebarEditProps {
    showSidebar: boolean;
    setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
    onGiftAdded: () => void;
    selectedGiftId: string | null;
    userId: string | undefined;
}

interface GiftData {
    imageUrl: string;
    name: string;
    price: number;
}

const SidebarEdit = ({
    showSidebar,
    setShowSidebar,
    onGiftAdded,
    selectedGiftId,
    userId,
}: SidebarEditProps) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [giftName, setGiftName] = useState<string | null>(null);
    const [giftValue, setGiftValue] = useState<number | null>(null);
    const [formattedGiftValue, setFormattedGiftValue] = useState<string>('');
    const [isFileSelected, setIsFileSelected] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string | null>('');

    const clearStates = () => {
        setImageFile(null);
        setGiftName(null);
        setGiftValue(null);
        setIsFileSelected(false);
        setIsLoading(false);
    };

    const handleClearFile = () => {
        setImageFile(null);
        setIsFileSelected(false);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setIsFileSelected(true);
        }
    };

    const handleEdit = async () => {
        setIsLoading(true);

        if (!selectedGiftId) {
            toast.error('Nenhum presente selecionado para edição!', {
                icon: <XCircle size={32} color="#ff3838" />,
            });
            return;
        }

        const formData = new FormData();

        if (imageFile) {
            formData.append('file', imageFile);
        }

        try {
            let imageUrl: string | null = null;

            if (imageFile) {
                const uploadResponse = await axios.post(
                    '/api/upload/upload',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
                if (uploadResponse.data.file) {
                    imageUrl = `${uploadResponse.data.file}`;
                }
            }

            const updatedData: Partial<GiftData> = {};

            if (imageUrl) updatedData.imageUrl = imageUrl;
            if (giftName !== null) updatedData.name = giftName;
            if (giftValue !== null) updatedData.price = giftValue;

            await axios.put(
                `/api/gifts/editGift/${selectedGiftId}`,
                updatedData
            );

            toast.success('Presente editado com sucesso!', {
                icon: '🎉',
            });
            setShowSidebar(false);
            onGiftAdded();
        } catch (error) {
            console.error('Ocorreu um problema ao salvar os dados:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        if (value.startsWith('R$ ')) {
            value = value.substring(3);
        }

        value = value.replace(/[^\d]/g, '');

        if (value === '') {
            setGiftValue(null);
            setFormattedGiftValue('R$ ');
            return;
        }

        const parsedValue = parseFloat(value) / 100;
        setGiftValue(parsedValue);
        setFormattedGiftValue(
            `R$ ${parsedValue
                .toFixed(2)
                .replace('.', ',')
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
        );
    };

    useEffect(() => {
        if (selectedGiftId) {
            const fetchGiftById = async () => {
                try {
                    const response = await axios.get<GiftData>(
                        `/api/gifts/getGiftById/${selectedGiftId}?userId=${userId}`
                    );
                    const giftData = response.data;

                    setImageUrl(giftData.imageUrl);
                    setGiftName(giftData.name);
                    setGiftValue(giftData.price);

                    const formattedValue = `R$ ${giftData.price
                        .toFixed(2)
                        .replace('.', ',')
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;

                    setFormattedGiftValue(formattedValue);
                } catch (error) {
                    console.error('Erro ao buscar o gift por ID', error);
                }
            };

            fetchGiftById();
        }
    }, [selectedGiftId]);

    return (
        <div className={`${styles.sidebar} ${showSidebar ? styles.show : ''}`}>
            <div className={styles.contentSidebar}>
                <div className={styles.firstBlockSideBar}>
                    <label htmlFor="giftFileInputEdit">
                        <img src={imageUrl as string} alt="Gift"></img>
                        <span>Editar foto</span>
                    </label>
                    <input
                        type="file"
                        id="giftFileInputEdit"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                        accept=".jpg, .jpeg, .png"
                    />
                </div>
                <div
                    className={styles.FileSelected}
                    style={{ display: isFileSelected ? 'flex' : 'none' }}
                >
                    <img src="/file.png" className={styles.FileImg} />
                    <div className={styles.FileSelectedStats}>
                        <div className={styles.FileSelectedName}>
                            {imageFile && (
                                <p className={styles.FileInfo}>
                                    {imageFile.name}
                                </p>
                            )}
                            <p className={styles.FileInfo}>100%</p>
                        </div>

                        <div className={styles.FileSelectedBar}></div>
                    </div>
                    <img
                        src="/trash.png"
                        className={styles.FileDelete}
                        onClick={handleClearFile}
                    />
                </div>
                <div className={styles.title}>
                    <p>Editar presente</p>
                </div>
                <div className={styles.secondBlockSideBar}>
                    <div className={styles.inputblock}>
                        <span>Editar nome do presente</span>
                        <input
                            placeholder="Forma de bolo"
                            type="text"
                            value={giftName as string}
                            onChange={(e) => setGiftName(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputblock}>
                        <span>Editar valor</span>
                        <input
                            placeholder="Digite um valor"
                            type="text"
                            onChange={handleValueChange}
                            value={formattedGiftValue}
                        />
                        <span
                            style={{
                                marginTop: '8px',
                                fontSize: '10px',
                                marginLeft: '5px',
                            }}
                        >
                            *Observação: O valor dos presente será acrescentado
                            uma taxa de 7.5%
                        </span>
                    </div>
                </div>
                <div className={styles.buttonsBlockSideBar}>
                    <button className={styles.addButton} onClick={handleEdit}>
                        {isLoading ? (
                            /*@ts-ignore*/
                            <Lottie
                                style={{ marginTop: '-10px' }}
                                options={defaultOptions}
                                height={40}
                                width={50}
                            />
                        ) : (
                            'EDITAR'
                        )}
                    </button>
                    <button
                        className={styles.cancel}
                        onClick={() => {
                            setShowSidebar(false);
                            clearStates();
                        }}
                    >
                        CANCELAR
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SidebarEdit;
