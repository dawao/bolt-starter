import React, {Component} from 'react'
import {
  Platform,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Dimensions,
  View,
  Text
} from 'react-native'
import {observer} from 'mobx-react/native'
import Echarts from 'native-echarts'
import SampleText from '../components/SampleText'

import Pdf from 'react-native-pdf'

@observer
export default class Settings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 1,
      pageCount: 1
    }
    this.pdf = null
  }

  componentDidMount () {
  }

  prePage=() => {
    if (this.pdf) {
      let prePage = this.state.page > 1 ? this.state.page - 1 : 1
      this.pdf.setNativeProps({page: prePage})
      this.setState({page: prePage})
      console.log(`prePage: ${prePage}`)
    }
  }

  nextPage=() => {
    if (this.pdf) {
      let nextPage = this.state.page + 1 > this.state.pageCount ? this.state.pageCount : this.state.page + 1
      this.pdf.setNativeProps({page: nextPage})
      this.setState({page: nextPage})
      console.log(`nextPage: ${nextPage}`)
    }
  }

  render () {
    const option = {
      title: {
        text: 'ECharts 示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    }
    let source = {uri: 'bundle-assets://test.pdf'}

    return (
      <ScrollView style={styles.container}>
        <SampleText>{'Echarts banner'}</SampleText>
        <Echarts option={option} height={300} />
        <View style={{flexDirection: 'row'}}>
          <TouchableHighlight disabled={this.state.page === 1} style={this.state.page === 1 ? styles.btnDisable : styles.btn} onPress={() => this.prePage()}>
            <Text style={styles.btnText}>{'Previous'}</Text>
          </TouchableHighlight>
          <TouchableHighlight disabled={this.state.page === this.state.pageCount} style={this.state.page === this.state.pageCount ? styles.btnDisable : styles.btn} onPress={() => this.nextPage()}>
            <Text style={styles.btnText}>{'Next'}</Text>
          </TouchableHighlight>
        </View>
        <Pdf ref={(pdf) => { this.pdf = pdf }}
          source={source}
          page={1}
          scale={1}
          horizontal={false}
          onLoadComplete={(pageCount) => {
            this.setState({pageCount: pageCount})
            console.log(`total page count: ${pageCount}`)
          }}
          onPageChanged={(page, pageCount) => {
            this.setState({page: page})
            console.log(`current page: ${page}`)
          }}
          onError={(error) => {
            console.log(error)
          }}
          style={styles.pdf} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    flex: 1
  },
  avatar: {
    resizeMode: 'contain',
    width: 100,
    height: 100,
    borderRadius: 50
  },
  email: {
    marginTop: 40,
    fontSize: 20,
    fontWeight: '200',
    color: '#333'
  },
  bottomSection: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 15
  },
  signoutButton: {
    borderRadius: 5,
    borderWidth: 0,
    borderColor: '#777'
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
  },
  btn: {
    margin: 5,
    padding: 5,
    backgroundColor: 'blue'
  },
  btnDisable: {
    margin: 5,
    padding: 5,
    backgroundColor: 'gray'
  },
  btnText: {
    color: '#FFF'
  },
  pdf: {
    flex: 1,
    borderWidth: 2,
    height: 300,
    width: Dimensions.get('window').width
  }
})
