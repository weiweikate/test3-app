/**
 *
 * Copyright 2018 杭州飓热科技有限公司   版权所有
 * Copyright 2018 JuRe Group Holding Ltd. All Rights Reserved
 *
 * @flow
 *
 * Created by xzm on 2018/10/18.
 *
 */
'use strict';
import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import BasePage from '../../../../BasePage';

type Props = {};
export default  class UserPromotionPage  extends BasePage<Props> {
  constructor(props) {
    super(props);
    this.state = {};
    this._bind();
  }

  $navigationBarOptions = {
    title: '我的推广订单',
    show: true// false则隐藏导航
  };

  _bind() {
    this.loadPageData = this.loadPageData.bind(this);
  }

  componentDidMount() {
    this.loadPageData();
  }

  loadPageData() {
  }
  /******/

  _render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
