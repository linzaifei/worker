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

import GWAlertView from "../alert/GWAlertView";
import DropdownAlert from 'react-native-dropdownalert';
import GWActionSheet from "../ActionSheet/GWActionSheet";
import  GWPickerView from '../Picker/GWPickerView'

export default class BaseComponent extends Component {

    constructor(props) {
        super(props);
        this.state={
            showImg:false,
            images:[],
        }
    }

    _GWPickerView(){
        return (
            <GWPickerView ref={a=>this.pickerView=a} />
        )
    }

    _alertAction(){
        return (
            <GWAlertView ref={a => this.alertView = a} />
        )
    }
    点击重新刷新
    _clickNullView(){

    }
    //空试图
    _nullView(){
        return (
            <TouchableOpacity style={{justifyContent:CENTER,alignItems:CENTER}} onPress={()=>{this._clickNullView()}}>
                <Image style={{width:200,height:200}}  source={{uri:'ic_detail_null'}}/>
            </TouchableOpacity>
        )
    }

    _Alert(){
        var self = this;
        return (
            <DropdownAlert closeInterval={2000} ref={ref => self.dropdown = ref} onClose={data => {
                self.dropdown.close();
            }} />
        )
    }

    _actionSheet(){
        var self = this;
        return (
            <GWActionSheet ref={o => self.actionSheet = o} />
        )
    }

}

var styles = StyleSheet.create({
    container: {},

});