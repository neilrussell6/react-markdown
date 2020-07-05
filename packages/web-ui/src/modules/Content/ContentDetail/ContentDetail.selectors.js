import { isNil, prop } from 'ramda'
import { createSelector } from 'reselect'

import { selectedContentMarkdownSelector } from '../contents.selectors'

export const ContentDetailComponentSelector = createSelector(
  [
    selectedContentMarkdownSelector,
    prop('selectedContent'),
  ],
  ({ markdown }, selectedContent) => ({
    markdown,
    isLoading: isNil(markdown) && !isNil(selectedContent),
  }),
)
