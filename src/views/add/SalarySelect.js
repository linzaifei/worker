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
        this._loadData();
    }
        // 构造
          constructor(props) {
            super(props);
            // 初始状态
            this.state = {
                salary:'',
                salaryCode:-1,
                selectSalaryIndex:0,
                data:[],
            };
          }

          render(){
              let self=this;
              var selectIndex=self.props.navigation.state.params.index;
              return(
                  <ScrollView style={styles.container}>
                      <CheckBox list={self.state.data} marginTop={5} selectRow={selectIndex} onClickItem={(index)=>{
                            self.setState({
                                salaryCode:self.state.data[index].code,
                                salary:self.state.data[index].name,
                                selectSalaryIndex:index,
                            })
                      }} />
                      {this._Alert()}
                  </ScrollView>
              );
          }

    _submit=()=>{
        var self = this;
        const {
            salary,
            selectSalaryIndex,
            salaryCode
        }=self.state

        if (!salary || salaryCode==-1){
            self.dropdown.alertWithType('custom','请选择期望工资','');
            return;
        }
        if (this.props.navigation.state.params.callback) {
            this.props.navigation.state.params.callback(salary,selectSalaryIndex,salaryCode)
        }
        this.props.navigation.goBack();
    }

    _loadData(){
        var self = this;
        gwrequest.gw_tokenRequest(urls.queryDicByType,{"type":"expect_salary"},function (ret) {
            console.log("success"+JSON.stringify(ret))
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