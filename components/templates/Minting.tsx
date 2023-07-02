import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react'
import { useContext } from 'react'
import { NftContractContext } from '../../contexts/NftContractProvider'
import { useConnectWallet } from '../../hooks/useConnectWallet'
import { useMint } from '../../hooks/useMint'
import { Fade } from '../elements/Fade'
import { NftImagesSlideShow } from '../elements/NftImagesSlideShow'

import { useAddress } from '@thirdweb-dev/react'

const Component: React.FC = () => {
  const store = useContext(NftContractContext)
  const address = useAddress()

  const { mint } = useMint()
  const { connectWallet } = useConnectWallet()

  return (
      <Fade>
        <VStack spacing={6}>
          <Box width="100%" height="">
            <NftImagesSlideShow />
          </Box>

          <div>
            {address ? (
              <Button onClick={mint} disabled={store.isClaiming}>
                {store.isClaiming
                  ? 'claiming...'
                  : `MINT (${store.claimPrice} ETH)`}
              </Button>
            ) : (
              <Button onClick={connectWallet}>
                <Text fontSize="xs">Connect Wallet</Text>
              </Button>
            )}
            <Text pt={2} fontSize="xs" textAlign={'center'}>
              {store.claimedSupply} / ∞
            </Text>
            <Text pt={2} fontSize="xs" textAlign={'center'}>
              goerli testnet
            </Text>
          </div>
        </VStack>
      </Fade>
  )
}

export { Component as Minting }
