const SUT = require('./response.utils')

describe('modules/contents/presentation/response.utils', () => {
  describe('pickContentResponseKeys', () => {
    it('should pick expected keys from content data', () => {
      const data = {
        id: 'ID',
        categoryId: 'CATEGORY ID',
        label: 'LABEL',
        markdown: 'MARKDOWN',
      }
      const expected = {
        id: 'ID',
        categoryId: 'CATEGORY ID',
        label: 'LABEL',
        markdown: 'MARKDOWN',
      }
      expect(SUT.pickContentResponseKeys(data)).toEqual(expected)
    })
  })
})
