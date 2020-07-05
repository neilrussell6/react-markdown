import { createSelector } from 'reselect'
import { assoc, map, prop } from 'ramda'

import { denormalize } from '../../common/utils/data'

export const categoriesSelector = createSelector(
  [
    prop('categories'),
    prop('selectedCategory'),
  ],
  (_categories, selectedCategory) => {
    const categories = denormalize('id')(_categories)
    if (selectedCategory === null) {
      return { categories }
    }
    const selectedId = selectedCategory.toString()
    return {
      categories: map(x => assoc('isSelected', selectedId === x.id)(x))(categories)
    }
  },
)
