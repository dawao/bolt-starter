import { Alert } from 'react-native'
import { extendObservable, observable, action } from 'mobx'
import autobind from 'autobind-decorator'

// import RNFetchBlob from 'react-native-fetch-blob'
// import { setToken, clearToken, getToken } from '../utils/Storage'
// import RC4 from '../utils/rc4'
// import config from '../config/server'

// const host = config.host
// const host = 'http://60.2.98.180:18084/lw'
// const host = 'http://172.0.66.181:8084/lw'
const fetch = global.fetch
/**
 * @class Account
 */
class Account {
  @observable isAuthenticated = false;
  @observable username = undefined;
  @observable token = undefined;
  // @observable list = []

  isLoggedIn () {
    return this.username && this.username.length > 0
  }

  @action login (params) {
    this.isAuthenticated = true

    // var test = new RC4('jQuery')
    // RNFetchBlob.config({
    //   trusty : true
    // }).fetch('POST', 'https://172.0.66.181:8082/lw/a/mobile', {
    //   'Content-Type' : 'application/json'
    // }, JSON.stringify({name: test.encrypt('sysadmin'), password: test.encrypt('admin')})
    // ).then((resp) => {
    //   // ...
    //   console.log(resp)
    //   resp.json()

    // }).catch((err) => {
    //   // ...
    //   console.log(err)
    // })

    // fetch(host + '/a/mobile', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({name: test.encrypt('sysadmin'), password: test.encrypt('admin')})
    // }).then((response) => response.json())
    //   .then(res => {
    //     this.token = res.token
    //     this.isAuthenticated = true
    // }).catch((error) => {
    //   console.log(error)
    // })
  }

  @autobind promptForLogout () {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          onPress: () => {
          },
          style: 'cancel'
        },
        {text: 'Yes', onPress: this.logout, style: 'destructive'}
      ]
    )
  }

  @autobind logout () {
    this.isAuthenticated = false
    /**
    fetch('api/account/logout')
    .then(() => {
      this.username = null
      this.token = null
    })
    */
  }

  register (params) {
    fetch('api/account/register', params)
    .then(account => {
      extendObservable(this, account)
    })
  }
}

const account = new Account()
export default account
