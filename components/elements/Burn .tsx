import { useAddress, useContract, Web3Button, useContractWrite } from "@thirdweb-dev/react";
import { Button } from '@chakra-ui/react'
import { useContext } from 'react'

import { NftContractContext } from '../../contexts/NftContractProvider'

const Component: React.FC = () => {
  const address = useAddress()
  const store = useContext(NftContractContext)
  const ids = [store.selectedToken]
  const values = [1]

  // Your smart contract address
  const { data: editionDrop } = useContract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    'edition-drop'
  )

  const call = async () => {
    try {
      await editionDrop?.call("burnBatch", address, ids, values)
      alert(`Successfully burned NFT!`);
      window.location.reload();
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

  return (
    <Button onClick={call}>
      Burn NFT
    </Button>
  );
}

export { Component as Burn }
