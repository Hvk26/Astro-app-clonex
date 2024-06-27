import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import {Colors} from '../../../utils/Colors';
const SupportPopUp = ({onClose, isVisible}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            style={{
              minHeight: 120,
              textAlignVertical: 'top',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#008020',
              color: '#000',
              paddingHorizontal: 6,
              backgroundColor: '#fff',
            }}
            placeholder="Write Your issue here..."
            placeholderTextColor={'#000'}
          />
          <View
            style={{
              marginTop: 10,
              justifyContent: 'center',
              alignSelf: 'center',
              flexDirection: 'row',
              gap: 20,
              width: 200,
            }}>
            <Button
              mode="contained"
              style={{width: 130}}
              onPress={onClose}
              buttonColor={Colors.black7}>
              Submit
            </Button>
            <Button
              mode="contained"
              style={{width: 130}}
              onPress={onClose}
              buttonColor={'red'}>
              Close
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SupportPopUp;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  modalContent: {
    width: '90%',
    backgroundColor: Colors.title2,
    borderRadius: 14,
    padding: 10,
  },
  modalTitle: {
    color: Colors.black4,
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  iconSection: {
    alignItems: 'center',
  },
  iconText: {
    marginTop: 5,
  },
});
