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

export default class CheckBox extends Component {

    constructor(props) {
        super(props);
        this.state={
            row:0,
        }

    }
    static propTypes = {
        list:PropTypes.array,
        img:PropTypes.string,
        selImg:PropTypes.string,
        selectRow:PropTypes.number,
        marginTop:PropTypes.number,
        onClickItem:PropTypes.func,

    }
    static defaultProps={
        img:'ic_check',
        selectRow:0,
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
        this.setState({
            row:index,
        })
    }

    _seleted(index){
        const {
            img
        }=this.props;
        if(this.state.row == index){
            return (
                <Image style={styles.img} source={{uri:img}} />
            )
        }
    }

    _checkList(){
        const {
            list,
            marginTop,
        }=this.props;

        var arr = [];
        list.map((item,index)=>{
            arr.push(
                <TouchableOpacity key={index} style={[styles.item,{marginTop}]} onPress={()=>{this._selIndex(index)}}>
                    <Text style={styles.title}>{item}</Text>
                    {this._seleted(index)}
                </TouchableOpacity>
            )
        })
        return arr;
    }

    render() {
        return (
            <View>
                {this._checkList()}
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