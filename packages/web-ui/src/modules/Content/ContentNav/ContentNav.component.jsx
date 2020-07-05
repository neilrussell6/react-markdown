import React from 'react'
import PropTypes from 'prop-types'
import { map } from 'ramda'

import LoadingBoundry from '../../../common/components/LoadingBoundry'
import styles from './ContentNav.module.css'

const ContentNav = ({ onSelectContent, contents, isLoading }) => (
  <div className={styles.container}>
    <LoadingBoundry isLoading={isLoading}>
      <ul className={styles.navList}>
        {map(({ id, label, isSelected }) => (
          <li
            className={`${styles.navListItem} ${isSelected ? styles.navListItemSelected : ''}`}
            key={id}
            role="listbox"
            tabIndex={-1}
            onClick={() => onSelectContent(id)}
            onKeyDown={() => onSelectContent(id)}
          >{label}</li>
        ), contents)}
      </ul>
    </LoadingBoundry>
  </div>
)

ContentNav.propTypes = {
  onSelectContent: PropTypes.func.isRequired,
  contents: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  })),
  isLoading: PropTypes.bool,
}

ContentNav.defaultProps = {
  contents: [],
  isLoading: true,
}

export default ContentNav

