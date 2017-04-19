'use strict'

import React, { Component } from 'react'
// import codePush from 'react-native-code-push'
import { Provider } from 'mobx-react/native'
import Navigation from './Navigation'

// ===[ Stores ]===
import stores from './stores'

// @codePush
class App extends Component {
  render () {
    return (
      <Provider {...stores}>
        <Navigation />
      </Provider>
    )
  }
}

export default App
