import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Buttom from "../../components/buttom/Buttom";


export default class GWLogon extends Component {


    constructor(props) {

        super(props);


    }


    _logon(){
        var self = this;
        storage.gw_saveItem('token','ddsdss',function () {
            
            self.props.navigation.navigate('Home');
        })
    }


    render() {
        return (
            <View>
                <Buttom title="登录" onClickItem={()=>{
                    this._logon()
                }}/>

            </View>
        );
    }

}

var styles = StyleSheet.create({
    container: {}
});