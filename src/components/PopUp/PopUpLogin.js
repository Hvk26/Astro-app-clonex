import {
  StyleSheet,
  Text,
  View,
  Modal,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
const transparentColor = 'rgba(0, 0, 0, 0.5)';

const PopUpLogin = ({isVisible, onClose}) => {
  const navigation = useNavigation();
  const handleClose = () => {
    onClose();
  };
  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.container}>
        <Text
          style={{
            fontSize: 20,
            color: '#008020',
            paddingTop: 40,
            fontWeight: '700',
          }}>
          Please Login..!!!
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            bottom: 0,
            paddingTop: 30,
            gap: 17,
          }}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate('LogIn')}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleClose}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default PopUpLogin;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 200,
    backgroundColor: '#eaeaea',
    width: '100%',
    borderRadius: 14,
    gap: 2,
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: '#141414',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#141414',
    width: 130,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,
  },
});
