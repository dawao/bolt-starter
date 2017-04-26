/**
 * @flow
 */
import React from 'react'
import {
  Platform
} from 'react-native'
import {
  TabNavigator, TabView
} from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

import TodoList from './TodoList'
import Inventory from './Inventory'
import Launch from './Launch'
import Settings from './Settings'

React.isValidElement(Ionicons)

const homeIcon = {
  icon: ({ tintColor, focused }) => (
    <Ionicons
      name={focused ? 'ios-home' : 'ios-home-outline'}
      size={26}
      style={{ color: tintColor }}
    />
  )
}
var homeNavOpt = {
  tabBarLabel: 'Home',
  tabBarIcon: homeIcon.icon,
  title: '⚡ Bolt List'
}
// 有些android要这样才显示图标，在ios上这样会报错
if (Platform.OS === 'android') {
  homeNavOpt.tabBar = {
    label: 'Home',
    icon: homeIcon.icon
  }
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
    navigationOptions: launchNavOpt,
    path: 'chart'
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
    activeTintColor: Platform.OS === 'ios' ? '#e91e63' : '#ccc',
    inactiveTintColor: '#999',
    showIcon: true
  },
  tabBarComponent: TabView.TabBarBottom,
  tabBarPosition: 'bottom'
})

export default SimpleTabs
