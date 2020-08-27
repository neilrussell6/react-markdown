import { createReducer } from '@reduxjs/toolkit'

//---------------------------------
// actions
//---------------------------------

export const SELECT_CONTENT = '[content] select'
export const selectContent = (id) => ({ type: SELECT_CONTENT, payload: id })

export const DESELECT_CONTENT = '[content] deselect'
export const deselectContent = () => ({ type: DESELECT_CONTENT })

//---------------------------------
// reducers
//---------------------------------

const setSelectedContent = (state, { payload: id }) => parseInt(id, 10)
const resetSelectedContent = () => INITIAL_STATE

//---------------------------------
// reducer
//---------------------------------

export const INITIAL_STATE = null

const reducer = createReducer(INITIAL_STATE, {
  [SELECT_CONTENT]: setSelectedContent,
  [DESELECT_CONTENT]: resetSelectedContent,
})

export default reducer
