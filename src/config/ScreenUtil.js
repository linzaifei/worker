import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    DeviceInfo,
    Dimensions,
    NativeModules,
    Platform,
} from 'react-native';



const X_WIDTH = 375;
const X_HEIGHT = 812;
const PAD_WIDTH = 768;
const PAD_HEIGHT = 1024;

const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');

const { PlatformConstants = {} } = NativeModules;
const { minor = 0 } = PlatformConstants.reactNativeVersion || {};

const isIPhoneX = (() => {
    if (Platform.OS === 'web') return false;

    if (minor >= 50) {
        return DeviceInfo.isIPhoneX_deprecated;
    }

    return (
        Platform.OS === 'ios' &&
        ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
            (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))
    );
})();

export default {
    isIPhoneX,
}
