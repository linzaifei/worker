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

export default class GWQueryList extends BaseListComponent {

    constructor(props) {
        super(props);

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

        }
    }


    _setparams(start_time,end_time,key){
        this.setState({
            keyWord:key,
            beginTime:start_time,
            endTime:end_time,
            pageNumber:1,
        },()=>{
            this._loadData()
        })
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
            // console.log('============='+JSON.stringify(e))
        })
    }

    componentDidMount() {
        var self = this;
        self._loadData();
    }

    componentWillUnmount() {
    };

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
                    self._queryDetail(item.id);
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

}

var styles = StyleSheet.create({
    container: {}
});