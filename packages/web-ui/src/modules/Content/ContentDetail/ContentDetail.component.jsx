import React from 'react'
import ReactMarkdown from 'react-markdown'
import PropTypes from 'prop-types'

import LoadingBoundry from '../../../common/components/LoadingBoundry'
import MarkdownCode from '../../../common/components/MarkdownCode'
import styles from './ContentDetail.module.css'

const ContentDetail = ({ markdownContent, isLoading }) => (
  <div className={styles.container}>
    <LoadingBoundry isLoading={isLoading} loaderColor="#9ad2ff">
      <ReactMarkdown
        source={markdownContent}
        renderers={{ code: MarkdownCode }}
      />
    </LoadingBoundry>
  </div>
)

ContentDetail.propTypes = {
  markdownContent: PropTypes.string,
  isLoading: PropTypes.bool,
}

ContentDetail.defaultProps = {
  markdownContent: null,
  isLoading: true,
}

export default ContentDetail
