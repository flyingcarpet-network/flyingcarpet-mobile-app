/*
 * This is the business details scene where the user chooses the
 * business service options they would like to use to run the task.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { MapView } from 'expo';
import { Slider, CheckBox } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { FontAwesome } from '@expo/vector-icons';
import styles from './BusinessDetails-styles';
import getServiceCheckboxOptions from '../../utils/getServiceCheckboxOptions';
import * as businessActions from '../../actions/business';

class BusinessDetails extends React.Component {
  componentWillUnmount() {
    const { reset } = this.props;

    // Reset the redux router each time the component is unmounted
    reset();
  }
  handleMapPress = e => {
    const { addLocationCoordinate } = this.props;

    // Add coordinate (lat/long pair) to redux for the user's pressed location
    addLocationCoordinate(e.nativeEvent.coordinate);
  }
  render() {
    const { selectedLocationCoordinates, altitute, setAltitute, businessType, flightDirection, setFlightDirection, toggleOption, selectedOptions } = this.props;

    // Get an array of the different checkbox options for the business type
    const options = getServiceCheckboxOptions(businessType);

    return (
      <View style={styles.container}>
        <View style={styles.line}></View>
        <ScrollView style={styles.detailsWrap} contentContainerStyle={styles.detailsWrapContentContainer}>
          <Text style={styles.detailTitle}>Select Land</Text>
          <View style={styles.mapWrap}>
            <MapView
              style={styles.map}
              // NOTE: this initialRegion should be updated to get the user's current location and use it, see:
              //       https://docs.expo.io/versions/latest/sdk/location.html
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              onPress={this.handleMapPress}
            >
              {(selectedLocationCoordinates.length >= 3) && // Only show polygon region if some coordinates have been added
                <MapView.Polygon
                  coordinates={selectedLocationCoordinates}
                  strokeColor={'#ff0000'}
                  fillColor={'rgba(0,0,0,0.5)'}
                  strokeWidth={2}
                />
              }
              {selectedLocationCoordinates.map((coordinate, i) => (
                <MapView.Marker
                  key={i}
                  coordinate={coordinate}
                />
              ))}
            </MapView>
          </View>
          {(businessType.toLowerCase() === 'agriculture') &&
            <View style={styles.sliderWrap}>
              <Text style={styles.detailTitle}>Select Altitute</Text>
              <Text style={styles.centralText}>{(Math.round((5 + (altitute * 25)) * 100) / 100)} Metres</Text>
              <Slider
                value={altitute}
                onValueChange={setAltitute}
              />
            </View>
          }
          {(businessType.toLowerCase() === 'agriculture') &&
            <View style={styles.sliderWrap}>
              <Text style={styles.detailTitle}>Select Flight Direction</Text>
              <Text style={styles.centralText}>{(Math.round((flightDirection * 360) * 100) / 100)} Degrees</Text>
              <Slider
                value={flightDirection}
                onValueChange={setFlightDirection}
              />
            </View>
          }
          <View style={styles.optionCheckboxesWrap}>
            {options.map((option, i) => (
              <CheckBox
                key={i}
                title={option}
                checked={selectedOptions[option] === true}
                onPress={() => toggleOption(option)}
              />
            ))}
          </View>
          <TouchableOpacity onPress={Actions.businessEstimate}>
            <View style={styles.estimateTextWrap}>
              <Text style={styles.estimateText}>Estimate</Text>
              <FontAwesome name="angle-right" size={25} style={styles.rightArrow} />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

BusinessDetails.propTypes = {
  selectedLocationCoordinates: PropTypes.array.isRequired,
  addLocationCoordinate: PropTypes.func.isRequired,
  altitute: PropTypes.number.isRequired,
  setAltitute: PropTypes.func.isRequired,
  businessType: PropTypes.string.isRequired,
  flightDirection: PropTypes.number.isRequired,
  setFlightDirection: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  toggleOption: PropTypes.func.isRequired,
  selectedOptions: PropTypes.object.isRequired
};

export default connect(
  state => ({
    selectedLocationCoordinates: state.business.selectedLocationCoordinates,
    altitute: state.business.altitute,
    businessType: state.business.businessType,
    flightDirection: state.business.flightDirection,
    selectedOptions: state.business.selectedOptions
  }),
  dispatch => ({
    addLocationCoordinate: bindActionCreators(businessActions.addLocationCoordinate, dispatch),
    setAltitute: bindActionCreators(businessActions.setAltitute, dispatch),
    setFlightDirection: bindActionCreators(businessActions.setFlightDirection, dispatch),
    reset: bindActionCreators(businessActions.reset, dispatch),
    toggleOption: bindActionCreators(businessActions.toggleOption, dispatch)
  })
)(BusinessDetails);