import React from 'react';
import BasePage from '../../BasePage';

import {
    View,
    SectionList,
    StyleSheet
} from 'react-native';
import { observer } from 'mobx-react';
import ColorUtil from '../../utils/ColorUtil';
import { ActivityOneView } from './components/SbSectiontHeaderView';
import ScreenUtils from '../../utils/ScreenUtils';
import SbOpenPrizeHeader from './components/SbOpenPrizeHeader';
import OpenPrizeItemView from './components/OpenPrizeItemView';
// import HomeAPI from '../api/HomeAPI';
import TotalTopicDataModel from './model/SubTopicModel';

@observer
export default class DownPricePage extends BasePage {

    $navigationBarOptions = {
        title: '专题',
        show: true
    };

    constructor(props) {
        super(props);
        this.dataModel = new TotalTopicDataModel();
        this.state={
            selectNav:0
        }
    }

    componentDidMount() {
        this.dataModel.loadTopicData('ZT20180002');
    }

    _render() {
        const sectionList = this.dataModel.sectionDataList.slice() || [];
        let sectionData = [];
        if (sectionList.length > 0) {
            sectionData = sectionList[this.state.selectNav].sectionDataList||[];
        }else {

        }

        return (
            <View style={
                {
                    flex:1
                }
            }>
                <SectionList
                    contentContainerStyle={Styles.list}
                    style={{
                        backgroundColor: ColorUtil.Color_f7f7f7
                    }}
                    // numColumns={2}
                    columnWrapperStyle={Styles.itemBgStyle}
                    stickySectionHeadersEnabled={false}
                    /* 渲染头*/
                    renderSectionHeader={
                        ({ section }) => {
                            if (section.key == 'one') {
                                return this._renderHeaderView(section.key);
                            } else {
                                return this._renderActivityView(section.key);
                            }
                        }
                    }
                    renderItem={({ item, index, section }) => {
                        return this._renderRowView(item);
                    }}
                    // contentContainerStyle={styles.list}//设置cell的样式
                    // pageSize={2}  // 配置pageSize确认网格数量
                    sections={sectionData}
                    // sections={
                    //     [
                    //     {
                    //         title: 'one',
                    //         key: 'one',
                    //         data: [
                    //             { key: 'Devin' },
                    //             { key: 'Jackson' },
                    //             { key: 'James' },
                    //             { key: 'Joel' },
                    //             { key: 'John' },
                    //             { key: 'Jillian' }
                    //         ]
                    //     },
                    //     {
                    //         key: 'two',
                    //         data: [
                    //             { key: 'Devin' },
                    //             { key: 'Jackson' },
                    //             { key: 'James' },
                    //             { key: 'Joel' },
                    //             { key: 'John' },
                    //             { key: 'Jillian' },
                    //             { key: 'Jimmy' },
                    //             { key: 'Julie' }
                    //         ]
                    //     }
                    // ]
                    // }

                />
            </View>
        );
    }

    /**
     *
     * @param key
     * @returns {*}
     * @private
     */
    _renderActivityView = (key) => {
        return <ActivityOneView/>;
    };
    /**
     *
     * @param key
     * @returns {*}
     * @private
     */
    _renderHeaderView = (key) => {
        console.log(this.dataModel);
        if (key === 'one') {
            return <SbOpenPrizeHeader
                headerData={this.dataModel}
                navItemClick={(index, item) => {
                    //自导航点击事件
                    this.setState({
                        selectNav:index
                    })
                }}
            />;
        } else {
            return <ActivityOneView/>;
        }
    };
    /**
     *
     * @param item
     * @returns {*}
     * @private
     */
    _renderRowView = (item) => {
        return (<OpenPrizeItemView
                itemData={item}
        />);
    };
    /**
     *
     * @private
     */
    _itemClickAction = () => {

    };
}
const Styles = StyleSheet.create({
    list: {
        flexDirection: 'row',//设置横向布局
        flexWrap: 'wrap',  //设置换行显示
        // alignItems: 'flex-start',
        backgroundColor: '#FFFFFF'
    },
    itemBgStyle: {
        width: ScreenUtils.width / 2,
        height: ScreenUtils.width / 2 + 100,
        backgroundColor: ColorUtil.Color_f7f7f7,
        padding: 8,
        paddingBottom: 0
    }
});
