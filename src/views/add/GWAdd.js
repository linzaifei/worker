import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';
import GWSelectItem from "../../components/selectItem/GWSelectItem";
import GWTag from "../../components/tag/GWTag";
import InputView from "../../components/inputView/InputView";
import BaseComponent from "../../components/base/BaseComponent";


export default class GWAdd extends BaseComponent {
    static navigationOptions=({navigation})=>{
        return{
            headerStyle:{backgroundColor:defaultColor,borderBottomWidth: 0,shadowOpacity: 0,elevation: 0,},
            headerTitle:(
                <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
                <Text style={{fontSize:16,color:'#fff'}}>添加</Text>
                </View>
            )
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            name:'',
            sexStr:'',
            sexCode:-1,
            idCard:'',
            birthday:'',
            salary:'',
            selectSalaryIndex:0,
            workState:'',
            workStatusCode:-1,
            homePlace:'',
            workSelect:'',

        }
    }

    _loadChooiceData(selectIndex,type){
        var self = this;
        gwrequest.gw_tokenRequest(urls.queryDicByType,{"type":type},function (ret) {
            console.log("success"+JSON.stringify(ret))
            self._showOptions(selectIndex,ret);
        },function (e) {
            console.log(JSON.stringify(e))
        })
    }

    _showOptions(selectIndex,ret){
        var  self = this;
        switch (selectIndex){
            case 0:
                var options = [];
                for(let i=0;i<ret.length;i++){
                    options.push(ret[i].name);
                }
                options.push('取消');
                self.actionSheet.show('性别选择',options,ret.length,function (index) {
                    if(index != ret.length){
                        self.setState({
                            // sex:options[index] == '男' ?'00003-1':'00003-2',
                            sexCode:ret[index].code,
                            sexStr:options[index]+'性',
                        })
                    }
                })
                break;
            case 6:
                var options = [];
                for(let i=0;i<ret.length;i++){
                    options.push(ret[i].name);
                }
                options.push('取消');
                self.actionSheet.show('工作状态选择',options,ret.length,function (index) {
                    if(index != 2){
                        self.setState({
                            // sex:options[index] == '男' ?'00003-1':'00003-2',
                            workState:options[index],
                            workStatusCode:ret[index].code,
                        })
                    }
                })
                break;
        }
    }

    _onClickItem(index){
        var  self = this;
        switch (index){
            case 0://性别
                self._loadChooiceData(index,'gender');
                break;
            case 1://出生日期
                Picker.showDatePicker('出生日期',true,function (value,index) {
                    value = String(value).replace(/,/g,'-')
                    self.setState({
                        birthday:value,
                    })
                })

                break;
            case 2:

                break;
            case 3:

                break;
            case 4:

                break;
            case 5:

                break;
            case 6:
                self._loadChooiceData(index,'work_status');
                break;
        }
    }


    render() {
        var self = this;
        const {
            name,
            sexStr,
            idCard,
            birthday,
            salary,
            workState,
            homePlace,
            workSelect,
            selectSalaryIndex,
        }=self.state;
        return (
            <ScrollView style={styles.container}
                        keyboardDismissMode="on-drag"
                        showsVerticalScrollIndicator={false}
            >
                <GWSelectItem
                    placeholder="请输入姓名"
                    title="姓名"
                    url="ic_center_name"
                    hasBack={false}
                    max={10}
                    borderRadius={5}
                    onTextChange={(text)=>{
                        self.setState({
                            name:text
                        })
                    }}
                />
                <GWSelectItem
                    title="性别"
                    url="ic_center_sex"
                    value={sexStr}
                    editable={false}
                    borderRadius={5}
                    onClickItem={()=>{
                        self._onClickItem(0);
                    }}
                />
                <GWSelectItem
                    placeholder="请输入手机号码"
                    title="手机号码"
                    hasBack={false}
                    hasText={true}
                    url="ic_center_tel"
                    keyboard='phone-pad'
                    max={11}
                    borderRadius={5}
                    onTextChange={(text)=>{

                    }}
                />
                <GWSelectItem
                    placeholder="请输入身份证号"
                    title="身份证号"
                    url="ic_center_idcard"
                    hasBack={false}
                    hasText={true}
                    max={18}
                    borderRadius={5}
                    onTextChange={(text)=>{

                    }}
                />
                <GWSelectItem
                    title="出生日期"
                    url="ic_center_csrq"
                    borderRadius={5}
                    editable={false}
                    value={birthday}
                    onClickItem={()=>{
                        self._onClickItem(1);
                    }}
                />
                <GWSelectItem
                    title="籍贯"
                    url="ic_center_jg"
                    borderRadius={5}
                    editable={false}
                    value={homePlace}
                    onClickItem={()=>{
                        self.props.navigation.navigate('SelectHomePlace',{
                            title:'籍贯',
                            callback: ((info) => { //回调函数
                                this.setState({
                                    homePlace: info
                                })
                            })})
                    }}
                />

                <GWSelectItem
                    placeholder="请输入工作年限"
                    title="工作年限"
                    url="ic_center_year"
                    keyboard='phone-pad'
                    hasBack={false}
                    hasText={true}
                    max={2}
                    mTop={10}
                    borderRadius={5}
                    onTextChange={(text)=>{

                    }}
                />

                <View style={styles.center}>
                    <GWTag url='ic_center_yx' title="工作意志" iconWidth={20} space={5}size={15}iconHeight={20} />
                    <InputView placeholder="请填写你的工作意志(500字以内)" max={500} height={100}/>
                </View>

                <GWSelectItem
                    title="擅长工种"
                    url="ic_center_sc"
                    borderRadius={5}
                    editable={false}
                    value={workSelect}
                    onClickItem={()=>{
                        self.props.navigation.navigate('SelectWork',{
                            title:'擅长工种',
                            callback: ((info) => { //回调函数
                                this.setState({
                                    workSelect: info
                                })
                            })})
                    }}
                />
                <GWSelectItem
                    title="工作地点"
                    url="ic_center_address"
                    borderRadius={5}
                    editable={false}
                    onClickItem={()=>{
                        self._onClickItem(4);
                    }}
                />
                <GWSelectItem
                    title="工资要求"
                    url="ic_center_gz"
                    borderRadius={5}
                    editable={false}
                    value={salary}
                    onClickItem={()=>{
                        self.props.navigation.navigate('SelectSalary',{
                            datas:[
                                 '3000～5000',
                                 '5000～8000',
                                 '8000～10000',
                                 '10000～15000',
                                '>15000'
                            ],
                            title:'工资要求',
                            index:selectSalaryIndex,
                            callback: ((info,index) => { //回调函数
                                this.setState({
                                    salary: info,
                                    selectSalaryIndex:index
                                })
                            })})
                    }}
                />
                <GWSelectItem
                    title="工作状态"
                    url="ic_center_state"
                    borderRadius={5}
                    value={workState}
                    editable={false}
                    mTop={10}
                    onClickItem={()=>{
                        self._onClickItem(6);
                    }}
                />
                <View style={{width:10,height:100}}/>

                {self._alertAction()}
                {self._actionSheet()}
            </ScrollView>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        padding:5,
        // paddingTop:5,
        // paddingLeft:5,
        // paddingRight:5,
        // paddingBottom:100,
    },
    center:{
        padding:10,
        backgroundColor:'#fff',
        borderRadius:5,
        marginTop:5,
    }
});