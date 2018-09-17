
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    Image,
    StatusBar,
    AsyncStorage,
} from 'react-native';


import {createBottomTabNavigator,createStackNavigator,createSwitchNavigator,StackViewCard} from 'react-navigation'



//登录
import LogonScreen from './views/logon/GWLogon'


//首页
import HomeScreen from './views/home/GWHome'


//添加
import AddScreen from './views/add/GWAdd'

//个人中心
import CenterScreen from './views/center/GWCenter'


const HomeStack=createStackNavigator({
    HomeS:HomeScreen,
})
const MediateStack=createStackNavigator({
    TrainS:AddScreen,
})
const MineStack=createStackNavigator({
    MineS:CenterScreen,
})
const IndexStack= createBottomTabNavigator({
        Home:{
            screen:HomeStack,
            navigationOptions:()=> TabOptions("首页",'ic_tab_home','ic_tab_home_sel'),
        },
        Mediate:{
            screen:MediateStack,
            navigationOptions:()=> TabOptions("调解",'ic_tab_add','ic_tab_add_sel'),
        },
        Mine:{
            screen:MineStack,
            navigationOptions:()=> TabOptions("我的",'ic_tab_center','ic_tab_center_sel'),
        },
    },{
        tabBarOptions:{
            activeTintColor:defaultColor,
            inactiveTintColor:smColor,
            labelStyle: {
                fontSize: 10,
                marginBottom: 2,
            },
            showIcon:true,
            indicatorStyle :{
                height:0, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了,
            }
        },
        style:{
            backgroundColor:'white'
        },
        tabBarPosition:'bottom',
        swipeEnabled:false,
        animationEnabled:false,
        backBehavior:'none',
        headerMode: 'none',
    }
)

IndexStack.navigationOptions = {
    header: null,
};

const TabOptions = (tabBarTitle,normalImage,selectedImage) => {
    const tabBarLabel = tabBarTitle;
    const tabBarIcon = (({tintColor,focused})=> {
        return(
            <Image
                source = {{uri:!focused ? normalImage : selectedImage}}
                style={[styles.iconStyle, {tintColor: tintColor}]}
            />
        )
    });
    return {tabBarLabel,tabBarIcon};
};

const LogonStack=createStackNavigator({
    Logon:{
        screen:LogonScreen,
    },
},{
    transitionConfig:()=>({
        // screenInterpolator:CardStackStyleInterpolator.forHorizontal,
    })
})

const RootStack =createStackNavigator({
    IndexStack: {screen: IndexStack,}
})

class AuthLoadingScreen extends Component {
    constructor() {
        super();
        this._bootstrapAsync();
    }
    async _bootstrapAsync(){
        const userToken = await AsyncStorage.getItem('token');
        this.props.navigation.navigate(userToken ? 'Mian' : 'Auth');
    };
    render() {
        return (
            <View >
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

const SwithStack=createSwitchNavigator({
    AuthLoading:AuthLoadingScreen,
    Auth:LogonStack,
    Mian:RootStack,
},{
    initialRouteName:'AuthLoading'
})

export default class Index extends Component{
    render(){
        return <SwithStack />
    }
}

const styles = StyleSheet.create({
    iconStyle:{
        width: Platform.OS === 'ios' ? 25 : 28,
        height:Platform.OS === 'ios' ? 25 : 28,
    },
})