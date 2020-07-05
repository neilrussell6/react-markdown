import React from 'react'
import PropTypes from 'prop-types'
import { map, isEmpty } from 'ramda'

import LoadingBoundry from '../../../common/components/LoadingBoundry'
import styles from './CategoryNav.module.css'

const CategoryNav = ({ onSelectCategory, categories }) => (
  <div className={styles.container}>
    <LoadingBoundry isLoading={isEmpty(categories)}>
      <ul className={styles.navList}>
        {map(
          ({ id, label, isSelected }) => (
            <li
              className={`${styles.navListItem} ${
                isSelected ? styles.navListItemSelected : ''
              }`}
              key={id}
              role="listbox"
              tabIndex={-1}
              onClick={() => onSelectCategory(id)}
              onKeyDown={() => onSelectCategory(id)}
            >
              {label}
            </li>
          ),
          categories,
        )}
      </ul>
    </LoadingBoundry>
  </div>
)

CategoryNav.propTypes = {
  onSelectCategory: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
}

CategoryNav.defaultProps = {
  categories: [],
}

export default CategoryNav
