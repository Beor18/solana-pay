import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    clusterApiUrl,
    Connection,
    PublicKey,
    Transaction,
} from '@solana/web3.js';
import {
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID,
    createTransferCheckedInstruction,
    getAssociatedTokenAddress,
    getMint,
} from '@solana/spl-token';
import BigNumber from 'bignumber.js';
import products from './products.json';

const USDC = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
const FLWR = "FLWRna1gxehQ9pSyZMzxfp4UhewvLPwuKfdUTgdZuMBY"

const USDC_MINT = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
const usdcAddress = new PublicKey(
    'FLWRna1gxehQ9pSyZMzxfp4UhewvLPwuKfdUTgdZuMBY'
);
const sellerAddress = 'D1Kfd1XNeFpcxHMAw6yCfqvYgoqXug8rqwNKX3ycPhit';
const sellerPublicKey = new PublicKey(sellerAddress);

const createTransaction = async (req, res) => {
    try {
        const { buyer, orderID, itemID } = req.body;
        if (!buyer) {
            res.status(400).json({
                message: 'Missing buyer address',
            });
        }

        if (!orderID) {
            res.status(400).json({
                message: 'Missing order ID',
            });
        }

        const itemPrice = products.find((item) => item.id === itemID).price;

        if (!itemPrice) {
            res.status(404).json({
                message: 'Item not found. please check item ID',
            });
        }

        const bigAmount = BigNumber(itemPrice);
        const buyerPublicKey = new PublicKey(buyer);

        const network = WalletAdapterNetwork.Mainnet;
        const endpoint = clusterApiUrl(network);
        const connection = new Connection(endpoint);

        const { blockhash } = await connection.getLatestBlockhash('finalized');

        // This is new, we're getting the mint address of the token we want to transfer
        const usdcMint = await getMint(connection, usdcAddress);

        const converNumber = bigAmount.toNumber() * 1000 ** (await usdcMint).decimals
        console.log("Fernando ConvertNumber: ", converNumber)

        //Swap logic
        const data = await fetch(
            `https://quote-api.jup.ag/v3/quote?inputMint=${USDC}&outputMint=${FLWR}&amount=${converNumber}&slippageBps=50&feeBps=4`
        );

        const routes = await data.json();
        console.log('fernando routes: ', routes.data);

        const transactions = await fetch('https://quote-api.jup.ag/v3/swap', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                route: routes?.data[0],
                userPublicKey: buyerPublicKey,
            }),
        });

        const transactionData = await transactions.json();
        const { setupTransaction, swapTransaction, cleanupTransaction } =
            transactionData;

        ///////////////////////////////////
        const tx = new Transaction({
          recentBlockhash: blockhash,
          feePayer: buyerPublicKey,
        });
        
        const userDestinationTokenAccount = await getAssociatedTokenAddress(
            // ASSOCIATED_TOKEN_PROGRAM_ID,
            // TOKEN_PROGRAM_ID,
            usdcAddress,
            buyerPublicKey
        );

        const merchantTokenAccount = await getAssociatedTokenAddress(
            // ASSOCIATED_TOKEN_PROGRAM_ID,
            // TOKEN_PROGRAM_ID,
            usdcAddress,
            sellerPublicKey,
            true,
        );

        // Here we're creating a different type of transfer instruction
        const transferInstruction = await createTransferCheckedInstruction(
            userDestinationTokenAccount,
            usdcAddress,
            merchantTokenAccount,
            buyerPublicKey,
            routes.data[0].outAmount,
            usdcMint.decimals
        );

        // The rest remains the same :)
        transferInstruction.keys.push({
            pubkey: new PublicKey(orderID),
            isSigner: false,
            isWritable: false,
        });

        tx.add(transferInstruction);

        const serializedTransaction = tx.serialize({
            requireAllSignatures: false,
        });

        const base64 = serializedTransaction.toString('base64');

        res.status(200).json({
            transaction: base64,
            swap: swapTransaction
        });
    } catch (err) {
        console.error(err);

        res.status(500).json({ error: 'error creating transaction' });
        return;
    }
};

export default function handler(req, res) {
    if (req.method === 'POST') {
        createTransaction(req, res);
    } else {
        res.status(405).end();
    }
}
