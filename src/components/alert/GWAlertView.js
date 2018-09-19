import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Modal
} from 'react-native';

 var instance =null;

export default class GWAlertView extends Component {


    constructor(props) {
        super(props);
        this.state={
            isAlert :false,
            title:'温馨提示',
            content:'',
            options:['确认'],
            onClickItem:null,
        }
    }

    _title(){
        if (this.state.title){
            return <Text style={styles.title}>{this.state.title}</Text>
        }
    }

    show(content,options,clickItem){
        this.setState({
            isAlert:true,
            content:content,
            options:options,
            onClickItem:clickItem,
        })
    }

    _onClickItem(index){
        var self = this;
        self.setState({
            isAlert:false,
        },()=>{
            self.state.onClickItem && self.state.onClickItem(index)
        })
    }

    _items(){
        var items = [];
        this.state.options.map((item,index)=>{
            items.push(
                <View key={index} style={{alignItems:CENTER,justifyContent:CENTER,borderColor:lineColor,borderLeftWidth:index == 0? 0:1,flex:1,}}>
                    <Text  style={styles.item} onPress={()=>{this._onClickItem(index)}}>{item}</Text>
                </View>
            )
        })
        return items;
    }
    render() {
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.isAlert}
            >
                <View style={{alignItems:CENTER,justifyContent:CENTER,flex:1,backgroundColor:'rgba(0,0,0,0.2)'}}>
                    <View style={styles.container}>
                        <View style={styles.bg}>
                            {this._title()}
                            <Text style={[styles.content,{marginTop:this.state.title ? 0:55}]}>{this.state.content}</Text>
                            <View style={styles.itemSuper}>
                                {this._items()}
                            </View>
                        </View>
                    </View>

                </View>
            </Modal>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        width:SCREEN_WIDTH*0.8,
        position:RELATIVE,
        backgroundColor:'#fff',
        borderRadius:10,
    },
    img:{
        width:60,
        height:60,
        position:ABSOLUTE,
        top:IOS?-15:0,
        left:(SCREEN_WIDTH*0.8 - 60)/2,
    },
    bg:{

    },
    title:{
        fontSize:16,
        color:dpColor,
        textAlign:CENTER,
        padding:5,
        marginTop:10,
    },
    content:{
        fontSize:16,
        color:swColor,
        textAlign:CENTER,
        padding:10,
    },
    itemSuper:{
        flexDirection:ROW,
        alignItems:CENTER,
        padding:14,
        borderColor:lineColor,
        borderTopWidth:1,
    },
    item:{
        fontSize:16,
        color:dpColor,
        textAlign:CENTER,
    }
});