import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

/**
 * 此组件为网络图片预加载组件,即网络图片加载可用,
 * 如果你的图片需要通过网络加载获取可使用此控件
 * 如果加载本地图片直接用Image就好了
 */
export default class PreLoadImage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoadComplete: false,
            /**
             * 0正常加载 1加载失败
             */
            type: 0
        };
    }

    render() {
        const { imageUri, style, defaultImage, errImage,onClickAction} = this.props;
        let source = { uri: imageUri };
        if (this.state.type === 1) {
            source = errImage;
        }
        return (

            onClickAction?
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    this._onClickAction();
                }}
            >
                <View>
                    <Image
                        source={source}
                        style={style}
                        onError={(error) => {
                            this.setState({
                                type: 1
                            });
                        }}
                        onLoadEnd={() => {
                            this.setState({
                                isLoadComplete: true
                            });
                        }}
                    />
                    {this.state.isLoadComplete ? null :
                        <View style={PreLoadImageStyles.preImageBgStyle}>
                            <Image
                                style={style}
                                source={defaultImage}
                            />
                        </View>
                    }
                </View>
            </TouchableOpacity>
                :
                <View>
                    <Image
                        source={source}
                        style={style}
                        onError={(error) => {
                            this.setState({
                                type: 1
                            });
                        }}
                        onLoadEnd={() => {
                            this.setState({
                                isLoadComplete: true
                            });
                        }}
                    />
                    {this.state.isLoadComplete ? null :
                        <View style={PreLoadImageStyles.preImageBgStyle}>
                            <Image
                                style={style}
                                source={defaultImage}
                            />
                        </View>
                    }
                </View>
        );
    }

    /**
     * 图片点击回调
     * @private
     */
    _onClickAction = () => {
        const { imageUri,onClickAction } = this.props;
        onClickAction && onClickAction(imageUri);
    };
}
PreLoadImage.propTypes = {
    //image Url 直接传字符串即可 http/https 必传
    imageUri: PropTypes.string.isRequired,
    //加载失败显示的图片 require 形式 可选
    errImage: PropTypes.number,
    //预加载展示的图片  require 形式 可选
    defaultImage: PropTypes.number,
    //图片的回调事件 可选 此控件点击时候的回调
    onClickAction: PropTypes.func
};
PreLoadImage.defaultProps = {
    errImage: require('./loadImageError.png'),
    defaultImage: require('./defaultImg.png')
};
const PreLoadImageStyles = StyleSheet.create({
    preImageBgStyle: {
        position: 'absolute'
    }
});