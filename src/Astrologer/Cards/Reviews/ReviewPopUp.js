import {StyleSheet, Text, View, Modal, TextInput, Alert} from 'react-native';
import React from 'react';

import {Button} from 'react-native-paper';
import {Colors} from '../../../utils/Colors';

const ReviewPopUp = ({onClose, isVisible}) => {
  const handleSubmit = () => {
    Alert.alert('Review Submitted');
    onClose();
  };
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            style={{
              minHeight: 100,
              textAlignVertical: 'top',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#008020',
              color: '#000',
              paddingHorizontal: 10,
              backgroundColor: '#fff',
            }}
            placeholder="Write here..."
            placeholderTextColor={'#000'}
          />
          <View
            style={{
              marginTop: 10,
              width: 150,
              justifyContent: 'center',
              alignSelf: 'center',
              flexDirection: 'row',
              gap: 40,
            }}>
            <Button
              mode="contained"
              onPress={handleSubmit}
              buttonColor={Colors.black7}>
              Submit
            </Button>
            <Button mode="contained" onPress={onClose} buttonColor={'red'}>
              Cancel
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#f3ffe7',
    borderRadius: 14,
    padding: 20,
  },
});

export default ReviewPopUp;
