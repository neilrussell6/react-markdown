import { createReducer } from '@reduxjs/toolkit'

import { normalize } from '../../common/utils/data'

//---------------------------------
// actions
//---------------------------------

export const API_GET_CATEGORIES = '[category] API get categories'
export const API_GET_CATEGORIES_SUCCESS = '[category] API get categories success'
export const API_GET_CATEGORIES_FAILURE = '[category] API get categories failure'
export const apiGetCategories = () => ({ type: API_GET_CATEGORIES })
export const apiGetCategoriesSuccess = data => ({ type: API_GET_CATEGORIES_SUCCESS, payload: data })
export const apiGetCategoriesFailure = message => ({ type: API_GET_CATEGORIES_FAILURE, payload: { message } })

export const SET_CATEGORIES = '[category] set categories'
export const setCategories = categories => ({ type: SET_CATEGORIES, payload: { categories } })

//---------------------------------
// reducers
//---------------------------------

const overwriteCategories = (state, { payload }) => {
  const { categories } = payload
  return normalize('id')(categories)
}

//---------------------------------
// reducer
//---------------------------------

export const INITIAL_STATE = null

const reducer = createReducer(INITIAL_STATE, {
  [SET_CATEGORIES]: overwriteCategories,
})

export default reducer
