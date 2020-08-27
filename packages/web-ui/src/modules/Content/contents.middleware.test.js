import Bluebird from 'bluebird'

import {
  apiGetContents,
  apiGetContentsSuccess,
  apiGetContentsFailure,
  setContents,
} from './contents.reducer'
import * as SUT from './contents.middleware'
import { deselectContent } from './selectedContent.reducer'

describe('modules/Content/contents.reducer', () => {
  describe('contentsInitFlow', () => {
    it('should starts the API get contents flow on App initialization', () => {
      const dispatchStub = jest.fn()
      const store = { dispatch: dispatchStub }
      const nextStub = jest.fn()

      // when ... the App initializes
      const APP_INIT = '[app] init'
      const action = { type: APP_INIT }
      const middleware = SUT.contentsInitFlow({ APP_INIT })
      middleware(store)(nextStub)(action)

      // then ... should start the API get contents flow
      expect(nextStub).toHaveBeenCalledWith(action)
      expect(dispatchStub).toHaveBeenCalledWith(apiGetContents('API DATA'))
    })
  })

  describe('apiGetContentsFlow', () => {
    it('should succeed with API data', async () => {
      // given
      // ... store methods will behave as expected
      const dispatchStub = jest.fn()
      const store = { dispatch: dispatchStub }
      const nextStub = jest.fn()
      // ... API request to retrieve contents will respond with success
      const getContentsStub = jest.fn().mockResolvedValue('API DATA')
      const apiStub = { getContents: getContentsStub }

      // when ... we get contents from the API
      const action = apiGetContents()
      const middleware = SUT.apiGetContentsFlow({ API: apiStub })
      middleware(store)(nextStub)(action)

      await Bluebird.delay(10)

      // then ... should succeed with API data
      expect(nextStub).toHaveBeenCalledWith(action)
      expect(getContentsStub).toHaveBeenCalledWith()
      expect(dispatchStub).toHaveBeenCalledWith(
        apiGetContentsSuccess('API DATA'),
      )
    })

    it('should fail with error message', async () => {
      // given
      // ... store methods will behave as expected
      const dispatchStub = jest.fn()
      const store = { dispatch: dispatchStub }
      const nextStub = jest.fn()
      // ... API request to retrieve contents will fail with message
      const getContentsStub = jest
        .fn()
        .mockRejectedValue(new Error('ERROR MESSAGE'))
      const apiStub = { getContents: getContentsStub }

      // when ... we get contents from the API
      const action = apiGetContents()
      const middleware = SUT.apiGetContentsFlow({ API: apiStub })
      middleware(store)(nextStub)(action)

      await Bluebird.delay(10)

      // then ... should succeed with API data
      expect(nextStub).toHaveBeenCalledWith(action)
      expect(getContentsStub).toHaveBeenCalledWith()
      expect(dispatchStub).toHaveBeenCalledWith(
        apiGetContentsFailure('ERROR MESSAGE'),
      )
    })
  })

  describe('setContentsFlow', () => {
    it('should signal intention to update state with list of contents returned from API', () => {
      const dispatchStub = jest.fn()
      const store = { dispatch: dispatchStub }
      const nextStub = jest.fn()

      // when ... we successfully get contents from API
      const action = apiGetContentsSuccess('CONTENTS')
      const middleware = SUT.setContentsFlow
      middleware(store)(nextStub)(action)

      // then ... should start the API get contents flow
      expect(nextStub).toHaveBeenCalledWith(action)
      expect(dispatchStub).toHaveBeenCalledWith(setContents('CONTENTS'))
    })
  })

  describe('deselectContentFlow', () => {
    it('should signal intention to deselect content', () => {
      const dispatchStub = jest.fn()
      const store = { dispatch: dispatchStub }
      const nextStub = jest.fn()

      // when ... we select a new category
      const SELECT_CATEGORY = 'SELECT CATEGORY'
      const selectCategory = { type: SELECT_CATEGORY }
      const middleware = SUT.deselectContentFlow
      middleware({ SELECT_CATEGORY })(store)(nextStub)(selectCategory)

      // then ... should signal intention to deselect content
      expect(nextStub).toHaveBeenCalledWith(selectCategory)
      expect(dispatchStub).toHaveBeenCalledWith(deselectContent())
    })
  })
})
