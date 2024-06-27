import {
  StyleSheet,
  Text,
  View,
  Modal,
  KeyboardAvoidingView,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React from 'react';
const transparentColor = 'rgba(0, 0, 0, 0.5)';

const BackButtonPopUp = ({isVisible, onClose}) => {
  const handleExitApp = () => {
    BackHandler.exitApp();
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };
  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View
        style={{
          flex: 1,
          backgroundColor: transparentColor,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '500',
              color: '#000',
              marginTop: 10,
            }}>
            Wait!!!!
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '400',
              padding: 15,
              color: '#000',
            }}>
            Are you sure you want to lose your first free chat with astrologer?
          </Text>
          <View style={{}}>
            <TouchableOpacity
              style={{
                backgroundColor: '#FBE300',
                borderRadius: 10,
                padding: 2,
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.button}>I want free chat</Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                gap: 25,
                marginTop: 10,
              }}>
              <TouchableOpacity
                onPress={handleCancel}
                style={{
                  borderRadius: 10,
                  padding: 2,
                  borderColor: '#cebc0f',
                  borderWidth: 1,
                }}>
                <Text style={[styles.button, {paddingHorizontal: 25}]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleExitApp}
                style={{
                  borderRadius: 10,
                  padding: 2,
                  backgroundColor: '#848484',
                }}>
                <Text
                  style={[
                    styles.button,
                    {paddingHorizontal: 25, color: '#fff'},
                  ]}>
                  Exit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BackButtonPopUp;

const styles = StyleSheet.create({
  container: {
    flex: 0.35,
    alignItems: 'center',
    width: '90%',
    height: '50%',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  button: {
    fontSize: 20,
    color: '#000',
    padding: 5,
  },
});
