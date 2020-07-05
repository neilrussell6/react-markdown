import {
  API_GET_CATEGORIES,
  API_GET_CATEGORIES_SUCCESS,
  apiGetCategories,
  apiGetCategoriesSuccess,
  apiGetCategoriesFailure,
  setCategories,
} from './categories.reducer'

//---------------------------------
// categories init
// ... starts the API get categories flow
// ... on App initialization
//---------------------------------

export const categoriesInitFlow = ({ APP_INIT }) => ({ dispatch }) => next => (action) => {
  next(action)

  const { type } = action
  if (type === APP_INIT) {
    dispatch(apiGetCategories())
  }
}

//---------------------------------
// API get categories
// ... gets categories from API
// ... and either succeeds with the response data
// ... or fails with the received error message
//---------------------------------

export const apiGetCategoriesFlow = ({ API }) => ({ dispatch }) => next => (action) => {
  next(action)

  const { type } = action
  if (type === API_GET_CATEGORIES) {
    API
      .getCategories()
      .then((response) => {
        dispatch(apiGetCategoriesSuccess(response))
      })
      .catch((e) => {
        dispatch(apiGetCategoriesFailure(e.message))
      })
  }
}

//---------------------------------
// categories init
// ... signals intention to update state
// ... with list of categories returned from API
//---------------------------------

export const setCategoriesFlow = ({ dispatch }) => next => (action) => {
  next(action)

  const { type, payload } = action
  if (type === API_GET_CATEGORIES_SUCCESS) {
    dispatch(setCategories(payload))
  }
}
