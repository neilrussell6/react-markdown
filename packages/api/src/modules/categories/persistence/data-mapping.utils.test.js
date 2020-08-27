const SUT = require('./data-mapping.utils')

describe('modules/categories/persistence/data-mapping.utils', () => {
  describe('mapCategoryToDB', () => {
    it('should map category to DB format as expected', () => {
      const data = {
        id: 'ID',
        label: 'LABEL',
      }
      const expected = {
        id: 'ID',
        label: 'LABEL',
      }
      expect(SUT.mapCategoryToDB(data)).toEqual(expected)
    })
  })

  describe('mapCategoryFromDB', () => {
    it('should map category from DB format as expected', () => {
      const data = {
        id: 'ID',
        label: 'LABEL',
      }
      const expected = {
        id: 'ID',
        label: 'LABEL',
      }
      expect(SUT.mapCategoryFromDB(data)).toEqual(expected)
    })
  })

  describe('pickCategoryDBKeys', () => {
    it('should pick DB from category data as expected', () => {
      const data = {
        id: 'ID',
        label: 'LABEL',
        other: 'OTHER',
      }
      const expected = {
        id: 'ID',
        label: 'LABEL',
      }
      expect(SUT.pickCategoryDBKeys(data)).toEqual(expected)
    })
  })
})
