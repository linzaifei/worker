import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Buttom from "../../components/buttom/Buttom";


export default class GWHome extends Component {
    static navigationOptions=({navigation})=>{
        return{
            title:'首页'
        }
    }

    constructor(props) {

        super(props);


    }


    _out(){
        var  self = this;
       storage.gw_clear(function () {
           self.props.navigation.navigate('Auth');
       })
    }

    render() {
        return (
            <View>
                <Buttom title="退出" onClickItem={()=>{
                    this._out()
                }}/>
            </View>
        );
    }

}

var styles = StyleSheet.create({
    container: {}
});