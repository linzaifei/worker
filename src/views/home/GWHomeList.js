import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import BaseListComponent from "../../components/base/BaseListComponent";
import GWHomeListItem from "./GWHomeListItem";


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
        }=self.state

        var date = new Date()

        var  year = date.getFullYear();
        var  month = date.getMonth() >9?date.getMonth() :'0'+date.getMonth();
        var  day = date.getDay()>9?date.getDay():'0'+date.getDay();
        
        var  hours = date.getHours()>9?date.getHours():'0'+date.getHours();
        var  minutes = date.getMinutes()>9?date.getMinutes():'0'+date.getMinutes();
        var  seconds = date.getSeconds()>9?date.getSeconds():'0'+date.getSeconds();

        var  beginTime = year +'-'+month +'-'+day +' '+hours+':'+minutes+':'+seconds

        alert(beginTime)
        switch (this.props.page){
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
        }


        var parmas = {
            pageNumber,
            pageSize:'8',
        }
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

   _itemCell(item,index){
        return(
            <GWHomeListItem
                marginTop={5}
                name={item.name}
                job= {item.jobtypeName}
                state={parseInt(item.workStatus?item.workStatus:0)}
                time={item.createTime}
            />
        )
   }


}

var styles = StyleSheet.create({
    container: {

    }
});