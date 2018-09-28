import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import BaseComponent from "../../components/base/BaseComponent";
import SingleCheckBox from "./SingleCheckBox";

export default class CityPlaceSelect extends BaseComponent{
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
        this._loadData(this.props.navigation.state.params.code);
    }
        // 构造
          constructor(props) {
            super(props);
            // 初始状态
            this.state = {
                selectObject:'',
                data:[],
                selectIndex:-1,
            };
          }

          render(){
              let self=this;
              return(
                  <View style={styles.container}>
                      <FlatList
                          data={self.state.data}
                          extraData={self.state}
                          renderItem={({item,index}) =>self._renderItemView(item,index)}
                      />
                  </View>
              );
          }
    _renderItemView(item,index){
        var i=0;
        let self=this;
        var j=self.state.selectIndex;
        if(index==j){
            i=1
            console.log("选中了index===="+index);
        }
        return(
            <SingleCheckBox
                marginTop={5} text={item.name} index={index} isSelect={i} onClickItem={(index)=>{
                console.log("index===="+index);
                self.setState({
                    selectIndex:index,
                    selectObject:item.name,
                })
            }}
            />
        )
    }
    _submit=()=>{
        var self = this;
        const {
            selectObject
        }=self.state

        if (!selectObject){
            return;
        }
        var str=this.props.navigation.state.params.proStr+"-"+selectObject;
        console.log('======'+str);
        if (this.props.navigation.state.params.callback) {
            this.props.navigation.state.params.callback(str)
        }
        this.props.navigation.goBack();
    }

    _loadData(code){
        var self = this;
        gwrequest.gw_tokenRequest(urls.queryAreaByParentCode,{"parentCode":code},function (ret) {
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