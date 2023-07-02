import { Box, SimpleGrid, Button, VStack, Text } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { NftContractContext } from '../../contexts/NftContractProvider'
import { Fade } from '../elements/Fade'
import { NftListItem } from '../elements/NftListItem'
import { NoListItems } from '../elements/NoListItems'
import {
  useOwnedNFTs,
  useContract,
  useAddress
} from '@thirdweb-dev/react'
import { Burn } from '../elements/Burn '
import { useConnectWallet } from '../../hooks/useConnectWallet'

const Component: React.FC = () => {
  const [allTokens, setAllTokens] = useState<Array<any>>([])
  const store = useContext(NftContractContext)

  const { data: editionDrop } = useContract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    'edition-drop'
  )

  const address = useAddress();
  const { connectWallet } = useConnectWallet()

  const { data } = useOwnedNFTs(editionDrop, address);

  useEffect(() => {
    if (allTokens && data)
    setAllTokens(data)
  }, [store])

  return (
    <Fade>
      <VStack spacing={6}>
        <Box width="100%" height="">
          <Box maxW="8xl" mx="auto">
            <SimpleGrid
              columns={{
                base: 2,
                md: 3,
                lg: 4,
                xl: 5,
                '2xl': 6,
              }}
              spacing={{ base: 3, xl: 6 }}
              py={6}
            >
              {allTokens.map((token, index) => {
                return (
                  <React.Fragment key={index}>
                    <NftListItem token={token} />
                  </React.Fragment>
                )
              })}
              {allTokens.length == 0 && <NoListItems  />}
            </SimpleGrid>
          </Box>
        </Box>
        <div>
          {address ? (
              <Burn />
            ) : (
              <Button onClick={connectWallet}>
                <Text fontSize="xs">Connect Wallet</Text>
              </Button>
            )}
        </div>
      </VStack>
    </Fade>
  )
}

export { Component as Owned }
