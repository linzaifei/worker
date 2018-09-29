import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    DeviceEventEmitter,
} from 'react-native';

import ScrollableTabView ,{ScrollableTabBar}from 'react-native-scrollable-tab-view'
import GWTag from "../../components/tag/GWTag";
import  GWHomeList from './GWHomeList'
export default class GWHome extends Component {

    static navigationOptions=({navigation})=>{
        return{
            headerStyle:{backgroundColor:defaultColor,borderBottomWidth: 0,shadowOpacity: 0,elevation: 0,},
            headerTitle:(
                <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
                    <GWTag title="国文人力" url="logo" color="#fff" size={15} iconWidth={28} space={5} iconHeight={28} />
                </View>
            )
        }
    }

    constructor(props) {
        super(props);
        this._addLiner()

    }
    componentWillUnmount(){
        this.subscription.remove();
    };
    _addLiner(){
        var  self = this;
        this.subscription = DeviceEventEmitter.addListener('outLogon',function (e) {
            self.props.navigation.navigate('Auth');
        })
    }

    _titles(){
        var titles = ['全部','今天','最近1周','最近1月','最近3月','最近半年']
        var chilens = [];
        titles.map((item,index)=>{
            chilens.push(
                <View key={index} tabLabel={item}style={{padding:5}} >
                    <GWHomeList page={index} navigation={this.props.navigation} />
                </View>
            )
        })
        return chilens
    }

    render() {
        return (
            <ScrollableTabView tabBarUnderlineStyle={{
                backgroundColor: '#fff',
                height: 2,
                marginBottom:4,
            }} locked={false}  tabBarActiveTextColor='#fff' tabBarInactiveTextColor='#fff' tabBarBackgroundColor= {defaultColor}
                               renderTabBar={() => <ScrollableTabBar />}
            >
                {this._titles()}
            </ScrollableTabView>
        );
    }

}

var styles = StyleSheet.create({
    container: {}
});