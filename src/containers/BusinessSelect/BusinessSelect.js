/*
 * This is the business selection scene where the user selects the
 * business service they would like to use from a list.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import { FontAwesome } from '@expo/vector-icons';
import styles from './BusinessSelect-styles';
import * as businessActions from '../../actions/business';
import { BackgroundMap } from '../../components';

class BusinessSelect extends React.Component {
  selectBusiness = businessType => {
    const { setBusinessType } = this.props;

    // Save the name of the business type to redux
    setBusinessType(businessType);

    // Move user to businessDetails scene
    Actions.businessDetails();
  }
  render() {
    const services = [
      {
        name: 'Infrastructure',
        icon: 'building'
      },
      {
        name: 'Agriculture',
        icon: 'leaf'
      },
      {
        name: 'Media',
        icon: 'newspaper-o'
      },
      {
        name: 'Transport',
        icon: 'truck'
      },
      {
        name: 'Security',
        icon: 'lock'
      },
      {
        name: 'Insurance',
        icon: 'handshake-o'
      },
      {
        name: 'Telecommunication',
        icon: 'globe'
      },
      {
        name: 'Mining',
        icon: 'subway'
      }
    ];

    return (
      <View style={styles.container}>
        <BackgroundMap displayCloseButton={false} />
        <View style={styles.innerContainer}>
          <View style={styles.businessTypeListWrap}>
            {/* This spacers makes it so that the first row only contains two service icons */}
            <View style={styles.spacer}></View>
            {services.map((service, i) => (
              /* Note, the wrap is a different width if it's one of the first two services listed (hence the additional style) */
              <TouchableOpacity key={i} style={styles.businessTypeWrap} onPress={() => this.selectBusiness(service.name)}>
                <View style={styles.businessTypeCircle}>
                  <FontAwesome name={service.icon} size={30} style={styles.businessTypeIcon} />
                </View>
                <Text style={styles.businessTypeText} numberOfLines={1}>{service.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
  }
}

BusinessSelect.propTypes = {
  setBusinessType: PropTypes.func.isRequired
};

export default connect(
  null,
  dispatch => ({
    setBusinessType: bindActionCreators(businessActions.setBusinessType, dispatch)
  })
)(BusinessSelect);
