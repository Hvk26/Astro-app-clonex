import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';

const BottomPopUp = ({isVisible, onClose}) => {
  return <View style={styles.container}></View>;
};

export default BottomPopUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
