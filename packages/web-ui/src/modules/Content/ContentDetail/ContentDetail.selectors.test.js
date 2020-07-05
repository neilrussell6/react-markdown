import { keys } from 'ramda'
import parametrize from 'js-parametrize'

import * as SUT from './ContentDetail.selectors'

describe('modules/Content/ContentDetail/ContentDetail.selector', () => {
  it('should select props required by ContentDetail component as expected', () => {
    // given ... 3 contents
    const state = {
      contents: {
        1: { label: 'CONTENT 1' },
        2: { label: 'CONTENT 2' },
        3: { label: 'CONTENT 3' },
      },
      selectedContent: 2,
    }

    // when ... we select for ContentDetail component's props
    // then ... should return all expected keys
    const result = SUT.ContentDetailComponentSelector(state)
    expect(keys(result)).toEqual([
      'markdown',
      'isLoading',
    ])
  })

  parametrize([
    [{ 1: { label: 'CONTENT 1', markdown: null } }, null, false],
    [{ 1: { label: 'CONTENT 1', markdown: null } }, 1, true],
    [{ 1: { label: 'CONTENT 1', markdown: 'MARKDOWN' } }, 1, false],
  ], (contents, selectedContent, expected) => {
    it('should correctly select is loading based on selected content markdown state', () => {
      // given ... the provided contents and selected content
      const state = { contents, selectedContent }

      // when ... we select for ContentDetail component's props
      // then ... should return isLoading as expected
      const result = SUT.ContentDetailComponentSelector(state)
      expect(result.isLoading).toEqual(expected)
    })
  })
})
