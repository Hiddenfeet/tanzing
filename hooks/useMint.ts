import { useContract, useNFTDrop } from '@thirdweb-dev/react'
import { useContext } from 'react'

import {
  useAddress,
  useMetamask,
  useNetwork,
  useNetworkMismatch,
} from '@thirdweb-dev/react'

import { NftContractContext } from '../contexts/NftContractProvider'

export const useMint = () => {
  const { data: editionDrop } = useContract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    'edition-drop'
  )
  const store = useContext(NftContractContext)

  const address = useAddress()
  const connectWithMetamask = useMetamask()
  const [, switchNetwork] = useNetwork()
  const isOnWrongNetwork = useNetworkMismatch()

  const mint = async () => {
    if (!address) {
      connectWithMetamask()
      return
    }

    if (isOnWrongNetwork) {
      switchNetwork && switchNetwork(Number(process.env.NEXT_PUBLIC_CHAIN_ID))
      return
    }

    store.setIsClaiming && store.setIsClaiming(true)

    try {
      const minted = await editionDrop?.claim(store.selectedToken, 1)
      alert(`Successfully minted NFT!`)
      window.location.reload();
    } catch (error) {
      console.error(error)
      alert(error)
    } finally {
      store.setIsClaiming && store.setIsClaiming(false)
    }
  }

  return { mint }
}
