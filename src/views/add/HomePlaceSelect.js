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
            headerRight:(
                <TouchableOpacity onPress={params.submit}>
                    <Text style={{fontSize:15,color:'#fff',marginRight:15}}>完成</Text>
                </TouchableOpacity>
            )
        }
    }
    componentWillMount() {
        this.props.navigation.setParams({ submit: this._submit });
        this._loadData();
    }
        // 构造
          constructor(props) {
            super(props);
            // 初始状态
            this.state = {
                selectObject:'',
                data:[],
                selectIndex:0,
            };
          }

          render(){
              let self=this;
              console.log("selectIndex"+self.state.selectIndex);
              return(
                  <View style={styles.container}>
                      <FlatList
                          data={self.state.data}
                          renderItem={({item,index}) =>self._renderItemView(item,index)}
                      />
                  </View>
              );
          }
    _renderItemView(item,index){

        let self=this;
        // var j=;
        // console.log(parseInt(index)+"---------"+parseInt(j));
        // if( parseInt(index)== parseInt(j)){
        //     i=1
        //     console.log("选中了index===="+index);
        // }
        return(
            <SingleCheckBox
                marginTop={5} text={item.name} index={index} isSelect={self.state.selectIndex} onClickItem={(index)=>{
                // console.log(index+'===='+index);
                self.setState({
                    selectIndex:index,
                    data:this.state.data,
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
            callback: ((str) => { //回调函数
                if (self.props.navigation.state.params.callback) {
                    self.props.navigation.state.params.callback(str,index)
                }
                self.props.navigation.goBack();
            })
           })
    }
    _submit=()=>{
        var self = this;
        const {
            selectObject
        }=self.state

        if (!selectObject){
            return;
        }
        console.log('======'+selectObject);
        if (this.props.navigation.state.params.callback) {
            this.props.navigation.state.params.callback(selectObject)
        }
        this.props.navigation.goBack();
    }

    _loadData(){
        var self = this;
        gwrequest.gw_tokenRequest(urls.queryAllProvince,{},function (ret) {
            console.log("success"+JSON.stringify(ret))
            self.setState({
                data:ret,
                // data:this.state.data.concat(ret.value),
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