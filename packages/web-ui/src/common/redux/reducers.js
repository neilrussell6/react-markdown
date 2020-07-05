import { combineReducers } from 'redux'

import {
  contents,
  selectedContent,
} from '../../modules/Content'
import {
  categories,
  selectedCategory,
} from '../../modules/Category'

export default combineReducers({
  contents,
  selectedContent,
  categories,
  selectedCategory,
})
