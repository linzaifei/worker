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
// import ImageViewer from 'react-native-image-zoom-viewer';
// import DropdownAlert from 'react-native-dropdownalert';
// import ActionSheet from 'react-native-actionsheet'
import GWAlertView from "../alert/GWAlertView";
// import ZFHud from "../HUD/ZFHud";





export default class BaseComponent extends Component {

    constructor(props) {
        super(props);
        this.state={
            showImg:false,
            images:[],
        }
    }

    _getAlert(){

    }




    // _ImageBrower(){
    //     return (
    //         <Modal visible={this.state.showImg} transparent={true}>
    //             <ImageViewer imageUrls={this.state.images} onClick={()=>{
    //                 this.setState({
    //                     showImg:false
    //                 })
    //             }}  />
    //         </Modal>
    //     )
    // }

    _alertAction(){
        return (
            <GWAlertView ref={a => this.alertView = a} />
        )
    }

    // _HUD(){
    //     return(
    //         <ZFHud ref={a => this.hud = a} />
    //     )
    // }

    //点击重新刷新
    // _clickNullView(){
    //
    // }
    // //空试图
    // _nullView(){
    //     return (
    //         <TouchableOpacity style={{justifyContent:CENTER,alignItems:CENTER}} onPress={()=>{this._clickNullView()}}>
    //             <Image style={{width:200,height:200}}  source={{uri:'ic_detail_null'}}/>
    //         </TouchableOpacity>
    //     )
    // }
    // _Alert(){
    //     var self = this;
    //     return (
    //         <DropdownAlert  containerStyle={{
    //             backgroundColor:defaultColor,
    //         }}  imageSrc="ic_navi_notif" closeInterval={2000} ref={ref => self.dropdown = ref} onClose={data => {
    //             self.dropdown.close();
    //         }} />
    //     )
    // }

    // _actionSheet(title,options,index,select){
    //     var self = this;
    //     return (
    //         <ActionSheet
    //             ref={o => self.ActionSheet = o}
    //             title= {title}
    //             options={options}
    //             cancelButtonIndex={index}
    //             onPress={(index) =>{
    //                 select(index,self)
    //             }}
    //         />
    //     )
    // }

}

var styles = StyleSheet.create({
    container: {},

});