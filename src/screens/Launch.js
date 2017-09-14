import React, {Component} from 'react'
import {
  Alert,
  Platform,
  StyleSheet,
  ScrollView,
  Text,
  View
} from 'react-native'
import { Button } from 'react-native-elements'
import autobind from 'autobind-decorator'
import { observer, inject } from 'mobx-react/native'

// Import the react-native-sound module
import {default as Sound} from 'react-native-sound'

const Header = ({children, style}) => <Text style={[styles.header, style]}>{children}</Text>

const Feature = ({title, onPress, description, buttonLabel = 'PLAY', status}) => (
  <View style={styles.feature}>
    <Header style={{flex: 1}}>{title}</Header>
    {status ? <Text style={{padding: 5}}>{resultIcons[status] || ''}</Text> : null}
    <Button title={buttonLabel}
      onPress={onPress}
      backgroundColor='#31D8A0'
      buttonStyle={{marginTop: 10, borderRadius: 5}} />
  </View>
)

const resultIcons = {
  '': '',
  pending: '?',
  playing: '\u25B6',
  win: '\u2713',
  fail: '\u274C'
}

const audioTests = [
  {
    title: 'mp3 in bundle',
    url: 'advertising.mp3',
    basePath: Sound.MAIN_BUNDLE
  },
  {
    title: 'mp3 in bundle (looped)',
    url: 'advertising.mp3',
    basePath: Sound.MAIN_BUNDLE,
    onPrepared: (sound, component) => {
      sound.setNumberOfLoops(-1)
      component.setState({loopingSound: sound})
    }
  },
  {
    title: 'mp3 remote download',
    url: 'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3'
  }
]

function setTestState (testInfo, component, status) {
  component.setState({tests: {...component.state.tests, [testInfo.title]: status}})
}

/**
 * Generic play function for majority of tests
 */
function playSound (testInfo, component) {
  setTestState(testInfo, component, 'pending')

  const callback = (error, sound) => {
    if (error) {
      Alert.alert('error', error.message)
      setTestState(testInfo, component, 'fail')
      return
    }
    setTestState(testInfo, component, 'playing')
    // Run optional pre-play callback
    testInfo.onPrepared && testInfo.onPrepared(sound, component)
    sound.play(() => {
      // Success counts as getting to the end
      setTestState(testInfo, component, 'win')
      // Release when it's done so we're not using up resources
      sound.release()
    })
  }

  // If the audio is a 'require' then the second parameter must be the callback.
  if (testInfo.isRequire) {
    const sound = new Sound(testInfo.url, error => callback(error, sound))
  } else {
    const sound = new Sound(testInfo.url, testInfo.basePath, error => callback(error, sound))
  }
}

@inject('account')
@observer
export default class Launch extends Component {
  constructor (props) {
    super(props)

    Sound.setCategory('Playback', true) // true = mixWithOthers

    // Special case for stopping
    this.stopSoundLooped = () => {
      if (!this.state.loopingSound) {
        return
      }

      this.state.loopingSound.stop().release()
      this.setState({loopingSound: null, tests: {...this.state.tests, 'mp3 in bundle (looped)': 'win'}})
    }

    this.state = {
      loopingSound: undefined,
      tests: {}
    }
  }

  @autobind _showLogin () {
    this.props.navigation.navigate('Home')
  }

  @autobind _showSignup () {
    this.props.navigation.navigate('Settings')
  }

  render () {
    const isAuthenticated = this.props.account.isAuthenticated

    if (!isAuthenticated) {
      return null
    }
    return (
      <View style={styles.container}>
        <View>
          <Button title='Sign Home'
            onPress={this._showLogin}
            backgroundColor='#BBB'
            buttonStyle={{borderRadius: 5}} />
          <Button title='Create Settings'
            onPress={this._showSignup}
            backgroundColor='#31D8A0'
            buttonStyle={{marginTop: 10, borderRadius: 5}} />
          <Button
            onPress={() => this.props.navigation.back()}
            title='Go back' />
          <Button title='Sign Out'
            onPress={this.props.account.promptForLogout}
            backgroundColor='#777' />
        </View>
        <Header style={styles.title}>react-native-sound-demo</Header>
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
          {audioTests.map(testInfo => {
            return (
              <Feature
                status={this.state.tests[testInfo.title]}
                key={testInfo.title}
                title={testInfo.title}
                onPress={() => {
                  return playSound(testInfo, this)
                }}
              />
            )
          })}
          <Feature title='mp3 in bundle (looped)' buttonLabel={'STOP'} onPress={this.stopSoundLooped} />
        </ScrollView>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 30,
    padding: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(240,240,240,1)'
  },
  header: {
    textAlign: 'left'
  },
  feature: {
    flexDirection: 'row',
    padding: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgb(180,180,180)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(230,230,230)'
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
  }
})
