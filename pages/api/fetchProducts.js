import axios from 'axios';
import BigNumber from 'bignumber.js';
import products from './products.json';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const productsNoHashes = await Promise.all(
            products.map(async (product) => {
                const { ...rest } = product;
    
                const USDC = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
                const FLWR = 'FLWRna1gxehQ9pSyZMzxfp4UhewvLPwuKfdUTgdZuMBY';
    
                const bigAmount = BigNumber(rest.price);
                const converNumber = bigAmount.toNumber() * 1000 ** 2;
    
                const response = await axios.get(
                    `https://quote-api.jup.ag/v3/quote?inputMint=${USDC}&outputMint=${FLWR}&amount=${converNumber}&slippageBps=50&feeBps=4`
                );
    
                const priceFLWR = response.data.data[0].outAmount;
    
                const numberFix = Number(priceFLWR).toFixed() / 100
                
                let newRest = []
                newRest = {
                    rest,
                    newPrice: numberFix
                }
    
                return newRest;
            })
        )

        res.status(200).json(productsNoHashes);
    } else {
        res.status(405).send(`Method ${req.method} not allowed`);
    }
}
