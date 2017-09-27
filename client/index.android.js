/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    StatusBar,
} from 'react-native';
import Index from './views/index';
StatusBar.setBarStyle('light-content');
StatusBar.setNetworkActivityIndicatorVisible(true);
export default class client extends Component {
    render() {
        return (
            <Index>
            </Index>
        );
    }
}
AppRegistry.registerComponent('client', () => client);
