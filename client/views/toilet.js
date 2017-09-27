/**
 * @author：龚意
 * @version：v0.0.1
 * 创建日期：2017/9/26
 * 历史修订：
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import List from './list';
import Detail from './Detail';
import Map from './map';
import {StackNavigator} from 'react-navigation';
const ModalStack = StackNavigator({
    List: {
        screen: List,
        navigationOptions: {
            headerTitle:'厕所',
        }
    },
    Detail: {
        screen: Detail,
    },
    Map:{
        screen: Map,
    }
});
export default class extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <ModalStack screenProps={{type: "厕所"}}>
            </ModalStack>
        )
    }
}