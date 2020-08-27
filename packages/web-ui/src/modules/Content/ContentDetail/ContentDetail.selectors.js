import { isNil, prop, propOr } from 'ramda'
import { createSelector } from 'reselect'

import { selectedContentSelector } from '../contents.selectors'

export const ContentDetailComponentSelector = createSelector(
  [selectedContentSelector, prop('selectedContent')],
  (selectedContent, selectedContentId) => {
    const markdown = isNil(selectedContent) ? null : propOr(null, 'markdown', selectedContent)
    const markdownContent = isNil(selectedContent) ? null : propOr(null, 'markdownContent', selectedContent)
    return ({
      markdownContent,
      isLoading: !isNil(markdown) && !isNil(selectedContentId) && isNil(markdownContent),
    })
  },
)
