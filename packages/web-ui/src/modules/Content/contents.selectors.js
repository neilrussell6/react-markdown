import { createSelector } from 'reselect'
import { assoc, map, prop, reduce, filter, propEq } from 'ramda'

import { denormalize } from '../../common/utils/data'

export const contentsSelector = createSelector(
  [prop('contents'), prop('selectedContent')],
  (_contents, selectedContent) => {
    const contents = denormalize('id')(_contents)
    if (selectedContent === null) {
      return { contents }
    }
    const selectedId = selectedContent.toString()
    return {
      contents: map((x) => assoc('isSelected', selectedId === x.id)(x))(
        contents,
      ),
    }
  },
)

export const contentsForSelectedCategorySelector = createSelector(
  [contentsSelector, prop('selectedCategory')],
  ({ contents }, selectedCategory) => {
    if (selectedCategory === null) {
      return []
    }
    return {
      contents: filter(propEq('categoryId', selectedCategory))(contents),
    }
  },
)

export const selectedContentMarkdownSelector = createSelector(
  [contentsSelector, prop('selectedContent')],
  ({ contents }, selectedContent) => {
    if (selectedContent === null) {
      return { markdown: null }
    }
    return {
      markdown: reduce(
        (result, x) =>
          x.id === selectedContent.toString() ? x.markdown : result,
        null,
      )(contents),
    }
  },
)
