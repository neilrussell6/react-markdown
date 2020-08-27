import SUT, { selectCategory } from './selectedCategory.reducer'

describe('modules/Category/selectedCategory.reducer', () => {
  describe('selectCategory', () => {
    it('should set selected category to the provided id', () => {
      // given ... no category is currently selected
      const state = null

      // when ... we select category 3
      const action = selectCategory('3')
      const result = SUT(state, action)

      // then ... should set selected category to 3
      expect(result).toEqual(3)
    })
  })
})
