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

export default class BaseComponent extends Component {

    constructor(props) {
        super(props);
        this.state={
            showImg:false,
            images:[],
        }
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
<<<<<<< HEAD
    _Alert(backgroundColor=defaultColor,){
=======
    _Alert(backgroundColor=defaultColor){
>>>>>>> 0e20402ac60af03bc52dbbf9bfe348c7c554c05e
        var self = this;
        return (
            <DropdownAlert  containerStyle={{
                backgroundColor,
<<<<<<< HEAD
            }}  imageSrc="ic_navi_notif" successColor="red" closeInterval={2000} ref={ref => self.dropdown = ref} onClose={data => {
=======
            }}  imageSrc="ic_navi_notif" closeInterval={2000} ref={ref => self.dropdown = ref} onClose={data => {
>>>>>>> 0e20402ac60af03bc52dbbf9bfe348c7c554c05e
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