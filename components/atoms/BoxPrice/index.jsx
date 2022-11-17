import { Box } from '@chakra-ui/react';

export const BoxPrice = ({ price, priceFixed, currency = 'USDC', flwr= 'FLWR' }) => {
    return (
        <Box fontSize='2xl' color={'#FFFCF0'}>
            <Box as='span' color={'#FFFCF0'} fontSize='lg' pr={1}>
            {price} - {currency}
            </Box>
            <Box as='span' color={'#FFFCF0'} fontSize='lg' pr={1}>
            // {priceFixed} - {flwr}
            </Box>
        </Box>
    );
};
