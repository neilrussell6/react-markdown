import { keys } from 'ramda'
import parametrize from 'js-parametrize'

import * as SUT from './ContentNav.selectors'

describe('modules/Content/ContentNav/ContentNav.selector', () => {
  it('should select props required by ContentNav component as expected', () => {
    // given ... a category, 3 contents, and content 2 is selected
    const state = {
      categories: {
        1: { label: 'CATEGORY 1' },
      },
      contents: {
        1: { label: 'CONTENT 1' },
        2: { label: 'CONTENT 2' },
        3: { label: 'CONTENT 3' },
      },
      selectedContent: 2,
    }

    // when ... we select for ContentNav component's props
    // then ... should return all expected keys
    const result = SUT.ContentNavComponentSelector(state)
    expect(keys(result)).toEqual([
      'contents',
      'isLoading',
    ])
  })

  parametrize([
    [{ 1: { label: 'CATEGORY 1' } }, false],
    [{}, false],
    [null, true],
  ], (categories, expected) => {
    it('should correctly select is loading based on categories state', () => {
      // given
      // ... the provided categories
      // ... as well as 3 contents, and content 2 is selected
      const state = {
        categories,
        contents: {
          1: { label: 'CONTENT 1' },
          2: { label: 'CONTENT 2' },
          3: { label: 'CONTENT 3' },
        },
        selectedContent: 2,
      }

      // when ... we select for ContentNav component's props
      // then ... should return isLoading as expected
      const result = SUT.ContentNavComponentSelector(state)
      expect(result.isLoading).toEqual(expected)
    })
  })
})
