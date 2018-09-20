import {
    Image, Text,
    TextInput, TouchableOpacity, View
} from 'react-native';
import React from 'react';
import BasePage from '../../../../BasePage';
import UIText from '../../../../components/ui/UIText';
import openEyeImage from '../../../login/res/ck_03-02.png';
import closeEyeImage from '../../../login/res/yinc_03.png';
import { color } from '../../../../constants/Theme';
import ScreenUtils from '../../../../utils/ScreenUtils';
import MineAPI from '../../api/MineApi';
import bridge from '../../../../utils/bridge';
import StringUtils from '../../../../utils/StringUtils';

export default class EditPhonePwdPage extends BasePage {

    $navigationBarOptions = {
        title: '修改密码'
    };

    constructor(props) {
        super(props);
        this.state = {
            isOldSecuret: true,
            oldPwd: '',
            isNewSecuret: true,
            newPwd: '',
            isAgainSecuret: true,
            newPwdAgain: ''
        };
    }

    _render() {
        return <View style={{ flex: 1 }}>
            <UIText value={'请输入旧密码'} style={{ fontSize: 13, color: '#C8C8C8', marginLeft: 20, marginTop: 15 }}/>
            <View style={{
                flexDirection: 'row',
                height: 48,
                backgroundColor: 'white',
                marginTop: 12,
                alignItems: 'center'
            }}>
                <UIText value={'旧密码'} style={{ fontSize: 13, color: '#222222', marginLeft: 22 }}/>
                <TextInput underlineColorAndroid={'transparent'}
                           style={{ flex: 1, padding: 0, fontSize: 13, color: '#000000', marginLeft: 14 }}
                           placeholder={'请输入旧密码'} placeholderTextColor={'#C8C8C8'}
                           onChangeText={(text) => this.setState({ oldPwd: text })}
                           value={this.state.oldPwd}
                           keyboardType={'default'}
                           secureTextEntry={this.state.isOldSecuret}/>
                <TouchableOpacity onPress={() => {
                    this.setState({
                        isOldSecuret: !this.state.isOldSecuret
                    });
                }}>
                    <Image
                        source={this.state.isOldSecuret ? closeEyeImage : openEyeImage}
                        style={{ marginRight: 20 }}/>

                </TouchableOpacity>
            </View>
            <UIText value={'请设置新密码'} style={{ fontSize: 13, color: '#C8C8C8', marginLeft: 20, marginTop: 15 }}/>
            <View style={{ backgroundColor: 'white', marginTop: 12, flexDirection: 'column' }}>
                <View style={{
                    flexDirection: 'row',
                    height: 48,
                    alignItems: 'center'
                }}>
                    <UIText value={'新密码'} style={{ fontSize: 13, color: '#222222', marginLeft: 22 }}/>
                    <TextInput underlineColorAndroid={'transparent'}
                               style={{ flex: 1, padding: 0, fontSize: 13, color: '#000000', marginLeft: 14 }}
                               placeholder={'请输入新密码'} placeholderTextColor={'#C8C8C8'}
                               onChangeText={(text) => this.setState({ newPwd: text })}
                               value={this.state.newPwd}
                               keyboardType={'default'}
                               secureTextEntry={this.state.isNewSecuret}/>
                    <TouchableOpacity onPress={() => {
                        this.setState({
                            isNewSecuret: !this.state.isNewSecuret
                        });
                    }}>
                        <Image
                            source={this.state.isNewSecuret ? closeEyeImage : openEyeImage}
                            style={{ marginRight: 20 }}/>

                    </TouchableOpacity>
                </View>
                <View style={{ height: 0.5, backgroundColor: '#EEEEEE', marginRight: 15, marginLeft: 15 }}/>
                <View style={{
                    flexDirection: 'row',
                    height: 48,
                    alignItems: 'center'
                }}>
                    <UIText value={'新密码'} style={{ fontSize: 13, color: '#222222', marginLeft: 22 }}/>
                    <TextInput underlineColorAndroid={'transparent'}
                               style={{ flex: 1, padding: 0, fontSize: 13, color: '#000000', marginLeft: 14 }}
                               placeholder={'请再次输入新密码'} placeholderTextColor={'#C8C8C8'}
                               onChangeText={(text) => this.setState({ newPwdAgain: text })}
                               value={this.state.newPwdAgain}
                               keyboardType={'default'}
                               secureTextEntry={this.state.isAgainSecuret}/>
                    <TouchableOpacity onPress={() => {
                        this.setState({
                            isAgainSecuret: !this.state.isAgainSecuret
                        });
                    }}>
                        <Image
                            source={this.state.isAgainSecuret ? closeEyeImage : openEyeImage}
                            style={{ marginRight: 20 }}/>

                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={{
                marginTop: 63,
                backgroundColor: color.red,
                width: ScreenUtils.width - 84,
                height: 48,
                marginLeft: 42,
                marginRight: 42,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5
            }} onPress={() => this._done()}>
                <Text style={{ fontSize: 13, color: 'white' }}>完成</Text>
            </TouchableOpacity>
        </View>;
    }

    _done = () => {
        // 密码修改成功，请重新登录
        if (StringUtils.isEmpty(this.state.oldPwd)) {
            bridge.$toast('旧密码不能为空');
            return;
        }
        if (StringUtils.isEmpty(this.state.newPwd)) {
            bridge.$toast('新密码不能为空');
            return;
        }
        if (StringUtils.isEmpty(this.state.newPwdAgain)) {
            bridge.$toast('请再次输入新密码');
            return;
        }
        if (this.state.newPwdAgain != this.state.newPwd) {
            bridge.$toast('请确保两次输入的新密码一致');
            return;
        }
        MineAPI.changePhonePwd({
            oldPassword: this.state.oldPwd,
            newPassword: this.state.newPwd
        }).then((data) => {
            bridge.$toast('密码修改成功，请重新登录');
        }).catch((data) => {
            bridge.$toast(data.msg);
        });
    };
}