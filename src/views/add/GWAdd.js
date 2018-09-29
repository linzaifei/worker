import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView, TouchableOpacity,
} from 'react-native';
import GWSelectItem from "../../components/selectItem/GWSelectItem";
import GWTag from "../../components/tag/GWTag";
import InputView from "../../components/inputView/InputView";
import BaseComponent from "../../components/base/BaseComponent";


export default class GWAdd extends BaseComponent {
    static navigationOptions=({navigation})=>{
        const params = navigation.state.params || {};
        return{
            headerStyle:{backgroundColor:defaultColor,borderBottomWidth: 0,shadowOpacity: 0,elevation: 0,},
            headerTitle:(
                <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
                    <Text style={{fontSize:16,color:'#fff'}}>{navigation.getParam('title','添加')}</Text>
                </View>
            ),
            headerRight:(
                <TouchableOpacity onPress={params.submit}>
                    <Text style={{fontSize:15,color:'#fff',marginRight:15}}>完成</Text>
                </TouchableOpacity>
            )
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            item:{},
            name:'',
            sexStr:'',
            sex:-1,
            telephone:"",
            idcard:'',//身份证
            birthday:'',//出生日期
            expectSalary:-1,//期望薪资code
            selectSalaryIndex:-1,//工资选择index
            expectSalaryName:'',//期望薪资
            workStatus:'',//工作状态 0 找工作 1 已工作
            workStatusStr:'',
            workplaceCode:'',//工作地点Code
            workplaceCodeStr:'',//工作地点
            birthplaceCode:-1,//籍贯code
            birthplaceCodeStr:'',//籍贯
            workSelect:'',//擅长工种
            workYear:'',//工作年限
            workExpect:'',//工作意志
        }
    }

    componentWillMount() {
        this.props.navigation.setParams({ submit: this._submit });
    }

    _submit=()=>{
        var self = this;
        const {
            name,
            sexStr,
            sex,
            telephone,
            idcard,//身份证
            birthday,//出生日期
            expectSalary,//期望薪资code
            selectSalaryIndex,
            expectSalaryName,//期望薪资
            workStatus,//工作状态 0 找工作 1 已工作
            workStatusStr,
            workplaceCode,//工作地点Code
            workplaceCodeStr,//工作地点
            birthplaceCode,//籍贯code
            birthplaceCodeStr,//籍贯
            workSelect,//擅长工种
            workYear,//工作年限
            workExpect,//工作意志
        }=self.state;
        if(!name){
            self._showWarnAler('请输入姓名');
            return;
        }
        if(!sexStr || sex==-1){
            self._showWarnAler('请选择性别');
            return;
        }
        if(!telephone || telephone.length!=11){
            self._showWarnAler('请输入合法电话号码');
            return;
        }
        if(!idcard){
            self._showWarnAler('请输入身份证号码');
            return;
        }
        if(!birthday){
            self._showWarnAler('请选择出生日期');
            return;
        }
        if(!birthplaceCodeStr || birthplaceCode==-1){
            self._showWarnAler('请选择籍贯');
            return;
        }
        if(!workYear){
            self._showWarnAler('请输入工作年限');
            return;
        }
        if(!workExpect){
            self._showWarnAler('请输入工作意志');
            return;
        }
        if(!expectSalaryName || expectSalary==-1){
            self._showWarnAler('请选择工资要求');
            return;
        }



    }

    _showWarnAler(title){
        let self=this;
        self.dropdown.alertWithType('custom',title,'');
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
                            sex:ret[index].code,
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
                            workStatusStr:options[index],
                            workStatus:ret[index].code,
                        })
                    }
                })
                break;
        }
    }

    _onClickItem(index){
        var  self = this;
        const {
            selectSalaryIndex,
        }=self.state;

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
            case 2://籍贯
                self.props.navigation.navigate('SelectHomePlace',{
                    title:'籍贯',
                    callback: ((info,code) => { //回调函数
                        this.setState({
                            birthplaceCodeStr: info,
                            birthplaceCode:code,
                        })
                    })})
                break;
            case 3://擅长工种
                self.props.navigation.navigate('SelectWorkHH',{
                    title:'擅长工种',
                    callback: ((info) => { //回调函数
                        this.setState({
                            workSelect: info
                        })
                    })
                })
                break;
            case 4://工作地点
                self.props.navigation.navigate('SelectHomePlace',{
                    title:'工作地点',
                    callback: ((info,code) => { //回调函数
                        this.setState({
                            workplaceCodeStr: info,
                            workplaceCode:code,
                        })
                    })})
                break;
            case 5://工资要求
                self.props.navigation.navigate('SelectSalary',{
                    title:'工资要求',
                    index:selectSalaryIndex,
                    callback: ((info,index,code) => { //回调函数
                        this.setState({
                            expectSalaryName: info,
                            selectSalaryIndex:index,
                            expectSalary:code
                        })
                    })})
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
            telephone,
            idcard,//身份证
            birthday,//出生日期
            expectSalaryName,//期望薪资
            workStatusStr,
            workplaceCodeStr,//工作地点
            birthplaceCodeStr,//籍贯
            workSelect,//擅长工种
            workYear,//工作年限
            workExpect,//工作意志
        }=self.state;
        return (
            <View>
            <ScrollView style={styles.container}
                        keyboardDismissMode="on-drag"
                        showsVerticalScrollIndicator={false}
            >
                <GWSelectItem
                    placeholder="请输入姓名"
                    title="姓名"
                    url="ic_center_name"
                    hasBack={false}
                    value={name}
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
                    value={telephone}
                    keyboard='phone-pad'
                    max={11}
                    borderRadius={5}
                    onTextChange={(text)=>{
                        self.setState({
                            telephone:text
                        })
                    }}
                />
                <GWSelectItem
                    placeholder="请输入身份证号"
                    title="身份证号"
                    url="ic_center_idcard"
                    hasBack={false}
                    hasText={true}
                    value={idcard}
                    max={18}
                    borderRadius={5}
                    onTextChange={(text)=>{
                        self.setState({
                            idcard:text
                        })
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
                    value={birthplaceCodeStr}
                    onClickItem={()=>{
                        self._onClickItem(2)
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
                    value={workYear}
                    borderRadius={5}
                    onTextChange={(text)=>{
                        self.setState({
                            workYear:text
                        })
                    }}
                />
                <View style={styles.center}>
                    <GWTag url='ic_center_yx' title="工作意志" iconWidth={20} space={5}size={15}iconHeight={20} />
                    <InputView placeholder="请填写你的工作意志(500字以内)" value={workExpect} max={500} height={100} onChange={(text)=>{
                        self.setState({
                            workExpect:text
                        })
                    }}/>
                </View>
                <GWSelectItem
                    title="擅长工种"
                    url="ic_center_sc"
                    borderRadius={5}
                    editable={false}
                    value={workSelect}
                    onClickItem={()=>{
                        self._onClickItem(3)
                    }}
                />
                <GWSelectItem
                    title="工作地点"
                    url="ic_center_address"
                    borderRadius={5}
                    editable={false}
                    value={workplaceCodeStr}
                    onClickItem={()=>{
                        self._onClickItem(4);
                    }}
                />
                <GWSelectItem
                    title="工资要求"
                    url="ic_center_gz"
                    borderRadius={5}
                    editable={false}
                    value={expectSalaryName}
                    onClickItem={()=>{
                        self._onClickItem(5)
                    }}
                />
                <GWSelectItem
                    title="工作状态"
                    url="ic_center_state"
                    borderRadius={5}
                    value={workStatusStr}
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
                {this._Alert()}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        paddingLeft:5,
        paddingRight:5,
        paddingTop:5,
        // padding:5,
    },
    center:{
        padding:10,
        backgroundColor:'#fff',
        borderRadius:5,
        marginTop:5,
    }
});