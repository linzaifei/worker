import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
} from 'react-native';

import PropTypes from 'prop-types'

export default class InputView extends Component {


    // constructor(props) {
    //     super(props);
    //     this.state={
    //         value:'',
    //     }
    // }

    static propTypes = {
        value:PropTypes.string,
        hasMax:PropTypes.bool,
        placeholder:PropTypes.string,
        max:PropTypes.number,
        height:PropTypes.number,
        editable:PropTypes.bool,
        onChange:PropTypes.func,

    }

    static defaultProps={
        height:240,
        max:5000,
        hasMax:false,
        editable:true,
        placeholder:'请输入',
    }

    _text(){
        if (this.props.hasMax){
            return <Text style={styles.text}>{this.props.max}字</Text>
        }
    }
    //
    // setValue(value){
    //     console.log(value)
    //     this.setState({
    //         value:value
    //     })
    // }

    render() {
        const {
            editable,
            onChange,
            value,
            max,
            placeholder,
            height,
        }=this.props;
        return (
            <View style={styles.container}>
                <TextInput onChange={(e)=>{
                    onChange && onChange(e.nativeEvent.text)
                }} editable={editable} defaultValue={value} maxLength={max}  underlineColorAndroid={'transparent'}  placeholder={placeholder} multiline={true}  style={[styles.textStyle,{height}]}/>
                {this._text()}
            </View>
        );
    }

}

var styles = StyleSheet.create({
    container: {
        position:RELATIVE,
        marginBottom:5,
    },
    textStyle:{
        flex:1,
        height:240,
        padding:5,
        backgroundColor:'#fff',
        textAlignVertical: 'top'
    },
    text:{
        fontSize:14,
        color:swColor,
        position:ABSOLUTE,
        bottom:10,
        right:10,
    }
});