import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import PropTypes from 'prop-types'
import GWTag from "../../components/tag/GWTag";

export default class EditInput extends Component {
    constructor(props) {
        super(props);
        this.state={
            secureTextEntry:false,
            img:'',
            borderColor:'#E6E6E6',
            focus:false,
            time:60,

        }
    }

    static propTypes={
        keyboardType:PropTypes.oneOf(['default','phone-pad']),

        imgName:PropTypes.string,
        title:PropTypes.string,
        backgroundColor:PropTypes.string,

        placeholder:PropTypes.string,

        hasEye:PropTypes.bool,
        max:PropTypes.number,

        marginTop:PropTypes.number,
        marginLeft:PropTypes.number,
        marginRight:PropTypes.number,
        marginBottom:PropTypes.number,
        padding:PropTypes.number,
        paddingLeft:PropTypes.number,
        paddingRight:PropTypes.number,
        borderBottomWidth:PropTypes.number,
        borderRadius:PropTypes.number,


        value:PropTypes.string,
        borderBottomColor:PropTypes.string,

        iconWidth:PropTypes.number,
        iconHeight:PropTypes.number,


        onTextChange:PropTypes.func,
        onClickItem:PropTypes.func,
    }

    static defaultProps={
        iconWidth:23,
        iconHeight:23,
        marginTop:0,

        hasEye:false,
        max:1000,
        padding:5,
        borderBottomWidth:0,
        rightType:0,
        keyboardType:'default'
    }





    _chengeImg(img){
        this.setState({
            img,
        })
    }
    _onChange(e){
        const {
            onTextChange,
        }=this.props
        onTextChange && onTextChange(e);
    }



    _leftView(){
        const {
            title,
            iconWidth,
            iconHeight,
            imgName,
        }=this.props
        return (
            <GWTag title={title} url={imgName} iconWidth={iconWidth} iconHeight={iconHeight} />
        )
    }

    render() {
        const {
            max,
            value,
            keyboardType,
            placeholder,
            borderBottomColor,
            imgName,
            imgNameSel,
        }=this.props

        return (
            <View style={[styles.container,]} {...this.props}>
                {this._leftView()}
                <TextInput ref="_input" onFocus={()=>{
                    this.setState({
                        img:imgNameSel ?imgNameSel:imgName,
                        borderColor:borderBottomColor,
                        focus:true,
                    })
                }} onEndEditing={()=> {
                    this.setState({
                        img:imgName,
                        borderColor:"#E6E6E6",
                        focus:false,
                    })
                }} maxLength={max} selectionColor="#fff" defaultValue={value} keyboardType={keyboardType} placeholderTextColor='#fff' underlineColorAndroid={'transparent'} secureTextEntry={this.state.secureTextEntry} onChange={(e)=>{this._onChange(e.nativeEvent.text)}} placeholder={placeholder} style={styles.textInputStyle} />

            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flexDirection:ROW,
        alignItems:CENTER,
    },
    textInputStyle:{
        height:33,
        flex:1,
        fontSize:15,
        padding:0,
        marginLeft:10,
        color:'#fff'
    },
    eyeStyle:{
        width:20,
        height:20,
    },
    title:{
        fontSize:15,
        color:'#fff',
        paddingLeft:10,
        paddingRight:10,
    }
});