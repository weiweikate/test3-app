const api = {
    // 确认订单
    makeSureOrder: '/order/makeSureOrder',
    //order/submitOrder提交订单
    submitOrder: '/order/submitOrder',
    //订单列表  订单状态（1：待支付 2：待发货 3：待收货 4：确认收货 5：已完成 6：退货关闭 7：用户关闭 8：超时关闭）
    queryPage: '/order/queryPage',
    // 用户预支付
    prePay: '/order/prePay',
    //支付成功回调
    paySuccess: '/order/paySuccess',
    // （陈帅）订单详情
    lookDetail: '/order/lookDetail',
    // 加入购物车
    addItem: '/user/shoppingcart/addItem',
    //删除已关闭订单
    deleteClosedOrder: '/order/deleteClosedOrder',
    //确认收货
    confirmReceipt: '/order/confirmReceipt',
    //取消订单
    cancelOrder: '/order/cancelOrder',
    //继续支付
    continuePay:'/order/payRecord/continuePay',
    //继续去支付
    continueToPay:['/order/payRecord/continueToPay',{method:'get'}],
    /**  售后模块相关接口 huchao */
    //（陈帅）申请退款
    applyRefund: '/order/returnProduct/applyRefund',
    //（陈帅）申请换货
    applyExchangeGoods: '/order/returnProduct/applyExchangeGoods',
    //（陈帅）申请退款退货
    applyReturnGoods: '/order/returnProduct/applyReturnGoods',
    //（陈帅）填写寄回信息
    fillSendInfo: '/order/returnProduct/fillSendInfo',
    //（陈帅）查看详情
    returnProductLookDetail:'/order/returnProduct/lookDetail',
    //（陈帅）撤销申请
    revokeApply: '/order/returnProduct/revokeApply',
    //（陈帅）修改申请
    updateApply: '/order/returnProduct/updateApply',
    //（陈帅）查询子订单详情
    subOrderLookDetial: ['/order/orderProduct/lookDetial',{method:'get'}],





};
import ApiUtils from '../../../api/network/ApiUtils';

const OrderApi = ApiUtils(api);

export default OrderApi;