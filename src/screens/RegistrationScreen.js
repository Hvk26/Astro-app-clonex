import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Dimensions,
  Linking,
} from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import Service_URL from '../utils/Constant';
import {Colors} from '../utils/Colors';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const {width, height} = Dimensions.get('screen');
const RegistrationScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [yearsOfExperience, setYearsOfExperience] = useState('');

  const navigation = useNavigation();
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(false);
    setDateOfBirth(currentDate);
  };

  const handleSubmit = async () => {
    if (!name || !email || !password || !phoneNumber) {
      Alert.alert('Error', 'Please fill in all the fields.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }
    if (password.length < 7) {
      Alert.alert('Error', 'Password must be at least 5 characters long.');
      return;
    }
    if (phoneNumber.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number.');
      return;
    }
    try {
      const userData = {
        name,
        email,
        password,
        phoneNumber,
        dateOfBirth: dateOfBirth.toISOString(),
        role: 'user',
      };

      const response = await axios.post(`${Service_URL}/register`, userData);
      if (response.status === 201) {
        firebaseAuth();
        Alert.alert(
          'Registration Successfully',
          'You have registered successfully',
        );
        navigation.navigate('LogIn');
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.error === 'Email already registered'
      ) {
        Alert.alert('Error', 'Email already registered');
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.error === 'Phone number already registered'
      ) {
        Alert.alert('Error', 'Phone number already registered');
      } else {
        Alert.alert(
          'Registration Error',
          'An error occurred while registering.',
        );
        console.log('Error:', error);
      }
    } finally {
      setName('');
      setEmail('');
      setPassword('');
      setDateOfBirth(new Date());
      setPhoneNumber('');
      setSkills([]);
      setLanguages([]);
      setYearsOfExperience('');
    }
  };

  const handlePrivacyPolicy = () => {
    Linking.openURL('https://www.astrogini.org/home/privacy-policy/');
  };

  const handleTermsOfUse = () => {
    Linking.openURL('https://www.astrogini.org/home/terms-of-use/');
  };

  async function firebaseAuth() {
    try {
      const usercredentials = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      await firestore()
        .collection('users')
        .doc(usercredentials.user.uid)
        .set({email, password, dateOfBirth, phoneNumber, name});
    } catch (error) {
      console.log('FB error: ', error);
    }
  }
  return (
    <KeyboardAvoidingView style={{}}>
      <View style={{marginTop: height / 6.5}}>
        <View style={{alignSelf: 'center'}}>
          <Text
            style={{
              marginTop: 30,

              marginBottom: 10,
              fontSize: 30,
              fontWeight: 700,
              color: Colors.yellow2,
              textDecorationLine: 'underline',
            }}>
            Sign Up
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Name"
            onChangeText={setName}
            value={name}
            style={styles.input}
            placeholderTextColor="#000"
            textAlign="center"
          />
          <TextInput
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            style={styles.input}
            placeholderTextColor="#000"
            textAlign="center"
          />
          <TextInput
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#000"
            textAlign="center"
          />
          {/* <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={{
              borderColor: Colors.grey2,
              borderWidth: 1,
              borderRadius: 10,
              alignContent: 'center',
              marginBottom: 5,
            }}>
            {dateOfBirth.toDateString() ? (
              <Text style={styles.dateInput}>Date Of Birth</Text>
            ) : (
              <Text style={styles.dateInput}>{dateOfBirth.toDateString()}</Text>
            )}
          </TouchableOpacity> */}

          <View>
            <Text
              style={{
                color: Colors.black7,
                marginBottom: 5,
                fontSize: 13,
                alignSelf: 'center',
              }}>
              Date of Birth:
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={{
              borderColor: Colors.yellow2,
              borderWidth: 1,
              borderRadius: 30,
              alignContent: 'center',
              marginBottom: 5,
              paddingTop: 4,
              paddingBottom: 1,
              alignItems: 'center',
            }}>
            <Text style={styles.dateInput}>{dateOfBirth.toDateString()}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={dateOfBirth}
              mode="date"
              display="default"
              onChange={handleDateChange}
              maximumDate={new Date()}
              placeholderText="Date of birth"
              style={{}}
            />
          )}
          {/* <View style={{}}>
            <Text style={{color: 'red', marginLeft: 10, fontSize: 12}}>
              {dateOfBirth.toDateString()}
            </Text>
          </View> */}
          <TextInput
            placeholder="Phone Number"
            onChangeText={setPhoneNumber}
            value={phoneNumber}
            style={styles.input}
            placeholderTextColor="#000"
            keyboardType="numeric"
            textAlign="center"
          />
        </View>

        <View
          style={{
            alignSelf: 'center',
            alignContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <TouchableOpacity style={[styles.button]} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('LogIn')}
            style={{
              marginTop: 15,
              color: '#000',
              alignSelf: 'center',
            }}>
            <Text style={{color: '#b30000'}}>
              Already have an account ?{' '}
              <Text
                style={{
                  color: Colors.yellow2,
                  fontSize: 18,
                  fontWeight: '600',
                }}>
                Sign In
              </Text>
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{alignSelf: 'center', marginTop: 10}}>
          <Text
            style={{
              textAlign: 'center',
              paddingHorizontal: 20,
              color: Colors.grey2,
            }}>
            By Signing up, you agree to our
            <Text
              style={{color: Colors.yellow2, fontWeight: '600'}}
              onPress={handleTermsOfUse}>
              {' '}
              Terms of Use
            </Text>{' '}
            and
            <Text
              style={{color: Colors.yellow2, fontWeight: '600'}}
              onPress={handlePrivacyPolicy}>
              {' '}
              Privacy Policy
            </Text>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    alignSelf: 'center',
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  picker: {
    flex: 1,
  },
  button: {
    backgroundColor: '#fecc03',
    width: width / 2,
    padding: 12,
    borderRadius: 40,
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 30,
    marginTop: 6,
    marginBottom: 15,
    color: '#000',
    borderColor: Colors.yellow2,
    borderWidth: 1,
    //alignItems: 'center',
    //  width: '80%',
  },
  dateInput: {
    //backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 15,
    color: '#000',
    alignContent: 'center',
    alignItems: 'baseline',
  },
});

export default RegistrationScreen;
