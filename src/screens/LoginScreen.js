import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { observer, inject } from 'mobx-react/native'
// import { account } from '../stores';

// this is a traditional React component connected wrapped in an observer function
@inject('account') @observer
export default class LoginScreen extends Component {
  render () {
    return (
      <View style={{flex: 1, padding: 20}}>

        <TouchableOpacity onPress={this.onLoginPress.bind(this)}>
          <Text style={styles.button}>Login</Text>
        </TouchableOpacity>
      </View>
    )
  }

  onLoginPress () {
    this.props.account.login()
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10
  },
  button: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    color: 'blue'
  }
})
