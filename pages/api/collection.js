import axios from 'axios';
import fs from 'fs';

export default async function collection(req, res) {
    if (req.method === 'GET') {
        const query = req.query;
        const { collection } = query;

        const responseNftList = await axios.get(
            `https://api.simplehash.com/api/v0/nfts/assets?nft_ids=solana.${collection}`,
            {
                headers: {
                    accept: 'application/json',
                    'X-API-KEY':
                        'ferragnar19_sk_d5ad07c0-66e0-430a-a51f-ccce31e3958e_kuyosvzvsezacabi',
                },
            }
        );

        const responseList =
            responseNftList?.data.nfts[0].collection.collection_id;

        console.log('List: ', responseList);
        const responseMyNft = await axios.get(
            `https://api.simplehash.com/api/v0/nfts/collection/${responseList}?limit=50`,
            {
                headers: {
                    accept: 'application/json',
                    'X-API-KEY':
                        'ferragnar19_sk_d5ad07c0-66e0-430a-a51f-ccce31e3958e_kuyosvzvsezacabi',
                },
            }
        );

        fs.writeFileSync(
            `public/collections/${responseList}.json`,
            JSON.stringify(responseMyNft?.data.nfts)
        );

        const url = `${responseList}.json`;

        res.status(200).json({
            message: url,
        });
    } else {
        res.status(405).send(`Method ${req.method} not allowed`);
    }
}
