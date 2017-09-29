import { View, Platform } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import { StackNavigator } from 'react-navigation'
import React from 'react'
// ===[ Screens ]===
import SimpleTabs from './screens/SimpleTabs'
import LoginScreen from './screens/LoginScreen'
import Splash from './screens/Splash'
import ServerSet from './screens/ServerSet'

const UnauthenticatedNavigator = StackNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    Splash: { screen: Splash },
    ServerSet: { screen: ServerSet }
  },
  {
    initialRouteName: 'Splash',
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
