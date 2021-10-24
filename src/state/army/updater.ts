import { useActiveWeb3React } from 'hooks'
import { useArmyContract } from 'hooks/useContract'
import { useSingleCallResult, useSingleContractMultipleData } from 'state/multicall/hooks'
import { useMemo } from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state'
import { addArmyList } from './action'
import { Army } from './reducer'
// import { BigNumber } from '@ethersproject/bignumber'

// import React from 'react'
export default function Updater() {
  const armyContract = useArmyContract()
  const { account } = useActiveWeb3React()

  const ownedArmy = useSingleCallResult(armyContract, 'ownedArmy', [account ?? undefined])

  const armyIds = useMemo(() => {
    const owned: BigNumber[] = ownedArmy?.result ? ownedArmy?.result[0] : []
    return owned.map((r: BigNumber) => [r.toNumber()])
  }, [ownedArmy])

  const results = useSingleContractMultipleData(armyContract, 'get_item_details', armyIds)
  // const r = useSingleCallResult(masterBreederContract, 'getNewRewardPerBlock', [0])
  const dispatch = useDispatch<AppDispatch>()
  const armyList: Army[] = []
  results.map((army, i) => {
    const r = army.result
    const armyDetail: Army = { id: i, armor: r?._armor.toNumber(), damage: r?._damage.toNumber(), level: r?._level.toNumber() }
    armyList.push(armyDetail)
  })
  dispatch(addArmyList({ armyList }))

  // const baseRewardsPerBlock = result && !result.loading && result.result ? result.result : undefined

  return armyList
  // return <div>{result.toString()}</div>
}
