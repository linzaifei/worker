import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';

import PropTypes from 'prop-types'

export default class SingleCheckBox extends Component {

    constructor(props) {
        super(props);
    }
    static propTypes = {
        img:PropTypes.string,
        selImg:PropTypes.string,
        marginTop:PropTypes.number,
        onClickItem:PropTypes.func,
        text:PropTypes.string,
        index:PropTypes.number,
        isSelect:PropTypes.number,
    }
    static defaultProps={
        img:'ic_check',
        isSelect:0,
    }


    componentWillMount(){
        this.setState({
            row:this.props.selectRow,
        })
    }
    _selIndex(index){
        const {
            onClickItem,
        }=this.props;
        onClickItem && onClickItem(index)
    }

    _seleted(){
        const {
            img,
            isSelect,
        }=this.props;
        if(isSelect === 1){
            return (
                <Image style={styles.img} source={{uri:img}} />
            )
        }
    }

    _renderCheck(){
        const {
            marginTop,
            text,
            index,
        }=this.props;
        return (
            <TouchableOpacity style={[styles.item,{marginTop}]} onPress={()=>{this._selIndex(index)}}>
                <Text style={styles.title}>{text}</Text>
                {this._seleted()}
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View>
                {this._renderCheck()}
            </View>
        );
    }

}

var styles = StyleSheet.create({
    container: {},
    item:{
        flexDirection:ROW,
        alignItems:CENTER,
        justifyContent:SPACEBETWEEN,
        padding:15,
        backgroundColor:'#fff',
        borderColor:lineColor,
        borderBottomWidth:1,
        borderRadius:5,
    },
    title:{
        fontSize:15,
        color:dpColor,
    },
    img:{
        width:20,
        height:20,
    }
});