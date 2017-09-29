import React, { Component } from 'react'
import { observer, inject } from 'mobx-react/native'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import autobind from 'autobind-decorator'
import { Icon } from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay'

// this is a traditional React component connected wrapped in an observer function
@inject('account') @observer
export default class LoginScreen extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      email: '',
      password: '',
      isAuthenticating: false,
      error: ''
    }
  }

  @autobind onPressForgotPassword () {
    console.log('forgot password')
    this.props.navigation.navigate('ServerSet')
  }

  onPressSignUp () {
    console.log('sign up pressed')
  }

  onLoginPress (email, password) {
    this.setState({isAuthenticating: true})
    this.props.account.login()
  }

  displaySignupView () {
    console.log('signup')
  }

  render () {
    return (
      <View style={styles.container}>
        <Image style={styles.bg} source={require('../images/login-background.png')} />
        <View style={styles.header}>
          <View style={styles.headerIconView}>
            <Image style={styles.mark} source={require('../images/logo.png')} />
          </View>
          <View style={styles.headerTitleView}>
            <Text style={styles.appTitle}>安徽省联网 </Text>

          </View>
        </View>
        <Spinner visible={this.state.isAuthenticating} />
        <View style={styles.inputs}>
          <View>
            <Text style={styles.errorText}>{this.state.error}</Text>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.imageContainer}>
              <Icon name='person' color='#00aced' />

            </View>
            <TextInput
              style={[styles.input, styles.whiteFont]}
              placeholder='用户名'
              placeholderTextColor='#CCC'
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}
              value={this.state.email} />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.imageContainer}>
              <Icon name='vpn-key' color='#00aced' />

            </View>
            <TextInput
              secureTextEntry
              style={[styles.input, styles.whiteFont]}
              placeholder='密码'
              placeholderTextColor='#CCC'
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password} />
          </View>
          <View style={styles.signinView}>
            <TouchableOpacity
              style={styles.signin}
              onPress={this.onLoginPress.bind(this, this.state.email, this.state.password)}>
              <Text style={styles.signinText}>登  录</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.forgotContainer}
            onPress={this.onPressForgotPassword}>
            <Text style={styles.forgotText}>设置服务器</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.signup}
          onPress={this.displaySignupView.bind(this)}>
          <Text style={styles.greyFont}>公司版本信息?<Text style={styles.whiteFont}> Sign Up</Text></Text>
        </TouchableOpacity>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'transparent'
  },
  bg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.4,
    backgroundColor: 'transparent'
  },
  headerIconView: {
    width: 150,
    height: 180
  },
  mark: {
    resizeMode: 'contain',
    width: 150,
    height: 180
  },
  headerTitleView: {
    flexDirection: 'row'
  },
  appTitle: {
    color: 'rgba(120, 216, 194, 1)',
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 32
  },
  appTitleExtra: {
    color: 'rgba(240, 145, 136, 1)',
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 32
  },
  errorText: {
    color: '#FF3366',
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 15
  },
  inputs: {
    paddingTop: 20,
    paddingBottom: 10,
    flex: 0.40
  },
  signinView: {
    paddingTop: 20,
    paddingBottom: 10
  },
  signin: {
    backgroundColor: '#FB8C00',
    height: 50,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center'
  },
  signinText: {
    fontSize: 22,
    color: '#FFF'
  },
  signup: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.1
  },
  inputPassword: {
    width: 25,
    height: 25
  },
  imageContainer: {
    paddingLeft: 20,
    paddingRight: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputUsername: {
    width: 25,
    height: 25
  },
  inputContainer: {
    borderWidth: 1,
    paddingBottom: 10,
    borderBottomColor: '#CCC',
    borderColor: 'transparent',
    flexDirection: 'row'
  },
  input: {
    height: 50,
    flex: 10,
    paddingLeft: 20,
    fontSize: 22
  },
  forgotContainer: {
    paddingTop: 20,
    paddingRight: 20
  },
  forgotText: {
    fontSize: 13,
    alignSelf: 'flex-end',
    color: '#D8D8D8'
  },
  greyFont: {
    color: '#D8D8D8'
  },
  whiteFont: {
    color: '#CCC'
  }
})
