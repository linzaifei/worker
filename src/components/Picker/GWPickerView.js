import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    Image,
} from 'react-native';

import ScreenUtil from '../../config/ScreenUtil'
export default class GWPickerView extends Component {

    constructor(props) {
        super(props);
        this.state={
            isAlert :false,
            time:false,
            nowData:'',
            nextData:'',
            index:0,
            title:'',
            day:'',
            success:null,
        }
    }

    componentDidMount(){

    }


    showPicker(title,options,success){
        var self  = this;
        self.setState({
            isAlert:true,
        },()=>{
            Picker.showPicker(options,title,function (value,index) {
                self.setState({
                    isAlert:false
                },()=>{
                    success && success(value,index)
                })
            },()=>{
                self.setState({
                    isAlert:false
                })
            })
        })
    }

    showDatePickerNoHome(title,day,success){
        Picker.showDatePicker(title,day,function (value,index) {
            success && success(value,index)
        },function (e) {
        })
    }


    showDatePicker(title,day,success){
        var self  = this;
        self.setState({
            isAlert:true,
        },()=>{
            Picker.showDatePicker(title,day,function (value,index) {
                self.setState({
                    isAlert:false
                },()=>{
                    success && success(value,index)
                })
            },function (e) {
                self.setState({
                    isAlert:false
                })
            })
        })
    }

    _setData(nowData,nextData){
        this.setState({
            nowData,
            nextData,
        })
    }





    render() {
        return (
            <Modal
                animationType={"none"}
                transparent={true}
                visible={this.state.isAlert}
                style={{flex:1}}
                onRequestClose={() => {
                    self.setState({
                        isAlert:false
                    },()=>{
                        Picker.hide();
                    })
                }}
            >


            </Modal>
        );
    }

}

var styles = StyleSheet.create({
    container: {},
    item:{
        flex:3,
        flexDirection:ROW,
        alignItems:CENTER,
        borderRadius:3,
        borderWidth:1,
        borderColor:'#666',
        justifyContent:SPACEBETWEEN,

    },
    text:{
        flex:1,
        height:30,
        color:'#666',
        textAlign:CENTER,
        lineHeight:30,
    }
});