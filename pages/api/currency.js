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
        
        const response = await axios.get(
            `https://api.coingecko.com/api/v3/simple/price?ids=sol-flowers&vs_currencies=usd`
        );

        const priceFLWR = response.data["sol-flowers"].usd;

        //const numberFix = Number(priceFLWR).toFixed()
        
        let newRest = {
            USD: priceFLWR
        }

        res.status(200).json(newRest);
    } else {
        res.status(405).send(`Method ${req.method} not allowed`);
    }
}