import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import GWSelectItem from "../../components/selectItem/GWSelectItem";


export default class GWForgetPwd extends Component {

    static navigationOptions =({navigation})=>{
        const params = navigation.state.params || {};
        return{
            headerTitle:(
                <Text style={{fontSize:16,color:'#fff'}}>修改密码</Text>
            ),
            headerRight:(
                <TouchableOpacity onPress={params.submit}>
                    <Text style={{fontSize:15,color:'#fff',marginRight:15}}>完成</Text>
                </TouchableOpacity>
            )
        }
    }
    componentWillMount() {
        this.props.navigation.setParams({ submit: this._submit });
    }

    _submit=()=>{

    }

    constructor(props) {
        super(props);
        this.state={

        }

    }

    render() {
        return (
            <View style={styles.container}>
                <GWSelectItem
                    title="旧的密码"
                    placeholder="请输入旧密码"
                    hasBack={false}
                    hasText={true}
                    borderRadius={5}
                    ontextchange={(text)=>{

                    }}
                     />
                <GWSelectItem
                    title="新的密码"
                    placeholder="请输入密码"
                    hasBack={false}
                    hasText={true}
                    borderRadius={5}
                    ontextchange={(text)=>{

                    }}
                />
                <GWSelectItem
                    title="确认密码"
                    placeholder="请输入密吗"
                    hasBack={false}
                    hasText={true}
                    borderRadius={5}
                    ontextchange={(text)=>{

                    }}
                />
            </View>
        );
    }

}

var styles = StyleSheet.create({
    container: {
        padding:5,
    }
});