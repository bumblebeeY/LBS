/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
} from 'react-native';
import bank from './bank';
import film from './film';
import food from './food';
import toilet from './toilet';
import {TabNavigator} from 'react-navigation';
let TabBars = TabNavigator({
    Food: {
        screen: food,
        navigationOptions: {
            title:'美食',
            tabBarLabel: '美食',
            tabBarIcon: ({tintColor}) => (
                <Image source={require('../images/food.png')} style={[{tintColor: tintColor}, styles.icon]}/>),
        }
    },
    Film: {
        screen: film,
        navigationOptions: {
            tabBarLabel: '电影',
            tabBarIcon: ({tintColor}) => (
                <Image source={require('../images/film.png')} style={[{tintColor: tintColor}, styles.icon]}/>),
        }
    },
    Bank: {
        screen: bank,
        navigationOptions: {  // 也可以写在组件的static navigationOptions内
            tabBarLabel: '银行',
            tabBarIcon: ({tintColor}) => (
                <Image source={require('../images/bank.png')} style={[{tintColor: tintColor}, styles.icon]}/>),
        }
    },
   Toilet: {
        screen: toilet,
        navigationOptions: {
            tabBarLabel: '厕所',
            tabBarIcon: ({tintColor}) => (
                <Image source={require('../images/toilet.png')} style={[{tintColor: tintColor}, styles.icon]}/>),
        }
    }
}, {
    initialRouteName: 'Food',
    animationEnabled: false, // 切换页面时是否有动画效果
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: false, // 是否可以左右滑动切换tab
    backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    lazy:true,
    tabBarOptions: {
        activeTintColor: '#007aff', // 文字和图片选中颜色
        inactiveTintColor: '#999', // 文字和图片未选中颜色
        showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {
            height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
        },
        style: {
            backgroundColor: '#fff', // TabBar 背景色
            // height: 44
        },
        labelStyle: {
            fontSize: 12, // 文字大小
        },
    },
});
export default class extends Component {
    render() {
        return (
            <TabBars>
            </TabBars>
        );
    }
}
const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
});
