import { Box } from '@chakra-ui/react';

export const BoxPrice = ({ price, currency = 'FLWR' }) => {
    return (
        <Box fontSize='2xl' color={'#FFFCF0'}>
            <Box as='span' color={'#FFFCF0'} fontSize='lg' pr={1}>
                {currency}
            </Box>
            {price}
        </Box>
    );
};
