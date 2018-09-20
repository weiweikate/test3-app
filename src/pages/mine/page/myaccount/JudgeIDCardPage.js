import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import BasePage from '../../../../BasePage';
import UIText from '../../../../components/ui/UIText';
import { color } from '../../../../constants/Theme';
import ScreenUtils from '../../../../utils/ScreenUtils';
import StringUtils from '../../../../utils/StringUtils';
import bridge from '../../../../utils/bridge';
import { TimeDownUtils } from '../../../../utils/TimeDownUtils';
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
            userName: user.realname,
            cardNum: ''
        };
    }

    _render() {
        return (<View style={{ flex: 1 }}>
            <View style={{ height: 38, justifyContent: 'center' }}>
                <UIText value={'身份认证'}
                        style={{
                            color: '#999999',
                            fontSize: 13,
                            marginLeft: 16
                        }}/>
            </View>
            <View style={{ backgroundColor: 'white', flexDirection: 'column' }}>
                <View style={styles.horizontalItem}>
                    <Text style={styles.itemLeftText}>用户姓名</Text>
                    <TextInput
                        style={styles.itemRightInput}
                        underlineColorAndroid={'transparent'}
                        onChangeText={(text) => this.setState({ userName: text })}
                        value={this.state.userName}
                        placeholder={'请输入用户姓名'}
                        placeholderTextColor={'#C8C8C8'}
                    />
                </View>
                <View style={{ height: 0.5, backgroundColor: 'white', marginLeft: 15 }}></View>
                <View style={styles.horizontalItem}>
                    <Text style={styles.itemLeftText}>证件号码</Text>
                    <TextInput
                        style={styles.itemRightInput}
                        underlineColorAndroid={'transparent'}
                        onChangeText={(text) => this.setState({ cardNum: text })}
                        value={this.state.cardNum}
                        placeholder={'请输入证件号码'}
                        placeholderTextColor={'#C8C8C8'}
                    />
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
                <Text style={{ fontSize: 13, color: 'white' }}>确认</Text>
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
        let userName = this.state.userName;
        let cardNum = this.state.cardNum;
        if (StringUtils.isEmpty(userName)) {
            bridge.$toast('请输入姓名');
            return;
        }
        if (StringUtils.isEmpty(cardNum)) {
            bridge.$toast('请输入证件号码');
            return;
        }
        // 验证身份
        // MineAPI.updatePhone({
        //     // verificationCode: this.state.code,
        //     verificationCode: '2222',
        //     oldVerificationCode: oldCode,
        //     phone: this.state.telText
        // }).then((data) => {
        //     this.$navigate('mine/account/ChangePayPwdPage', {
        //         oldPwd: '',
        //         tips: '重新设置新的交易密码'
        //     });
        // }).catch((data) => {
        //     bridge.$toast(data.msg);
        // });
        this.$navigate('mine/account/ChangePayPwdPage', {
            userName,
            cardNum,
            oldPwd: '',
            tips: '重新设置新的交易密码'
        });
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
