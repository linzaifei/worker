import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    RefreshControl,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';

import ZFBaseComponent from './BaseComponent'
import ZFButton from "../Button/ZFButton";

export default class ZFBaseListComponent extends ZFBaseComponent {
    constructor(props) {
        super(props);
        this.state={
            dataArr:[],//存储数据
            pageNumber:1,
            isRefreshing:false,
            hasData:true,
            haveRefresh:true,
        }
    }


    //刷新控件
    _reflashView(){
            return(
                <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={this._onRefresh()}
                    tintColor="#ff0000"
                    title="Loading..."
                    titleColor="#00ff00"
                    colors={['#ff0000', '#00ff00', '#0000ff']}
                    progressBackgroundColor="#ffff00"
                />
            )
    }

    //正在刷新
     _onRefresh(){

        var self = this;
        if (self.state.haveRefresh){
            self.setState({
                isRefreshing:true,
                pageNumber:1
            },()=>{
                self._loadData();
            })
        }
    }

    //上拉加载
     _endReflash(){
        var self = this;
       if (self.state.hasData && self.state.haveRefresh){
           self.setState({
               pageNumber: this.state.pageNumber +1,
           },()=>{
                self._loadData();
            })
       }
    }

    //创建cell
    _itemCell(item,index){

    }
    //list头组件
    _listHeader(){


    }



    //更多试图
    _moreInfo(){

    }

    //尾试图
    _listFoot(){
        if(!this.state.hasData){
            return(
                <View style={{height:30,alignItems:CENTER,justifyContent:FLEXSTART,}}>
                    <Text style={{color:smColor,fontSize:14,marginTop:5,marginBottom:5,}}>
                        没有更多数据了
                    </Text>
                </View>
            )
        }
    }
    _keyExtractor = (item, index) => String(index);

    render() {
        if(this.state.dataArr.length == 0){
            return (
                <View style={{height:SCREEN_HEIGHT-250,alignItems:CENTER,justifyContent:CENTER}}>
                    {this._nullView()}
                    {this._HUD()}
                </View>
            )
        }else {
            return (
                <View>
                    <FlatList
                        data = {this.state.dataArr}
                        keyExtractor={this._keyExtractor}
                        renderItem = {({item,index})=> this._itemCell(item,index)}
                        onRefresh = {this._reflashView.bind(this)}
                        refreshing = {this.state.isRefreshing}
                        onEndReachedThreshold={0.5}
                        initialNumToRender={4}
                        ListHeaderComponent={this._listHeader()}
                        ListFooterComponent={this._listFoot()}
                        onEndReached={this._endReflash.bind(this)}
                    />
                    {this._HUD()}
                    {this._moreInfo()}
                </View>
            );

        }
    }
}

var styles = StyleSheet.create({
    container: {}
});