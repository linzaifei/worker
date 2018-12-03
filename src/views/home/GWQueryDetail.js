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
    FlatList,
} from 'react-native';

import EditInput from "../logon/EditInput";
import GWSelectItem from "../../components/selectItem/GWSelectItem";
import GWTag from "../../components/tag/GWTag";
import BaseListComponent from "../../components/base/BaseListComponent";
import GWHomeListItem from "./GWHomeListItem";

export default class GWQueryDetail extends BaseListComponent {
    static navigationOptions =({navigation})=>{
        let {state,goBack} = navigation;
        const params = navigation.state.params || {};
        return{
            headerStyle:{backgroundColor:defaultColor,borderBottomWidth: 0,shadowOpacity: 0,elevation: 0,},
            headerLeft:(
                <TouchableOpacity style={{marginLeft:10}} onPress={()=>{goBack()}}>
                    <GWTag title="返回" url="ic_back" space={2} color="#fff" iconHeight={18} iconWidth={18}/>
                </TouchableOpacity>
            ),
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
            dataArr: [],//存储数据
            pageNumber: 1,
            isRefreshing: false,
            hasData: true,
            haveRefresh: true,
            keyWord: '',
            beginTime: '',
            endTime: '',
            totalCount: 0,//总人数
        };
      }

    componentWillMount() {
        this.props.navigation.setParams({ submit: this._submit });
    }

    componentDidMount() {
        var self = this;
        self._loadData();
    }
    _loadData() {

        var self = this;
        const {
            pageNumber,
            isRefreshing,
            dataArr,
            keyWord,
            beginTime,
            endTime,
        } = self.state

        var flag = '';
        var parmas = {};
        if (keyWord) {
            parmas['keyWord'] = keyWord;
        }
        if (endTime) {
            parmas['endTime'] = endTime;
        }
        if (beginTime) {
            parmas['beginTime'] = beginTime;
        }
        parmas['pageNumber'] = pageNumber;
        parmas['pageSize'] = '20';
        parmas['flag'] = flag;

        console.log(JSON.stringify(parmas))
        gwrequest.gw_tokenRequest(urls.list, parmas, function (ret) {
            console.log('huanghao' + JSON.stringify(ret))
            isRefreshing && self.setState({isRefreshing: false})
            self.setState({
                dataArr: pageNumber > 1 ? dataArr.concat(ret.data) : ret.data,
                totalCount: ret.totalCount,
            })
            if (ret.data.length < 10) {
                self.setState({hasData: false})
            }
        }, function (e) {
            isRefreshing && self.setState({isRefreshing: false})
        })
    }


    _submit=()=>{
        var self = this;
        const {
            beginTime,
            endTime,
            keyWord,
        }=self.state
        if(!self.compareDate(beginTime,endTime)){
            self.dropdown.alertWithType('info','开始时间不能大于结束时间','');
            return;
        }
        self.setState({
            pageNumber:1,
        },()=>{
            this._loadData();
        })
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
        switch(index){
            case 0:
                self.pickerView.showDatePicker('开始时间',true,function (value,index) {
                    value = String(value).replace(/,/g,'-')
                    self.setState({
                        beginTime:value,
                    })
                })
                break;
            case 1:
                self.pickerView.showDatePicker('结束时间',true,function (value,index) {
                    value = String(value).replace(/,/g,'-')
                    self.setState({
                        endTime:value,
                    })
                })
                break;
        }
    }

    _onTextChange(text){
        this.setState({
            keyWord:text,
        })
    }

    topView(){
        var self = this;
        const {
            beginTime,
            endTime
        }=self.state;
        return(
           <View>
               <View style={styles.item}>
                   <View style={{flex:1,padding:5,}}>
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
                           // onEndEditing={()=>{
                           //     self.setState({
                           //         pageNumber:1,
                           //     },()=>{
                           //         self._loadData()
                           //     })
                           // }}
                       />
                   </View>
               </View>
               <GWSelectItem
                   title="开始时间"
                   url="ic_center_csrq"
                   borderRadius={5}
                   mTop={10}
                   editable={false}
                   value={beginTime}
                   onClickItem={()=>{
                       self._onClickItem(0);
                   }}
               />
               <GWSelectItem
                   title="结束时间"
                   url="ic_center_csrq"
                   borderRadius={5}
                   editable={false}
                   value={endTime}
                   onClickItem={()=>{
                       self._onClickItem(1);
                   }}
               />
           </View>
        )
    }

    //更多试图
    _moreInfo(){
        return (
            this._GWPickerView()
        )
    }
    _listHeader() {
        return <GWTag title={this.state.totalCount + '人'} padding={5} space={10} iconWidth={19} iconHeight={19}
                      url="ic_home_more"/>
    }

    _itemCell(item, index) {
        var self = this;
        return (
            <GWHomeListItem
                marginTop={5}
                name={item.name}
                job={item.jobtypeName}
                state={parseInt(item.workStatus ? item.workStatus : 0)}
                time={item.createTime}
                age={item.age}
                workStatusName={item.workStatusName}
                onClickItem={() => {
                    self._queryDetail(item.id?item.id:'');
                }}
            />
        )
    }

    _queryDetail(workid) {
        var self = this;
        gwrequest.gw_tokenRequest(urls.queryDetail, {"workerId": workid}, function (ret) {
            console.log("success======" + JSON.stringify(ret))
            self.props.navigation.navigate('Detail', {
                title: '编辑',
                item: ret,
                callback: () => {
                    self.dropdown.alertWithType('info', '修改成功', '')
                }
            })
        }, function (e) {
            console.log(JSON.stringify(e))
        })
    }

    _list_view(){
        const {
            dataArr,
            isRefreshing,
        }=this.state;
        if(dataArr.length==0){
            return (
                <View style={{height:SCREEN_HEIGHT-250,alignItems:CENTER,justifyContent:CENTER}}>
                    {this._nullView()}
                </View>
            )
        }else{
            return (
                <FlatList
                    data = {dataArr}
                    keyExtractor={this._keyExtractor}
                    renderItem = {({item,index})=> this._itemCell(item,index)}
                    onRefresh = {this._reflashView.bind(this)}
                    refreshing = {isRefreshing}
                    onEndReachedThreshold={0.5}
                    initialNumToRender={4}
                    ListHeaderComponent={this._listHeader()}
                    ListFooterComponent={this._listFoot()}
                    onEndReached={this._endReflash.bind(this)}
                />
            )
        }
    }

    render() {
        return (
            <View style={{flex:1}}>
                {this.topView()}
                {this._list_view()}
                {this._moreInfo()}
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