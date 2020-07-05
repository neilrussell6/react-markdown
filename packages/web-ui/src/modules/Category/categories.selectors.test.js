import * as SUT from './categories.selectors'

describe('modules/Category/categories.selector', () => {
  it('should select categories as expected, marking selected category as selected', () => {
    // given ... 3 categories
    const state = {
      categories: {
        1: { label: 'category 1' },
        2: { label: 'category 2' },
        3: { label: 'category 3' },
      },
      selectedCategory: 2,
    }

    // when ... we select categories
    // then ... should denormalize and return as expected
    const result = SUT.categoriesSelector(state)
    expect(result).toEqual({
      categories: [
        { id: '1', label: 'category 1', isSelected: false },
        { id: '2', label: 'category 2', isSelected: true },
        { id: '3', label: 'category 3', isSelected: false },
      ],
    })
  })
})
