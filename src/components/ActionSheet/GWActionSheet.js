import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import ActionSheet from 'react-native-actionsheet'
export default class GWActionSheet extends Component {

    constructor(props) {
        super(props);
        this.state={
            options:[],
            index:0,
            title:'',
            onClickItem:null,
        }
    }


    show(title,options,index,clickItem){
        var self = this;
        this.setState({
            title:title,
            index:index,
            options:options,
            onClickItem:clickItem,
        },()=>{
            self.ActionSheet.show()
        })
    }

    render() {
        var self = this;
        const {
            title,
            options,
            index,
            onClickItem,
        }=this.state;
        return (
            <ActionSheet
                ref={o => self.ActionSheet = o}
                title= {title}
                options={options}
                cancelButtonIndex={index}
                onPress={(index) =>{
                    onClickItem(index)
                }}
            />
        );
    }

}

var styles = StyleSheet.create({
    container: {}
});