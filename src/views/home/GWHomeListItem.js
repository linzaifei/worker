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
                <View style={styles.top}>
                    <View style={{flexDirection:ROW,alignItems:CENTER,}}>
                        <Text style={styles.title}>{name}</Text>
                        {(age&&age !=0)? <Text style={{fontSize:13,color:swColor,marginLeft:5}}>{age}岁</Text>:null}
                    </View>
                    {this._getState()}
                </View>

                <View style={styles.bottom}>
                    <Text style={[styles.job,{flex:1.5}]}>{job}</Text>
                    <Text style={[styles.time,{textAlign:'right',flex:1,}]}>{time}</Text>
                </View>

            </TouchableOpacity>
        );
    }

}

var styles = StyleSheet.create({
    container: {
        borderRadius:5,
        padding:10,
        backgroundColor:'#fff',
    },
    top:{
        flexDirection:ROW,
        alignItems:CENTER,
        justifyContent:SPACEBETWEEN,
    },
    bottom:{
        flexDirection:ROW,
        alignItems:CENTER,
        justifyContent:SPACEBETWEEN,
    },
    title:{
        fontSize:15,
        color:dpColor,
    },
    job:{
        fontSize:13,
        // color:'#808080',
        color:'#e1bd97',
        marginTop:8,

    },
    time:{
        fontSize:13,
        color:'#808080',
        // color:'#e1bd97',
        marginTop:8,

    },
});