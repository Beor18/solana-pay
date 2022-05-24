import React from 'react'
import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
} from '@chakra-ui/react'
import Buy from './Buy'

export default function Product({ product }) {
  const { id, name, price, description, image_url } = product

  return (
    <Flex p={5} w="full" alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        maxW="sm"
        borderWidth="1px"
        borderColor="#292828"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        <Image src={image_url} alt={`Picture of ${name}`} roundedTop="lg" />

        <Box p="6" bg="#292828" color="#FFFCF0">
          <Box d="flex" alignItems="baseline">
            <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
              New
            </Badge>
          </Box>

          <Flex justifyContent="space-between" alignContent="center">
            {/* {description} */}
            <Buy itemID={id} />
            <Box fontSize="2xl" color={'#FFFCF0'}>
              <Box as="span" color={'#FFFCF0'} fontSize="lg" pr={1}>
                USDC
              </Box>
              {price}
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  )
}
