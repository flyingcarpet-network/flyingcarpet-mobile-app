/*
 * This is a presentational component that display an icon, a title, and a value all in a row.
 * The component is used to display hardware information on both the Drone and FlyingCarpet
 * owner pages.
 * @flow
 */

import * as React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './HardwareDetail-styles';

type Props = {
  icon: string,
  title: string,
  value: string,
  showBottomBorder: boolean, // Represents whether a thin light border should be displayed at the bottom of the component
  pressable: boolean, // Represents whether a right arrow should be showen instead of a "value" (true when HardwareDetail is being used a button)
  redText: boolean, // Represents whether the text should be in a red font
  greenText: boolean // Represents whether the text should be in a green font
};

export default class HardwareDetail extends React.Component<Props> {
  static defaultProps = {
    icon: '',
    showBottomBorder: true,
    value: '',
    pressable: false,
    redText: false,
    greenText: false
  };
  render(): React.Node {
    const { icon, title, value, showBottomBorder, pressable, redText, greenText } = this.props;

    // Configure any optional color changes
    const extraColorStyles = (redText ? styles.red : (greenText ? styles.green : null));
    return (
      <View style={[styles.detailWrap, (showBottomBorder ? styles.borderBottom : null)]}>
        {(icon.length > 0) &&
          <FontAwesome name={icon} size={28} style={[styles.icon, extraColorStyles]} />
        }
        {(icon.length === 0) &&
          <Text style={styles.icon} />
        }
        <Text style={[styles.detailTitle, extraColorStyles]}>{title}</Text>
        {(!pressable) &&
          <Text style={styles.detailText} numberOfLines={1}>{value}</Text>
        }
        {pressable &&
          <Text style={styles.detailText}>
            <FontAwesome name="angle-right" size={28} style={styles.icon} />
          </Text>
        }
      </View>
    );
  }
}
