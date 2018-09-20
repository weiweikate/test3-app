//店铺评分页面 PASS
import React from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    ScrollView,
} from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
const WhitePanelHeight = 128 / 375 * SCREEN_WIDTH;
import BgIcon from './res/bg_07.png';
import StarIcon from './res/wjx_03.png';
import storeModel from '../model/storeModel';
import BasePage from '../../../BasePage';

export default class ShopScorePage extends BasePage {

    $navigationBarOptions = {
        title: '店铺评分',
    };

    _render() {

        const storeStar = storeModel.storeStar || 1;
        const starsArr = [];
        if(storeStar && typeof storeStar === "number"){
            for(let i = 0; i<storeStar; i++){
                i <= 2 && starsArr.push(i);
            }
        }

        const t1 = '如果是商城店铺，就不用为信誉等级顾虑，如果是淘宝C店，升级方式就是有销售，每一笔销售产生一个信誉评价，信誉评价的累积就是等级的累积。像初级的“心”级、中期的“钻石”级、后期大卖的“皇冠”、终级卖家“金冠”，都是靠慢慢的销售累积的销量。关于要多少笔销售可以到心、或钻、或皇冠的，淘宝都有明细介绍的。';

        const t2 = '如果是商城店铺，就不用为信誉等级顾虑，如果是淘宝C店，升级方式就是有销售，每一笔销售产生一个信誉评价，信誉评价的累积就是等级的累积。';

        return (
            <View style={{flex:1}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.whitePanel}>
                        <View style={styles.starContainer}>
                            {
                                starsArr.map((item,index)=>{
                                    return <Image key={index} style={[index ? {marginLeft: 35} : null]} source={StarIcon}/>
                                })
                            }
                        </View>
                        <Text style={styles.shopLevel}>铂金店铺</Text>
                    </View>
                    <View style={styles.content}>

                        <Text style={styles.title}>
                            店铺如何升级？
                        </Text>
                        <Text style={styles.subTitle}>
                            {t1}
                        </Text>

                        <Image style={styles.img} source={BgIcon}/>

                        <Text style={styles.title}>
                            升级后有哪些好处？
                        </Text>

                        <Text style={styles.subTitle}>
                            {t2}
                        </Text>

                    </View>
                    <View style={styles.gap}/>
                </ScrollView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    whitePanel: {
        marginTop: 10,
        width: SCREEN_WIDTH,
        height: WhitePanelHeight,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'white',
    },
    starContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32 / 128 * WhitePanelHeight,
    },
    shopLevel: {
        fontFamily: "PingFang-SC-Medium",
        fontSize: 15,
        color: "#222222",
        marginBottom: 16 / 128 * WhitePanelHeight,
    },
    content: {
        alignItems: 'center',
        width: SCREEN_WIDTH,
        paddingHorizontal: 25,
        marginTop: 12,
    },
    title: {
        marginTop: 16,
        fontFamily: "PingFang-SC-Medium",
        fontSize: 15,
        color: "#222222"
    },
    subTitle: {
        marginTop: 12,
        fontSize: 12,
        lineHeight: 18,
        color: "#666666"
    },
    img: {
        marginTop: 18,
        width: SCREEN_WIDTH - 50 ,
        height: 184 / 328 * (SCREEN_WIDTH - 50)
    },
    gap:{
        height: 25
    }
});