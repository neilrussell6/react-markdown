import React from 'react'
import PropTypes from 'prop-types'
import ReactLoaderSpinner from 'react-loader-spinner'

import styles from './LoadingBoundry.module.css'

const LoadingBoundry = ({ isLoading, loaderType, loaderColor, children }) => {
  const loadingView = (
    <div className={styles.loader}>
      <ReactLoaderSpinner
        type={loaderType}
        color={loaderColor}
        height={40}
        width={40}
        timeout={30000} // 3 secs
      />
    </div>
  )
  return isLoading ? loadingView : children
}

LoadingBoundry.propTypes = {
  isLoading: PropTypes.bool,
  loaderType: PropTypes.string,
  loaderColor: PropTypes.string,
}

LoadingBoundry.defaultProps = {
  isLoading: true,
  loaderType: 'Grid',
  loaderColor: '#333',
}

export default LoadingBoundry

