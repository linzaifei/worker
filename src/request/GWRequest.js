

import React, {Component} from 'react';
import {
    DeviceEventEmitter,
    Alert,
    NativeModules,
} from 'react-native';

// var RNToNative = NativeModules.RNToNative;


function gw_request(url,parmas,success,fail,method='POST') {
    let request;

    // if(method == 'GET'){
        url = getUrlStr(url,parmas)
        // console.log('+++++'+JSON.stringify(url));
    //     request=new Request(url, {
    //         method: 'GET',
    //     })
    // }else {
    //     request=new Request(url, {
    //         method: 'POST',
    //         body:getFormat(parmas)
    //     })
    // }
    // RNToNative.HUD(true)
    fetch(url,{
        method:'GET',
    }).then((response) => response.json())
        .then((responseJson) => {
            if(parseInt(responseJson.code)==1){
                success(responseJson['data']);
            }else if(parseInt(responseJson.code)== 1002){
                fail(responseJson);
                console.log('==================退出了=================')
                // DeviceEventEmitter.emit('outLogon','退出');
                Alert.alert('登录过期','您的账号在其他地方登陆请重新登陆',[
                    {'text':'重新登录',onPress:()=>
                        storage.gw_removeItem('token',function () {
                            DeviceEventEmitter.emit('outLogon','退出');
                        })
                    }
                ])
            }else {
                fail(responseJson);
            }
            // RNToNative.HUD(false)
        })
        .catch((error) => {
            // RNToNative.HUD(false)
            fail(error);
        });
}


function getUrlStr(url,parmas) {
    for (var key in parmas){
        if (url.search(/\?/) === -1) {
            url += '?'+ key +'='+parmas[key];
        }else {
            url += '&'+ key +'='+parmas[key];
        }
    }
    return url;
}

function gw_tokenRequest(url,parmas,success,fail,method='POST') {
    storage.gw_getItem('token',function (error,token) {
        parmas['Authorization'] = token;
        console.log('token====='+token)
        gw_request(url,parmas,success,fail,method);
    })
}

export default {
    gw_request:gw_request,
    gw_tokenRequest:gw_tokenRequest,
}
