import axios from 'axios';
import products from './products.json';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const productsNoHashes = products.map((product) => {
            const { ...rest } = product;
            return rest;
        });

        res.status(200).json(productsNoHashes);
    } else {
        res.status(405).send(`Method ${req.method} not allowed`);
    }
}
