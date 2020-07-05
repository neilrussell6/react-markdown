import SUT, {
  setCategories,
} from './categories.reducer'

describe('modules/Category/categories.reducer', () => {
  describe('overwriteCategories', () => {
    it('should overwrite categories using provided list of categories', () => {
      // given ... no existing categories
      const state = {}

      // when ... we set categories from the following list of categories
      const categories = [
        { id: 1, label: 'CATEGORY 1' },
        { id: 2, label: 'CATEGORY 2' },
        { id: 3, label: 'CATEGORY 3' },
      ]
      const action = setCategories(categories)
      const result = SUT(state, action)

      // then ... should normalize and set categories as expected
      expect(result).toEqual({
        1: { label: 'CATEGORY 1' },
        2: { label: 'CATEGORY 2' },
        3: { label: 'CATEGORY 3' },
      })
    })
  })
})
