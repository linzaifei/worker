import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    DeviceEventEmitter,
    TextInput,
    TouchableOpacity,
    Image, ScrollView,
} from 'react-native';
import BaseComponent from "../../components/base/BaseComponent";
import EditInput from "../logon/EditInput";
import GWSelectItem from "../../components/selectItem/GWSelectItem";
import GWQueryList from "./GWQueryList";

export default class GWQueryDetail extends BaseComponent {
    static navigationOptions =({navigation})=>{
        const params = navigation.state.params || {};
        return{
            headerTitle:(
                <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
                    <Text style={{fontSize:16,color:'#fff'}}>查询</Text>
                </View>
            ),
            headerRight:(
                <TouchableOpacity onPress={params.submit}>
                    <Text style={{fontSize:15,color:'#fff',marginRight:15}}>完成</Text>
                </TouchableOpacity>
            )
        }
    }

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            start_time:'',
            end_time:'',
            keyWords:'',
        };
      }

    componentWillMount() {
        this.props.navigation.setParams({ submit: this._submit });
    }

    _submit=()=>{
        var self = this;
        const {
            start_time,
            end_time,
            keyWords,
        }=self.state
        // if(!start_time){
        //     self.dropdown.alertWithType('info','请选择开始时间','');
        //     return;
        // }
        // if(!end_time){
        //     self.dropdown.alertWithType('info','请选择结束时间','');
        //     return;
        // }

        if(!self.compareDate(start_time,end_time)){
            self.dropdown.alertWithType('info','开始时间不能大于结束时间','');
            return;
        }
        console.log(start_time+"====="+end_time+"=========="+keyWords);
        self.homeList._setparams(start_time,end_time,keyWords);
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
                return false;
            }  else {
                return true;
            }
        }
    }

    _onClickItem(index){
        var  self = this;
        // const {
        //     selectSalaryIndex,
        //     workId,
        // }=self.state;
        switch(index){
            case 0:
                self.pickerView.showDatePickerNoHome('开始时间',true,function (value,index) {
                    value = String(value).replace(/,/g,'-')
                    self.setState({
                        start_time:value,
                    })
                })
                break;
            case 1:
                self.pickerView.showDatePickerNoHome('结束时间',true,function (value,index) {
                    value = String(value).replace(/,/g,'-')
                    self.setState({
                        end_time:value,
                    })
                })
                break;
        }
    }

    _onTextChange(text){
        this.setState({
            keyWords:text,
        })
    }

    render(){
        var self=this;
        const {
            start_time,
            end_time,
        }=self.state;
        return(
            <View style={styles.container}>
                <View style={styles.item}>
                    <View style={{flex:1}}>
                        <EditInput
                            padding={1}
                            borderRadius={4}
                            paddingLeft={10}
                            backgroundColor='#fff'
                            color={swColor}
                            // value={keyWords}
                            returnKeyType={'search'}
                            imgName="ic_home_search"
                            placeholder="搜索姓名和手机号码"
                            onTextChange={(e)=>{this._onTextChange(e)}}
                        />
                    </View>
                </View>
                <GWSelectItem
                    title="开始时间"
                    url="ic_center_csrq"
                    borderRadius={5}
                    editable={false}
                    value={start_time}
                    onClickItem={()=>{
                        self._onClickItem(0);
                    }}
                />
                <GWSelectItem
                    title="结束时间"
                    url="ic_center_csrq"
                    borderRadius={5}
                    editable={false}
                    value={end_time}
                    onClickItem={()=>{
                        self._onClickItem(1);
                    }}
                />
                <GWQueryList ref={a=>this.homeList=a}  navigation={this.props.navigation} />
                {this._GWPickerView()}
                {this._Alert()}
            </View>
        )
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