import { extendObservable, observable, action } from 'mobx'
// import { setToken, clearToken, getToken } from '../utils/Storage'
import RC4 from '../utils/rc4'

const host = 'http://172.0.66.14:8080'
const fetch = global.fetch
/**
 * @class Account
 */
class Account {
    @observable username = undefined;
    @observable token = undefined;
    // @observable list = []

  isLoggedIn () {
    return this.username && this.username.length > 0
  }

    @action login (params) {
      var test = new RC4('jQuery')
      fetch(host + '/jeesite/a/mobile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: test.encrypt('sysadmin'), password: test.encrypt('admin')})
      }).then((response) => response.json())
        .then(account => {
          this.token = account.token
        }).catch((error) => {
          console.log(error)
        })
    }

  logout () {
    fetch('api/account/logout')
                   .then(() => {
                     this.username = null
                     this.token = null
                   })
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
