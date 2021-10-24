import Polling from 'components/Header/Polling'
import Web3ReactManager from 'components/Web3ReactManager'
import Web3Status from 'components/Web3Status'

import { useActiveWeb3React } from 'hooks'

import React, { useEffect, Suspense } from 'react'
import ArmyUpdater from 'state/army/updater'

import styled from 'styled-components'

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg3)};
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;

  :focus {
    border: 1px solid blue;
  }
`

const HeaderFrame = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem;
  z-index: 2;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
    padding: 0 1rem;
    width: calc(100%);
    position: relative;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        padding: 0.5rem 1rem;
  `}
`

export default function App() {
  const { account } = useActiveWeb3React()
  const a = ArmyUpdater()
  console.log(a)
  useEffect(() => {
    console.log(account)
  }, [account])

  return (
    <Suspense fallback={null}>
      <Polling />

      <Web3ReactManager>
        <HeaderFrame>
          <AccountElement active={false}>
            <Web3Status />
          </AccountElement>
        </HeaderFrame>
      </Web3ReactManager>
    </Suspense>
  )
}
