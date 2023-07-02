import { Box, Text } from '@chakra-ui/react'
import { useContext } from 'react'
import { NftContractContext } from '../../contexts/NftContractProvider'
import React from 'react'
import { NULL_ADDRESS } from '../../utils/const'
import { NftImage } from './NftImage'

export type NftListItemProps = {
  // TODO Define correct nft type
  token: any
}

const Component: React.FC<NftListItemProps> = ({ token }) => {
  const store = useContext(NftContractContext)
  const handleClick = () => {
    store.selectToken(token)
    console.log('Image was clicked!', store.selectedToken);
  };
  return (
    <Box onClick={handleClick} cursor="pointer" >
      <Box position="relative">
      {/* <Box opacity={token.owner === NULL_ADDRESS ? 0.2 : 1.0}> */}
        <NftImage imageUri={token.metadata.image} tokenId={token.metadata.id} />
      {/* </Box> */}
      <Text
        as="h4"
        fontSize={{ base: 'sm', md: 'lg' }}
        mt={2}
        textAlign="center"
        fontWeight="bold"
      >
        {token.metadata.name}
      </Text>
      </Box>
    </Box>
  )
}

export { Component as NftListItem }
