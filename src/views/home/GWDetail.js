import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import GWAdd from "../add/GWAdd";


export default class GWDetail extends GWAdd {


    constructor(props) {
        super(props);

    }

    componentDidMount(){
        var item = this.props.navigation.getParam('item');
        console.log(JSON.stringify(item))
        this.setState({
            item,
            name:item.name,
            sexStr:item.sexName+'性',
            sex:item.sex,
            telephone:item.telephone,
            idcard:item.idcard,
            birthday:item.birthday,
            expectSalary:item.expectSalary,//期望薪资
            workStatus:item.workStatus,//工作状态 0 找工作 1 已工作
            workStatusStr:item.workStatusName,//parseInt(item.workStatus)==0 ?'找工作':'已工作',
            workplaceCode:item.workplaceCode,//工作地点Code
            workplaceCodeStr:item.workplaceName,//工作地点
            birthplaceCode:item.birthplaceCode,//籍贯code
            birthplaceCodeStr:item.birthplaceName,//籍贯
            workSelect:item.jobtypeName,//擅长工种
            workYear:item.workYear,//工作年限
            workExpect:item.workExpect,//工作意志

        })
    }


}

var styles = StyleSheet.create({
    container: {}
});