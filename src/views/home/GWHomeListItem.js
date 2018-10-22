import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';


import PropTypes from 'prop-types'
import GWTag from "../../components/tag/GWTag";

export default class GWHomeListItem extends Component {

    static propTypes={
        name:PropTypes.string,
        job:PropTypes.string,
        state:PropTypes.number,
        marginTop:PropTypes.number,
        time:PropTypes.string,
        age:PropTypes.number,
        workStatusName:PropTypes.string,
        onClickItem:PropTypes.func,
    }


    _getState(){
        const {
            state,
            workStatusName,
        }=this.props;
        return (
            <View style={{flexDirection:ROW,justifyContent:FLEXEND}}>
                <GWTag url='' title={workStatusName} size={12} color="#808080" iconWidth={13} iconHeight={13} />
            </View>
        )
    }


    render() {
        var self = this;
        const {
            name,
            job,
            time,
            marginTop,
            age,
            onClickItem,
        }=this.props;
        return (
            <TouchableOpacity style={[styles.container,{marginTop}]} onPress={()=>{
                onClickItem && onClickItem()
            }}>
                <View style={styles.left}>
                    <View style={{flexDirection:ROW,alignItems:CENTER,}}>
                        <Text style={styles.title}>{name}</Text>
                        {age !=0? <Text style={{fontSize:13,color:swColor,marginLeft:5}}>{age}</Text>:null}
                    </View>
                    <Text style={styles.job}>{job}</Text>
                </View>
                <View style={styles.right}>
                    {this._getState()}
                    <Text style={[styles.job,{textAlign:'right'}]}>{time}</Text>
                </View>

            </TouchableOpacity>
        );
    }

}

var styles = StyleSheet.create({
    container: {
        borderRadius:5,
        flexDirection:ROW,
        alignItems:CENTER,
        justifyContent:SPACEBETWEEN,
        padding:10,
        backgroundColor:'#fff',
    },
    title:{
        fontSize:15,
        color:dpColor,
    },
    job:{
        fontSize:13,
        color:'#808080',
        marginTop:8,
    },
});