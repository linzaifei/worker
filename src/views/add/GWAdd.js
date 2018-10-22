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
            headerLeft:(
                <View style={{height: 44,width: 55,justifyContent: 'center',paddingRight:15} }/>
            ),
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
            workId:-1,
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
            workStatusName:'',
            workplaceCode:'',//工作地点Code
            workplaceName:'',//工作地点
            birthplaceCode:-1,//籍贯code
            birthplaceName:'',//籍贯
            jobTypeList:[],//擅长工种
            jobtypeName:'',
            workYear:'',//工作年限
            workExpect:'',//工作意向
            degree:-1,//学历
            degreeStr:'',
        }
    }

    componentWillMount() {
        this.props.navigation.setParams({ submit: this._submit });
    }

    _submit=()=>{
        var self = this;
        const {
            workId,
            name,
            sexStr,
            sex,
            telephone,
            idcard,//身份证
            birthday,//出生日期
            expectSalary,//期望薪资code
            expectSalaryName,//期望薪资
            workStatus,//工作状态 0 找工作 1 已工作
            workplaceCode,//工作地点Code
            birthplaceCode,//籍贯code
            birthplaceName,//籍贯
            jobTypeList,//擅长工种
            jobtypeName,
            workYear,//工作年限
            workExpect,//工作意向
            degree,//
            degreeStr,
        }=self.state;
        // var s='{"name":"哈哈哈","sex":0,"telephone":"15051857509","idcard":"123456789123456789","birthday":"2018-9-1","birthplaceCode":2,"workYear":"3","workplaceCode":4,"expectSalary":3,"workStatus":1,"workExpect":"工作一直","jobTypeList":[{"id":1,"name":"互联网","level":1,"parentId":0,"createTime":"2018-08-30 11:46:19","createUser":null,"updateTime":null,"updateUser":null,"selected":1,"children":null},{"id":2,"name":"java开发","level":2,"parentId":1,"createTime":"2018-08-30 11:46:47","createUser":null,"updateTime":null,"updateUser":null,"selected":1,"children":null},{"id":3,"name":"C语言开发","level":2,"parentId":1,"createTime":"2018-08-30 11:47:11","createUser":null,"updateTime":null,"updateUser":null,"selected":1,"children":null}]}';
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

        // if(!birthday){
        //     self._showWarnAler('请选择出生日期');
        //     return;
        // }
        // if(!birthplaceName || birthplaceCode==-1){
        //     self._showWarnAler('请选择籍贯');
        //     return;
        // }
        // if(!workYear){
        //     self._showWarnAler('请输入工作年限');
        //     return;
        // }
        // if(!workExpect){
        //     self._showWarnAler('请输入工作意向');
        //     return;
        // }
        // if(!expectSalaryName || expectSalary==-1){
        //     self._showWarnAler('请选择工资要求');
        //     return;
        // }
        // if(!jobtypeName || jobTypeList.length==0){
        //     self._showWarnAler('请选择工种');
        //     return;
        // }
        var work=new Object();
        work.name=name;
        work.sex=sex;
        work.telephone=telephone;
        work.idcard=idcard;
        work.birthday=birthday;
        work.birthplaceCode=birthplaceCode;
        if(!workYear){
            work.workYear=0;
        }else{
            work.workYear=workYear;
        }
        work.workplaceCode=workplaceCode;
        work.expectSalary=expectSalary;
        work.workStatus=workStatus;
        work.workExpect=workExpect;
        work.jobtypeName=jobtypeName;
        work.degree=degree;

        var joList=[];
        for(let i=0;i<jobTypeList.length;i++){
            let jobtype = new Object();
            jobtype.firstId= workId>0 ?jobTypeList[i].firstId :jobTypeList[i].parentId;
            jobtype.secondId=workId>0 ?jobTypeList[i].secondId:jobTypeList[i].id;
            if(workId>0){
                jobtype.workerId=workId;
            }
            joList.push(jobtype);
        }
        work.jobTypeList=joList;
        if(workId>0){
            work.id=workId;
            self._postEditData(work);
        }else{
            self._postAddData(work)
        }
    }

    _postEditData(worker){
        console.log("_postEditData==="+JSON.stringify(worker));
        var self = this;
        gwrequest.gw_tokenRequest(urls.updateWorker,worker,function (ret) {
            console.log("success"+JSON.stringify(ret))

            self.props.navigation.state.params.callback()
            self.props.navigation.goBack();

        },function (e) {
            console.log(e)
            if(e.msg){
                self._showWarnAler(e.msg);
            }
        },'POST')
    }

    _postAddData(worker){
        console.log("add======"+JSON.stringify(worker));
        var self = this;
        gwrequest.gw_tokenRequest(urls.addWorker,worker,function (ret) {
            console.log("success============"+JSON.stringify(ret))
            self._showWarnAler('新增成功');
            self._clearInput();
        },function (e) {
            console.log(e)
            if(e.msg){
                self._showWarnAler(e.msg);
            }
        },'POST')
    }

    _clearInput(){
        var self=this;
        self.setState({
            item:{},
            workId:-1,
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
            workStatusName:'',
            workplaceCode:'',//工作地点Code
            workplaceName:'',//工作地点
            birthplaceCode:-1,//籍贯code
            birthplaceName:'',//籍贯
            jobTypeList:[],//擅长工种
            jobtypeName:'',
            workYear:'',//工作年限
            workExpect:'',//工作意向
            degree:-1,
        })
        self.props.navigate('HomeS')
    }
    _showWarnAler(title){
        let self=this;
        self.dropdown.alertWithType('info',title,'');
    }




    _loadChooiceData(type,success){
        var self = this;
        gwrequest.gw_tokenRequest(urls.queryDicByType,{"type":type},function (ret) {
            console.log("success"+JSON.stringify(ret))
            success(ret)
        },function (e) {
            console.log(JSON.stringify(e))
        })
    }

    _onClickItem(index){
        var  self = this;
        const {
            selectSalaryIndex,
            workId,
        }=self.state;

        switch (index){
            case 0://性别
                self._loadChooiceData('gender',function (ret) {
                    var options = [];
                    for(let i=0;i<ret.length;i++){
                        options.push(ret[i].name);
                    }
                    options.push('取消');
                    self.actionSheet.show('性别选择',options,ret.length,function (index) {
                        if(index != ret.length){
                            self.setState({
                                sex:ret[index].code,
                                sexStr:options[index]+'性',
                            })
                        }
                    })
                });
                break;
            case 1://出生日期
                self.pickerView.showDatePicker('学历选择',true,function (value,index) {
                    value = String(value).replace(/,/g,'-')
                    self.setState({
                        birthday:value,
                    })
                })

                break;
            case 2://籍贯
                self.props.navigation.navigate('SelectHomePlace',{
                    title:'籍贯',
                    callback: ((info,index,code) => { //回调函数
                        this.setState({
                            birthplaceName: info,
                            birthplaceCode:code,
                        })
                    })})
                break;
            case 3://擅长工种
                self.props.navigation.navigate('SelectWorkHH',{
                    title:'擅长工种',
                    workId:workId>0?workId:0,
                    callback: ((selectItem,jobtypeName) => { //回调函数
                        // alert(JSON.stringify(selectItem))
                        this.setState({
                            jobTypeList: selectItem,
                            jobtypeName:jobtypeName,
                        })
                    })
                })
                break;
            case 4://工作地点
                self.props.navigation.navigate('SelectHomePlace',{
                    title:'工作地点',
                    callback: ((info,index,code) => { //回调函数
                        // alert(code);
                        this.setState({
                            workplaceName: info,
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

                self._loadChooiceData('work_status',function (ret) {
                    var options = [];
                    for(let i=0;i<ret.length;i++){
                        options.push(ret[i].name);
                    }
                    options.push('取消');

                    self.actionSheet.show('工作状态选择',options,ret.length,function (index) {
                        if(index !=  ret.length){
                            self.setState({
                                workStatusName:options[index],
                                workStatus:ret[index].code,
                            })
                        }
                    })
                });
                break;
            case 7:
                self._loadChooiceData('degree',function (ret) {
                    var options = [];

                    for(let i=0;i<ret.length;i++){
                        options.push(ret[i].name);
                    }

                    self.pickerView.showPicker('学历选择',options,function (value,index) {
                        self.setState({
                            degreeStr:options[index],
                            degree:ret[index].code,
                        })
                    })
                });
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
            workStatusName,
            workplaceName,//工作地点
            birthplaceName,//籍贯
            jobtypeName,
            workYear,//工作年限
            workExpect,//工作意向
            degreeStr,
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
                    value={birthplaceName}
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
                    <GWTag url='ic_center_yx' title="工作意向" iconWidth={20} space={5}size={15}iconHeight={20} />
                    <InputView placeholder="请填写你的工作意向(100字以内)" value={workExpect} max={100} height={100} onChange={(text)=>{
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
                    value={jobtypeName}
                    onClickItem={()=>{
                        self._onClickItem(3)
                    }}
                />
                <GWSelectItem
                    title="工作地点"
                    url="ic_center_address"
                    borderRadius={5}
                    editable={false}
                    value={workplaceName}
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
                    value={workStatusName}
                    editable={false}
                    mTop={10}
                    onClickItem={()=>{
                        self._onClickItem(6);
                    }}
                />
                <GWSelectItem
                    title="学历"
                    url="ic_center_state"
                    borderRadius={5}
                    value={degreeStr}
                    editable={false}
                    // mTop={10}
                    onClickItem={()=>{
                        self._onClickItem(7);
                    }}
                />
                <View style={{width:10,height:100}}/>

                {self._alertAction()}
                {self._actionSheet()}
                {self._GWPickerView()}

            </ScrollView>
                {this._Alert()}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        backgroundColor:'#fafafa',
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