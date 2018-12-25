import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import UIImage from '@mr/image-placeholder';
import ScreenUtils from '../../../../../utils/ScreenUtils';
import { MRText as Text } from '../../../../../components/ui';
import DesignRule from '../../../../../constants/DesignRule';

const { px2dp } = ScreenUtils;

class ListItem extends Component {
    render() {
        const { tittle, img } = this.props.item || {};
        return (
            <View>
                <View style={styles.itemView}>
                    <UIImage style={styles.itemImg} source={img}/>
                    <Text style={styles.itemText} numberOfLines={1}>{tittle || ''}</Text>
                </View>
            </View>
        );
    }
}

export class XpDetailSelectListView extends Component {

    _renderItem = ({ item }) => {
        return <ListItem item={item}/>;
    };

    _keyExtractor = (item, index) => {
        return `${item.id}${index}`;
    };

    render() {
        const { xpDetailModel } = this.props;
        return (
            <View style={styles.bgView}>
                <FlatList data={xpDetailModel.listData}
                          renderItem={this._renderItem}
                          keyExtractor={this._keyExtractor}
                          horizontal={true}
                          showsHorizontalScrollIndicator={false}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bgView: {
        marginTop: 10
    },
    /*item*/
    itemView: {
        width: px2dp(100), marginLeft: 15,
        borderRadius: 5, borderWidth: 1, borderColor: DesignRule.lineColor_inWhiteBg
    },
    itemImg: {
        width: px2dp(100), height: px2dp(90)
    },
    itemText: {
        textAlign: 'center',
        paddingVertical: 7, paddingHorizontal: 5,
        fontSize: 12, color: DesignRule.textColor_mainTitle
    }
});

export default XpDetailSelectListView;
