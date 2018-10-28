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
        console.log(beginTime+"=====kk"+endTime)
        self.pickerView._setData(beginTime,endTime);
        self.pickerView.showDataTimerPicker('选择日期',true, function (now,next) {
            console.log("huanghao3"+now+"kk"+next)
            if(!self.compareDate(now,next)){
                self.dropdown.alertWithType('info','开始时间不能大于结束时间','');
                self._showDataTimerPicker();
                return;
            }
            // var start_time= parseInt(String(now).replace(/-/g,''));
            // var end_time= parseInt(String(next).replace(/-/g,''));
            // if(start_time>end_time){
            //     self._showDataTimerPicker();
            //     return;
            // }
            self.setState({
                beginTime:now,
                endTime:next,
                index:0,
            },()=>{
                self.setState({
                    page:0,
                },()=>{
                    self.homeList._setTimer(self.state.beginTime ,self.state.endTime)
                })
            })
        })
    }

    _goGwQuery(){
        this.props.navigation.navigate('GwQuery');
    }

    //比较日前大小
    compareDate(checkStartDate, checkEndDate) {
        var arys1= new Array();
        var arys2= new Array();
        if(checkStartDate != null && checkEndDate != null) {
            arys1=checkStartDate.split('-');
            var sdate=new Date(arys1[0],parseInt(arys1[1]-1),arys1[2]);
            arys2=checkEndDate.split('-');
            var edate=new Date(arys2[0],parseInt(arys2[1]-1),arys2[2]);
            if(sdate > edate) {
                console.log("huanghao日期开始时间大于结束时间")
                return false;
            }  else {
                console.log("huanghaosuccess")
                return true;
            }
        }
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
                       {self._goGwQuery()}
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
               {this._Alert()}
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