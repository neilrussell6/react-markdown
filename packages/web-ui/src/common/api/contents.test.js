import * as SUT from './contents'
import {
  API_URL,
  API_ENDPOINT_CONTENTS,
} from './constants'

describe('common/api', () => {
  describe('getContents', () => {
    it('should retrieve contents as expected', async () => {
      // given ... API will respond successfully
      const getStub = jest.fn().mockResolvedValue({ data: 'RESULT DATA'})
      const axiosStub = { get: getStub }

      // when ... we get contents
      const getContents = SUT.getContents(axiosStub)
      const result = await getContents()

      // then ... should return response data, after correctly retrieving contents
      expect(result).toEqual('RESULT DATA')
      expect(getStub).toHaveBeenCalledWith(`${API_URL}${API_ENDPOINT_CONTENTS}`)
    })

    it('should fail as expected if cannot retrieve contents', async () => {
      // given ... API will respond with an error
      const getStub = jest.fn().mockRejectedValue('ERROR MESSAGE')
      const axiosStub = { get: getStub }

      // when ... we get contents
      const getContents = SUT.getContents(axiosStub)

      // then ... should return response data, after correctly retrieving contents
      await expect(getContents()).rejects.toEqual(new Error('API Error: could not retrieve contents'))
      expect(getStub).toHaveBeenCalledWith(`${API_URL}${API_ENDPOINT_CONTENTS}`)
    })
  })
})
