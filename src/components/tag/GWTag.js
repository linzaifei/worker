import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

import PropTypes from 'prop-types'

export default class GWTag extends Component {

    static propTypes = {
        ps:PropTypes.oneOf(['left','right','top','bottom']),
        iconWidth:PropTypes.number,
        iconHeight:PropTypes.number,
        url:PropTypes.string,
        color:PropTypes.string,
        size:PropTypes.number,
        title:PropTypes.string,
        space:PropTypes.number,
        borderRadius:PropTypes.number,
        padding:PropTypes.number,
        bgColor:PropTypes.string,
        marginTop:PropTypes.number,
    }

    static defaultProps={
        ps:'left',
        iconWidth: 15,
        iconHeight:15,
        color:'#666',
        size:14,
        borderRadius:0,
        space:3,
        marginTop:0,
        bgColor:'transparent'
    }
    _img() {
        const {
            borderRadius,
            iconWidth,
            iconHeight,
            url,
        }=this.props
        if (this.props.url) {
            return (
                <Image resizeMode={borderRadius>0 ?'cover':'contain'} style={{width:iconWidth,height:iconHeight,borderRadius}}  source={{uri:url}} />
            )
        }
    }

    _text(){
        const {
            title,
            color,
            size,
            space,
        }=this.props
        if (title){
            return  <Text style={{ color, fontSize:size,marginLeft:space}} class="content">{title}</Text>
        }
    }
    _text1(){
        const {
            title,
            color,
            size,
            space,
        }=this.props
        if (title){
            return  <Text style={{ color, fontSize:size,marginRight:space}} class="content">{title}</Text>
        }
    }
    _text2(){
        const {
            title,
            color,
            size,
            space,
        }=this.props
        if (title){
            return  <Text style={{ color, fontSize:size,marginTop:space}} class="content">{title}</Text>
        }
    }
    _text3(){
        const {
            title,
            color,
            size,
            space,
        }=this.props
        if (title){
            return  <Text style={{ color, fontSize:size,marginBottom:space}} class="content">{title}</Text>
        }
    }


    render() {
        const {
            ps,
            bgColor,
            padding,
            marginTop
        }=this.props
        if(ps == 'left'){
            return(
                <View style={{flexDirection:'row',alignItems:'center',backgroundColor:bgColor,padding,marginTop}}>
                    {this._img()}
                    {this._text()}
                </View>
            )
        }else if(ps == 'right'){
            return (
                <View  style={{flexDirection:'row',alignItems:'center',backgroundColor:bgColor,padding,marginTop}}>
                    {this._text1()}
                    {this._img()}
                </View>
            )
        }else if(ps == 'top'){
            return (
                <View style={{flexDirection:'column',alignItems:'center',backgroundColor:bgColor,padding,marginTop}}>
                    {this._img()}
                    {this._text2()}
                </View>
            )
        }else if(ps == 'bottom'){
            return (
                <View  style={{flexDirection:'column',alignItems:'center',backgroundColor:bgColor,padding,marginTop}}>
                    {this._text3}
                    {this._img()}
                </View>
            )
        };
    }

}

var styles = StyleSheet.create({
    container: {}
});