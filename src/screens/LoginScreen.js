import React, { Component } from 'react'
import { observer, inject } from 'mobx-react/native'
// import { account } from '../stores';
import LoginView from '../components/LoginView'

// this is a traditional React component connected wrapped in an observer function
@inject('account') @observer
export default class LoginScreen extends Component {
  render () {
    return (
      <LoginView onPress={this.onLoginPress.bind(this)} onSignupPress={this.displaySignupView.bind(this)} />
    )
  }

  onLoginPress () {
    this.props.account.login()
  }

  displaySignupView () {
    console.log('signup')
  }
}
