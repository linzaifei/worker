import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';

import PropTypes from 'prop-types'

export default class Buttom extends Component {

    static propTypes = {
        title:PropTypes.string,
        backgroundColor:PropTypes.string,
        color:PropTypes.string,
        borderColor:PropTypes.string,
        borderWidth:PropTypes.number,
        padding:PropTypes.number,
        fontSize:PropTypes.number,
        marginTop:PropTypes.number,
        marginLeft:PropTypes.number,
        radius:PropTypes.number,
        btnWidth:PropTypes.number,
        onClickItem:PropTypes.func,

    }

    static defaultProps = {
        padding:9,
        title:'button',
        color:'#666',
        fontSize:15,
        marginTop:0,
        marginLeft:0,
        radius:0,
    }

    _didClickCell(data) {
        if (this.props.onClickItem == null) return;
        this.props.onClickItem(data);
    }

    render() {
        const {
            padding,
            marginTop,
            marginLeft,
            backgroundColor,
            btnWidth,
            radius,
            borderWidth,
            borderColor,
            color,
            fontSize,
            title
        }=this.props
        return (
            <TouchableOpacity style={{
                padding,
                marginTop,
                marginLeft,
                backgroundColor,
                width:btnWidth,
                borderRadius:radius,
                justifyContent:'center',
                alignItems:'center',
                borderColor,
                borderWidth,
            }} onPress={()=>this._didClickCell()}>
                <Text style={{
                    color,
                    fontSize
                }}>{title}</Text>
            </TouchableOpacity>
        );
    }

}

var styles = StyleSheet.create({
    container: {}
});