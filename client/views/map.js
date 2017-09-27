/**
 * @author：龚意
 * @version：v0.0.1
 * 创建日期：2017/9/26
 * 历史修订：
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    WebView,
    AsyncStorage
} from 'react-native';
//是否开启真实的定位；如果开启了_GEO_OPEN，_GEO_TEST_POS则会失效
const _GEO_OPEN = false;
//模拟定位数据
const _GEO_TEST_POS = '121.390686,31.213976';
export default class extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.state.params.type,
        headerBackTitle: '返回',
        headerStyle: {
            backgroundColor: '#1296db',
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
            alignSelf: "center"
        }
    });

    constructor(props) {
        super(props);
        this.state = {
            url: null
        }
    }
    componentDidMount() {
        let that = this;
        const { params } = this.props.navigation.state;
        AsyncStorage.multiGet(['_' + params.type, 'pos'], function (err, result) {
            if (!err) {
                let pos = result[1][1];
                let markers = result[0][1];
                let url = 'http://vczero.github.io/webview/index.html?';
                if (_GEO_OPEN) {
                    url += 'pos=' + pos + '&markers=' + markers;
                } else {
                    url += 'pos=' + _GEO_TEST_POS + '&markers=' + markers;
                }
                that.setState({
                    url: url
                });
            } else {
                alert('定位失败');
            }
        });
    }

    render() {
        let webView = null;
        if (this.state.url) {
            webView = <WebView source={{uri:this.state.url}}/>
        }
        return (
            <View style={{flex: 1}}>
                {webView}
            </View>
        );
    }
}