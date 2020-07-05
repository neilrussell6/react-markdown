import React from 'react'

import styles from './App.module.css'
import { ContentNav, ContentDetail } from '../Content'
import { CategoryNav } from '../Category'

const App = () => (
  <div className={styles.container}>
    <header className={styles.header}>
      <div className={styles.title}>React Markdown</div>
      <div className={styles.nav}><CategoryNav /></div>
    </header>
    <div className={styles.body}>
      <nav className={styles.nav}><ContentNav /></nav>
      <main className={styles.main}><ContentDetail /></main>
    </div>
  </div>
)

export default App
