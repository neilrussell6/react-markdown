import Bluebird from 'bluebird'
import { path } from 'ramda'

import { API_URL, API_ENDPOINT_CONTENTS } from './constants'

export const getContents = (axios) => () =>
  Bluebird.resolve(axios.get(`${API_URL}${API_ENDPOINT_CONTENTS}`))
    .then(path(['data', 'data']))
    .catch(() =>
      // TODO: add error logging
      Bluebird.reject(new Error('API Error: could not retrieve contents')),
    )

export const getContent = (axios) => (id) =>
  Bluebird.resolve(axios.get(`${API_URL}${API_ENDPOINT_CONTENTS}/${id}`))
    .then(path(['data', 'data']))
    .catch(() =>
      // TODO: add error logging
      Bluebird.reject(new Error('API Error: could not retrieve contents')),
    )
