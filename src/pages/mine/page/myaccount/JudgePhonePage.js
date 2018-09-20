import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import BasePage from '../../../../BasePage';
import UIText from '../../../../components/ui/UIText';
import { color } from '../../../../constants/Theme';
import ScreenUtils from '../../../../utils/ScreenUtils';
import StringUtils from '../../../../utils/StringUtils';
import bridge from '../../../../utils/bridge';
import { TimeDownUtils } from '../../../../utils/TimeDownUtils';
import MineAPI from '../../api/MineApi';
import user from '../../../../model/user';

export default class SetNewPhoneNumPage extends BasePage {

    // 导航配置
    $navigationBarOptions = {
        title: '修改手机号'
    };

    // 构造
    constructor(props) {
        super(props);
        this.state = {
            telText: user.phone,
            code: '',
            vertifyCodeTime: 0
        };
    }

    _render() {
        return (<View style={{ flex: 1 }}>
            <View style={{ height: 38, justifyContent: 'center' }}>
                <UIText value={'手机验证'}
                        style={{
                            color: '#999999',
                            fontSize: 13,
                            marginLeft: 16
                        }}/>
            </View>
            <View style={{ backgroundColor: 'white', flexDirection: 'column' }}>
                <View style={styles.horizontalItem}>
                    <Text style={styles.itemLeftText}>手机号</Text>
                    <TextInput
                        style={styles.itemRightInput}
                        underlineColorAndroid={'transparent'}
                        onChangeText={(text) => this.setState({ telText: text })}
                        value={this.state.telText}
                        placeholder={'请输入手机号'}
                        placeholderTextColor={'#C8C8C8'}
                    />
                </View>
                <View style={{ height: 0.5, backgroundColor: 'white', marginLeft: 15 }}></View>
                <View style={{
                    height: 44,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <UIText value={'验证码'} style={{ fontSize: 13, color: '#000000', marginLeft: 20 }}/>
                    <TextInput underlineColorAndroid={'transparent'}
                               style={{ flex: 1, padding: 0, fontSize: 13, color: '#000000', marginLeft: 20 }}
                               placeholder={'请输入验证码'}
                               placeholderTextColor={'#C8C8C8'}
                               onChangeText={(text) => this.setState({ code: text })}
                               value={this.state.code}
                               keyboardType={'phone-pad'}/>
                    <TouchableOpacity onPress={() => this._onGetCode(this.state.telText)}
                                      disabled={this.state.vertifyCodeTime > 0 ? true : false}>
                        <UIText value={this.state.vertifyCodeTime > 0 ? this.state.vertifyCodeTime + '秒后重新获取' : '获取验证码'}
                                style={{ color: '#D85674', fontSize: 11, marginRight: 15 }}/>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={{
                marginTop: 54,
                backgroundColor: color.red,
                width: ScreenUtils.width - 84,
                height: 48,
                marginLeft: 42,
                marginRight: 42,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5
            }} onPress={() => this._toNext()}>
                <Text style={{ fontSize: 13, color: 'white' }}>下一步</Text>
            </TouchableOpacity>
        </View>);
    }

    _onGetCode = (tel) => {
        //获取验证码
        if (StringUtils.checkPhone(tel)) {
            (new TimeDownUtils()).startDown((time) => {
                this.setState({
                    vertifyCodeTime: time
                });
            });
            bridge.$toast('验证码已发送请注意查收');
        } else {
            bridge.$toast('手机格式不对');
        }
    };

    _toNext = () => {
        let tel = this.state.telText;
        let code = this.state.code;
        if (StringUtils.isEmpty(tel)) {
            bridge.$toast('请输入手机号');
            return;
        }
        if (StringUtils.isEmpty(code)) {
            bridge.$toast('请输入验证码');
            return;
        }
        if (StringUtils.checkPhone(tel)) {
            // 验证
            MineAPI.judgeCode({
                // verificationCode: this.state.code,
                verificationCode: '1111',
                phone: this.state.telText
            }).then((data) => {
                this.$navigate('mine/account/JudgeIDCardPage');
            }).catch((data) => {
                bridge.$toast(data.msg);
            });
        } else {
            bridge.$toast('手机格式不对');
            return;
        }
    };

}

const styles = StyleSheet.create({
    horizontalItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        height: 45,
        backgroundColor: 'white'
    },
    itemLeftText: {
        marginRight: 20,
        fontSize: 13,
        color: '#222222'
    },
    itemRightInput: {
        flex: 1,
        height: 40,
        padding: 0,
        color: '#222222',
        fontSize: 13
    }
});