import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import Buttom from "../../components/buttom/Buttom";
import GWTag from "../../components/tag/GWTag";
import EditInput from "./EditInput";
import BaseComponent from "../../components/base/BaseComponent";


export default class GWLogon extends BaseComponent {
    static navigationOptions=({navigation})=>{
        return {
            headerStyle:{backgroundColor:defaultColor,borderBottomWidth: 0,shadowOpacity: 0,elevation: 0,},
        }
    }

    constructor(props) {
        super(props);
        this.state={
            telephone:'',
            password:'',
        }
    }

    componentDidMount(){
        var self = this;
        storage.gw_getItem('telephone',function (e,ret) {
            console.log('获取到tel========================'+ret)
            if (ret){
                self.setState({
                    telephone:ret,
                })
            }
        })
        this.pwd._setSecureTextEntry();
    }

    _logon(){
        var self = this;
        const {
            telephone,
            password,
        }=self.state;

        if(!telephone || !password){
            self.dropdown.alertWithType('info','请输入账号密码','')
            return;
        }

        var parmas = {
            userName:telephone,
            password,
        }
        gwrequest.gw_request(urls.login,parmas,function (ret) {
            console.log('========='+JSON.stringify(ret))
            storage.gw_saveItem('token',ret,function () {
                self.props.navigation.navigate('MianTabBar');
            })
            storage.gw_saveItem('telephone',telephone,function () {
                console.log('=========成功了')
            })
        },function (e) {
            if(e.msg){
                self.dropdown.alertWithType('success',e.msg,'')
            }
            console.log(JSON.stringify(e))
        })
    }

    _onTextChange(value,flag){
        switch (flag){
            case 0:
                this.setState({
                    telephone:value
                })
                break;
            case 1:
                this.setState({
                    password:value
                })
                break;
        }
    }



    render() {
        const {
            telephone,
        }=this.state
        return (
            <View style={styles.container}>
                <View style={{justifyContent:CENTER,alignItems:CENTER,marginTop:30}}>
                    <GWTag size={18} iconWidth={100}iconHeight={100} space={10} color="#fff" url="logo" title="国文人力资源" ps="top"/>
                </View>

                <View style={{marginTop:76,marginLeft:15,marginRight:15}}>
                    <EditInput ref={a=>this.tel=a}
                               padding={2}
                               value={telephone}
                               paddingLeft={10}
                               borderRadius={20}
                               backgroundColor="rgba(255,255,255,0.2)"
                               max={11}
                               imgName="ic_logon_user"
                               placeholder="请输入账号"
                               onTextChange={(e)=>{this._onTextChange(e,0)}}
                    />
                    <EditInput ref={a=>this.pwd=a}
                               padding={2}
                               paddingLeft={10}
                               borderRadius={20}
                               backgroundColor="rgba(255,255,255,0.2)"
                               marginTop={8}
                               max={11}
                               imgName="ic_logon_lock"
                               placeholder="请输入密码"
                               onTextChange={(e)=>{this._onTextChange(e,1)}}
                    />
                    <View style={styles.bottom}>
                        <Text style={{fontSize:13,color:'#fff'}}>忘记密码请联系管理人员</Text>
                        <Buttom color="#fff" fontSize={13}  title="注册" clickItem={()=>{this._forgetPwd()}}/>
                    </View>
                </View>


                <Buttom
                    title="登  录"
                    backgroundColor="#fff"
                    marginTop={60}
                    marginLeft={15}
                    marginRight={15}
                    borderRadius={20}
                    color={defaultColor}
                    fontSize={15}
                    onClickItem={()=>{
                        this._logon()
                    }}
                />
                {this._Alert('red')}

            </View>
        );
    }

}

var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:defaultColor,
    },
    bottom:{
        flexDirection:ROW,
        alignItems:CENTER,
        justifyContent:SPACEBETWEEN,


    }
});