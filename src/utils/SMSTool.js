import ApiUtils from '../api/network/ApiUtils';

const SMSInterface = {
    // 登陆验证码
    SMSLogin: ['/sms/sendLoginMessage', { method: 'get', isRSA: true }],
    // 注册验证码
    SMSReg: ['/sms/sendRegMessage', { method: 'get', isRSA: true }],
    // 旧手机验证码
    SMSOldPhone: ['/sms/sendAuldPhoneMessage', { method: 'get', isRSA: true }],
    // 新手机号验证码
    SMSNewPhone: ['/sms/sendNewPhoneMessage', { method: 'get', isRSA: true }],
    // 第一次设置交易密码验证码
    SMSSalePhone: ['/sms/sendTransactionMessage', { method: 'get', isRSA: true }]
};

const SMSAPI = ApiUtils(SMSInterface);
const SMSTool = {

    SMSType: {
        LoginType: 0,
        RegType: 1,
        OldPhoneType: 2,
        NewPhoneType: 3,
        SalePwdType: 4

    },
    /**
     *
     * @param sendType 发送类型 0 登陆验证码 1 注册验证码 如果再有其他类型再加
     * @param phoneNumber 发送手机号
     * @return promise 接口请求完成后回调的promise
     */
    sendVerificationCode: function(sendType, phoneNumber) {
        switch (sendType) {
            case this.SMSType.LoginType:
                return SMSAPI.SMSLogin({
                    phone: phoneNumber
                });
            case this.SMSType.RegType:
                return SMSAPI.SMSReg({
                    phone: phoneNumber
                });
            case this.SMSType.OldPhoneType:
                return SMSAPI.SMSOldPhone({
                    phone: phoneNumber
                });
            case this.SMSType.NewPhoneType:
                return SMSAPI.SMSNewPhone({
                    phone: phoneNumber
                });
            case this.SMSType.SalePwdType:
                return SMSAPI.SMSSalePhone({
                    phone: phoneNumber
                });
            default:
                break;
        }
    }
};
export default SMSTool;
