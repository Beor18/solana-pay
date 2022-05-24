import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Center,
  Text,
  Button,
  Flex,
  SimpleGrid,
  Heading,
} from '@chakra-ui/react'
import CreateProduct from '../components/CreateProduct'
import Product from '../components/Product'
import HeadComponent from '../components/Head'

import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ButtonGeneric from '../components/ButtonGeneric'

const App = () => {
  const { publicKey } = useWallet()
  const isOwner = publicKey
    ? publicKey.toString() === process.env.NEXT_PUBLIC_OWNER_PUBLIC_KEY
    : false
  const [creating, setCreating] = useState(false)
  const [products, setProducts] = useState([])

  // const renderNotConnectedContainer = () => (
  //   <div>
  //     <img
  //       src="https://media.giphy.com/media/eSwGh3YK54JKU/giphy.gif"
  //       alt="emoji"
  //     />

  //     <div className="button-container">
  //       <WalletMultiButton className="cta-button connect-wallet-button" />
  //     </div>
  //   </div>
  // )

  useEffect(() => {
    //if (publicKey) {
      fetch(`/api/fetchProducts`)
        .then((response) => response.json())
        .then((data) => {
          setProducts(data)
          console.log('Products', data)
        })
    //}
  }, [publicKey])

  const renderItemBuyContainer = () => (
    <SimpleGrid columns={{base: 1, sm: 1, md: 3}} spacing={2}>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </SimpleGrid>
  )

  return (
    <Box p={0} m={0} h="100vh">
      <HeadComponent />
      {/* {isOwner && ( */}
        <Navbar
          create={creating ? 'Close' : 'Create Product'}
          onClick={() => setCreating(!creating)}
          isOwner={isOwner}
        />
      {/* )} */}
      <Container maxW="full" bg="#090910" color="#262626">
        <Container maxW="container.xl" bg="blackAlpha.700" color="#262626">
          <Box p={5}>
            <Heading color="white">
              <Center>Flower Coffee</Center>
            </Heading>
            <br />
            <Heading color="white">
              <Center>The Best Coffee of LATAM</Center>
            </Heading>

            {/* {isOwner && (
              <ButtonGeneric text={creating ? 'Close' : 'Create Product'} onClick={() => setCreating(!creating)} />
            )} */}
          </Box>

          <Box>
            {creating && isOwner && <CreateProduct />}
            {renderItemBuyContainer()}
          </Box>
        </Container>
      </Container>
      <Footer />
    </Box>
  )
}

export default App
