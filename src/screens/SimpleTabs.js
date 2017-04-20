/**
 * @flow
 */

import {
  Button,
  Platform,
  ScrollView,
  StyleSheet
} from 'react-native'
import {
  TabNavigator, TabView
} from 'react-navigation'
import { inject } from 'mobx-react/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import React from 'react'
import Echarts from 'native-echarts'

import SampleText from '../components/SampleText'
import TodoList from './TodoList'

const MyNavScreen = inject('navigationStore')(({ navigationStore, banner }) => (
  <ScrollView style={styles.container}>
    <SampleText>{banner}</SampleText>
    <Button
      onPress={() => navigationStore.navigate('Home')}
      title='Go to home tab'
    />
    <Button
      onPress={() => navigationStore.navigate('Settings')}
      title='Go to settings tab'
    />
    <Button
      onPress={() => navigationStore.goBack(null)}
      title='Go back'
    />
  </ScrollView>
))

const MyHomeScreen = () => (
  <MyNavScreen
    banner='Home Tab'
  />
)

MyHomeScreen.navigationOptions = {
  tabBar: {
    label: 'Home',
    icon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-home' : 'ios-home-outline'}
        size={26}
        style={{ color: tintColor }}
      />
    )
  }
}

const option = {
  title: {
    text: 'ECharts 示例'
  },
  tooltip: {},
  legend: {
    data: ['销量']
  },
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [{
    name: '销量',
    type: 'bar',
    data: [5, 20, 36, 10, 10, 20]
  }]
}
const MyPeopleScreen = () => (
  <ScrollView style={styles.container}>
    <SampleText>{'Echarts banner'}</SampleText>
    <Echarts option={option} height={300} />
  </ScrollView>
)

MyPeopleScreen.navigationOptions = {
  tabBar: {
    label: 'People',
    icon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-people' : 'ios-people-outline'}
        size={26}
        style={{ color: tintColor }}
      />
    )
  }
}

const SimpleTabs = TabNavigator({
  Home: {
    screen: MyHomeScreen,
    path: ''
  },
  People: {
    screen: MyPeopleScreen,
    path: 'cart'
  },
  TodoList: {
    screen: TodoList,
    path: 'todo'
  }
}, {
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? '#e91e63' : '#fff'
  },
  tabBarComponent: TabView.TabBarBottom,
  tabBarPosition: 'bottom'
})

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0
  }
})

export default SimpleTabs
