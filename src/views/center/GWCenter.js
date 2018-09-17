import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';


export default class GWCenter extends Component {
    static navigationOptions=({navigation})=>{
        return{
            title:'个人中心'
        }
    }

    constructor(props) {

        super(props);


    }


    render() {
        return (
            <View></View>
        );
    }

}

var styles = StyleSheet.create({
    container: {}
});