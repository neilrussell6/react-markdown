import { connect } from 'react-redux'

import Component from './ContentDetail.component'
import { ContentDetailComponentSelector } from './ContentDetail.selectors'

const mapStateToProps = ContentDetailComponentSelector

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
