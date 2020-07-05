import {
  API_GET_CONTENTS,
  API_GET_CONTENTS_SUCCESS,
  apiGetContents,
  apiGetContentsSuccess,
  apiGetContentsFailure,
  setContents,
  API_GET_CONTENT,
  API_GET_CONTENT_SUCCESS,
  apiGetContent,
  apiGetContentSuccess,
  apiGetContentFailure,
  setContent,
} from './contents.reducer'
import { SELECT_CONTENT } from './selectedContent.reducer'

//---------------------------------
// contents init
// ... starts the API get contents flow
// ... on App initialization
//---------------------------------

export const contentsInitFlow = ({ APP_INIT }) => ({ dispatch }) => (next) => (
  action,
) => {
  next(action)

  const { type } = action
  if (type === APP_INIT) {
    dispatch(apiGetContents())
  }
}

//---------------------------------
// API get contents
// ... gets contents from API
// ... and either succeeds with the response data
// ... or fails with the received error message
//---------------------------------

export const apiGetContentsFlow = ({ API }) => ({ dispatch }) => (next) => (
  action,
) => {
  next(action)

  const { type } = action
  if (type === API_GET_CONTENTS) {
    API.getContents()
      .catch((e) => {
        dispatch(apiGetContentsFailure(e.message))
      })
      .then((response) => {
        dispatch(apiGetContentsSuccess(response))
      })
  }
}

//---------------------------------
// set contents
// ... signals intention to update state
// ... with list of contents returned from API
//---------------------------------

export const setContentsFlow = ({ dispatch }) => (next) => (action) => {
  next(action)

  const { type, payload } = action
  if (type === API_GET_CONTENTS_SUCCESS) {
    dispatch(setContents(payload))
  }
}

//---------------------------------
// select content
// ... starts the API get content flow
//---------------------------------

export const selectContentFlow = ({ dispatch }) => (next) => (action) => {
  next(action)

  const { type, payload: id } = action
  if (type === SELECT_CONTENT) {
    dispatch(apiGetContent(id))
  }
}

//---------------------------------
// API get content
// ... gets content from API
// ... and either succeeds with the response data
// ... or fails with the received error message
//---------------------------------

export const apiGetContentFlow = ({ API }) => ({ dispatch }) => (next) => (
  action,
) => {
  next(action)

  const { type, payload: id } = action
  if (type === API_GET_CONTENT) {
    API.getContent(id)
      .catch((e) => {
        dispatch(apiGetContentFailure(e.message))
      })
      .then((response) => {
        dispatch(apiGetContentSuccess(response))
      })
  }
}

//---------------------------------
// set content
// ... signals intention to update state
// ... with content returned from API
//---------------------------------

export const setContentFlow = ({ dispatch }) => (next) => (action) => {
  next(action)

  const { type, payload } = action
  if (type === API_GET_CONTENT_SUCCESS) {
    dispatch(setContent(payload))
  }
}
