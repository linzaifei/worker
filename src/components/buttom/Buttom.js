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
        marginRight:PropTypes.number,
        marginBottom:PropTypes.number,
        borderRadius:PropTypes.number,
        width:PropTypes.number,
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


    render() {
        const {
            color,
            fontSize,
            title,
            onClickItem
        }=this.props
        return (
            <TouchableOpacity  onPress={()=>{
                onClickItem && onClickItem()
            }}>
                <View {...this.props} style={{
                    justifyContent:'center',
                    alignItems:'center',
                }}>
                    <Text style={{
                        color,
                        fontSize
                    }}>{title}</Text>
                </View>
            </TouchableOpacity>
        );
    }

}

var styles = StyleSheet.create({
    container: {}
});