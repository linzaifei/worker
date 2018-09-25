import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    DeviceEventEmitter,
} from 'react-native';

import ScrollableTabView,{DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view'
import GWTag from "../../components/tag/GWTag";

export default class GWHome extends Component {
    static navigationOptions=({navigation})=>{
        return{
            headerStyle:{backgroundColor:defaultColor,borderBottomWidth: 0,shadowOpacity: 0,elevation: 0,},
            headerTitle:(
                <GWTag title="国文人力" url="logo" color="#fff" size={15} iconWidth={28} space={5} iconHeight={28} />
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

    render() {
        return (
            <View>
                <ScrollableTabView tabBarUnderlineStyle={{
                    backgroundColor: '#fff',
                    height: 2,
                    marginBottom:10,
                }} locked={false} tabBarActiveTextColor='#fff' tabBarInactiveTextColor='#fff' tabBarBackgroundColor= {defaultColor}
                                   renderTabBar={() => <ScrollableTabBar />}
                >
                    <View tabLabel='全部' navigation={this.props.navigation} />
                    <View tabLabel='今天' navigation={this.props.navigation} />
                    <View tabLabel='最近1月' navigation={this.props.navigation} />
                    <View tabLabel='最近3月' navigation={this.props.navigation} />
                    <View tabLabel='最近半年' navigation={this.props.navigation} />
                </ScrollableTabView>

            </View>
        );
    }

}

var styles = StyleSheet.create({
    container: {}
});