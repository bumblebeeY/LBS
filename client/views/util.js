/**
 * @author：龚意
 * @version：v0.0.1
 * 创建日期：2017/9/20
 * 历史修订：
 */
import React from 'react';
import {
    Dimensions,
    PixelRatio
} from 'react-native';

var Util = {
    pixel: 1 / PixelRatio.get(),
    size: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    //post请求
    post: function (url, data, callback) {
        var fetchOption = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };
        fetch(url, fetchOption)
            .then((response) => response.json())
            .then((responseJson) => {
                callback(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });

    },
    getJSON: function (url, callback) {
        fetch(url,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.text())
            .then((responseText) => {
                callback(responseText);
            })
            .catch((error) => {
                console.error(error);
            });
    },
    //高德地图key
    amapKey: '49da084cf76d6753437934f66c8e009f',
    //周边搜索服务
    searchURL: 'http://restapi.amap.com/v3/place/around?',
    detailURL: 'http://restapi.amap.com/v3/place/detail?'
};
module.exports = Util;