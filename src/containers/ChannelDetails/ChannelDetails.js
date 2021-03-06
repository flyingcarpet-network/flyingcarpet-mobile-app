/*
 * This is the state channel details scene where the user view their the details of a particular state channel (associated with a FC or drone).
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { HardwareDetail } from '../../components';
import styles from './ChannelDetails-styles';

class ChannelDetails extends React.Component {
  render() {
    const { channelData } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.detailsWrap} contentContainerStyle={styles.detailsWrapContentContainer}>
          <HardwareDetail icon="id-card" title="Name" value={channelData.name} />
          <HardwareDetail icon="qrcode" title="Partner Address" value={channelData.partnerAddress} />
          <HardwareDetail icon="qrcode" title="Channel Address" value={channelData.partnerAddress} />
          <HardwareDetail icon="usd" title="Channel Balance" value={channelData.balance + ' ETH'} />
          <HardwareDetail icon="calendar" title="Settle Time" value={channelData.settleTime + 'm'} />
          <HardwareDetail icon="clock-o" title="Reveal Time" value={channelData.revealTime + 'm'} />
          <HardwareDetail icon="folder-open" title="State" value={channelData.state} />
          <HardwareDetail icon="chain-broken" title="Settle Channel Now" redText showBottomBorder={false} />
        </ScrollView>
      </View>
    );
  }
}

ChannelDetails.propTypes = {
  channelData: PropTypes.object.isRequired
};

export default connect(
  state => ({
    channelData: state.flyingCarpetOwner.channelData
  })
)(ChannelDetails);
