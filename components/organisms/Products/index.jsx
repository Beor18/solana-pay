import React from 'react';
import {
    Flex,
    Circle,
    Box,
    Image,
    useColorModeValue,
    Icon,
    chakra,
    Tooltip,
} from '@chakra-ui/react';
import Buy from '../../Buy';
import { Badges } from '../../atoms/Badge';
import { BoxPrice } from '../../atoms/BoxPrice';

export default function Product({ product }) {
    const { id, name, price, numberFix, description, image_url } = product;

    return (
        <Flex p={5} w='full' alignItems='center' justifyContent='center'>
            <Box
                bg={useColorModeValue('white', 'gray.800')}
                maxW='sm'
                borderWidth='1px'
                borderColor='#292828'
                rounded='lg'
                shadow='lg'
                position='relative'
            >
                <Image
                    src={image_url}
                    alt={`Picture of ${name}`}
                    roundedTop='lg'
                />

                <Box p='6' bg='#292828' color='#FFFCF0'>
                    <Badges />

                    <Flex justifyContent='space-between' alignContent='center'>
                        {/* {description} */}
                        <Buy itemID={id} />
                        <BoxPrice price={price} priceFixed={numberFix} />
                    </Flex>
                </Box>
            </Box>
        </Flex>
    );
}
