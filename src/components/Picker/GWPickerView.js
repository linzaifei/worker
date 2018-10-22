import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
} from 'react-native';

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

        var date = new Date();
        var year = date.getFullYear();
        var month = date.getUTCMonth();
        var day = date.getDay();
        this.setState({
            nowData:year+'-'+month+'-'+day,
            nextData:year+'-'+month+'-'+day,
        })
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
                switch (self.state.index){
                    case 0:
                        self.setState({
                            nowData:value
                        })
                        self.showDatePicker(title,day,success)
                        break;
                    case 1:
                        self.setState({
                            nextData:value
                        })
                        self.showDatePicker(title,day,success)
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
            nowData,nextData,
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
                // alert('ds')
                self.setState({
                    time:false,
                    isAlert:false,
                    index:2
                })
                success(nowData,nextData)
                Picker.hidden()
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
                <View style={{
                    backgroundColor:'#eee',
                    position:ABSOLUTE,
                    flex:1,
                    padding:10,
                    left:0,
                    right:0,
                    bottom:250,
                    flexDirection:ROW,
                    alignItems:CENTER,
                    justifyContent:SPACEAROUND
                }}>
                    <TouchableOpacity style={{flex:3}} onPress={()=>{
                        this._onClickItem(0)
                    }}>
                        <Text style={{borderRadius:3,borderWidth:1,borderColor:'#666',padding:6,color:'#666',textAlign:CENTER}}>{nowData}</Text>
                    </TouchableOpacity>

                    <Text style={{color:'#333'}} > 至 </Text>
                    <TouchableOpacity style={{flex:3}} onPress={()=>{
                        this._onClickItem(1)
                    }}>
                        <Text style={{borderRadius:3,borderWidth:1,borderColor:'#666',padding:6,color:'#666',textAlign:CENTER}}>{nextData}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1}}  onPress={()=>{
                        this._onClickItem(2)
                    }}>
                        <Text style={{color:defaultColor,fontSize:13,padding:3,textAlign:CENTER}}>确认</Text>
                    </TouchableOpacity>

                </View>
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
    container: {}
});