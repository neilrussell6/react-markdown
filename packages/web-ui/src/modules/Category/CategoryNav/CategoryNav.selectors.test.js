import { keys } from 'ramda'

import * as SUT from './CategoryNav.selectors'

describe('modules/Category/CategoryNav/CategoryNav.selector', () => {
  it('should select props required by CategoryNav component as expected', () => {
    // given ... 3 categories
    const state = {
      categories: {
        1: { label: 'CATEGORY 1' },
        2: { label: 'CATEGORY 2' },
        3: { label: 'CATEGORY 3' },
      },
      selectedCategory: 2,
    }

    // when ... we select for CategoryNav component's props
    // then ... should return all expected keys
    const result = SUT.CategoryNavComponentSelector(state)
    expect(keys(result)).toEqual(['categories'])
  })
})
