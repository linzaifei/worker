import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView, TouchableOpacity,
} from 'react-native';
import BaseComponent from "../../components/base/BaseComponent";

export default class SalarySelect extends BaseComponent{
    static navigationOptions =({navigation})=>{
        const params = navigation.state.params || {};
        return{
            headerTitle:(
                <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
                    <Text style={{fontSize:16,color:'#fff'}}>工资要求</Text>
                </View>
            ),
            headerRight:(
                <TouchableOpacity onPress={params.submit}>
                    <Text style={{fontSize:15,color:'#fff',marginRight:15}}>完成</Text>
                </TouchableOpacity>
            )
        }
    }

        // 构造
          constructor(props) {
            super(props);
            // 初始状态
            this.state = {};
          }

          render(){
              return(
                  <View>
                      <Text>123</Text>

                  </View>
              );
          }

}

var styles = StyleSheet.create({
    container: {
        padding:5,
        // paddingTop:5,
        // paddingLeft:5,
        // paddingRight:5,
        // paddingBottom:20,
    },
    center:{
        padding:10,
        backgroundColor:'#fff',
        borderRadius:5,
        marginTop:5,
    }
});