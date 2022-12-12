import { Metaplex } from '@metaplex-foundation/js';
import { InfinitySpin } from 'react-loader-spinner';
import axios from 'axios';
import { PublicKey } from '@solana/web3.js';
import { useState } from 'react';

import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import {
    Box,
    Button,
    FormControl,
    Input,
    Heading,
    Text,
} from '@chakra-ui/react';

export default function Home() {
    const { publicKey } = useWallet();
    const { connection } = useConnection();

    const [newProduct, setNewProduct] = useState('');
    const [loading, setLoading] = useState(false);

    const [url, setUrl] = useState('');

    const DownloadJson = async (collectionid) => {
        setLoading(true);
        const response = await axios.get(
            `/api/collection?collection=${newProduct}`
        );

        if (response.status === 200) {
            setUrl(response.data.message);
            setLoading(false);
        }
    };

    if (loading) {
        return <InfinitySpin color='gray' />;
    }

    return (
        <Box p={15}>
            <Heading>Generate file Collection JSON - Solana</Heading>
            <br />
            <Text>
                Ejemplo: de la URL
                https://solscan.io/token/14YXjPskLohH1Wbaz258zP1WKEpKQrWXhHvtJ4aJgdDP
            </Text>
            <br />
            <Text>
                {' '}
                Copiar el token address de cualquier NFT
                <strong>(14YXjPskLohH1Wbaz258zP1WKEpKQrWXhHvtJ4aJgdDP) </strong> y pegar en el
                input de abajo para generar el archivo .json <br /> con toda la
                coleccion
            </Text>
            <Box>
                <FormControl>
                    <Input
                        type='text'
                        value={newProduct}
                        onChange={(e) => {
                            setNewProduct(e.target.value);
                        }}
                    />
                    <br />
                    <br />
                    <Button onClick={DownloadJson}>
                        {url !== '' || undefined ? (
                            <a href={`collections/${url}`} download>
                                Download JSON
                            </a>
                        ) : (
                            'Generate JSON'
                        )}
                    </Button>
                </FormControl>
            </Box>
        </Box>
    );
}
