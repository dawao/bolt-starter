'use strict'

import React, { Component } from 'react'
import {
  // NativeModules,
  PushNotificationIOS
} from 'react-native'
// import codePush from 'react-native-code-push'
import { Provider } from 'mobx-react/native'

import NotificationsIOS, { NotificationAction, NotificationCategory } from 'react-native-notifications'
import Navigation from './Navigation'

// ===[ Stores ]===
import stores from './stores'

let upvoteAction = new NotificationAction({
  activationMode: 'background',
  title: String.fromCodePoint(0x1F44D),
  identifier: 'UPVOTE_ACTION'
}, (action, completed) => {
  console.log('ACTION RECEIVED')
  console.log(JSON.stringify(action))

  // You must call to completed(), otherwise the action will not be triggered
  completed()
})

let replyAction = new NotificationAction({
  activationMode: 'background',
  title: 'Reply',
  behavior: 'textInput',
  authenticationRequired: true,
  identifier: 'REPLY_ACTION'
}, (action, completed) => {
  console.log('ACTION RECEIVED')
  console.log(action)

  completed()
})

let exampleCategory = new NotificationCategory({
  identifier: 'EXAMPLE_CATEGORY',
  actions: [upvoteAction, replyAction],
  context: 'default'
})

// @codePush
class App extends Component {
  constructor (props) {
    super(props)
    NotificationsIOS.addEventListener('notificationReceivedForeground', this.onNotificationReceivedForeground.bind(this))
    NotificationsIOS.addEventListener('notificationReceivedBackground', this.onNotificationReceivedBackground.bind(this))
    NotificationsIOS.addEventListener('notificationOpened', this.onNotificationOpened.bind(this))
    NotificationsIOS.addEventListener('localNotification', this.onlocalNotification.bind(this))
    // NotificationsIOS.addEventListener('remoteNotificationsRegistered', this.onPushRegistered.bind(this));
    // NotificationsIOS.addEventListener('remoteNotificationsRegistrationFailed', this.onPushRegistrationFailed.bind(this));
    NotificationsIOS.checkPermissions().then((currentPermissions) => {
      console.log('Badges enabled: ' + !!currentPermissions.badge)
      console.log('Sounds enabled: ' + !!currentPermissions.sound)
      console.log('Alerts enabled: ' + !!currentPermissions.alert)
    })
    // NotificationsIOS.requestPermissions();

    try {
      NotificationsIOS.requestPermissions([exampleCategory])
      // NativeModules.CMSiOSNotificationPermissionsManager.requestPermissions();
    } catch (e) {
      console.log(e)
    }
  }

  componentWillMount () {
    // need import lib RCTPush....xcodeproj and link .a file
    PushNotificationIOS.scheduleLocalNotification({
      fireDate: new Date(Date.now() + 10 * 1000).toISOString(),
      alertBody: 'Hi Notification'
    })
  }

  onPushRegistered (deviceToken) {
    console.log('Device Token Received', deviceToken)
  }

  onPushRegistrationFailed (error) {
    console.error(error)
  }

  onNotificationReceivedForeground (notification) {
    console.log('Notification Received - Foreground', notification)
    // this._sendNotification();
  }

  onNotificationReceivedBackground (notification) {
    console.log('Notification Received - Background', notification)
  }

  onNotificationOpened (notification) {
    console.log('Notification opened by device user', notification)
  }

  onlocalNotification (notification) {
    console.log('ddddddddddllllllllllll', notification)
  }

  componentWillUnmount () {
    // Don't forget to remove the event listeners to prevent memory leaks!
    NotificationsIOS.removeEventListener('notificationReceivedForeground', this.onNotificationReceivedForeground.bind(this))
    NotificationsIOS.removeEventListener('notificationReceivedBackground', this.onNotificationReceivedBackground.bind(this))
    NotificationsIOS.removeEventListener('notificationOpened', this.onNotificationOpened.bind(this))
    NotificationsIOS.removeEventListener('localNotification', this.onlocalNotification.bind(this))
    // prevent memory leaks!
    // NotificationsIOS.removeEventListener('remoteNotificationsRegistered', this.onPushRegistered.bind(this));
    // NotificationsIOS.removeEventListener('remoteNotificationsRegistrationFailed', this.onPushRegistrationFailed.bind(this));
  }

  // _sendNotification() {
  //   require('RCTDeviceEventEmitter').emit('remoteNotificationReceived', {
  //     aps: {
  //       alert: 'Sample notification',
  //       badge: '+1',
  //       sound: 'default',
  //       category: 'EXAMPLE_CATEGORY'
  //     },
  //   });
  // }

  // _sendLocalNotification() {
  //   require('RCTDeviceEventEmitter').emit('localNotificationReceived', {
  //     aps: {
  //       alert: 'Sample local notification',
  //       badge: '+1',
  //       sound: 'default',
  //       category: 'EXAMPLE_CATEGORY'
  //     },
  //   });
  // }

  render () {
    return (
      <Provider {...stores}>
        <Navigation />
      </Provider>
    )
  }
}

export default App
