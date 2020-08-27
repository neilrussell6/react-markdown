import Axios from 'axios'

import { getContents, getContent } from './contents'
import { getCategories } from './categories'

export default {
  getContents: getContents(Axios),
  getContent: getContent(Axios),
  getCategories: getCategories(Axios),
}
