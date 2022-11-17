import React, { useState } from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Textarea,
  Heading
} from '@chakra-ui/react'
import { create } from 'ipfs-http-client'
import { Box } from '@chakra-ui/react'

const client = create('https://ipfs.infura.io:5001/api/v0')

export const ProductsCreate = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image_url: '',
    description: '',
  })
  const [file, setFile] = useState({})
  const [uploading, setUploading] = useState(false)

  async function onChange(e) {
    setUploading(true)
    const files = e.target.files
    try {
      console.log(files[0])
      const added = await client.add(files[0])
      setFile({ filename: files[0].name, hash: added.path })
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
    setUploading(false)
  }

  const createProduct = async () => {
    try {
      // Combine product data and file.name
      const product = { ...newProduct, ...file }
      console.log('Sending product to api', product)
      const response = await fetch('../api/addProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
      const data = await response.json()
      if (response.status === 200) {
        alert('Product added!')
      } else {
        alert('Unable to add product: ', data.error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box >
      <div>
        <div>
        <Heading color="white" fontSize="30px">Create Product</Heading>
          <br />
          <FormControl>
            <div>
              <Input
                type="text"
                placeholder="Product Name"
                onChange={(e) => {
                  setNewProduct({ ...newProduct, name: e.target.value })
                }}
              />
              </div>
              <br/>
              <div>
              <Input
                type="text"
                placeholder="0.01 USDC"
                onChange={(e) => {
                  setNewProduct({ ...newProduct, price: e.target.value })
                }}
              />
            </div>
            <br/>
            <div>
              <Input
                type="url"
                placeholder="Image URL ex: https://i.imgur.com/rVD8bjt.png"
                onChange={(e) => {
                  setNewProduct({ ...newProduct, image_url: e.target.value })
                }}
              />
            </div>
            <br/>
            <Textarea
              placeholder="Description here..."
              onChange={(e) => {
                setNewProduct({ ...newProduct, description: e.target.value })
              }}
            />
            <br />
            <br />
            <Button
              onClick={() => {
                createProduct()
              }}
              disabled={uploading}
            >
              Create Product
            </Button>
          </FormControl>
        </div>
      </div>
    </Box>
  )
}
