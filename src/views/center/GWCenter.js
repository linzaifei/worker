import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';
import GWSelectItem from "../../components/selectItem/GWSelectItem";


export default class GWCenter extends Component {
    static navigationOptions =({navigation})=>{
        return{
            headerStyle:{backgroundColor:defaultColor,borderBottomWidth: 0,shadowOpacity: 0,elevation: 0,},
            headerTitle:(
                <Text style={{fontSize:16,color:'#fff'}}>个人中心</Text>
            )
        }
    }


    constructor(props) {
        super(props);
        this.state={
            name:'张三',
            telephone:'12345678912',
        }
    }


    render() {
        var self = this;
        const {
            name,
            telephone,
        } = self.state;
        return (
            <ScrollView style={styles.container}>
                <GWSelectItem
                    title="姓名"
                    borderRadius={5}
                    ontextchange={(text)=>{

                    }}
                >
                    <Text style={styles.content}>{name}</Text>
                </GWSelectItem>
                <GWSelectItem
                    title="手机号码"
                    borderRadius={5}
                    ontextchange={(text)=>{

                    }}
                >
                    <Text style={styles.content}>{telephone}</Text>
                </GWSelectItem>
                <GWSelectItem
                    title="修改密码"
                    borderRadius={5}
                    onclickitem={()=>{
                        alert()
                        self.props.navigation.navigate('ForgetPwd')
                    }}
                />
                <GWSelectItem
                    title="退出登录"
                    hasBack={false}
                    borderRadius={5}
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
    content:{
        fontSize:15,
        color:swColor,
        textAlign:'right',
        flex:1,
        // backgroundColor:'red'
    }

});