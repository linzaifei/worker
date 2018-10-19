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
import GWTag from "../tag/GWTag";

function _hasBack() {
    const {hasBack}=this.props;
    if (hasBack){
        return
    }
}

export default class GWSelectItem extends Component {
    constructor(props){
        super(props)
        this.state={
            secureTextEntry:false,
        }
    }
    static propTypes = {
        iconWidth:PropTypes.number,
        iconHeight:PropTypes.number,
        url:PropTypes.string,
        color:PropTypes.string,
        size:PropTypes.number,
        title:PropTypes.string,

        content:PropTypes.string,
        backgroundColor:PropTypes.string,

        placeholder:PropTypes.string,
        editable:PropTypes.bool,
        onTextChange:PropTypes.func,
        value:PropTypes.string,
        textColor:PropTypes.string,
        space:PropTypes.number,
        max:PropTypes.number,
        keyboard:PropTypes.oneOf(['default','phone-pad','email-address','numeric']),
        mTop:PropTypes.number,
        borderRadius:PropTypes.number,
        hasBack:PropTypes.bool,
        hasText:PropTypes.bool,
        children: PropTypes.node,
        onClickItem:PropTypes.func,


    }

    static defaultProps={
        hasBack:true,
        editable:true,
        hasText:false,
        keyboard:'default',
        iconHeight:20,
        iconWidth:20,
        space:5,
        mTop:5,
        textColor:dpColor,
        backgroundColor:'#fff'
    }


    _setSecureTextEntry(){
        this.setState({
            secureTextEntry:true,
        })
    }

    getBack(){
        const {
            hasBack,
            children,
        } = this.props;

        if (hasBack&& !children) {
            return <Image source={{uri: 'ic_next_back'}} style={{width: 18, height: 18}}/>
        }else {
            return null;
        }
    }

    getRightText(){
        const {
            onTextChange,
            max,
            placeholder,
            keyboard,
            value,
            editable,
            children,
            textColor,
        }=this.props;

        if(!children){
            if(editable){
                return (
                    <TextInput style={styles.textInput}
                               defaultValue={value}
                                underlineColorAndroid={'transparent'}
                               secureTextEntry={false}
                               keyboardType={keyboard}
                               maxLength={max}
                               placeholder={placeholder}
                               editable={editable}
                               onChange={(e)=>
                                   onTextChange && onTextChange(e.nativeEvent.text)
                               }
                    />
                )
            }else {
                if(value){
                    return (
                        <Text numberOfLines={1}  style={{fontSize:15,marginLeft:15,color:textColor,textAlign:'right',flex:1}}>{value}</Text>
                    )
                }else {
                    return (
                        <Text style={{fontSize:15,color:dddColor,textAlign:'right',flex:1}}>{placeholder}</Text>
                    )
                }
            }
        }
    }


    render() {
      const {
          onClickItem,
          borderRadius,
          mTop,
          backgroundColor,
      } = this.props

        return (
            <TouchableOpacity  style={[styles.container,{backgroundColor,borderRadius,marginTop:mTop}]} onPress={()=>{
                onClickItem && onClickItem()
            }}>
                <GWTag {...this.props} />
                <View style={styles.right}>

                    {this.getRightText()}
                    {this.getBack()}
                    {this.props.children}
                </View>
            </TouchableOpacity>
        );
    }

}

var styles = StyleSheet.create({
    container: {
        flexDirection:ROW,
        alignItems:CENTER,
        justifyContent:SPACEBETWEEN,
        padding:12,
    },
    right:{
        flexDirection:ROW,
        alignItems:CENTER,
        flex:1,
        justifyContent:FLEXEND,
        // backgroundColor:'gray'
    },
    textInput:{
        textAlign:'right',
        fontSize:15,
        paddingTop:0,
        paddingBottom:0,
        color:dpColor,
        flex:1,
    }
});