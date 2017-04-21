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
import Launch from './Launch'
import Settings from './Settings'

const SimpleTabs = TabNavigator({
  Home: {
    screen: TodoList,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-home' : 'ios-home-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
      title: '⚡ Bolt List'
    },
    path: ''
  },
  Launch: {
    screen: Launch,
    navigationOptions: {
      tabBarLabel: 'People',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-people' : 'ios-people-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    },
    path: 'chart'
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-settings' : 'ios-settings-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    },
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
