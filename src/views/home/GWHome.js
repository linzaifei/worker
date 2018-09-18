import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Buttom from "../../components/buttom/Buttom";
import GWSelectItem from "../../components/selectItem/GWSelectItem";



export default class GWHome extends Component {
    static navigationOptions=({navigation})=>{
        return{
            headerStyle:{backgroundColor:defaultColor,borderBottomWidth: 0,shadowOpacity: 0,elevation: 0,},
            headerTitle:(
                <Text style={{fontSize:16,color:'#fff'}}>首页</Text>
            )
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