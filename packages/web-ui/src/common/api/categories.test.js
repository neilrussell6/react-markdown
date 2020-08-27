import * as SUT from './categories'
import { API_URL, API_ENDPOINT_CATEGORIES } from './constants'

describe('common/api', () => {
  describe('getCategories', () => {
    it('should retrieve categories as expected', async () => {
      // given ... API will respond successfully
      const getStub = jest
        .fn()
        .mockResolvedValue({ data: { data: 'RESULT DATA' } })
      const axiosStub = { get: getStub }

      // when ... we get categories
      const getCategories = SUT.getCategories(axiosStub)
      const result = await getCategories()

      // then ... should return response data, after correctly retrieving categories
      expect(result).toEqual('RESULT DATA')
      expect(getStub).toHaveBeenCalledWith(
        `${API_URL}${API_ENDPOINT_CATEGORIES}`,
      )
    })

    it('should fail as expected if cannot retrieve categories', async () => {
      // given ... API will respond with an error
      const getStub = jest.fn().mockRejectedValue('ERROR MESSAGE')
      const axiosStub = { get: getStub }

      // when ... we get categories
      const getCategories = SUT.getCategories(axiosStub)

      // then ... should return response data, after correctly retrieving categories
      await expect(getCategories()).rejects.toEqual(
        new Error('API Error: could not retrieve categories'),
      )
      expect(getStub).toHaveBeenCalledWith(
        `${API_URL}${API_ENDPOINT_CATEGORIES}`,
      )
    })
  })
})
