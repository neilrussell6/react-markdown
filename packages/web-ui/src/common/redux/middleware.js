import API from '../api'
import { APP_INIT } from '../../modules/App'

import {
  contentsInitFlow,
  apiGetContentsFlow,
  setContentsFlow,
  selectContentFlow,
  apiGetContentFlow,
  setContentFlow,
} from '../../modules/Content'

import {
  categoriesInitFlow,
  apiGetCategoriesFlow,
  setCategoriesFlow,
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
]
