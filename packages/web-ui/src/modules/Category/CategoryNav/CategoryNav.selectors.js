import { createSelector } from 'reselect'

import { categoriesSelector } from '../categories.selectors'

export const CategoryNavComponentSelector = createSelector(
  [categoriesSelector],
  (categories) => categories,
)
