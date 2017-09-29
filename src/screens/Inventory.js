import React, {Component} from 'react'
import {
  Dimensions,
  Platform,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native'
import { Button, ButtonGroup, Card, CheckBox, List, ListItem } from 'react-native-elements'
import {observer} from 'mobx-react/native'
import Echarts from 'native-echarts'
import Picker from 'react-native-picker'
import SampleText from '../components/SampleText'

@observer
export default class Inventory extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      selectedIndex: 1,
      checked: true,
      str1: '请选择采供血机构和库存类型',
      str2: '请选择血液产品和库存类型'
    }
    this.updateIndex = this.updateIndex.bind(this)
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

  _check () {
    this.setState({checked: !this.state.checked})
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
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
        axisLabel: {
          rotate: 60
        },
        data: ['全血', '冰冻红细胞', '单采血小板', '单采新鲜冰冻血浆', '新鲜冰冻血浆']
      },
      yAxis: {},
      series: [{
        name: '血量',
        type: 'bar',
        data: [5, 20, 36, 10, 20]
      }]
    }
    const list = [
      {
        name: '芜湖市中心血站',
        subtitle: '20'
      },
      {
        name: '宿迁市中心血站',
        subtitle: '36'
      }
    ]
    const buttons = ['图形显示', '数据表格']
    const { selectedIndex } = this.state
    const {height, width} = Dimensions.get('window')
    return (
      <ScrollView style={styles.container}>
        <Card containerStyle={{padding: 0, marginLeft: 0, marginRight: 0}} >
          <View style={{flexDirection: 'row'}}>
            <CheckBox
              center
              title='按采供血机构查看'
              checkedColor='#00aced'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={this.state.checked}
              onPress={this._check.bind(this)}
              containerStyle={{borderWidth: 0}}
          />
            <CheckBox
              center
              title=' 按血液产品查看 '
              right
              checkedColor='#00aced'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={!this.state.checked}
              onPress={this._check.bind(this)}
              containerStyle={{borderWidth: 0}}
          />
          </View>

          <Button
            raised
            icon={{name: 'cached'}}
            buttonStyle={{marginLeft: 10, marginRight: 10}}
            onPress={this._showPicker2.bind(this)}
            title={this.state.checked ? this.state.str2 : this.state.str1} />

          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons} />
        </Card>

        <List containerStyle={{marginBottom: 20}}>
          {
            list.map((l, i) => (
              <ListItem
                key={i}
                hideChevron
                title={l.name}
                rightTitle={l.subtitle}
              />
            ))
          }
        </List>

        <Echarts option={option} height={300} />
        <TouchableOpacity onPress={this._showPicker.bind(this)}>
          <SampleText>请选择采供血机构</SampleText>
        </TouchableOpacity>
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
