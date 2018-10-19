import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    FlatList,
    ScrollView, TouchableOpacity,
} from 'react-native';
import BaseComponent from "../../components/base/BaseComponent";
import GWSelectItem from "../../components/selectItem/GWSelectItem";
import SingleCheckBox from "./SingleCheckBox";
import CheckBox from "./CheckBox";

export default class HomePlaceSelect extends BaseComponent{
    static navigationOptions =({navigation})=>{
        const params = navigation.state.params || {};
        return{
            headerTitle:(
                <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
                    <Text style={{fontSize:16,color:'#fff'}}>{params.title}</Text>
                </View>
            ),
        }
    }
    componentWillMount() {
        this._loadData();
    }
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            selectObject:'',
            data:[],
            lastSelectIndex:-1,
        };
    }

    _keyExtractor = (item, index) => String(index);
    render(){
        let self=this;
        return(
            <View style={styles.container}>
                <FlatList
                    keyExtractor={this._keyExtractor}
                    data={self.state.data}
                    extraData={self.state}
                    renderItem={({item,index}) =>self._renderItemView(item,index)

                    }
                />
            </View>
        );
    }
    _renderItemView(item,index){
        let self=this;
        return(
            <SingleCheckBox
                marginTop={5} text={item.name} index={index} isSelect={item.isselect} onClickItem={(index)=>{
                self._toCity(item.code,index,item.name);
                var lastIndex=self.state.lastSelectIndex;
                const tempdata=self.state.data;
                if(lastIndex!=-1){
                    tempdata[lastIndex].isselect=-1;
                }
                tempdata[index].isselect=1;
                self.setState({
                    lastSelectIndex:index,
                    data:tempdata
                })
            }}
            />
        )
    }
    _toCity(code,index,prostr){
        let self=this
        self.props.navigation.navigate('SelectCity',{
            code:code,
            proStr:prostr,
            title:'籍贯',
            callback: ((str,code) => { //回调函数
                if (self.props.navigation.state.params.callback) {
                    self.props.navigation.state.params.callback(str,index,code)
                }
                self.props.navigation.goBack();
            })
        })
    }
    _loadData(){
        var self = this;
        gwrequest.gw_tokenRequest(urls.queryAllProvince,{},function (ret) {
            for(var i=0;i<ret.length;i++){
                ret[i].isselect=-1;
            }
            self.setState({
                data:ret,
            })
        },function (e) {
            console.log(JSON.stringify(e))
        })
    }

}

var styles = StyleSheet.create({
    container: {
        padding:5,
        flex: 1,
        backgroundColor:'#fafafa'
        // paddingTop:5,
        // paddingLeft:5,
        // paddingRight:5,
        // paddingBottom:20,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        backgroundColor: '#fff'
    },
    center:{
        padding:10,
        backgroundColor:'#fff',
        borderRadius:5,
        marginTop:5,
    }
});