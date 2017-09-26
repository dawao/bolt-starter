/**
 * @flow
 */
import React from 'react'
// import {
//   Platform
// } from 'react-native'
import {
  TabNavigator
} from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Colors from '../config/colors'

import TodoList from './TodoList'
import Inventory from './Inventory'
import Launch from './Launch'
import Settings from './Settings'

React.isValidElement(Ionicons)

var homeNavOpt = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ tintColor, focused }) => (
    <Ionicons
      name={focused ? 'ios-home' : 'ios-home-outline'}
      size={26}
      style={{ color: tintColor }}
    />
  )
}
var listNavOpt = {
  tabBarLabel: 'List',
  tabBarIcon: ({ tintColor, focused }) => (
    <Ionicons
      name={focused ? 'ios-list' : 'ios-list-outline'}
      size={26}
      style={{ color: tintColor }}
    />
  )
}
var launchNavOpt = {
  tabBarLabel: 'People',
  tabBarIcon: ({ tintColor, focused }) => (
    <Ionicons
      name={focused ? 'ios-people' : 'ios-people-outline'}
      size={26}
      style={{ color: tintColor }}
    />
  )
}
var settingsNavOpt = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ tintColor, focused }) => (
    <Ionicons
      name={focused ? 'ios-settings' : 'ios-settings-outline'}
      size={26}
      style={{ color: tintColor }}
    />
  )
}

// 页签设置
const SimpleTabs = TabNavigator({
  Home: {
    screen: Inventory,
    navigationOptions: homeNavOpt,
    path: ''
  },
  TodoList: {
    screen: TodoList,
    navigationOptions: listNavOpt,
    path: 'todo'
  },
  Launch: {
    screen: Launch,
    navigationOptions: launchNavOpt,
    path: 'chart'
  },
  Settings: {
    screen: Settings,
    navigationOptions: settingsNavOpt,
    path: 'set'
  }
}, {
  tabBarOptions: {
    activeTintColor: Colors.primary,
    inactiveTintColor: '#000',
    showIcon: true,
    indicatorStyle: {height: 0},
    style: {
      backgroundColor: '#e7e7e7',
      height: 55
    },
    labelStyle: {
      fontSize: 12, top: -10 // 文字大小
    },
    iconStyle: {
      height: 30,
      width: 30
    }
  },
  tabBarPosition: 'bottom',
  animationEnabled: false
})

export default SimpleTabs
// 导航器整合
// const SimpleAppReactNavigation = StackNavigator({
//   Home: { screen: SimpleTabs },
//   Message: { screen: Message },
//   bloodDetails: {screen: bloodDetails}
// },
//   {
//     headerMode: 'none',
//     mode: Platform.OS === 'ios' ? 'modal' : 'modal'
//   })
// export default SimpleAppReactNavigation
