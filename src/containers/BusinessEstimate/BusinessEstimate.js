/*
 * This is the business estimation scene where the user selects the price they would
 * like to pay and gets to see an estimate of the time it will take to complete the task.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { MapView } from 'expo';
import { Slider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { FontAwesome } from '@expo/vector-icons';
import estimateTimeToDone from '../../utils/estimateTimeToDone';
import styles from './BusinessEstimate-styles';
import { BackgroundMap } from '../../components';
import * as businessActions from '../../actions/business';

class BusinessEstimate extends React.Component {
  render() {
    const { businessType, ethCost, setEthCost, mapOpen } = this.props;

    const ethCostAdjusted = Math.round(ethCost * 40 * 100) / 100;
    // Get a string representing how long it will take to complete the task
    // (returns an object, e.g.: { number: 3, units: 'days' })
    const timeToFinish = estimateTimeToDone(businessType, ethCostAdjusted);
    let timeToFinishString;
    if (timeToFinish.number === Infinity) { // In case the time until done is infinite
      timeToFinishString = 'infinite time';
    } else {
      timeToFinishString = timeToFinish.number + ' ' + timeToFinish.units; // Construct string of the time until finished
    }

    return (
      <View style={styles.container}>
        <BackgroundMap />
        <ScrollView style={[styles.detailsWrap, (mapOpen ? styles.detailsMinimized : null)]} contentContainerStyle={styles.detailsWrapContentContainer}>
          <View style={styles.sliderWrap}>
            <Text style={styles.sliderTitleIcon}>
              <FontAwesome name="clock-o" size={45} />
            </Text>
            <View style={styles.sliderInnerWrap}>
              <View style={styles.sliderTitlesWrap}>
                <Text style={styles.detailTitle} numberOfLines={1}>Time</Text>
                <Text style={styles.centralText} numberOfLines={1}>{ethCostAdjusted} ETH</Text>
              </View>
              <Slider
                value={ethCost}
                onValueChange={setEthCost}
                style={styles.slider}
                trackStyle={styles.sliderTrackStyle}
                thumbStyle={styles.sliderThumbStyle}
              />
            </View>
          </View>
          <View style={styles.line}></View>
          <View>
            <Text style={styles.estimateText}>Task to be done in {timeToFinishString} at {ethCostAdjusted} ETH.</Text>
          </View>
          <View style={styles.line}></View>
          <TouchableOpacity onPress={Actions.businessExecute}>
            <View style={styles.executeTextWrap}>
              <Text style={styles.executeText}>Execute</Text>
              <FontAwesome name="angle-right" size={25} style={styles.rightArrow} />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

BusinessEstimate.propTypes = {
  ethCost: PropTypes.number.isRequired,
  setEthCost: PropTypes.func.isRequired,
  businessType: PropTypes.string.isRequired,
  mapOpen: PropTypes.bool.isRequired
};

export default connect(
  state => ({
    ethCost: state.business.ethCost,
    businessType: state.business.businessType,
    mapOpen: state.business.mapOpen
  }),
  dispatch => ({
    setEthCost: bindActionCreators(businessActions.setEthCost, dispatch)
  })
)(BusinessEstimate);
