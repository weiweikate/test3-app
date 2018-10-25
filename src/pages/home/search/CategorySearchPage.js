import React from 'react';
import { FlatList, SectionList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BasePage from '../../../BasePage';
import { PreLoadImage } from '../../../components/ui';
import HomeAPI from '../api/HomeAPI';
import ScreenUtils from '../../../utils/ScreenUtils';
import bridge from '../../../utils/bridge';
import ViewPager from '../../../components/ui/ViewPager';
import UIText from '../../../components/ui/UIText';
import UIImage from '../../../components/ui/UIImage';
import StringUtils from '../../../utils/StringUtils';

const itemImgW = (ScreenUtils.width - 110 - 2 * 10.5 - 2 * 30) / 3;
const bannerW = ScreenUtils.width - 110;
export default class CategorySearchPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            leftIndex: 0,
            swiperShow: false,
            bannerData: [],
            nameArr: [],
            sectionArr: []
        };
    }

    $navigationBarOptions = {
        title: '商品分类'
    };

    async componentDidMount() {
        this.$loadingShow();
        // 分类列表
        HomeAPI.findNameList().then((response) => {
            this.$loadingDismiss();
            setTimeout(() => {
                this.setState({ swiperShow: true });
            }, 0);
            let datas = response.data || [];
            // 将为您推荐id设置为-10
            let item = { id: -10, name: '为您推荐' };
            datas.unshift(item);
            this.setState({
                nameArr: datas
            });
        }).catch((data) => {
            this.$loadingDismiss();
            bridge.$toast(data.msg);
        });

        // 热门分类
        HomeAPI.findHotList().then((response) => {
            let datas = response.data || {};
            this.setState({
                sectionArr: [{ title: '热门分类', data: datas.productCategoryList }],
                bannerData: StringUtils.isEmpty(datas.img) ? [] : [{
                    img: datas.img,
                    linkType: datas.linkType,
                    linkTypeCode: datas.linkTypeCode
                }]
            })
            ;
        }).catch((data) => {
            bridge.$toast(data.msg);
        });
    }

    renderViewPageItem = (item) => {
        return (
            <TouchableOpacity onPress={() => {
                this.clickBanner(item);
            }}>
                <UIImage
                    source={{ uri: item.img }}
                    style={{ width: bannerW, height: 118, borderRadius: 5 }}
                />
            </TouchableOpacity>
        );
    };

    go2SearchPage = () => {
        this.$navigate('home/search/SearchPage');
    };

    _render() {
        return (

            <View style={{ flexDirection: 'column' }}>
                <View style={{ height: 60, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.searchBox} onPress={() => this.go2SearchPage()}>
                        <Image source={require('../res/icon_search.png')}
                               style={{ width: 22, height: 21, marginLeft: 20 }}/>
                        <View style={styles.inputText}/>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    {
                        this.state.nameArr && this.state.nameArr.length > 0 ?
                            <FlatList
                                style={{
                                    width: 90,
                                    backgroundColor: '#EEEEEE',
                                    height: ScreenUtils.height - 60 - ScreenUtils.headerHeight //屏幕高减去搜索框以及头部高
                                }}
                                renderItem={this._categoryItem}
                                refreshing={false}
                                keyExtractor={(item, index) => index}
                                showsVerticalScrollIndicator={false}
                                data={this.state.nameArr}
                            /> : <View style={{ width: 90 }}/>
                    }

                    <View style={{
                        width: bannerW + 20,
                        flexDirection: 'column',
                        backgroundColor: 'white',
                        height: ScreenUtils.height - 60 - ScreenUtils.headerHeight //屏幕高减去搜索框以及头部高
                    }}>
                        <ViewPager swiperShow={this.state.swiperShow && this.state.bannerData.length > 0}
                                   arrayData={this.state.bannerData}
                                   renderItem={(item) => this.renderViewPageItem(item)}
                                   dotStyle={{
                                       height: 5,
                                       width: 5,
                                       borderRadius: 5,
                                       backgroundColor: '#ffffff',
                                       opacity: 0.4
                                   }}
                                   activeDotStyle={{
                                       height: 5,
                                       width: 20,
                                       borderRadius: 5,
                                       backgroundColor: '#ffffff'
                                   }}
                                   autoplay={true}
                                   height={118}
                                   style={{ marginBottom: 10, marginLeft: 10, marginRight: 10 }}
                        />
                        <SectionList style={{
                            marginTop: 10,
                            marginLeft: 10,
                            marginRight: 10
                        }}
                                     contentContainerStyle={{
                                         flexWrap: 'wrap',
                                         flexDirection: 'row'
                                     }}
                                     renderItem={this._sectionItem}
                                     renderSectionHeader={this._sectionHeader}
                                     ListFooterComponent={this._listFooter}
                                     sections={this.state.sectionArr}
                                     initialNumToRender={9}
                                     removeClippedSubviews={false}
                                     stickySectionHeadersEnabled={false}
                                     showsVerticalScrollIndicator={false}
                                     keyExtractor={(item) => item.id + ''}/>
                    </View>
                </View>
            </View>
        );
    }

    _categoryItem = (item) => {
        return (
            <TouchableOpacity style={{ height: 45, flexDirection: 'row' }}
                              onPress={() => this._onCategoryClick(item.item, item.index)}>
                <View style={{
                    height: 45,
                    width: 2,
                    backgroundColor: item.index === this.state.leftIndex ? '#D51243' : '#EEEEEE'
                }}/>
                <View style={{
                    flex: 1,
                    height: 45,
                    backgroundColor: item.index === this.state.leftIndex ? 'white' : '#EEEEEE',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: 13,
                        fontWeight: item.index === this.state.leftIndex ? 'bold' : 'normal',
                        color: '#222222'
                    }}>
                        {item.item.name.length > 4 ? item.item.name.substr(0, 4) + '...' : item.item.name}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    clickBanner = (item) => {
        // banner点击跳转
        if (item.linkType === 1) {
            this.$navigate('home/product/ProductDetailPage', {
                productCode: item.linkTypeCode
            });
        } else if (item.linkType === 2) {
            this.$navigate('topic/DownPricePage', {
                linkTypeCode: item.linkTypeCode
            });
        } else if (item.linkType === 6) {
            this.$navigate('HtmlPage', {
                title: '',
                uri: item.linkTypeCode
            });
        } else if (item.linkType === 3 || item.linkType === 4 || item.linkType === 5) {
            let type = item.linkType === 3 ? 2 : item.linkType === 4 ? 1 : 3;
            this.$navigate('topic/TopicDetailPage', {
                activityCode: item.linkTypeCode,
                activityType: type
            });
        }
    };

    _onCategoryClick = (item, index) => {
        this.setState({
            leftIndex: index
        });
        // 点击分类
        if (this.state.leftIndex != index) {
            // 先隐藏，后显示，起到刷新作用
            this.setState({
                swiperShow: false,
                bannerData: [],
                sectionArr: []
            });
            if (index === 0) {
                // 热门分类
                HomeAPI.findHotList().then((response) => {
                    let datas = response.data || {};
                    this.setState({
                        sectionArr: [{ title: '热门分类', data: datas.productCategoryList }],
                        bannerData: StringUtils.isEmpty(datas.img) ? [] : [{
                            img: datas.img,
                            linkType: datas.linkType,
                            linkTypeCode: datas.linkTypeCode
                        }],
                        swiperShow: true
                    });
                }).catch((data) => {
                    bridge.$toast(data.msg);
                });
            } else {
                // 分级
                HomeAPI.findProductCategoryList({ id: item.id }).then((response) => {
                    let datas = response.data || {};
                    let arr = [];
                    for (let i = 0, len = datas.productCategoryList.length; i < len; i++) {
                        let item = {
                            title: datas.productCategoryList[i].name,
                            data: datas.productCategoryList[i].productCategoryList
                        };
                        arr.push(item);
                    }
                    this.setState({
                        sectionArr: arr,
                        bannerData: StringUtils.isEmpty(datas.img) ? [] : [{
                            img: datas.img,
                            linkType: datas.linkType,
                            linkTypeCode: datas.linkTypeCode
                        }],
                        swiperShow: true
                    });
                }).catch((data) => {
                    bridge.$toast(data.msg);
                });
            }
        }
    };

    _sectionItem = (item) => {
        return (
            <View style={{
                flexDirection: 'column',
                width: itemImgW,
                marginRight: (item.index % 3 == 0 || item.index % 3 == 1) ? 15 : 10,
                marginLeft: (item.index % 3 == 1 || item.index % 3 == 2) ? 15 : 10,
                alignItems: 'center'
            }}>
                <PreLoadImage imageUri={item.item.img}
                              style={{
                                  height: itemImgW,
                                  width: itemImgW
                              }}
                              resizeMode={'contain'}
                              onClickAction={() => this.go2ResultPage(item.item.id, item.item.name)}/>
                <UIText value={item.item.name}
                        style={{
                            textAlign: 'center',
                            height: 30,
                            fontSize: 13,
                            color: '#333',
                            marginTop: 10,
                            marginBottom: 22
                        }}/>
            </View>
        );
    };

    _sectionHeader = ({ section }) => {
        return (
            <UIText value={section.title}
                    style={{
                        fontWeight: 'bold',
                        fontSize: 13,
                        width: ScreenUtils.width - 110,
                        color: '#333',
                        marginBottom: 20
                    }}/>
        );
    };

    _listFooter = ({ section }) => {
        return (
            this.state.sectionArr.length > 0 ?
                <View style={{
                    width: ScreenUtils.width - 110,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 30,
                    marginBottom: 30
                }}>
                    <View style={{ height: 0.7, width: 20, backgroundColor: '#999999', marginRight: 10 }}/>
                    <UIText value={'没有更多啦～'} style={{ fontSize: 12, color: '#999999' }}/>
                    <View style={{ height: 0.7, width: 20, backgroundColor: '#999999', marginLeft: 10 }}/>
                </View> : null
        );
    };

    go2ResultPage(categoryId, name) {
        this.$navigate('home/search/SearchResultPage', { categoryId, name });
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column'
    },
    searchBox: {
        height: 40,
        flexDirection: 'row',
        width: ScreenUtils.width - 30,
        borderRadius: 15,
        backgroundColor: '#EEEEEE',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15
    },
    inputText: {
        flex: 1,
        padding: 5
    }
});

