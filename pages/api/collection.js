import axios from 'axios';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import { Metaplex } from '@metaplex-foundation/js';
import fs from 'fs';

export default async function collection(req, res) {
    if (req.method === 'GET') {
        const query = req.query;
        const { collection } = query;

        const connection = new Connection('https://api.metaplex.solana.com');
        const metaplex = new Metaplex(connection);
        
        const responseMyNft = await metaplex.nfts().findAllByCreator({
            creator: new PublicKey(collection),
            //position: 1,
        });

        // const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
        //     JSON.stringify(nfts)
        // )}`;

        // const responseNftList = await axios.get(
        //     `https://api.simplehash.com/api/v0/nfts/assets?nft_ids=solana.${collection}`,
        //     {
        //         headers: {
        //             accept: 'application/json',
        //             'X-API-KEY':
        //                 'ferragnar19_sk_d5ad07c0-66e0-430a-a51f-ccce31e3958e_kuyosvzvsezacabi',
        //         },
        //     }
        // );

        // const responseList =
        //     responseNftList?.data.nfts[0].collection.collection_id;
        
        // const nextApi = responseNftList?.data.next
        
        // console.log('List: ', responseList);
        // const responseMyNft = await axios.get(
        //     `https://api.simplehash.com/api/v0/nfts/collection/${responseList}?limit=500`,
        //     {
        //         headers: {
        //             accept: 'application/json',
        //             'X-API-KEY':
        //                 'ferragnar19_sk_d5ad07c0-66e0-430a-a51f-ccce31e3958e_mpi8mku53h1wm0od',
        //         },
        //     }
        // );

        const filterData = responseMyNft.map((e) => {
            return e.address
        })

        await fs.writeFileSync(
            `./public/collections/data.json`,
            JSON.stringify(responseMyNft, null, 2)
        );

        await fs.writeFileSync(
            `./public/collections/tokens.json`,
            JSON.stringify(filterData, null, 2)
        );

        const url = `${collection}.json`;

        res.status(200).json({
            message: url,
            status: 200
        });
    } else {
        res.status(405).send(`Method ${req.method} not allowed`);
    }
}
