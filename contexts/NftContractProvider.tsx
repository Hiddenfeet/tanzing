import {
  useAddress,
  useClaimedNFTSupply,
  useContract,
  useMetamask,
  useNetwork,
  useNetworkMismatch,
  useNFTDrop,
  useUnclaimedNFTSupply,
  useTotalCirculatingSupply,
  useContractRead,
  useOwnedNFTs,
} from '@thirdweb-dev/react'
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { ethers } from 'ethers'

type Store = {
  isLoading: boolean
  allTokens: Array<any>
  selectedToken: any, // 追加
  selectToken: (token: any) => void, // 追加
  isClaiming: boolean
  setIsClaiming?: Dispatch<SetStateAction<boolean>>
  spMenuOpened: boolean
  setSpMenuOpened?: Dispatch<SetStateAction<boolean>>
  ownedTokens: Array<any>
  setOwnedTokens?: Dispatch<SetStateAction<boolean>>
  claimPrice: string
  totalSupply: number
  claimedSupply: number
}

export const NftContractContext = createContext<Store>({
  isLoading: true,
  allTokens: [],
  selectedToken: null, // 追加
  selectToken: () => {}, // 追加
  isClaiming: false,
  spMenuOpened: false,
  ownedTokens: [],
  claimPrice: '',
  totalSupply: 0,
  claimedSupply: 0,
})

type Props = {
  children: React.ReactNode
}

const Component: React.FC<Props> = ({ children }: Props) => {
  const { data: editionDrop } = useContract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    'edition-drop'
  )

  const address = useAddress()
  const [allTokens, setAllTokens] = useState<Array<any>>([])
  const [selectedToken, setSelectedToken] = useState(null);

  const selectToken = (token: any) => {
    setSelectedToken(token.metadata.id);
    // console.log(selectedToken);
  }

  const [isLoading, setIsLoading] = useState(true)
  const [isClaiming, setIsClaiming] = useState<boolean>(false)
  const [spMenuOpened, setSpMenuOpened] = useState<boolean>(false)
  const [ownedTokens, setOwnedTokens] = useState<Array<any>>([])
  const [claimPrice, setClaimPrice] = useState<string>('')
  const [totalSupply, setTotalSupply] = useState<number>(0)
  const [claimedSupply, setClaimedSupply] = useState<number>(0)

  const { data: unclaimedNft } = useUnclaimedNFTSupply(editionDrop)
  // const { data: claimedNft } = useClaimedNFTSupply(editionDrop)
  const { data: n0 } = useContractRead(editionDrop, "totalSupply", 0)
  const { data: n1 } = useContractRead(editionDrop, "totalSupply", 1)
  const { data: n2 } = useContractRead(editionDrop, "totalSupply", 2)
  const { data: n3 } = useContractRead(editionDrop, "totalSupply", 3)
  const { data: n4 } = useContractRead(editionDrop, "totalSupply", 4)
  const { data: n5 } = useContractRead(editionDrop, "totalSupply", 5)
  const claimedNft = Number(n0) + Number(n1) + Number(n2) + Number(n3) + Number(n4) + Number(n5);

  const { data } = useOwnedNFTs(editionDrop, address);

  useEffect(() => {
    editionDrop?.getAll().then((results: any) => {
      setAllTokens(results)
      setIsLoading(false)
    })

    editionDrop?.claimConditions.getActive(0).then((activeClaimCondition: any) => {
      setClaimPrice(ethers.utils.formatUnits(activeClaimCondition.price._hex))
    })
  }, [editionDrop])

  useEffect(() => {
    if (address) {
      let owneds: Array<any> = []

      allTokens.map((token) => {
        if (token.owner == address) {
          owneds.push(token)
        }
      })

      setOwnedTokens(owneds)
    }

    setClaimedSupply(claimedNft || 0)
    // setTotalSupply(
    //   claimedNft && unclaimedNft
    //     ? claimedNft.toNumber() + unclaimedNft.toNumber()
    //     : 0
    // )
  }, [allTokens])

  useEffect(() => {
    // TODO transaction終了時のみにする
    if (!isLoading && data) {
      setAllTokens(data);
      setIsLoading(false);
    }

    editionDrop?.claimConditions.getActive(0).then((activeClaimCondition: any) => {
      setClaimPrice(ethers.utils.formatUnits(activeClaimCondition.price._hex))
    })
  }, [isClaiming])

  const store: Store = {
    isLoading,
    allTokens,
    selectedToken,
    selectToken,
    isClaiming,
    setIsClaiming,
    spMenuOpened,
    setSpMenuOpened,
    ownedTokens,
    claimPrice,
    claimedSupply,
    totalSupply,
  }

  return (
    <NftContractContext.Provider value={store}>
      {children}
    </NftContractContext.Provider>
  )
}

export { Component as NftContractProvider }
