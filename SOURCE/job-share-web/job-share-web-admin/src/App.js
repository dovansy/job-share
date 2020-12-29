import React from 'react'
import store from './redux/store'
import { Provider } from 'react-redux'
import AppNavigator from './navigation/AppNavigator'
import ToastCustom from '@src/components/toast/ToastCustom'
import '@styles/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Provider store={store}>
      <ToastCustom />
      <AppNavigator />
    </Provider>
  )
}

export default App
