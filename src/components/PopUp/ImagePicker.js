import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import {Colors} from '../../utils/Colors';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ImagePicker = ({isVisible, onClose}) => {
  return (
    <Modal
      style={{
        width: '100%',
        marginLeft: 0,
        marginBottom: 0,
      }}
      animationType="fade"
      isVisible={isVisible}
      transparent={true}>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          height: 230,
          backgroundColor: '#f3ffe7',
          width: '100%',
          borderRadius: 14,
          gap: 2,
          alignContent: 'center',
          alignItems: 'center',
          borderTopEndRadius: 10,
        }}>
        <Text
          style={{
            color: Colors.black4,
            marginTop: 15,
            fontSize: 17,
            fontWeight: '500',
          }}>
          Profile Photo
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.iconSection}>
            <Feather name="camera" size={24} color={'#FF6347'} />
            <Text style={styles.iconText}>Camera</Text>
          </View>
          <View style={styles.iconSection}>
            <FontAwesome name="photo" size={24} color={'#FF6347'} />
            <Text style={styles.iconText}>Gallery</Text>
          </View>
          <View style={styles.iconSection}>
            <AntDesign name="delete" size={24} color={Colors.grey2} />
            <Text style={styles.iconText}>Remove</Text>
          </View>
        </View>
        <Button mode="contained" onPress={onClose}>
          Close
        </Button>
      </View>
    </Modal>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  iconSection: {
    margin: 25,
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.grey4,
    padding: 12,
    borderRadius: 10,
    gap: 4,
    width: 80,
  },
  iconText: {
    fontSize: 15,
    color: Colors.grey2,
  },
});
