const SUT = require('./response.utils')

describe('modules/categories/presentation/response.utils', () => {
  describe('pickCategoryResponseKeys', () => {
    it('should pick expected keys from category data', () => {
      const data = {
        id: 'ID',
        label: 'LABEL',
      }
      const expected = {
        id: 'ID',
        label: 'LABEL',
      }
      expect(SUT.pickCategoryResponseKeys(data)).toEqual(expected)
    })
  })
})
