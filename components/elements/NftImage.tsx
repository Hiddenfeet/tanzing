import { AspectRatio, Box, Flex, Spinner, Text, useToken } from '@chakra-ui/react'
import { NftContractContext } from '../../contexts/NftContractProvider'
import Image from 'next/image'
import React, {useContext} from 'react'

export type NftImageProps = {
  imageUri?: string
  title?: string
  tokenId?: number
}

const Component: React.FC<NftImageProps> = ({ imageUri, title, tokenId }) => {
  const blue300 = useToken("colors", "blue.400") // テーマから色を取得
  const store = useContext(NftContractContext)

  return (
    <Box boxShadow={store.selectedToken === tokenId ? `0 0 7px 4px ${blue300}` : ""}>
      {imageUri ? (
        <AspectRatio
          maxW="400px"
          ratio={1}
          backgroundColor="gray.50"
          position="relative"
        >
          <>
            <Flex
              position="absolute"
              left={0}
              right={0}
              w="100%"
              height="100%"
              alignItems="center"
              justifyItems="center"
            >
              <Spinner size="md" color="gray.300" />
            </Flex>
            <Image src={imageUri} width={400} height={400} layout="fill" />
          </>
        </AspectRatio>
      ) : (
        <AspectRatio maxW="400px" ratio={1} backgroundColor="gray.50">
          <Text fontSize="xs" color="gray.300">
            No Image
          </Text>
        </AspectRatio>
      )}
      {title && (
        <Text mt={2}>
          {title}
        </Text>
      )}
    </Box>
  )
}

export { Component as NftImage }
