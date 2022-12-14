import React, { useState } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import {
    Box,
    Container,
    Button,
    FormControl,
    Input,
    FormLabel,
    Heading,
    Text,
} from '@chakra-ui/react';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import { Metaplex } from '@metaplex-foundation/js';

export default function Home() {
    const [cmAddress, setCMAddress] = useState();
    const [loading, setLoading] = useState(false);
    const connection = new Connection('https://api.metaplex.solana.com');
    const metaplex = new Metaplex(connection);
    const fetchNfts = async () => {
        try {
            setLoading(true);
            const nfts = await metaplex.nfts().findAllByCreator({
                creator: new PublicKey(cmAddress),
            });

            const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
                JSON.stringify(nfts)
            )}`;

            const link = document.createElement('a');
            link.href = jsonString;
            link.download = 'data.json';

            link.click();

            setLoading(false);
        } catch (error) {
            alert(error.message);
            setLoading(false);
        }
    };

    const fetchNftsFilter = async () => {
        try {
            setLoading(true);
            const nfts = await metaplex.nfts().findAllByCreator({
                creator: new PublicKey(cmAddress),
            });

            const filterData = nfts.map((e) => {
                return e.address;
            });

            const filterToJson = `data:text/json;chatset=utf-8,${encodeURIComponent(
                JSON.stringify(filterData)
            )}`;

            const filterDownload = document.createElement('a');
            filterDownload.href = filterToJson;
            filterDownload.download = 'filter-address.json';

            filterDownload.click();

            setLoading(false);
        } catch (error) {
            alert(error.message);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box>
                <InfinitySpin color='gray' />
                <Text>
                    Tenga paciencia, mientras se va generando el archivo .json
                </Text>
                <br />
                <Text>
                    <strong>
                        (a veces puede demorar un par de minutos por la
                        respuesta de la api de metaplex)
                    </strong>
                </Text>
            </Box>
        );
    }

    return (
        <Box
            sx={{ mt: 8 }}
            p={10}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <Heading fontSize={'1.7rem'}>
                Generate file Collection JSON - Solana
            </Heading>
            <br />
            <Text>
                <strong>Instrucciones con ejemplo:</strong>
            </Text>
            <br />
            <Text>
                <ul>
                    <li>
                        {' '}
                        Ingresar a
                        https://solscan.io/token/HF3DbmJumM5v5pH9Pnddpk5vP5ZGdpaStV2tUSJCQWrw#metadata
                    </li>
                    <li> Seleccionar tab "Metadata"</li>
                    <li>
                        {' '}
                        Buscar la primera address dentro del valor "creators"
                    </li>
                    <li>
                        {' '}
                        Ingresar address en el input text del formulario de
                        abajo
                    </li>
                </ul>
            </Text>
            <br />
            {/* <Text>
                {' '}
                Copiar el token address de cualquier NFT
                <strong>
                    (14YXjPskLohH1Wbaz258zP1WKEpKQrWXhHvtJ4aJgdDP){' '}
                </strong>{' '}
                y pegar en el input de abajo para generar el archivo .json{' '}
                <br /> con toda la coleccion
            </Text> */}
            <FormControl fullWidth sx={{ mt: 5 }} variant='filled'>
                <Input
                    loading={loading}
                    value={cmAddress}
                    disabled={loading}
                    id='filled-adornment-amount'
                    onChange={(event) => setCMAddress(event.target.value)}
                />
            </FormControl>
            <div>
                <Button
                    style={{
                        marginTop: '20px',
                        marginRight: '15px',
                    }}
                    disabled={loading || cmAddress === '' || !cmAddress}
                    //variant='contained'
                    colorScheme='blue'
                    onClick={fetchNfts}
                >
                    Generate JSON All Collection!
                </Button>

                <Button
                    style={{
                        marginTop: '20px',
                    }}
                    disabled={loading || cmAddress === '' || !cmAddress}
                    //variant='contained'
                    colorScheme='orange'
                    onClick={fetchNftsFilter}
                >
                    Generate JSON - filter by address tokens
                </Button>
            </div>
        </Box>
    );
}

// import { Metaplex } from '@metaplex-foundation/js';
// import { InfinitySpin } from 'react-loader-spinner';
// import axios from 'axios';
// import { PublicKey } from '@solana/web3.js';
// import { useState } from 'react';

// import { useWallet, useConnection } from '@solana/wallet-adapter-react';
// import {
//     Box,
//     Button,
//     FormControl,
//     Input,
//     Heading,
//     Text,
// } from '@chakra-ui/react';

// export default function Home() {
//     const { publicKey } = useWallet();
//     const { connection } = useConnection();

//     const [newProduct, setNewProduct] = useState('');
//     const [loading, setLoading] = useState(false);

//     const [url, setUrl] = useState('');

//     const DownloadJson = async (collectionid) => {
//         setLoading(true);
//         const response = await axios.get(
//             `/api/collection?collection=${newProduct}`
//         );

//         if (response?.status === 200 || 304) {
//             setUrl(response?.data.message);
//             setLoading(false);
//         }
//     };

//     if (loading) {
//         return <InfinitySpin color='gray' />;
//     }

//     return (
//         <Box p={15}>
//             <Heading>Generate file Collection JSON - Solana</Heading>
//             <br />
//             <Text>
//                 Ejemplo: de la URL
//                 https://solscan.io/token/14YXjPskLohH1Wbaz258zP1WKEpKQrWXhHvtJ4aJgdDP
//             </Text>
//             <br />
//             <Text>
//                 {' '}
//                 Copiar el token address de cualquier NFT
//                 <strong>
//                     (14YXjPskLohH1Wbaz258zP1WKEpKQrWXhHvtJ4aJgdDP){' '}
//                 </strong>{' '}
//                 y pegar en el input de abajo para generar el archivo .json{' '}
//                 <br /> con toda la coleccion
//             </Text>
//             <Box>
//                 <FormControl>
//                     <Input
//                         type='text'
//                         value={newProduct}
//                         onChange={(e) => {
//                             setNewProduct(e.target.value);
//                         }}
//                     />
//                     <br />
//                     <br />

//                     {url !== '' ? (
//                         <div>
//                             <Button>
//                                 <a
//                                     href={`/collections/data.json`}
//                                     target='__blank'
//                                     download
//                                 >
//                                     Download JSON Collection
//                                 </a>
//                             </Button>
//                             <Button>
//                                 <a
//                                     href={`/collections/tokens.json`}
//                                     target='__blank'
//                                     download
//                                 >
//                                     Download JSON Tokens
//                                 </a>
//                             </Button>
//                         </div>
//                     ) : (
//                         <Button onClick={DownloadJson}>Generate JSON</Button>
//                     )}
//                 </FormControl>
//             </Box>
//         </Box>
//     );
// }
