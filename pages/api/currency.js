import axios from 'axios';
import BigNumber from 'bignumber.js';

export default async function currency(req, res) {
    if (req.method === 'GET') {
        
        const query = req.query
        const {amount} = query
        // console.log("QUERY: ", query)
        const USDC = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
        const FLWR = 'FLWRna1gxehQ9pSyZMzxfp4UhewvLPwuKfdUTgdZuMBY';

        const bigAmount = BigNumber(amount);
        const converNumber = bigAmount.toNumber() * 1000 ** 2;
        console.log("converNumber: ", converNumber)
        
        const response = await axios.get(
            `https://quote-api.jup.ag/v3/quote?inputMint=${USDC}&outputMint=${FLWR}&amount=${converNumber}&slippageBps=50&feeBps=4`
        );

        console.log("Response: ", response)
        const priceFLWR = response.data.data[0].outAmount;

        const numberFix = Number(priceFLWR).toFixed() / 100
        
        let newRest = {
            FLWR: numberFix
        }

        res.status(200).json(newRest);
    } else {
        res.status(405).send(`Method ${req.method} not allowed`);
    }
}