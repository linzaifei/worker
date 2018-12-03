import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    FlatList,
    ScrollView, TouchableOpacity,
} from 'react-native';
import BaseComponent from "../../components/base/BaseComponent";
import SingleCheckBox from "./SingleCheckBox";


export default class HomePlaceSelect extends BaseComponent{
    static navigationOptions =({navigation})=>{
        const params = navigation.state.params || {};
        return{
            headerTitle:(
                <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
                    <Text style={{fontSize:16,color:'#fff'}}>{params.title}</Text>
                </View>
            ),
            headerRight:(
                (parseInt(params.index) == parseInt(params.stopIndex)) ?
                    <TouchableOpacity onPress={params.submit}>
                        <Text style={{fontSize:15,color:'#fff',marginRight:15}}>完成</Text>
                    </TouchableOpacity>:
                    <View style={{height: 44,width: 55,justifyContent: 'center',paddingRight:15} }/>
            )
        }
    }
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            selectObject:'',
            data:[],
            lastSelectIndex:-1,
            selectCode:'',
            selectName:'',
            code:'',
            index:0,//push多少层界面 内部控制
            callName:'Mediate',//返回界面
            stopIndex:3,//需要停止的index
        };
    }
    componentWillMount() {
        this.props.navigation.setParams({ submit: this._submit });
    }

    componentDidMount(){
        this.setState({
            code:this.props.navigation.getParam('code',''),
            index:this.props.navigation.getParam('index',0),
            callName:this.props.navigation.getParam('callName','Mediate'),
            stopIndex:this.props.navigation.getParam('stopIndex',1),
        },()=>{
            console.log('=============='+this.state.callName)
            this._loadData();
        })
    }

    _submit=()=>{
        var self = this;
        const {
            selectCode,
            selectName,
            callName,
        }=self.state

        if (!selectName || selectCode == -1){
            self.dropdown.alertWithType('info','请选择市','');
            return;
        }
        if (self.props.navigation.state.params.callback) {
            self.props.navigation.state.params.callback(selectName,selectCode)
        }
        console.log('=============='+self.state.callName)
        this.props.navigation.navigate(String(callName));
    }

    _loadData(){
        var self = this;
        const {
            code,
        }=self.state;
        var parmas={
            parentCode:code,
        }
        console.log('======'+JSON.stringify(parmas))
        var url = !code ?urls.queryAllProvince:urls.queryAreaByParentCode;
        gwrequest.gw_tokenRequest(url,parmas,function (ret) {
            // console.log('===='+JSON.stringify(ret))
            for(var i=0;i<ret.length;i++){
                ret[i].isselect=-1;
            }
            self.setState({
                data:ret,
            })
        },function (e) {
            console.log(JSON.stringify(e))
        })
    }


    _renderItemView(item,row){
        let self=this;
        const {
            lastSelectIndex,
            data,
            index,
            stopIndex,
        }=self.state;
        return(
            <SingleCheckBox
                marginTop={5} text={item.name} index={row} isSelect={item.isselect} onClickItem={(i)=>{

                if(index<stopIndex){
                    self._toCity(item.code);
                }
                if(lastSelectIndex!=-1){
                    data[lastSelectIndex].isselect=-1;
                }
                data[i].isselect=1;

                self.setState({
                    lastSelectIndex:i,
                    data,
                    selectCode:item.code,
                    selectName:item.name,
                })
            }}
            />
        )
    }
    _toCity(code){
        let self=this
        const {
            index,
            stopIndex,
            callName,
        }=self.state;

        self.props.navigation.push('SelectHomePlace',{
            code,
            title:self.props.navigation.getParam('title',''),
            index:index+1,
            callback:self.props.navigation.state.params.callback,
            stopIndex:stopIndex,
            callName,
        })
    }

    _keyExtractor = (item, index) => String(index);
    render(){
        let self=this;
        return(
            <View style={styles.container}>
                <FlatList
                    keyExtractor={this._keyExtractor}
                    data={self.state.data}
                    extraData={self.state}
                    renderItem={({item,index}) =>self._renderItemView(item,index)}
                />
            </View>
        );
    }

}

var styles = StyleSheet.create({
    container: {
        padding:5,
        flex: 1,
        backgroundColor:'#fafafa'
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        backgroundColor: '#fff'
    },
    center:{
        padding:10,
        backgroundColor:'#fff',
        borderRadius:5,
        marginTop:5,
    }
});