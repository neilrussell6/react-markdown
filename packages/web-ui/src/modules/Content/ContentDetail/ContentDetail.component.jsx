import React from 'react'
import ReactMarkdown from 'react-markdown'
import PropTypes from 'prop-types'

import LoadingBoundry from '../../../common/components/LoadingBoundry'
import MarkdownCode from '../../../common/components/MarkdownCode'
import styles from './ContentDetail.module.css'

const ContentDetail = ({ markdown, isLoading }) => (
  <div className={styles.container}>
    <LoadingBoundry isLoading={isLoading} loaderColor="#9ad2ff">
      <ReactMarkdown source={markdown} renderers={{ code: MarkdownCode }} />
    </LoadingBoundry>
  </div>
)

ContentDetail.propTypes = {
  markdown: PropTypes.string,
  isLoading: PropTypes.bool,
}

ContentDetail.defaultProps = {
  markdown: null,
  isLoading: true,
}

export default ContentDetail
