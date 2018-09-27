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
import CheckBox from "./CheckBox";

export default class SalarySelect extends BaseComponent{
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
    }
        // 构造
          constructor(props) {
            super(props);
            // 初始状态
            this.state = {
                salary:'',
                selectSalaryIndex:0,
            };
          }

          render(){
              let self=this;
              var datas = self.props.navigation.state.params.datas;
              var selectIndex=self.props.navigation.state.params.index;
              return(
                  <ScrollView style={styles.container}>
                      <CheckBox list={datas} marginTop={5} selectRow={selectIndex} onClickItem={(index)=>{
                            self.setState({
                                salary:datas[index],
                                selectSalaryIndex:index,
                            })
                      }} />
                  </ScrollView>
              );
          }

    _submit=()=>{
        var self = this;
        const {
            salary,
            selectSalaryIndex
        }=self.state

        if (!salary){
            return;
        }
        console.log('======'+salary+"==="+selectSalaryIndex);
        if (this.props.navigation.state.params.callback) {
            this.props.navigation.state.params.callback(salary,selectSalaryIndex)
        }
        this.props.navigation.goBack();
    }

}

var styles = StyleSheet.create({
    container: {
        padding:5,

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