import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './blue-green.palette.module.css'
import './dark.theme.module.css'
// import './light.theme.module.css'
import './index.module.css'
import store from './common/redux/store'
import App, { appInit } from './modules/App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

// initial actions
store.dispatch(appInit())
