import { createAction } from '@reduxjs/toolkit'
import { Army } from './reducer'

export const addArmyList = createAction<{ armyList: Army[] }>('army/addArmyList')
