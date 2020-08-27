const SUT = require('./data-mapping.utils')

describe('modules/contents/persistence/data-mapping.utils', () => {
  describe('mapContentToDB', () => {
    it('should map content to DB format as expected', () => {
      const data = {
        id: 'ID',
        categoryId: 'CATEGORY ID',
        label: 'LABEL',
        markdown: 'MARKDOWN',
      }
      const expected = {
        id: 'ID',
        category_id: 'CATEGORY ID',
        label: 'LABEL',
        markdown: 'MARKDOWN',
      }
      expect(SUT.mapContentToDB(data)).toEqual(expected)
    })
  })

  describe('mapContentFromDB', () => {
    it('should map content from DB format as expected', () => {
      const data = {
        id: 'ID',
        category_id: 'CATEGORY ID',
        label: 'LABEL',
        markdown: 'MARKDOWN',
      }
      const expected = {
        id: 'ID',
        categoryId: 'CATEGORY ID',
        label: 'LABEL',
        markdown: 'MARKDOWN',
      }
      expect(SUT.mapContentFromDB(data)).toEqual(expected)
    })
  })

  describe('pickContentDBKeys', () => {
    it('should pick DB from content data as expected', () => {
      const data = {
        id: 'ID',
        category_id: 'CATEGORY ID',
        label: 'LABEL',
        markdown: 'MARKDOWN',
        other: 'OTHER',
      }
      const expected = {
        id: 'ID',
        category_id: 'CATEGORY ID',
        label: 'LABEL',
        markdown: 'MARKDOWN',
      }
      expect(SUT.pickContentDBKeys(data)).toEqual(expected)
    })
  })
})
