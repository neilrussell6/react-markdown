import { createReducer } from '@reduxjs/toolkit'

//---------------------------------
// actions
//---------------------------------

export const SELECT_CONTENT = '[content] select'
export const selectContent = (id) => ({ type: SELECT_CONTENT, payload: id })

//---------------------------------
// reducers
//---------------------------------

const setSelectedContent = (state, { payload: id }) => parseInt(id, 10)

//---------------------------------
// reducer
//---------------------------------

export const INITIAL_STATE = null

const reducer = createReducer(INITIAL_STATE, {
  [SELECT_CONTENT]: setSelectedContent,
})

export default reducer
