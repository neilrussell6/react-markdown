import Bluebird from 'bluebird'
import { prop } from 'ramda'

import {
  API_URL,
  API_ENDPOINT_CATEGORIES,
} from './constants'

export const getCategories = axios => () => (
  Bluebird
    .resolve(axios.get(`${API_URL}${API_ENDPOINT_CATEGORIES}`))
    .then(prop('data'))
    .catch(() => (
      // TODO: add error logging
      Bluebird.reject(new Error('API Error: could not retrieve categories'))
    ))
)
