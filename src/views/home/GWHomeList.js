import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import BaseListComponent from "../../components/base/BaseListComponent";
import GWHomeListItem from "./GWHomeListItem";
import GWTag from "../../components/tag/GWTag";


export default class GWHomeList extends BaseListComponent {

    constructor(props) {
        super(props);

        this.state={
            dataArr:[],//存储数据
            pageNumber:1,
            isRefreshing:false,
            hasData:true,
            haveRefresh:true,
            keyWord:'',
            beginTime:'',
            endTime:'',

        }

    }

    _loadData(){

        var self =this;
        const {
            pageNumber,
            isRefreshing,
            dataArr,
            keyWord,
        }= self.state

        const {
            page,
        }=self.props;

        var flag= '';
        var parmas = {};
        switch (page){
            case 0:
                parmas['keyWord'] = keyWord;
                break;
            case 1:
                flag='today';
                break;
            case 2:
                flag='week';
                break;
            case 3:
                flag='oneMonth';
                break;
            case 4:
                flag='threeMonth';
                break;
            case 5:
                flag='halfYear';
                break;
        }

        parmas['pageNumber'] = pageNumber;
        parmas['pageSize'] = '10';
        parmas['flag'] = flag;

        gwrequest.gw_tokenRequest(urls.list,parmas,function (ret) {
            console.log('+++++++++'+JSON.stringify(ret))
            isRefreshing && self.setState({isRefreshing:false})
            self.setState({
                dataArr: pageNumber > 1 ?dataArr.concat(ret.data) :ret.data,
            })
            if (ret.data.length <10){
                self.setState({hasData:false})
            }
        },function (e) {
            isRefreshing && self.setState({isRefreshing:false})
            console.log('============='+JSON.stringify(e))
        })
    }

    componentDidMount(){
        this._loadData()

    }

    _setkeyWord(key){
        this.setState({
            keyWord:key,
        },()=>{
            this._loadData()
        })
    }

    _listHeader(){
        return  <GWTag title={this.state.dataArr.length + '人'} padding={5} space={10}iconWidth={19} iconHeight={19}  url="ic_home_more"  />
    }

   _itemCell(item,index){
        var self = this;
        return(
            <GWHomeListItem
                marginTop={5}
                name={item.name}
                job= {item.jobtypeName}
                state={parseInt(item.workStatus?item.workStatus:0)}
                time={item.createTime}
                onClickItem={()=>{
                    self._queryDetail(item.id);
                }}
            />
        )
   }
    _queryDetail(workid){
        var self = this;
        gwrequest.gw_tokenRequest(urls.queryDetail,{"workerId":workid},function (ret) {
            console.log("success======"+JSON.stringify(ret))
            self.props.navigation.navigate('Detail',{
                title:'编辑',
                item:ret,
                callback:()=>{
                    self.dropdown.alertWithType('info','修改成功','')
                }
            })
        },function (e) {
            console.log(JSON.stringify(e))
        })
    }

}

var styles = StyleSheet.create({
    container: {

    }
});