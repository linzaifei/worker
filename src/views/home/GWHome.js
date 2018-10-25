import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    DeviceEventEmitter,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';

import ScrollableTabView ,{ScrollableTabBar}from 'react-native-scrollable-tab-view'
import GWTag from "../../components/tag/GWTag";
import  GWHomeList from './GWHomeList'
import EditInput from "../logon/EditInput";
import BaseComponent from "../../components/base/BaseComponent";

export default class GWHome extends BaseComponent {

    static navigationOptions=({navigation})=>{
        return{
            headerStyle:{backgroundColor:defaultColor,borderBottomWidth: 0,shadowOpacity: 0,elevation: 0,},
            headerTitle:(
                <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
                    <GWTag title="国文人力" url="logo" color="#fff" size={15} iconWidth={28} space={5} iconHeight={28} />
                </View>
            )
        }
    }

    constructor(props) {
        super(props);
        this.state={
            keyWords:'',
            page:0,
            beginTime:'',
            endTime:'',
        }
        this._addLiner()

    }
    componentWillUnmount(){
        this.subscription.remove();
    };
    _addLiner(){
        var  self = this;
        this.subscription = DeviceEventEmitter.addListener('outLogon',function (e) {
            self.props.navigation.navigate('Auth');
        })
    }

    _titles(){
        var titles = ['全部','今天','最近1周','最近1月','最近3月','最近半年']
        var chilens = [];
        titles.map((item,index)=>{
            chilens.push(
                <View key={index} tabLabel={item}style={{padding:5}} >
                    <GWHomeList ref={a=>this.homeList=a} page={index} navigation={this.props.navigation} />
                </View>
            )
        })
        return chilens
    }

    _onTextChange(text){
        console.log('==='+text)
        this.setState({
            keyWords:text,
        },()=>{
            this.homeList._setkeyWord(text)
        })
    }

    _showDataTimerPicker() {
        var self = this;
        const {
            beginTime,
            endTime,
        }=self.state;
        self.pickerView._setData(beginTime,endTime);
        self.pickerView.showDataTimerPicker('选择日期',true, function (now,next) {
            console.log(now+'-'+next)
            self.setState({
                beginTime:now,
                endTime:next,
            },()=>{
                self.setState({
                    page:0,
                },()=>{
                    self.homeList._setTimer(self.state.beginTime ,self.state.endTime)
                })
            })
        })
    }


    render() {
        var self = this;
        const {
            page,
            keyWords,
            value,
        }=self.state;
        return (
           <View style={styles.container}>
               <View style={styles.item}>
                   <View style={{flex:1}}>
                       <EditInput
                                  padding={1}
                                  borderRadius={4}
                                  paddingLeft={10}
                                  backgroundColor='#fff'
                                  color={swColor}
                                  // value={value}
                                  returnKeyType={'search'}
                                  imgName="ic_home_search"
                                  placeholder="搜索姓名和手机号码"
                                  onTextChange={(e)=>{this._onTextChange(e)}}
                                  onEndEditing={()=>{
                                      self.setState({
                                          page:0,
                                      },()=>{
                                          self.homeList._setkeyWord(keyWords)
                                      })
                                  }}
                       />
                   </View>
                   <TouchableOpacity onPress={()=>{
                       {self._showDataTimerPicker()}
                   }} style={{marginLeft:10}}>
                       <Image source={{uri:'ic_home_calendar'}} style={{width:27,height:27}}/>
                   </TouchableOpacity>
               </View>
               <ScrollableTabView tabBarUnderlineStyle={{
                   backgroundColor: '#fff',
                   height: 2,
                   marginBottom:4,
               }} locked={false} page={page} onChangeTab={(obj)=>{
                   self.setState({
                       page:obj.i
                   })
               }}  tabBarActiveTextColor='#fff' tabBarInactiveTextColor='#fff' tabBarBackgroundColor= {defaultColor}
                                  renderTabBar={() => <ScrollableTabBar />}
               >
                   {this._titles()}
               </ScrollableTabView>
               {this._GWPickerView()}
           </View>
        );
    }

}

var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fafafa'
    },
    item:{
        backgroundColor:defaultColor,
        flexDirection:ROW,
        alignItems:CENTER,
        paddingLeft:10,
        paddingRight:10,
    },

});