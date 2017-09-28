/**
 * @author：龚意
 * @version：v0.0.1
 * 创建日期：2017/9/26
 * 历史修订：
 */
import List from './list';
import Detail from './Detail';
import Map from './map';
import {StackNavigator} from 'react-navigation';
const ModalStack = StackNavigator({
    List: {
        screen: List,
        navigationOptions: {
            headerTitle:'银行',
            initialRouteParams:'银行'
        }
    },
    Detail: {
        screen: Detail,
        navigationOptions: {tabBarVisible: false}
    },
    Map:{
        screen: Map,
        navigationOptions: {tabBarVisible: false}
    }
},{
    initialRouteParams: {
        type: '银行'
    }
});
module.exports=ModalStack;