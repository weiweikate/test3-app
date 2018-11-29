import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import MRBannerView from './MRBannerView';
import ScreenUtils from '../../../utils/ScreenUtils';

export default class MRBannerViewMode extends Component {

    static propTypes = {
        //ModeStyle
        modeStyle: PropTypes.number,//1划点 /2数字  默认无
        bannerHeight: PropTypes.number,

        //图片url数组
        imgUrlArray: PropTypes.array.isRequired,
        //选择index
        onDidSelectItemAtIndex: PropTypes.func,
        //滚动间隔 设置0为不滚动  默认3
        autoInterval: PropTypes.number,
        //是否轮播 默认true
        autoLoop: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = { index: 0 };
    }

    _renderPageControl = () => {
        const { modeStyle } = this.props;
        switch (modeStyle) {
            case 1:
                return this._renderStyleOne();
            case 2:
                return this._renderStyleTwo();
            default:
                return null;
        }
    };

    _renderStyleOne = () => {
        const bannerCount = this.props.imgUrlArray.length;
        let items = [];
        for (let i = 0; i < bannerCount; i++) {
            if (this.state.index === i) {
                items.push(<View key={i} style={styles.activityIndex}/>);
            } else {
                items.push(<View key={i} style={styles.index}/>);
            }
        }
        return <View style={styles.indexView}>
            {items}
        </View>;
    };

    _renderStyleTwo = () => {

        const bannerCount = this.props.imgUrlArray.length;
        return <View style={styles.indexViewTwo}>
            <Text style={styles.text}>{this.state.index + 1} / {bannerCount}</Text>
        </View>;
    };
    _onDidScrollToIndex = (e) => {
        this.setState({
            index: e.nativeEvent.index
        });
    };

    _onDidSelectItemAtIndex = (e) => {
        this.props.onDidSelectItemAtIndex && this.props.onDidSelectItemAtIndex(e.nativeEvent.index);
    };


    render() {
        const { bannerHeight, imgUrlArray, autoLoop, autoInterval } = this.props;
        return (
            <View>
                <MRBannerView style={[{ height: bannerHeight, width: ScreenUtils.width }]}
                              onDidScrollToIndex={(e) => this._onDidScrollToIndex(e)}
                              imgUrlArray={imgUrlArray}
                              onDidSelectItemAtIndex={(e) => this._onDidSelectItemAtIndex(e)}
                              autoLoop={autoLoop === false ? false : true}
                              autoInterval={autoInterval || (autoInterval === 0 ? 0 : 3)}/>
                {this._renderPageControl()}
            </View>

        );
    }
}

const styles = StyleSheet.create({
    indexView: {
        position: 'absolute',
        bottom: 13,
        left: 0,
        width: ScreenUtils.width,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    activityIndex: {
        width: 24,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#eee',
        marginLeft: 2.5,
        marginRight: 2.5
    },
    index: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#eee',
        marginLeft: 2.5,
        marginRight: 2.5
    },
    indexViewTwo: {
        position: 'absolute',
        height: 20,
        borderRadius: 10,
        right: 14,
        bottom: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#fff',
        fontSize: 10,
        paddingHorizontal: 8
    }
});