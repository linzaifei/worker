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
import EditInput from "../logon/EditInput";


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
            if(e.msg){
                self.dropdown.alertWithType('info',e.msg?e.msg:'请求错误','');
            }
        })
    }

    _out(){
        var self = this;

        self.alertView.show('密码修改成功后需要重新登录',['重新登录'],function () {
            gwrequest.gw_tokenRequest(urls.logout,{},function (ret) {
                storage.gw_removeItem('token',function () {
                    self.props.navigation.navigate('Auth');
                })
            },function (e) {
                console.log(JSON.stringify(e))
                if(e.msg){
                    self.dropdown.alertWithType('info',e.msg?e.msg:'请求错误','');
                }
            })
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
        this.tel._setSecureTextEntry();
        this.pwd._setSecureTextEntry();
    }

    render() {
        var self = this;
        return (
            <View style={styles.container}>
                <EditInput ref={a=>this.tel=a}
                           padding={2}
                           title="新的密码"
                           textAlign='right'
                           placeholder="请输入密码"
                           borderRadius={5}
                           paddingRight={10}
                           paddingLeft={10}
                           color={swColor}
                           backgroundColor="#fff"
                           marginLeft={5}
                           marginRight={5}
                           onTextChange={(text)=>{
                               self.setState({
                                   newPwd:text,
                               })
                           }}
                />
                <EditInput ref={a=>this.pwd=a}
                           title="确认密码"
                           marginTop={8}
                           paddingRight={10}
                           paddingLeft={10}
                           textAlign='right'
                           borderRadius={5}
                           color={swColor}
                           placeholder="请输入密码"
                           backgroundColor="#fff"
                           marginLeft={5}
                           marginRight={5}
                           onTextChange={(text)=>{
                               self.setState({
                                   reNewPwd:text,
                               })
                           }}
                />

                {this._Alert()}
                {this._alertAction()}
            </View>
        );
    }

}

var styles = StyleSheet.create({
    container: {
        padding:5,
        flex:1,
        backgroundColor:'#fafafa'
    }
});