import API from '../api'
import { APP_INIT } from '../../modules/App'

import {
  contentsInitFlow,
  apiGetContentsFlow,
  setContentsFlow,
  selectContentFlow,
  apiGetContentFlow,
  setContentFlow,
  deselectContentFlow,
} from '../../modules/Content'

import {
  categoriesInitFlow,
  apiGetCategoriesFlow,
  setCategoriesFlow,
  SELECT_CATEGORY,
} from '../../modules/Category'

export default [
  contentsInitFlow({ APP_INIT }),
  apiGetContentsFlow({ API }),
  setContentsFlow,
  categoriesInitFlow({ APP_INIT }),
  apiGetCategoriesFlow({ API }),
  setCategoriesFlow,
  selectContentFlow,
  apiGetContentFlow({ API }),
  setContentFlow,
  deselectContentFlow({ SELECT_CATEGORY }),
]
