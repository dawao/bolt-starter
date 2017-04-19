import { BackAndroid, Platform } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import { StackNavigator, addNavigationHelpers } from 'react-navigation'
import { autorun, reaction } from 'mobx'
import React from 'react'
// ===[ Screens ]===
import SimpleTabs from './screens/SimpleTabs'
import LoginScreen from './screens/LoginScreen'
import TodoList from './screens/TodoList'
import NewItem from './screens/NewItem'
import stores from './stores'

// const navigationConfig = {
//   initialRouteName: 'TodoList'
// }

// const Navigation = StackNavigator({
//   TodoList: { screen: TodoList },
//   NewItem: { screen: NewItem }
// }, navigationConfig)
// =============================================
const AppNavigator = StackNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    NewItem: { screen: NewItem },
    TodoList: { screen: TodoList },
    Index: { screen: SimpleTabs }
  },
  {
    initialRouteName: 'LoginScreen',
    // headerMode: 'none',

   /*
   * Use modal on iOS because the card mode comes from the right,
   * which conflicts with the drawer example gesture
   */
    mode: Platform.OS === 'ios' ? 'modal' : 'card'
  },
)

reaction(() => stores.account.token,
  () => stores.navigationStore.navigate('Index'))
stores.navigationStore.setNavigator(AppNavigator)

@inject('navigationStore')
@observer
class Navigation extends React.Component {
  componentDidMount () {
    this.subs = BackAndroid.addEventListener('backPress', () =>
      this.props.navigationStore.goBack())
  }
  componentWillUnmount () {
    this.subs && this.subs.remove()
  }
  subs: ?{
    remove: () => void,
  } = null;

  render () {
    const { navigationStore } = this.props
    const navigation = addNavigationHelpers({
      dispatch: navigationStore.dispatchNavigation,
      state: navigationStore.navigationState
    })
    return <AppNavigator navigation={navigation} />
  }
}

autorun('NavigationStore State', () => {
  console.log('navigationState', stores.navigationStore.navigationState)
  console.log('current state', stores.navigationStore.state)
})

export default Navigation
