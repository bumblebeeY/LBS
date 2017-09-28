/**
 * @author：龚意
 * @version：v0.0.1
 * 创建日期：2017/9/26
 * 历史修订：
 */
import React, {Component} from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Button,
    TextInput,
    TouchableOpacity

} from 'react-native';
const Util = require('./util');
export default class extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle:navigation.state.params.name,
        headerBackTitle:'返回',
        headerStyle: {
            backgroundColor: '#1296db',
        },
        headerTintColor: '#FFF',
        headerTitleStyle:{
            alignSelf:"center"
        },
        tabBarVisible:false,
    });
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }
    componentDidMount() {
        let that = this;
        const { params } = this.props.navigation.state;
        let url = Util.detailURL + 'key=' + Util.amapKey + '&id=' + params.id + '&extensions=all';
        Util.getJSON(url, function (data) {
            data=JSON.parse(data);
            if (data.status && data.info === 'OK' && data.pois.length) {
                let obj = data.pois[0];
                if (obj.deep_info && obj.deep_info.tag) {
                    obj.server = obj.deep_info.tag;
                }
                that.setState({
                    data: obj
                });
            } else {
                alert('数据服务出错');
            }

        });
    }

    render() {
        return (
            <ScrollView>
                {this.state.data ?
                    <View style={styles.content}>
                        <Text style={styles.name}>{this.state.data.name}</Text>
                        <Text style={styles.types}>
                            类型：
                            {this.state.data.type}
                        </Text>
                        <Text style={styles.address}>
                            地址：
                            {this.state.data.address}
                        </Text>
                        <Text style={styles.tag}>
                            标签：
                            {this.state.data.tag}
                        </Text>
                        <Text style={styles.server}>
                            服务：
                            {this.state.data.server}
                        </Text>
                    </View>
                    : null}
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    name: {
        fontSize: 15,
        color: '#1D92F5',
        fontWeight: 'bold'
    },
    content: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10
    },
    tag: {
        fontSize: 13,
        marginTop: 10
    },
    types: {
        marginTop: 10,
        fontSize: 13,
        color: '#4C4C4C'
    },
    address: {
        fontSize: 13,
        color: '#4C4C4C'
    },
    server: {
        marginTop: 10,
        fontSize: 13
    }

});