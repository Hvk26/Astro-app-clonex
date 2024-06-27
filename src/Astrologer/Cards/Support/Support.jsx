import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import BackButtonHandler from '../../../components/BackButtonHandler/BackButtonHandler';
import {Colors} from '../../../utils/Colors';
import SupportPopUp from './SupportPopUp';

const Support = () => {
  const [isVisible, setIsVisible] = useState(false);
  const onClose = () => {
    setIsVisible(!isVisible);
  };
  return (
    <BackButtonHandler>
      <View style={styles.container}>
        {/* Your content goes here */}
        <TouchableOpacity
          style={styles.stickyButton}
          onPress={() => setIsVisible(true)}>
          <Text style={styles.buttonText}>Create New Chat</Text>
        </TouchableOpacity>
        <SupportPopUp onClose={onClose} isVisible={isVisible} />
      </View>
    </BackButtonHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // To push the button to the bottom
    padding: 20, // Add padding for content
  },
  stickyButton: {
    position: 'absolute',
    bottom: 10, // Adjust bottom value as needed
    left: 20, // Adjust left value as needed
    right: 20, // Adjust right value as needed
    backgroundColor: Colors.buttonBackground,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Support;
