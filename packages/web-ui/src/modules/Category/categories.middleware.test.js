import Bluebird from 'bluebird'

import {
  apiGetCategories,
  apiGetCategoriesSuccess,
  apiGetCategoriesFailure,
  setCategories,
} from './categories.reducer'
import * as SUT from './categories.middleware'

describe('modules/Category/categories.reducer', () => {
  describe('categoriesInitFlow', () => {
    it('should starts the API get categories flow on App initialization', () => {
      const dispatchStub = jest.fn()
      const store = { dispatch: dispatchStub }
      const nextStub = jest.fn()

      // when ... the App initializes
      const APP_INIT = '[app] init'
      const action = { type: APP_INIT }
      const middleware = SUT.categoriesInitFlow({ APP_INIT })
      middleware(store)(nextStub)(action)

      // then ... should start the API get categories flow
      expect(nextStub).toHaveBeenCalledWith(action)
      expect(dispatchStub).toHaveBeenCalledWith(apiGetCategories('API DATA'))
    })
  })

  describe('apiGetCategoriesFlow', () => {
    it('should succeed with API data', async () => {
      // given
      // ... store methods will behave as expected
      const dispatchStub = jest.fn()
      const store = { dispatch: dispatchStub }
      const nextStub = jest.fn()
      // ... API request to retrieve categories will respond with success
      const getCategoriesStub = jest.fn().mockResolvedValue('API DATA')
      const apiStub = { getCategories: getCategoriesStub }

      // when ... we get categories from the API
      const action = apiGetCategories()
      const middleware = SUT.apiGetCategoriesFlow({ API: apiStub })
      middleware(store)(nextStub)(action)

      await Bluebird.delay(10)

      // then ... should succeed with API data
      expect(nextStub).toHaveBeenCalledWith(action)
      expect(getCategoriesStub).toHaveBeenCalledWith()
      expect(dispatchStub).toHaveBeenCalledWith(
        apiGetCategoriesSuccess('API DATA'),
      )
    })

    it('should fail with error message', async () => {
      // given
      // ... store methods will behave as expected
      const dispatchStub = jest.fn()
      const store = { dispatch: dispatchStub }
      const nextStub = jest.fn()
      // ... API request to retrieve categories will fail with message
      const getCategoriesStub = jest
        .fn()
        .mockRejectedValue(new Error('ERROR MESSAGE'))
      const apiStub = { getCategories: getCategoriesStub }

      // when ... we get categories from the API
      const action = apiGetCategories()
      const middleware = SUT.apiGetCategoriesFlow({ API: apiStub })
      middleware(store)(nextStub)(action)

      await Bluebird.delay(10)

      // then ... should succeed with API data
      expect(nextStub).toHaveBeenCalledWith(action)
      expect(getCategoriesStub).toHaveBeenCalledWith()
      expect(dispatchStub).toHaveBeenCalledWith(
        apiGetCategoriesFailure('ERROR MESSAGE'),
      )
    })
  })

  describe('setCategoriesFlow', () => {
    it('should signals intention to update state with list of categories returned from API', () => {
      const dispatchStub = jest.fn()
      const store = { dispatch: dispatchStub }
      const nextStub = jest.fn()

      // when ... we successfully get categories from API
      const action = apiGetCategoriesSuccess('CATEGORIES')
      const middleware = SUT.setCategoriesFlow
      middleware(store)(nextStub)(action)

      // then ... should start the API get categories flow
      expect(nextStub).toHaveBeenCalledWith(action)
      expect(dispatchStub).toHaveBeenCalledWith(setCategories('CATEGORIES'))
    })
  })
})
