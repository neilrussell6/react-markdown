import { connect } from 'react-redux'

import { selectContent } from '../selectedContent.reducer'
import Component from './ContentNav.component'
import { ContentNavComponentSelector } from './ContentNav.selectors'

const mapStateToProps = ContentNavComponentSelector

const mapDispatchToProps = (dispatch) => ({
  onSelectContent: (id) => dispatch(selectContent(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
