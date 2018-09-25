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
            oldPwd,
            newPwd,
            reNewPwd,
        }=self.state

        if (!oldPwd && !newPwd && !reNewPwd && newPwd !=reNewPwd){
            return;
        }

        gwrequest.gw_tokenRequest(urls.changePass,)

    }

    constructor(props) {
        super(props);
        this.state={
            oldPwd:'',
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
                    title="旧的密码"
                    placeholder="请输入旧密码"
                    hasBack={false}
                    hasText={true}
                    borderRadius={5}
                    ontextchange={(text)=>{
                        self.setState({
                            oldPwd:text,
                        })
                    }}
                     />
                <GWSelectItem
                    title="新的密码"
                    placeholder="请输入密码"
                    hasBack={false}
                    hasText={true}
                    borderRadius={5}
                    ontextchange={(text)=>{
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
                    borderRadius={5}
                    ontextchange={(text)=>{
                        self.setState({
                            reNewPwd:text,
                        })
                    }}
                />
            </View>
        );
    }

}

var styles = StyleSheet.create({
    container: {
        padding:5,
    }
});