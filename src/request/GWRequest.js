

import React, {Component} from 'react';
import {
    DeviceEventEmitter,
    Alert,
    NativeModules,
} from 'react-native';

// var RNToNative = NativeModules.RNToNative;


function gw_request(url,parmas,success,fail,method='GET',token=null) {
    if(method=='GET'){
        get_request(url,parmas,success,fail,method,token);
    }else{
        postRequest(url,parmas,success,fail,method,token);
    }
}

function postRequest(url,parmas,success,fail,method,token) {
    fetch(url,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization':token?token:'',
        },
        body:JSON.stringify(parmas),
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

function get_request(url,parmas,success,fail,method,token=null) {
    url = getUrlStr(url,parmas)
    console.log(JSON.stringify(url))
    fetch(url,{
        method:method,
        headers:{
            'Content-Type': 'application/json',
            'Authorization':token?token:'',
        }
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

function getPostParms(parmas) {
    var formData = new FormData();
    for (var key in parmas){
        console.log("key:"+key+"==value:"+parmas[key])
        formData.append(key,parmas[key]);
    }
    return formData;
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

function gw_tokenRequest(url,parmas,success,fail,method='GET') {
    storage.gw_getItem('token',function (error,token) {
        // parmas['Authorization'] = token;
        console.log('token====='+token)
        gw_request(url,parmas,success,fail,method,token);
    })
}

export default {
    gw_request:gw_request,
    gw_tokenRequest:gw_tokenRequest,
}
