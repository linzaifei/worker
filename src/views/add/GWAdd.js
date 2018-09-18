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


export default class GWAdd extends Component {
    static navigationOptions=({navigation})=>{
        return{
            headerStyle:{backgroundColor:defaultColor,borderBottomWidth: 0,shadowOpacity: 0,elevation: 0,},
            headerTitle:(
                <Text style={{fontSize:16,color:'#fff'}}>添加</Text>
            )
        }
    }

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <ScrollView style={styles.container}>
                <GWSelectItem
                    placeholder="请输入姓名"
                    title="姓名"
                    url="ic_center_name"
                    hasBack={false}
                    hasText={true}
                    max={10}
                    borderRadius={5}
                    onTextChange={(text)=>{

                    }}
                />
                <GWSelectItem
                    title="性别"
                    url="ic_center_sex"
                    borderRadius={5}
                    onclickitem={()=>{

                    }}
                />
                <GWSelectItem
                    placeholder="请输入手机号码"
                    title="姓名"
                    url="ic_center_tel"
                    keyboard='phone-pad'
                    max={11}
                    borderRadius={5}
                    onTextChange={(text)=>{

                    }}
                />
                <GWSelectItem
                    placeholder="请输入省份证号"
                    title="姓名"
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
                    url="ic_center_csri"
                    borderRadius={5}
                    onclickitem={()=>{

                    }}
                />
                <GWSelectItem
                    title="籍贯"
                    url="ic_center_jg"
                    borderRadius={5}
                    onclickitem={()=>{

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
                    onclickitem={()=>{

                    }}
                />
                <GWSelectItem
                    title="工作地点"
                    url="ic_center_address"
                    borderRadius={5}
                    onclickitem={()=>{

                    }}
                />
                <GWSelectItem
                    title="工资要求"
                    url="ic_center_gz"
                    borderRadius={5}
                    onclickitem={()=>{

                    }}
                />
                <GWSelectItem
                    title="工作状态"
                    url="ic_center_state"
                    borderRadius={5}
                    mTop={10}
                    onclickitem={()=>{

                    }}
                />

            </ScrollView>
        );
    }

}

var styles = StyleSheet.create({
    container: {
        padding:5,
    },
    center:{
        padding:10,
        backgroundColor:'#fff',
        borderRadius:5,
        marginTop:5,
    }
});