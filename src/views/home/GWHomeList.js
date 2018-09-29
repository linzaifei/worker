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

        var flag= '';
        switch (this.props.page){
            case 0:
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


        var parmas = {
            pageNumber,
            pageSize:'8',
            flag,
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
        var self = this;
        return(
            <GWHomeListItem
                marginTop={5}
                name={item.name}
                job= {item.jobtypeName}
                state={parseInt(item.workStatus?item.workStatus:0)}
                time={item.createTime}
                onClickItem={()=>{
                    console.log("success"+JSON.stringify(item));
                    self.props.navigation.navigate('Detail',{
                        title:'编辑',
                        item,
                    })
                }}
            />
        )
   }


}

var styles = StyleSheet.create({
    container: {

    }
});