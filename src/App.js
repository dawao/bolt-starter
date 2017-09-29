'use strict'

import React, { Component } from 'react'
// import {
//   // NativeModules,
//   PushNotificationIOS
// } from 'react-native'
// import codePush from 'react-native-code-push'
import { Provider } from 'mobx-react/native'
import Navigation from './Navigation'

// ===[ Stores ]===
import stores from './stores'


// @codePush
class App extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
    // need import lib RCTPush....xcodeproj and link .a file
    // PushNotificationIOS.scheduleLocalNotification({
    //   fireDate: new Date(Date.now() + 10 * 1000).toISOString(),
    //   alertBody: 'Hi Notification'
    // })
  }

  componentWillUnmount () {
  }

  render () {
    return (
      <Provider {...stores}>
        <Navigation />
      </Provider>
    )
  }
}

export default App
