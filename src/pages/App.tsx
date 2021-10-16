import Web3ReactManager from 'components/Web3ReactManager'
import Web3Status from 'components/Web3Status'

import { useActiveWeb3React } from 'hooks'

import React, { useEffect, Suspense } from 'react'

export default function App() {
  const { account } = useActiveWeb3React()

  useEffect(() => {
    console.log(account)
  }, [account])

  return (
    <Suspense fallback={null}>
      <Web3ReactManager>
        <Web3Status />
      </Web3ReactManager>
    </Suspense>
  )
}
