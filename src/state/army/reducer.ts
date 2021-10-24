import { createReducer } from '@reduxjs/toolkit'
import { addArmyList } from './action'

export interface Army {
  id: number
  level: number
  damage: number
  armor: number
}

export interface OwnedArmys {
  list: Army[]
}

const initialState: OwnedArmys = {
  list: []
}

export default createReducer(initialState, builder =>
  builder.addCase(addArmyList, (state, { payload: { armyList } }) => {
    state.list = armyList
  })
)
