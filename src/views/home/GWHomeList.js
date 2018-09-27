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
        var parmas = {
            pageNumber,
            pageSize:'10',
        }
        gwrequest.gw_tokenRequest(urls.list,parmas,function (ret) {
            console.log('============='+JSON.stringify(ret))
            // isRefreshing && self.setState({isRefreshing:false})
            // self.setState({
            //     dataArr: self.state.pageNumber > 1 ?dataArr.concat(res.mediations) :res.mediations,
            // })
            // if (res.mediations.length <10){
            //     self.setState({hasData:false})
            // }
        },function (e) {
            console.log('============='+JSON.stringify(e))
        })
    }

    componentDidMount(){
        this._loadData()
    }

   // _itemCell(item,index){
   //      return(

   //      )
   // }
    render(){
        return (
            <View>
                <GWHomeListItem
                    name={'战三'}
                    job= {'dsda'}
                    state={0}
                    time="2019/12"
                />
            </View>
        )
    }

}

var styles = StyleSheet.create({
    container: {

    }
});