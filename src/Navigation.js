import { View, Platform } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import { StackNavigator } from 'react-navigation'
import React from 'react'
// ===[ Screens ]===
import SimpleTabs from './screens/SimpleTabs'
import LoginScreen from './screens/LoginScreen'
import TodoList from './screens/TodoList'
import NewItem from './screens/NewItem'

const UnauthenticatedNavigator = StackNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    NewItem: { screen: NewItem },
    TodoList: { screen: TodoList }
  },
  {
    initialRouteName: 'LoginScreen',
    headerMode: 'none',

   /*
   * Use modal on iOS because the card mode comes from the right,
   * which conflicts with the drawer example gesture
   */
    mode: Platform.OS === 'ios' ? 'modal' : 'card'
  }
)

@inject('account')
@observer
class Navigation extends React.Component {
  render () {
    return (
      <View style={{flex: 1}}>
        {this.props.account.isAuthenticated ? <SimpleTabs />
          : <UnauthenticatedNavigator />}
      </View>
    )
  }
}

export default Navigation
