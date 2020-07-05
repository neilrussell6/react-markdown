import { connect } from 'react-redux'

import { selectCategory } from '../selectedCategory.reducer'
import Component from './CategoryNav.component'
import { CategoryNavComponentSelector } from './CategoryNav.selectors'

const mapStateToProps = CategoryNavComponentSelector

const mapDispatchToProps = (dispatch) => ({
  onSelectCategory: (id) => dispatch(selectCategory(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
