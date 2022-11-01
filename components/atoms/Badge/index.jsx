import { Box, Badge } from '@chakra-ui/react';

export const Badges = () => {
    return (
        <Box d='flex' alignItems='baseline'>
            <Badge rounded='full' px='2' fontSize='0.8em' colorScheme='red'>
                New
            </Badge>
        </Box>
    );
};
