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


    showDatePicker(title,day,success,nowData){
        var self  = this;
        self.setState({
            isAlert:true,
        },()=>{
            Picker.showDatePicker(title,day,function (value,index) {
                value = String(value).replace(/,/g,'-')
                console.log("huanghao2="+value+"mm"+nowData)
                self.setState({
                    isAlert:false
                },()=>{
                    success && success(nowData,value)
                })
                // self.setState({
                //     isAlert:false
                // })

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

    showDataTimerPicker(title,day,success){

        var self  = this;
        self.setState({
            isAlert:true,
            time:true,
            title,
            day,
            success,
        },()=>{
            Picker.showDatePicker(title,day,function (value,index) {
                value = String(value).replace(/,/g,'-')
                console.log("huanghao="+value)
                switch (self.state.index){
                    case 0:
                        console.log('0nowData='+value);
                        self.setState({
                            nowData:value
                        },()=>{
                            self.showDatePicker(title,day,success,value)
                        })
                        break;
                    case 1:
                        if(self.state.nowData){
                            self.setState({
                                isAlert:false
                            },()=>{
                                success && success(self.state.nowData,value)
                            })
                        }else{
                            self.setState({
                                nextData:value,
                                index:0
                            },()=>{
                                self.showDataTimerPicker(title,day,success)
                            })
                        }
                        // console.log('1nowData='+value);
                        // self.setState({
                        //     nextData:value
                        // },()=>{
                        //     self.showDatePicker(title,day,success,value)
                        // })
                        break;
                }


            },function (e) {
                self.setState({
                    isAlert:false,
                    time:false,
                })
            })
        })
    }


    _onClickItem(index){
        var self = this;
        const {
            title,
            day,
            success,
            nowData,
            nextData,
        }=self.state;
        switch (index){
            case 0:
                self.setState({
                    index:0
                },()=>{
                    self.showDataTimerPicker(title,day,success)
                })

                break;
            case 1:
                self.setState({
                    index:1
                },()=>{
                    self.showDataTimerPicker(title,day,success)
                })
                break;
            case 2:
                self.setState({
                    time:false,
                    isAlert:false,
                    index:0
                })
                success(nowData,nextData)
                Picker.hidden()
                break;
            case 100:
                self.setState({
                    time:false,
                    isAlert:false,
                    index:0
                });
                Picker.hidden();
                break;
        }
    }


    _onClose(index){
        switch (index){
            case 0:
                this.setState({
                    nowData:''
                })
                break;
            case 1:
                this.setState({
                    nextData:''
                })
                break;
        }
    }

    _getTimerView(){
        const {
            nowData,
            nextData,
            time,
        }=this.state;
        if(time){
            return (
                <TouchableOpacity style={styles.item} onPress={()=>{
                    this._onClickItem(100)
                }}>
                <View style={{
                    backgroundColor:'#eee',
                    position:ABSOLUTE,
                    flex:1,
                    padding:10,
                    left:0,
                    right:0,
                    bottom:IOS?ScreenUtil.isIPhoneX ? 250:240 :200,
                    flexDirection:ROW,
                    alignItems:CENTER,
                    justifyContent:SPACEAROUND
                }}>
                    <TouchableOpacity style={styles.item} onPress={()=>{
                        this._onClickItem(0)
                    }}>
                        <Text style={styles.text}>{nowData}</Text>
                        <TouchableOpacity onPress = {()=>{
                            this._onClose(0)
                        }}>
                            <Image source={{uri:'ic_close'}} style={{width:20,height:20}} />
                        </TouchableOpacity>
                    </TouchableOpacity>

                    <Text style={{color:'#333'}} > 至 </Text>
                    <TouchableOpacity style={styles.item} onPress={()=>{
                        this._onClickItem(1)
                    }}>
                        <Text style={styles.text}>{nextData}</Text>
                        <TouchableOpacity   onPress = {()=>{
                            this._onClose(1)
                        }}>
                            <Image source={{uri:'ic_close'}} style={{width:20,height:20}} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1}}  onPress={()=>{
                        this._onClickItem(2)
                    }}>
                        <Text style={{color:defaultColor,fontSize:13,padding:3,textAlign:CENTER}}>确认</Text>
                    </TouchableOpacity>
                </View>
                </TouchableOpacity>
            )

        }
    }

    render() {
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.isAlert}
                style={{backgroundColor:'red',flex:1}}
            >
                {this._getTimerView()}

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