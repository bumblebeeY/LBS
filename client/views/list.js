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
    ScrollView,
    TouchableOpacity,
    WebView,
    AsyncStorage,
    TextInput,
    Button
} from 'react-native';
import Util from './util';
var Geolocation = require('Geolocation');
//是否开启真实的定位；如果开启了_GEO_OPEN，_GEO_TEST_POS则会失效
const _GEO_OPEN = false;
//模拟定位数据
const _GEO_TEST_POS = '121.390686,31.213976';

export default class extends Component {
    static navigationOptions = ({navigation,screenProps}) => ({
        headerStyle: {
            backgroundColor: '#1296db',
        },
        headerRight: (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Map',{
                        type:screenProps.type
                    })
                }}
            >
                <Text style={{color:'#fff',marginRight:10,fontSize:16}}>地图</Text>
            </TouchableOpacity>),
        headerTintColor: '#FFF',
        headerTitleStyle: {
            alignSelf: "center"
        }
    });

    constructor(props) {
        super(props);
        this.state = {
            list: null,
            count: 0,
            keywords: "",
        }
    }

    componentDidMount() {
        let that = this;
        let url = Util.searchURL + 'key=' + Util.amapKey + '&keywords='
            + this.props.screenProps.type + '&extensions=base';
        url += '&location=' + _GEO_TEST_POS;
        that._doGetData(url);
        // Geolocation.getCurrentPosition(function (data) {
        //     let lnglat = data.coords.longitude + ',' + data.coords.latitude;
        //     AsyncStorage.setItem('pos', lnglat);
        //
        //     if (_GEO_OPEN) {
        //         url += '&location=' + lnglat;
        //         that._doGetData(url);
        //     } else {
        //
        //     }
        // }, function (err) {
        //     alert(JSON.stringify(err));
        //     alert('定位失败，请重新开启应用定位');
        // },{
        //     timeout:100000,
        // });
    }

    _doGetData(url) {
        let that = this;
        try {
            Util.getJSON(url, function (data) {
                data = JSON.parse(data);
                if (data.status && data.info === 'OK') {
                    let count = data.pois.length > 10 ? 10 : data.pois.length;
                    that._addStorage(data);
                    that.setState({
                        list: data.pois,
                        count: count
                    });
                } else {
                    alert('没有查询到相应的数据');
                }
            });
        } catch (err) {
            alert(err);
        }

    }

    /*加载详情页*/
    _loadDetail(id, name) {
        const {navigate} = this.props.navigation;
        navigate("Detail", {
            id: id,
            name: name,
            type: this.props.screenProps.type
        })
    }

    _onChangeText(val) {
        this.setState({
            keywords: val
        });
    }

    _loadMap() {
        const {navigate} = this.props.navigation;
        navigate("Map", {})
    }

    _onEndEditing() {
        let that = this;
        let keywords = this.state.keywords;
        let url = Util.searchURL + 'key=' + Util.amapKey + '&keywords='
            + keywords + '&types=' + that.props.screenProps.type + '&extensions=base';
        that.setState({
            list: null
        });
        AsyncStorage.getItem('pos', function (err, result) {
            if (_GEO_OPEN) {
                if (!err) {
                    url += '&location=' + result;
                    that._doGetData(url);
                } else {
                    alert('定位失败');
                }
            } else {
                url += '&location=' + _GEO_TEST_POS;
                that._doGetData(url);
            }
        });
    }

    //添加到本地存储
    _addStorage(data) {
        let posArr = [];
        let len = data.pois.length > 10 ? 10 : data.pois.length;
        for (let i = 0; i < len; i++) {
            posArr.push(data.pois[i].location);
        }
        let posStr = posArr.join(',');
        AsyncStorage.setItem('_' + this.props.screenProps.type, posStr);
    }

    //拨打电话
    _call(tel) {
        if (tel.length) {
            let arr = tel.split(';');
            let BUTTONS = [];
            for (let i in arr) {
                BUTTONS.push(arr[i]);
            }
            BUTTONS.push('取消');
        } else {
            alert('没有提供号码');
        }
    }

    render() {
        let items = [];
        if (this.state.list) {
            let len = this.state.length > 10 ? 10 : this.state.list.length;
            for (let i = 0; i < len; i++) {
                let obj = this.state.list[i];
                items.push(
                    <TouchableOpacity key={'listItem' + i} style={styles.item}
                                      onPress={this._loadDetail.bind(this, obj.id, obj.name)}>
                        <View style={styles.row}>
                            <View style={{flex: 1}}>
                                <Text numberOfLines={1} style={styles.name}>{obj.name}</Text>
                                <Text numberOfLines={1} style={styles.type}>{obj.type}</Text>
                            </View>
                            <View style={styles.distance}>
                                <Text numberOfLines={1} style={[styles.mi, {color: '#4C4C4C'}]}>
                                    {obj.distance}米
                                </Text>
                                <Text numberOfLines={1} style={styles.address}>{obj.address}</Text>
                            </View>
                        </View>
                        {
                            obj.tel.length ?
                                (<TouchableOpacity style={styles.phone} onPress={this._call.bind(this, obj.tel)}>
                                    <Text numberOfLines={1}>电话</Text>
                                </TouchableOpacity>)
                                : null
                        }
                    </TouchableOpacity>
                )
            }
        }
        let placeholder = '搜索' + this.props.screenProps.type;
        return (
            <ScrollView style={styles.container}>
                <View style={styles.searchBg}>
                    <TextInput style={styles.input} placeholder={placeholder}
                               underlineColorAndroid="transparent"
                               onChangeText={this._onChangeText.bind(this)}
                               onEndEditing={this._onEndEditing.bind(this)}/>
                    <View>
                        <Text style={styles.tip}>
                            已为您筛选
                            <Text style={{color: '#FA2530'}}>{this.state.count}</Text>
                            条数据
                        </Text>
                    </View>
                </View>
                {items}
                {items.length ? null : <View style={styles.activity}></View>}
                <View style={{height: 40}}></View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddd'
    },
    input: {
        height: 38,
        paddingTop: 0,
        paddingBottom: 0,
        marginLeft: 10,
        marginRight: 10,
        borderWidth: Util.pixel,
        paddingLeft: 5,
        marginTop: 10,
        borderColor: '#868687',
        borderRadius: 3,
        fontSize: 15
    },
    tip: {
        fontSize: 12,
        marginLeft: 10,
        marginTop: 5,
        color: '#505050'
    },
    row: {
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        paddingTop: 5
    },
    distance: {
        width: 120,
        alignItems: 'flex-end',
    },
    name: {
        fontSize: 15,
        marginBottom: 6
    },
    type: {
        fontSize: 12,
        color: '#686868'
    },
    mi: {
        fontSize: 12,
        color: '#686868'
    },
    address: {
        fontSize: 12,
        marginTop: 5,
        color: '#686868'
    },
    phone: {
        marginLeft: 10,
        marginRight: 10,
        height: 30,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: Util.pixel,
        borderColor: '#ccc',
        borderRadius: 2,
    },
    searchBg: {
        backgroundColor: '#fff',
        paddingBottom: 10
    },
    item: {
        marginTop: 10,
        backgroundColor: '#fff',
        paddingBottom: 10,
        borderTopWidth: Util.pixel,
        borderBottomWidth: Util.pixel,
        borderColor: '#ccc'
    },
    activity: {
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
});