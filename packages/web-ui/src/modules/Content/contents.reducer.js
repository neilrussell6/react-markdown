import { createReducer } from '@reduxjs/toolkit'
import { assocPath } from 'ramda'

import { normalize } from '../../common/utils/data'

//---------------------------------
// actions
//---------------------------------

export const API_GET_CONTENTS = '[content] API get contents'
export const API_GET_CONTENTS_SUCCESS = '[content] API get contents success'
export const API_GET_CONTENTS_FAILURE = '[content] API get contents failure'
export const apiGetContents = () => ({ type: API_GET_CONTENTS })
export const apiGetContentsSuccess = data => ({ type: API_GET_CONTENTS_SUCCESS, payload: data })
export const apiGetContentsFailure = message => ({ type: API_GET_CONTENTS_FAILURE, payload: { message } })

export const SET_CONTENTS = '[content] set contents'
export const setContents = contents => ({ type: SET_CONTENTS, payload: { contents } })

export const API_GET_CONTENT = '[content] API get content'
export const API_GET_CONTENT_SUCCESS = '[content] API get content success'
export const API_GET_CONTENT_FAILURE = '[content] API get content failure'
export const apiGetContent = id => ({ type: API_GET_CONTENT, payload: id })
export const apiGetContentSuccess = data => ({ type: API_GET_CONTENT_SUCCESS, payload: data })
export const apiGetContentFailure = message => ({ type: API_GET_CONTENT_FAILURE, payload: { message } })

export const SET_CONTENT = '[content] set content'
export const setContent = content => ({ type: SET_CONTENT, payload: content })

//---------------------------------
// reducers
//---------------------------------

const overwriteContents = (state, { payload }) => {
  const { contents } = payload
  return normalize('id')(contents)
}

const updateContents = (state, { payload: content }) => {
  const { id, markdown } = content
  return assocPath([id, 'markdown'], markdown)(state)
}

//---------------------------------
// reducer
//---------------------------------

export const INITIAL_STATE = {}

const reducer = createReducer(INITIAL_STATE, {
  [SET_CONTENTS]: overwriteContents,
  [SET_CONTENT]: updateContents,
})

export default reducer
