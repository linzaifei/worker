import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import GWSelectItem from "../../components/selectItem/GWSelectItem";
import BaseComponent from "../../components/base/BaseComponent";


export default class GWForgetPwd extends BaseComponent {

    static navigationOptions =({navigation})=>{
        const params = navigation.state.params || {};
        return{
            headerTitle:(
                <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
                <Text style={{fontSize:16,color:'#fff'}}>修改密码</Text>
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

    _submit=()=>{

        var self = this;
        const {
            newPwd,
            reNewPwd,
        }=self.state
        console.log(newPwd+"====="+reNewPwd);
        if(!newPwd){
            self.dropdown.alertWithType('info','请输入新的密码','');
            return;
        }
        if(!reNewPwd){
            self.dropdown.alertWithType('info','请输入确认密码','');
            return;
        }
        if (String(newPwd) !=String(reNewPwd)){
            self.dropdown.alertWithType('info','两次密码不一致','');
            return;
        }
        gwrequest.gw_tokenRequest(urls.changePass,{'newPass':newPwd},function (ret) {
            self.dropdown.alertWithType('info','修改密码成功','');
            self._out()
        },function (e) {
            console.log(JSON.stringify(e))
        })
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

    constructor(props) {
        super(props);
        this.state={
            newPwd:'',
            reNewPwd:'',
            userId:'',

        }
    }

    componentDidMount(){
        var self = this;
        storage.getItem('userInfo',function (ret) {
            console.log('======'+JSON.stringify(ret))
            self.setState({
                userId:ret.id,
            })
        },function (e) {

        })
    }

    render() {
        var self = this;
        return (
            <View style={styles.container}>
                <GWSelectItem
                    title="新的密码"
                    placeholder="请输入密码"
                    hasBack={false}
                    hasText={true}
                    secureTextEntry={true}
                    borderRadius={5}
                    keyboard={'email-address'}
                    onTextChange={(text)=>{
                        self.setState({
                            newPwd:text,
                        })
                    }}
                />
                <GWSelectItem
                    title="确认密码"
                    placeholder="请输入密吗"
                    hasBack={false}
                    hasText={true}
                    secureTextEntry={true}
                    borderRadius={5}
                    keyboard={'email-address'}
                    onTextChange={(text)=>{
                        self.setState({
                            reNewPwd:text,
                        })
                    }}
                />
                {this._Alert()}
            </View>
        );
    }

}

var styles = StyleSheet.create({
    container: {
        padding:5,
    }
});