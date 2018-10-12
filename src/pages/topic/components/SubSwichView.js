import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Animated,
    ScrollView
} from 'react-native';
import UIText from '../../../comm/components/UIText';
import ScreenUtils from '../../../utils/ScreenUtils';
import ColorUtil from '../../../utils/ColorUtil';
import PropTypes from 'prop-types';


export default class SubSwichView extends Component {

    static propTypes = {
        subjectType: PropTypes.number,
        headerData: PropTypes.object.isRequired,
        navItemClick: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        // const {topicNavTitleList} = this.props
        // const titleWith = ScreenUtils.width/topicNavTitleList.slice().length
        this.state = {
            bottomLineMarginLeft: new Animated.Value(0),
            selectState: 0
        };
    }

    render() {
        // const { headerData } = this.props;
        return (
            <View style={SwichStyles.swichBgStyle}>
                {this._renderTitleItem()}
            </View>
        );
    }

    _renderTitleItem = () => {
        const { topicNavTitleList } = this.props.headerData || [];
        let tempTitleArr = topicNavTitleList || [];
        return (
            <ScrollView
                        ref="scroll"
                        style={{
                            width: ScreenUtils.width,
                        }}
                        contentContainerStyle={
                            SwichStyles.titleBgStyle
                        }
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
            >
                {
                    tempTitleArr.slice().map((titleItem, titleItemIndex) => {
                        return <View
                        style={{
                            width:ScreenUtils.width/2,
                            justifyContent:'center',
                            flexDirection:'column',
                            // alignItems:'center'
                        }}
                        >
                            <UIText
                                onPress={() => {
                                    this.itemClick(titleItemIndex);
                                }}
                                style={[SwichStyles.titleItemStyle,
                                    this.state.selectState === titleItemIndex ?
                                        {
                                            color: ColorUtil.mainRedColor
                                        }
                                        :
                                        { color: ColorUtil.Color_666666 }

                                ]}
                                value={titleItem.title}
                            />
                            {
                                this.state.selectState === titleItemIndex ?
                                    <View
                                        style={
                                            {
                                                width:70,
                                                marginLeft:(ScreenUtils.width/2 - 70)/2,
                                                marginTop:10,
                                                height:1,
                                                backgroundColor:ColorUtil.mainRedColor
                                            }
                                        }
                                    />
                                    :
                                    <View
                                        style={
                                            {
                                                marginTop:10,
                                                height:1,
                                                backgroundColor:ColorUtil.Color_ffffff
                                            }
                                        }
                                    />
                            }

                        </View>;

                    })
                }
            </ScrollView>
        );

    };

    itemClick = (index) => {
        this.setState({
            selectState: index
        });
        this.props.navItemClick&&this.props.navItemClick(index)
    };
}

const SwichStyles = StyleSheet.create({
        swichBgStyle: {
            width: ScreenUtils.width,
            height: 48
        },
        titleBgStyle: {
            height: 47,
            flexDirection: 'row',
        },
        titleItemStyle: {
            paddingTop: 15,
            color: ColorUtil.Color_d51243,
            fontSize: 16,
            width:ScreenUtils.width/2,
            textAlign:'center'
        },
        bottomLineViewStyle: {
            height: 2,
            backgroundColor: ColorUtil.Color_d51243,
            width: 50,
            marginLeft: (ScreenUtils.width - 70 * 2) / 4
        },
    }
);
