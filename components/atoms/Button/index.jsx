import react from 'react'
import { Button } from '@chakra-ui/button'

export const ButtonGeneric = ({ onClick, text, width }) => {
  return (
    <Button
      w={width}
      mt={0}
      bg={'linear-gradient(123.73deg, #B50B0E 22%, #EE1517 80.67%)'}
      color={'white'}
      rounded={'md'}
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: 'lg',
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  )
}
