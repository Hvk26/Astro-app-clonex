import axios from 'axios';
import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  Dimensions,
  TextInput,
} from 'react-native';
import Service_URL from '../../utils/Constant';
import {UserType} from '../../UserContext';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import {Colors} from '../../utils/Colors';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const transparentColor = 'rgba(0, 0, 0, 0.5)';
const PopUpForm = ({isVisible, onClose, onSubmit}) => {
  const {height, width} = Dimensions.get('screen');
  const [name, setName] = useState('');
  const [placeOfBirth, setPlaceOfBirth] = useState('');
  const [timeOfBirth, setTimeOfBirth] = useState('');
  const [dob, setDob] = useState('');
  const {userId, setuserId} = useContext(UserType);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [time, setTime] = useState('');
  const transparentColor = 'rgba(0, 0, 0, 0.9)';
  const navigation = useNavigation();
  
  const handleFormSubmit = async () => {
    // Call the onSubmit callback with the form data
    const formData = {name, time, selectedDate, placeOfBirth};
    console.log('formData: ', formData); // Ensure that formData is logged correctly
    try {
      const response = await axios.put(
        `${Service_URL}/user/updateUserDetail/${userId}`,
        formData,
      );
      if (response.status === 200) {
        Alert.alert('Request Sent Successfully');
      }
    } catch (error) {
      console.log('Failed to store data', error);
    }

    navigation.navigate('ChatScreen');
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = date => {
    const dateObject = new Date(date);

    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const year = dateObject.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    setSelectedDate(formattedDate);
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = time => {
    const dateObject = new Date(time);
    const hours = String(dateObject.getUTCHours()).padStart(2, '0');
    const minutes = String(dateObject.getUTCMinutes()).padStart(2, '0');

    // Format the time as HH:MM
    const formattedTime = `${hours}:${minutes}`;
    setTime(formattedTime);
    console.log('formattedTime:', formattedTime);
  };
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      style={{
        width: width,
        marginLeft: 0,
        marginBottom: 0,
      }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          height: 405,
          width: '100%',
          borderRadius: 14,
          gap: 2,
          alignItems: 'center',
          backgroundColor: transparentColor,
          paddingHorizontal: 10,
          paddingBottom: 20,
        }}>
        <Text style={styles.title}>Add Details</Text>
        {/* <View style={{width: '100%', paddingHorizontal: 5}}>
          <TextInput
            mode="outlined"
            label="Name"
            value={name}
            onChangeText={text => setName(text)}
            textColor="#000"
          />
          <TextInput
            mode="outlined"
            label="Place Of Birth"
            value={placeOfBirth}
            onChangeText={text => setPlaceOfBirth(text)}
            textColor="#000"
          />
          <TextInput
            mode="outlined"
            value={timeOfBirth}
            onChangeText={text => setTimeOfBirth(text)}
            label="Time of Birth (HH:MM)"
            textColor="#000"
          />
          <TextInput
            mode="outlined"
            value={dob}
            onChangeText={text => setDob(text)}
            label="Date Of Birth (dd/mm/yyyy)"
            textColor="#000"
          />
        </View> */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 10,
            alignItems: 'center',
          }}>
          <Text style={styles.inputTitle}>Name</Text>
          <TextInput
            value={name}
            onChangeText={text => setName(text)}
            placeholderTextColor="#000"
            placeholder="Name"
            style={{
              flex: 1,
              borderRadius: 30,
              backgroundColor: '#fff',
              borderColor: Colors.grey4,
              justifyContent: 'center',
              paddingHorizontal: 10,
              paddingVertical: 6,
              color: '#000',
            }}
          />
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 10,
            alignItems: 'center',
          }}>
          <Text style={styles.inputTitle}>Date of Birth: </Text>
          <TouchableOpacity
            style={{
              borderWidth: 0.5,
              borderRadius: 30,
              backgroundColor: '#fff',
              borderColor: Colors.grey4,
              justifyContent: 'center',
              paddingHorizontal: 10,
              paddingVertical: 10,
              flex: 1,
            }}
            onPress={() => showDatePicker()}>
            <Text style={{color: Colors.black7}}>
              {!selectedDate ? 'Date of Birth' : selectedDate}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 10,
            alignItems: 'center',
          }}>
          <Text style={styles.inputTitle}>Time of Birth: </Text>

          <TouchableOpacity
            style={{
              borderWidth: 0.5,
              borderRadius: 30,
              backgroundColor: '#fff',
              borderColor: Colors.grey4,
              justifyContent: 'center',
              paddingHorizontal: 10,
              paddingVertical: 10,
              flex: 1,
            }}
            onPress={() => showTimePicker()}>
            <Text style={{color: Colors.black7}}>
              {!time ? 'Time of Birth' : time}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 10,
            alignItems: 'center',
          }}>
          <Text style={styles.inputTitle}>Place of Birth:</Text>
          <TextInput
            value={placeOfBirth}
            onChangeText={text => setPlaceOfBirth(text)}
            placeholderTextColor="#000"
            placeholder="Birth Place"
            style={{
              flex: 1,
              borderRadius: 30,
              backgroundColor: '#fff',
              borderColor: Colors.grey4,
              justifyContent: 'center',
              paddingHorizontal: 10,
              paddingVertical: 6,
              color: '#000',
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            gap: 15,
            justifyContent: 'space-evenly',
            marginTop: 5,
          }}>
          <Button
            mode="contained"
            onPress={handleFormSubmit}
            buttonColor={Colors.lightYellow}>
            Submit
          </Button>
          <Button mode="contained" onPress={handleClose}>
            Close
          </Button>
        </View>
      </KeyboardAvoidingView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date()}
      />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
        is24Hour={true}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.75,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    //marginBottom: 10,
    color: '#fff',
    textDecorationLine: 'underline',
    textDecorationColor: '#141414',
    paddingVertical: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    color: '#000',
  },
  button: {
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
  },
  inputTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    width: 120,
  },
});

export default PopUpForm;
