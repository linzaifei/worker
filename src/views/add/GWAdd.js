import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';


export default class GWAdd extends Component {
    static navigationOptions=({navigation})=>{
        return{
            title:'添加'
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