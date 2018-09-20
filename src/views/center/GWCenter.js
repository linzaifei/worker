import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';
import GWSelectItem from "../../components/selectItem/GWSelectItem";
import BaseComponent from "../../components/base/BaseComponent";

export default class GWCenter extends BaseComponent {
    static navigationOptions =({navigation})=>{
        return{
            headerStyle:{backgroundColor:defaultColor,borderBottomWidth: 0,shadowOpacity: 0,elevation: 0,},
            headerTitle:(
                <Text style={{fontSize:16,color:'#fff'}}>个人中心</Text>
            )
        }
    }


    constructor(props) {
        super(props);
        this.state={
            name:'张三',
            telephone:'12345678912',
        }
    }
    
    _loadData(){
        var self = this;
        gwrequest.gw_tokenRequest(urls.queryUserInfo,{},function (ret) {
            console.log(JSON.stringify(ret))
            self.setState({
                name:ret.realName,
                telephone:ret.userName,
            })
            storage.saveItem('userInfo',ret)
        },function (e) {
            console.log(JSON.stringify(e))
        })
    }

    componentDidMount(){
        this._loadData()
    }

    _out(){
        var self = this;
        gwrequest.gw_tokenRequest(urls.logout,{},function (ret) {
            storage.gw_removeItem('token',function () {
                self.props.navigation.navigate('Auth');
            })
        },function (e) {
            console.log(JSON.stringify(e))
        })
    }
    

    render() {
        
        var self = this;
        const {
            name,
            telephone,
        } = self.state;
        return (
            <ScrollView style={styles.container}>
                <GWSelectItem
                    title="姓名"
                    borderRadius={5}
                    editable={false}
                    ontextchange={(text)=>{

                    }}
                >
                    <Text style={styles.content}>{name}</Text>
                </GWSelectItem>
                <GWSelectItem
                    title="手机号码"
                    editable={false}
                    borderRadius={5}
                    ontextchange={(text)=>{

                    }}
                >
                    <Text style={styles.content}>{telephone}</Text>
                </GWSelectItem>
                <GWSelectItem
                    title="修改密码"
                    borderRadius={5}
                    editable={false}
                    onClickItem={()=>{
                        self.props.navigation.navigate('ForgetPwd')
                    }}
                />
                <GWSelectItem
                    title="退出登录"
                    hasBack={false}
                    borderRadius={5}
                    editable={false}
                    onClickItem={()=>{
                        self.alertView.show('退出退出账号？',['取消','确定'],function (index) {
                            if(index==1){
                                self._out()
                            }
                        })
                    }}
                />
                {this._alertAction()}
            </ScrollView>
        );
    }

}

var styles = StyleSheet.create({
    container: {
        padding:5,
    },
    content:{
        fontSize:15,
        color:swColor,
        textAlign:'right',
        flex:1,
        // backgroundColor:'red'
    }

});