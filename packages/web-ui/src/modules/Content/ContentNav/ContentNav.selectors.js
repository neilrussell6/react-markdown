import { isNil, prop } from 'ramda'
import { createSelector } from 'reselect'

import { contentsForSelectedCategorySelector } from '../contents.selectors'

export const ContentNavComponentSelector = createSelector(
  [
    contentsForSelectedCategorySelector,
    prop('categories'),
  ],
  ({ contents }, categories) => ({
    contents,
    isLoading: isNil(categories)
  }),
)
