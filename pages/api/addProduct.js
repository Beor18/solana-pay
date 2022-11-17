import axios from 'axios';
import BigNumber from 'bignumber.js';
import products from './products.json';
import fs from 'fs';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            console.log('body is ', req.body);
            
            const USDC = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
            const FLWR = 'FLWRna1gxehQ9pSyZMzxfp4UhewvLPwuKfdUTgdZuMBY';

            const { name, price, image_url, description, filename, hash } =
                req.body;

            const bigAmount = BigNumber(price);
            const converNumber = bigAmount.toNumber() * 1000 ** 2;
            console.log('Convert Number: ', converNumber);

            const response = await axios.get(
                `https://quote-api.jup.ag/v3/quote?inputMint=${USDC}&outputMint=${FLWR}&amount=${converNumber}&slippageBps=50&feeBps=4`
            );

            const priceFLWR = response.data.data[0].outAmount;

            const numberFix = Number(priceFLWR).toFixed() / 100
            
            const maxID = products.reduce(
                (max, product) => Math.max(max, product.id),
                0
            );
            products.push({
                id: maxID + 1,
                name,
                price,
                numberFix,
                image_url,
                description
            });
            fs.writeFileSync(
                './pages/api/products.json',
                JSON.stringify(products, null, 2)
            );
            res.status(200).send({ status: 'ok' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'error adding product' });
            return;
        }
    } else {
        res.status(405).send(`Method ${req.method} not allowed`);
    }
}
