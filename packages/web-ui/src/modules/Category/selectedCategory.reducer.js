import { createReducer } from '@reduxjs/toolkit'

//---------------------------------
// actions
//---------------------------------

export const SELECT_CATEGORY = '[category] select'
export const selectCategory = (id) => ({
  type: SELECT_CATEGORY,
  payload: { id },
})

//---------------------------------
// reducers
//---------------------------------

const setSelectedCategory = (state, { payload }) => {
  const { id } = payload
  return parseInt(id, 10)
}

//---------------------------------
// reducer
//---------------------------------

export const INITIAL_STATE = null

const reducer = createReducer(INITIAL_STATE, {
  [SELECT_CATEGORY]: setSelectedCategory,
})

export default reducer
