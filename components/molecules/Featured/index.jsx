import { Box, Container, Image } from "@chakra-ui/react"

export const Featured = () => {
    return (
       <Box maxW='full'  backgroundImage='background-header.jpg'>
           <Container maxW='container.xl'>
               <Image src='header-image.png' />
           </Container>
       </Box> 
    )
}