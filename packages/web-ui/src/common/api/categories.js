import Bluebird from 'bluebird'
import { path } from 'ramda'

import { API_URL, API_ENDPOINT_CATEGORIES } from './constants'

export const getCategories = (axios) => () =>
  Bluebird.resolve(axios.get(`${API_URL}${API_ENDPOINT_CATEGORIES}`))
    .then(path(['data', 'data']))
    .catch(() =>
      // TODO: add error logging
      Bluebird.reject(new Error('API Error: could not retrieve categories')),
    )
