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
    }


    _getState(){
        const {
            state
        }=this.props;
        switch (state){
            case 0:
                return (
                    <View style={{flexDirection:ROW,justifyContent:FLEXEND}}>
                        <GWTag url='ic_home_not_found' title="找工作中" size={12} color="#808080" iconWidth={13} iconHeight={13} />
                    </View>
                )
                break;
            case 1:
                return (
                    <View style={{flexDirection:ROW,justifyContent:FLEXEND}}>
                        <GWTag url='ic_home_found' title="工作中" size={12} color="#808080" iconWidth={13} iconHeight={13} />
                    </View>
                )
                break;
        }
    }


    render() {
        var self = this;
        const {
            name,
            job,
            time,
            marginTop,
        }=this.props;
        return (
            <TouchableOpacity style={[styles.container,{marginTop}]}>
                <View style={styles.left}>
                    <Text style={styles.title}>{name}</Text>
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