//开放店铺设置页面
import React from 'react';
import {
    View,
    Text,
    Animated,
    Dimensions,
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback
} from 'react-native';
import storeModel from '../model/storeModel';
import SelIcon from './res/xianzhong_03.png';
import UnSelIcon from './res/weixianzhong_03-02.png';
import BasePage from '../../../BasePage';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class InvitationSettingPage extends BasePage {

    $navigationBarOptions = {
        title: '开放店铺',
        rightNavTitle: '完成',
        rightTitleStyle: styles.rightItem
    };

    $NavBarRightPressed = () => {
        // SpellShopApi.updateStoreRecruitStatus({recruitStatus: this.state.selIndex}).then(response=>{
        //     if(response.ok){
        //         storeModel.setStoreRecruitStatus(this.state.selIndex);
        //         Toast.toast('设置成功');
        //         this.props.navigation.goBack();
        //     } else {
        //         Toast.toast(response.msg);
        //     }
        // });
    };

    constructor(props) {
        super(props);
        this.state = {
            selIndex: storeModel.recruitStatus,
            bounceValue: new Animated.Value(1)//logo 尺寸
        };
    }

    // 点击行
    _clickRow = (index) => {
        if (index === this.state.selIndex) {
            return;
        }
        this.setState({ selIndex: index }, () => {
            Animated.sequence([
                Animated.timing(
                    this.state.bounceValue,
                    {
                        toValue: 1.5,
                        duration: 200
                    }
                ),
                Animated.spring(
                    this.state.bounceValue,
                    {
                        toValue: 1,
                        duration: 200,
                        friction: 2,// 摩擦力,默认7
                        tension: 40// 张力，默认40。
                    }
                )
            ]).start();
        });
    };

    renderRow = (value, index) => {
        const transform = index === this.state.selIndex ? [{ scale: this.state.bounceValue }] : null;
        return (<TouchableWithoutFeedback key={index} onPress={() => {
            this._clickRow(index);
        }}>
            <View style={[styles.row, index === 0 ? { marginTop: 10 } : null]}>
                <View style={styles.rowTop}>
                    <Animated.Image style={[transform ? { transform } : null]}
                                    source={index === this.state.selIndex ? SelIcon : UnSelIcon}/>
                    <Text style={styles.text}>{value}</Text>
                </View>
                {index === 2 ? null : <View style={styles.line}/>}
            </View>
        </TouchableWithoutFeedback>);
    };

    _render() {

        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    {
                        ['需要店长审核后加入', '允许任何人加入', '不允许任何人加入'].map((value, index) => {
                            return this.renderRow(value, index);
                        })
                    }
                </ScrollView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    rightItem: {
        fontSize: 15,
        color: '#e60012'
    },
    row: {
        width: SCREEN_WIDTH,
        height: 44,
        backgroundColor: '#fff'
    },
    rowTop: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 21,
        flex: 1
    },
    text: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 13,
        color: '#222222',
        marginLeft: 11
    },
    line: {
        backgroundColor: '#eeeeee',
        marginHorizontal: 15,
        height: StyleSheet.hairlineWidth,
    }
});
