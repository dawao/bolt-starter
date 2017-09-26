import React, {Component} from 'react'
import {
  Dimensions,
  Platform,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text
} from 'react-native'
import {observer} from 'mobx-react/native'
import Echarts from 'native-echarts'
import Picker from 'react-native-picker'
import SampleText from '../components/SampleText'
import area from './area.json'

@observer
export default class Inventory extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      str1: '请选择采供血机构',
      str2: '请选择血液产品和库存类型'
    }
  }
  _createAreaData () {
    let data = []
    let len = area.length
    for (let i = 0; i < len; i++) {
      let city = []
      for (let j = 0, cityLen = area[i]['city'].length; j < cityLen; j++) {
        let _city = {}
        _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area']
        city.push(_city)
      }

      let _data = {}
      _data[area[i]['name']] = city
      data.push(_data)
    }
    return data
  }
  _showAreaPicker () {
    Picker.init({
      pickerData: this._createAreaData(),
      selectedValue: ['河北', '唐山', '古冶区'],
      onPickerConfirm: pickedValue => {
        console.log('area', pickedValue)
      },
      onPickerCancel: pickedValue => {
        console.log('area', pickedValue)
      },
      onPickerSelect: pickedValue => {
            // Picker.select(['山东', '青岛', '黄岛区'])
        console.log('area', pickedValue)
      }
    })
    Picker.show()
  }

  _showPicker () {
    let data = ['安徽省血液中心(合肥市红十字会中心血站)',
      '芜湖市中心血站',
      '宿迁市中心血站',
      '蚌埠市中心血站',
      '亳州市中心血站',
      '宣城市中心血站']

    Picker.init({
      pickerData: data,
      selectedValue: [1],
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '',
      onPickerConfirm: data => {
        console.log(data)
      },
      onPickerCancel: data => {
        console.log(data)
      },
      onPickerSelect: data => {
        console.log(data)
      }
    })
    Picker.show()
  }

  _showPicker2 () {
    let data = [
      [ '单采新鲜冰冻血浆',
        '新鲜冰冻血浆',
        '单采血小板',
        '冰冻红细胞',
        '全血'
      ],
      ['全部',
        '待检库库存',
        '成分库存',
        '成品库存'
      ]
    ]

    Picker.init({
      pickerData: data,
      selectedValue: [1],
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '',
      onPickerConfirm: data => {
        console.log(data)
      },
      onPickerCancel: data => {
        console.log(data)
      },
      onPickerSelect: data => {
        console.log(data)
      }
    })
    Picker.show()
  }

  render () {
    const option = {
      title: {
        text: '芜湖市中心血站 库存'
      },
      tooltip: {},
      legend: {
        data: ['血量']
      },
      xAxis: {
        data: ['全血', '冰冻红细胞', '单采血小板', '单采新鲜冰冻血浆', '新鲜冰冻血浆']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 20]
      }]
    }
    var {height,width}=Dimensions.get('window')
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={this._showPicker.bind(this)}>
          <SampleText>{this.state.str1}</SampleText>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._showPicker2.bind(this)}>
          <SampleText>{this.state.str2}</SampleText>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop: 10, marginLeft: 20}} onPress={this._showAreaPicker.bind(this)}>
          <Text>AreaPicker</Text>
        </TouchableOpacity>
        <Echarts option={option} height={height-200} width={width}/>
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
  titleContainer: {
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    marginTop: 18,
    marginBottom: 10,
    color: '#fff'
  },
  demoValue: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    color: '#fff'
  },
  textInput: {
    flex: 1,
    height: 40,
    justifyContent: 'center'
  }
})
