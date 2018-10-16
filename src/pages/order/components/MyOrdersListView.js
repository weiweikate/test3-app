import React, { Component } from 'react';
import { View, NativeModules } from 'react-native';
import RefreshList from '../../../components/ui/RefreshList';
import constants from '../../../constants/constants';
import StringUtils from '../../../utils/StringUtils';
import GoodsListItem from './GoodsListItem';
import SingleSelectionModal from './BottomSingleSelectModal';
import CommonTwoChoiceModal from './CommonTwoChoiceModal';
import Toast from '../../../utils/bridge';
import user from '../../../model/user';
import OrderApi from '../api/orderApi';

export default class MyOrdersListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewData: [
                {
                    id: 49,
                    orderNum: '2018070250371039050793800',
                    expressNo: '',
                    orderCreateTime: 1530470345000,
                    orderStatus: 1,
                    freightPrice: 2092,
                    totalPrice: 3000,
                    orderProduct: [
                        {
                            id: 52,
                            productId: 2,
                            productName: 'Alixe',
                            spec: '175kg-22cm-狂野',
                            imgUrl: 'http://juretest.oss-cn-hangzhou.aliyuncs.com/jure/jure_crm/test/362d0cfb-b195-4005-8d89-4d436e5d75f4_1530869113480.jpg',
                            price: 1600,
                            num: 2,
                            status: 1
                        }
                    ],
                    pickedUp: 2//2为自提，1为快递
                },
                {
                    id: 49,
                    orderNum: '2018070250371039050793800',
                    expressNo: '',
                    orderCreateTime: 1530470345000,
                    orderStatus: 2,
                    freightPrice: 2092,
                    totalPrice: 3000,
                    orderProduct: [
                        {
                            id: 52,
                            productId: null,
                            productName: null,
                            spec: '175kg-22cm-狂野',
                            imgUrl: 'http://juretest.oss-cn-hangzhou.aliyuncs.com/jure/jure_crm/test/362d0cfb-b195-4005-8d89-4d436e5d75f4_1530869113480.jpg',
                            price: 1600,
                            num: 2,
                            status: 1
                        }
                    ],
                    pickedUp: 2//2为自提，1为快递
                },
                {
                    id: 49,
                    orderNum: '2018070250371039050793800',
                    expressNo: '',
                    orderCreateTime: 1530470345000,
                    orderStatus: 3,
                    freightPrice: 2092,
                    totalPrice: 3000,
                    orderProduct: [
                        {
                            id: 52,
                            productId: null,
                            productName: null,
                            spec: '175kg-22cm-狂野',
                            imgUrl: 'http://juretest.oss-cn-hangzhou.aliyuncs.com/jure/jure_crm/test/362d0cfb-b195-4005-8d89-4d436e5d75f4_1530869113480.jpg',
                            price: 1600,
                            num: 2,
                            status: 1
                        }
                    ],
                    pickedUp: 2//2为自提，1为快递
                },
                {
                    id: 49,
                    orderNum: '2018070250371039050793800',
                    expressNo: '',
                    orderCreateTime: 1530470345000,
                    orderStatus: 7,
                    freightPrice: 2092,
                    totalPrice: 3000,
                    orderProduct: [
                        {
                            id: 52,
                            productId: null,
                            productName: null,
                            spec: '175kg-22cm-狂野',
                            imgUrl: 'http://juretest.oss-cn-hangzhou.aliyuncs.com/jure/jure_crm/test/362d0cfb-b195-4005-8d89-4d436e5d75f4_1530869113480.jpg',
                            price: 1600,
                            num: 2,
                            status: 1
                        }
                    ],
                    pickedUp: 2//2为自提，1为快递
                },
                {
                    id: 49,
                    orderNum: '2018070250371039050793800',
                    expressNo: '',
                    orderCreateTime: 1530470345000,
                    orderStatus: 4,
                    freightPrice: 2092,
                    totalPrice: 3000,
                    orderProduct: [
                        {
                            id: 52,
                            productId: 2,
                            productName: 'Alixe',
                            spec: '175kg-22cm-狂野',
                            imgUrl: 'http://juretest.oss-cn-hangzhou.aliyuncs.com/jure/jure_crm/test/362d0cfb-b195-4005-8d89-4d436e5d75f4_1530869113480.jpg',
                            price: 1600,
                            num: 2,
                            status: 1
                        }
                    ],
                    pickedUp: 2//2为自提，1为快递
                },
                {
                    id: 49,
                    orderNum: '2018070250371039050793800',
                    expressNo: '',
                    orderCreateTime: 1530470345000,
                    orderStatus: 5,
                    freightPrice: 2092,
                    totalPrice: 3000,
                    orderProduct: [
                        {
                            id: 52,
                            productId: 2,
                            productName: 'Alixe',
                            spec: '175kg-22cm-狂野',
                            imgUrl: 'http://juretest.oss-cn-hangzhou.aliyuncs.com/jure/jure_crm/test/362d0cfb-b195-4005-8d89-4d436e5d75f4_1530869113480.jpg',
                            price: 1600,
                            num: 2,
                            status: 1
                        }
                    ],
                    pickedUp: 2//2为自提，1为快递
                }
            ],
            pageStatus: this.props.pageStatus,
            isEmpty: false,
            currentPage: 1,
            isShowDeleteOrderModal: false,
            isShowSingleSelctionModal: false,
            isShowReceiveGoodsModal: false,
            menu: {},
            index: -1
        };
    }

    $getPageStateOptions = () => {
        return {
            loadingState: this.state.loadingState,
            netFailedProps: {
                netFailedInfo: this.state.netFailedInfo,
                reloadBtnClick: this._reload
            }
        };
    };
    renderItem = ({ item, index }) => {
        return (
            <GoodsListItem
                id={item.id}
                orderNum={item.orderNum}
                orderCreateTime={item.orderCreateTime}
                orderStatus={item.orderStatus}
                freightPrice={item.freightPrice}
                totalPrice={item.totalPrice}
                orderProduct={item.orderProduct}
                platformPayTime={item.platformPayTime}
                clickItem={() => {
                    this.clickItem(index);
                }}
                goodsItemClick={() => this.clickItem(index)}
                operationMenuClick={(menu) => this.operationMenuClick(menu, index)}
                outTrandNo={item.outTrandNo}
            />
        );
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <RefreshList
                    data={this.state.viewData}
                    renderItem={this.renderItem}
                    onRefresh={this.onRefresh}
                    onLoadMore={this.onLoadMore}
                    extraData={this.state}
                    isEmpty={this.state.isEmpty}
                    emptyTip={'暂无数据'}
                />
                {this.renderModal()}
            </View>
        );
    }

    renderModal = () => {
        return (
            <View>
                <CommonTwoChoiceModal
                    isShow={this.state.isShowDeleteOrderModal}
                    detail={{ title: '删除订单', context: '确定删除此订单吗', no: '取消', yes: '确认' }}
                    closeWindow={() => {
                        this.setState({ isShowDeleteOrderModal: false });
                    }}
                    yes={() => {
                        this.setState({ isShowDeleteOrderModal: false });
                        console.log(this.state.menu);
                        if (this.state.menu.id === 9) {
                            Toast.showLoading();
                            OrderApi.deleteClosedOrder({ orderNum: this.state.viewData[this.state.index].orderNum }).then((response) => {
                                Toast.hiddenLoading();
                                NativeModules.commModule.toast('订单已删除');
                                this.getDataFromNetwork();
                            }).catch(e => {
                                Toast.hiddenLoading();
                                NativeModules.commModule.toast(e.msg);
                            });
                        } else if ( this.state.menu.id === 7 ) {
                            Toast.showLoading();
                            OrderApi.deleteCompletedOrder({ orderNum: this.state.viewData[this.state.index].orderNum }).then((response) => {
                                Toast.hiddenLoading();
                                NativeModules.commModule.toast('订单已删除');
                                this.getDataFromNetwork();
                            }).catch(e => {
                                Toast.hiddenLoading();
                                NativeModules.commModule.toast(e.msg);
                            });
                        } else {
                            NativeModules.commModule.toast('状态值异常，暂停操作');
                        }
                    }}
                    no={() => {
                        this.setState({ isShowDeleteOrderModal: false });
                    }}
                />
                <CommonTwoChoiceModal
                    isShow={this.state.isShowReceiveGoodsModal}
                    detail={{ title: '确认收货', context: '是否确认收货?', no: '取消', yes: '确认' }}
                    closeWindow={() => {
                        this.setState({ isShowReceiveGoodsModal: false });
                    }}
                    yes={() => {
                        this.setState({ isShowReceiveGoodsModal: false });
                        Toast.showLoading();
                        OrderApi.confirmReceipt({ orderNum: this.state.viewData[this.state.index].orderNum }).then((response) => {
                            Toast.hiddenLoading();
                            NativeModules.commModule.toast('确认收货成功');
                            this.getDataFromNetwork();
                        }).catch(e => {
                            Toast.showLoading();
                            NativeModules.commModule.toast(e.msg);
                        });
                    }}
                    no={() => {
                        this.setState({ isShowReceiveGoodsModal: false });
                    }}
                />
                <SingleSelectionModal
                    isShow={this.state.isShowSingleSelctionModal}
                    detail={['我不想买了', '信息填写错误，重新拍', '其他原因']}
                    closeWindow={() => {
                        this.setState({ isShowSingleSelctionModal: false });
                    }}
                    commit={(index) => {
                        this.setState({ isShowSingleSelctionModal: false });
                        Toast.showLoading();
                        OrderApi.cancelOrder({
                            buyerRemark: ['我不想买了', '信息填写错误，重新拍', '其他原因'][index],
                            orderNum: this.state.viewData[this.state.index].orderNum
                        }).then((response) => {
                            Toast.hiddenLoading();
                            if (response.code === 10000) {
                                NativeModules.commModule.toast('订单已取消');
                                this.getDataFromNetwork();
                            } else {
                                NativeModules.commModule.toast(response.msg);
                            }
                        }).catch(e => {
                            NativeModules.commModule.toast(e);
                        });
                    }}
                />
            </View>

        );
    };
    //多商品订单列表 maybe
    getOrderProduct = (list) => {
        let arrData = [];
        list.map((item, index) => {
            arrData.push({
                id: item.id,
                productId: item.productId,
                productName: item.productName,
                spec: item.spec,
                imgUrl: item.specImg,
                price: StringUtils.formatMoneyString(item.price),
                num: item.num,
                status: item.status
            });
        });
        return arrData;
    };
    getList = (data) => {
        if (StringUtils.isNoEmpty(data) && StringUtils.isNoEmpty(data.data)) {
            let arrData = this.state.currentPage === 1 ? [] : this.state.viewData;
            data.data.map((item, index) => {
                arrData.push({
                    id: item.id,
                    orderNum: item.orderNum,
                    expressNo: item.expressNo,
                    orderCreateTime: item.createTime,
                    platformPayTime:item.platformPayTime,
                    orderStatus: item.status,
                    freightPrice: item.freightPrice,
                    totalPrice: item.totalPrice,
                    orderProduct: this.getOrderProduct(item.orderProductList),
                    pickedUp: item.pickedUp,
                    outTrandNo: item.outTrandNo
                });
            });
            this.setState({ viewData: arrData });
        } else {
            this.setState({ viewData: [], isEmpty: true });
        }
    };

    componentDidMount() {
        //网络请求，业务处理
        this.getDataFromNetwork();
    }

    getDataFromNetwork = () => {
        let params = {
            userId: user.id,
            page: this.state.currentPage,
            size: constants.PAGESIZE
        };
        Toast.showLoading();
        switch (this.state.pageStatus) {
            case 0:
                OrderApi.queryPage(params).then((response) => {
                    Toast.hiddenLoading();
                    this.getList(response.data);
                    console.log(response);
                    this.setState({ isEmpty: response.data && StringUtils.isNoEmpty(response.data) && response.data.data.length != 0 });

                }).catch(e => {
                    Toast.hiddenLoading();
                    console.log(e);
                     if(e.code === 10009){
                         this.$navigate('login/login/LoginPage',{callback:()=>{
                                 this.loadPageData()
                             }});
                     }
                });
                break;
            case 1:
                OrderApi.queryPage({ ...params, status: 1 }).then((response) => {
                    Toast.hiddenLoading();
                    this.getList(response.data);
                    this.setState({ isEmpty: response.data && StringUtils.isNoEmpty(response.data) && response.data.data.length != 0 });
                }).catch(e => {
                    Toast.hiddenLoading();
                    NativeModules.commModule.toast(e.msg);
                    if(e.code === 10009){
                        this.$navigate('login/login/LoginPage',{callback:()=>{
                                this.loadPageData()
                            }});
                    }
                });
                break;
            case 2:
                OrderApi.queryPage({ ...params, status: 2 }).then((response) => {
                    Toast.hiddenLoading();
                    this.getList(response.data);
                    this.setState({ isEmpty: response.data && StringUtils.isNoEmpty(response.data) && response.data.data.length != 0 });

                }).catch(e => {
                    Toast.hiddenLoading();
                    NativeModules.commModule.toast(e.msg);
                    if(e.code === 10009){
                        this.$navigate('login/login/LoginPage',{callback:()=>{
                                this.loadPageData()
                            }});
                    }
                });
                break;
            case 3:
                OrderApi.queryPage({ ...params, status: 3 }).then((response) => {
                    Toast.hiddenLoading();
                    this.getList(response.data);
                    this.setState({ isEmpty: response.data && StringUtils.isNoEmpty(response.data) && response.data.data.length != 0 });

                }).catch(e => {
                    Toast.hiddenLoading();
                    NativeModules.commModule.toast(e.msg);
                    if(e.code === 10009){
                        this.$navigate('login/login/LoginPage',{callback:()=>{
                                this.loadPageData()
                            }});
                    }
                });
                break;
            case 4:
                OrderApi.queryPage({ ...params, status: 4 }).then((response) => {
                    Toast.hiddenLoading();
                    this.getList(response.data);
                    this.setState({ isEmpty: response.data && StringUtils.isNoEmpty(response.data) && response.data.data.length != 0 });

                }).catch(e => {
                    Toast.hiddenLoading();
                    NativeModules.commModule.toast(e.msg);
                    if(e.code === 10009){
                        this.$navigate('login/login/LoginPage',{callback:()=>{
                                this.loadPageData()
                            }});
                    }
                });
                break;
            default:
                // let orderNum=this.props.orderNum
                // OrderApi.queryAllOrderPageList({
                //     dealerId:user.id,
                //     page:this.state.currentPage,
                //     pageSize:constants.PAGESIZE,
                //     condition:orderNum,
                // }).then((response)=>{
                //     Toast.hiddenLoading()
                //     if(response.ok ){
                //         this.getList(response.data)
                //         this.setState({isEmpty:response.data&&StringUtils.isNoEmpty(response.data)&&response.data.length!=0})
                //     } else {
                //         NativeModules.commModule.toast(response.msg)
                //     }
                // }).catch(e=>{
                //     NativeModules.commModule.toast(e)
                // });
                break;
        }
    };

    //当父组件Tab改变的时候让子组件更新
    componentWillReceiveProps(nextProps) {
        if (nextProps.selectTab < 8) {
            console.log(nextProps.selectTab + '==================================');

        }
    }

    onLoadNumber = () => {
        this.props.onLoadNumber && this.props.onLoadTabNumber();
    };

    onRefresh = () => {
        this.setState({
            currentPage: 1
        });
        this.getDataFromNetwork();
    };

    onLoadMore = (page) => {
        this.setState({
            currentPage: this.state.currentPage + 1
        });
        this.getDataFromNetwork();
    };
    clickItem = (index) => {
        let orderStatus = this.state.viewData[index].orderStatus;
        if (orderStatus > (constants.pageStateString.length + 1)) {
            Toast.$toast('订单已结束');
        } else {
            this.props.nav('order/order/MyOrdersDetailPage', {
                orderId: this.state.viewData[index].id,
                status: this.state.viewData[index].orderStatus,
                orderNum: this.state.viewData[index].orderNum,
                callBack: this.onRefresh
            });
        }
    };
    operationMenuClick = (menu, index) => {
        /*
         * operation checklist
         * 取消订单                 ->  1
         * 去支付                   ->  2
         * 继续支付                 ->  3
         * 订单退款                 ->  4
         * 查看物流                 ->  5
         * 确认收货                 ->  6
         * 删除订单(已完成)          ->  7
         * 再次购买                 ->  8
         * 删除订单(已关闭(取消))    ->  9
         * */
        this.setState({ menu: menu, index: index });
        switch (menu.id) {
            case 1:
                this.setState({ isShowSingleSelctionModal: true });
                break;
            case 2:
                this.props.nav('payment/PaymentMethodPage', {
                    orderNum: this.state.viewData[index].orderNum,
                    amounts: this.state.viewData[index].totalPrice
                });
                break;
            case 3:
                this.props.nav('payment/PaymentMethodPage', {
                    orderNum: this.state.viewData[index].orderNum,
                    amounts: this.state.viewData[index].totalPrice,
                    outTrandNo: this.state.viewData[index].outTrandNo
                    // amounts: this.state.viewData[index].totalPrice + this.state.viewData[index].freightPrice,
                    // orderType: this.state.viewData[index].pickedUp - 1
                });
                break;
            case 4:
                this.props.nav('payment/PaymentMethodPage', {
                    orderNum: this.state.viewData[index].orderNum,
                    amounts: this.state.viewData[index].price
                });
                break;
            case 5:
                this.props.nav('order/logistics/LogisticsDetailsPage', {
                    orderNum: this.state.viewData[index].orderNum,
                    // orderId: this.state.viewData[index].id,
                    expressNo: this.state.viewData[index].expressNo
                });
                break;
            case 6:
                this.setState({ isShowReceiveGoodsModal: true });
                break;
            case 7:
                this.setState({ isShowDeleteOrderModal: true });
                break;
            case 8:
                // Toast.showLoading();
                // OrderApi.orderOneMore({orderId:this.state.viewData[index].id}).then((response)=>{
                //     if(response.ok ){
                //         let cartData=[]
                //         response.data.map((item, index)=>{
                //             cartData.push({sareSpecId:item.id,productNumber:item.num})
                //         })
                //         OrderApi.shoppingCartFormCookieToSession({jsonString: JSON.stringify(cartData)}).then((response)=>{
                //             Toast.hiddenLoading()
                //             if(response.ok ){
                //                 Toast.hiddenLoading()
                //                 this.props.nav('shopCart/CartPage',{isInnerPage:true})
                //             } else {
                //                 NativeModules.commModule.toast(response.msg)
                //             }
                //         }).catch(e=>{
                //             Toast.hiddenLoading()
                //         });
                //     } else {
                //         NativeModules.commModule.toast(response.msg)
                //     }
                // }).catch(e=>{
                //     Toast.hiddenLoading()
                // });
                break;
            case 9:
                this.setState({ isShowDeleteOrderModal: true });
                break;
        }
    };
}
