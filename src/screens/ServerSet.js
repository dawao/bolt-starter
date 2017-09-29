import React, {Component} from 'react'
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'

export default class ServerSet extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Image style={styles.bg} source={require('../images/login-background.png')} />
        <View style={styles.topSection}>
          <Text style={styles.tagline}>设置服务器 Demo</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    flex: 1,
    backgroundColor: 'white'
  },
  logo: {
    resizeMode: 'contain',
    width: 280,
    height: 80
  },
  tagline: {
    marginTop: 5,
    fontSize: 28,
    fontWeight: '200',
    color: '#999'
  },
  bottomSection: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flex: 0,
    paddingBottom: 15
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 140
  }
})
