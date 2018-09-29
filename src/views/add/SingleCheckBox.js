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
        text:PropTypes.string,
        index:PropTypes.number,
        isSelect:PropTypes.number,
        backgroundColor:PropTypes.string,
        onCLickImgItem:PropTypes.func,
        onClickItem:PropTypes.func,

    }
    static defaultProps={
        img:'ic_check',
        isSelect:0,
        index:0,
        backgroundColor:'#fff',
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
        if(parseInt(isSelect) === 1){
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
            backgroundColor,
            onCLickImgItem,
        }=this.props;
        return (
            <TouchableOpacity style={[styles.item,{marginTop,backgroundColor}]} onPress={()=>{this._selIndex(index)}}>
                <Text style={styles.title}>{text}</Text>
                <TouchableOpacity style={styles.rightItem} onPress={()=>{
                    onCLickImgItem && onCLickImgItem()
                }}>
                    {this._seleted()}
                </TouchableOpacity>
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
        padding:13,
        borderColor:lineColor,
        borderBottomWidth:1,
        borderRadius:5,
    },
    rightItem:{
        flex:1,
        flexDirection:ROW,
        justifyContent:FLEXEND,
        height:20,
    },
    title:{
        fontSize:15,
        color:swColor,
        flex:5,
    },
    img:{
        width:20,
        height:20,
    }
});