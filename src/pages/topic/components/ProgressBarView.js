/**
 * Created by xiangchen on 2018/8/6.
 */
import React, { Component } from 'react';
import { View, Text ,StyleSheet} from 'react-native';
import ScreenUtils from '../../../utils/ScreenUtils';
import ColorUtil from '../../../utils/ColorUtil';
// import TopicItemView from './TopicItemView';
import PropTypes from 'prop-types';
// 状态：0.删除 1.未开始 2.进行中 3.已售完 4.时间结束 5.手动结束
const statues = {
    deleteStatue: 0,
    noBegin: 1,
    isBeginning: 2,
    haveSoldOut: 3,
    timeOver: 4,
    handOver: 5
};
export default class ProgressBarView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.statueRender = {
            [statues.deleteStatue]: null,
            [statues.noBegin]: this._noBeginTextRender,
            [statues.isBeginning]: this._renderProgress,
            [statues.haveSoldOut]: this._renderHaveSoltOut,
            [statues.timeOver]:this._renderHaveSoltOut,
            [statues.handOver]:this._renderHaveSoltOut,
        };
    }
    render() {
        const {statue } = this.props;
        return (
            this.statueRender[statue] ? this.statueRender[statue]():null
        );
    }
    _renderProgress = () => {
        const { progressValue, haveRobNum} = this.props;
        return (
            <View style={{
                width: ScreenUtils.width / 2 - 40,
                height: 12,
                borderRadius: 6,
                backgroundColor: 'rgba(230, 0, 18, 0.3)'
                , justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5
            }}>
                <View style={{
                    width: progressValue / 100 * (ScreenUtils.width / 2 - 40),
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: ColorUtil.Color_d51243,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    position: 'absolute'
                }}>

                </View>
                <Text style={{ fontSize: 11, marginLeft: 5, color: ColorUtil.Color_ffffff }}>
                    {'已抢' + haveRobNum + '件'}
                </Text>
                <Text style={{
                    fontSize: 11,
                    marginRight: 5,
                    color: ColorUtil.Color_ffffff
                }}>
                    {progressValue + '%'}
                </Text>

            </View>
        );

    };
    _noBeginTextRender = () => {
        const {itemData} = this.props;
          return(
              <View>
                  <Text
                      style={Styles.normalTextStyle}
                      number={1}
                  >
                      {itemData.reseCount + '人已关注'}
                  </Text>
              </View>

          )
    };
    _renderHaveSoltOut = () => {
        const {itemData} = this.props;
        return(
            <Text
                style={[Styles.normalTextStyle,
                    {color:ColorUtil.Color_999999}
                ]}
                number={1}
            >
                {'抢光了' + itemData.totalNumber + '件'}
            </Text>
        )

    };
}
const  Styles = StyleSheet.create({
    normalTextStyle:{
        color: ColorUtil.Color_33b4ff,
        fontSize: 11,
        marginTop: 5,
        marginLeft: 0,
        marginRight: 10
    }
})

ProgressBarView.propTypes = {
    progressValue: PropTypes.number.isRequired,
    haveRobNum: PropTypes.number.isRequired,
    statue: PropTypes.number,
    itemData: PropTypes.object
};
