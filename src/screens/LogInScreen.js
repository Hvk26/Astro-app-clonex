import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  BackHandler,
  Pressable,
  Image,
  Dimensions,
  Animated,
  Easing,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {UserType} from '../UserContext';
import Service_URL from '../utils/Constant';
import {useFocusEffect} from '@react-navigation/native';
import {Colors} from '../utils/Colors';
import {getBalance} from '../utils/UpdateWallet';
const {width, height} = Dimensions.get('window');
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import useAuth from '../store/useAuth';
import {getFirstInstallTime} from 'react-native-device-info';
import * as ZIM from 'zego-zim-react-native';
import ZegoUIKitPrebuiltCallService, {
  ZegoMenuBarButtonName,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import KeyCenter from '../utils/KeyCenter';

const LogInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const {userId, setUserId, addToWallet, setWalletBalance} =
    useContext(UserType);

  const spinValue = useRef(new Animated.Value(0)).current;
  const setUser = useAuth(state => state.setUser);
  //to check if user alredy logged in or not
  
  useEffect(() => {
    const checkLogInStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          const storedUserId = await AsyncStorage.getItem('userId');
          const role = await AsyncStorage.getItem('role');
          if (storedUserId) {
            // Set the userId from AsyncStorage
            // const name = 'user_' + storedUserId;
            const userName = 'Anonymous';
            onUserLogin(storedUserId, userName);
            setUserId(storedUserId);
            if (role === 'user') {
              navigation.navigate('Parent');
            } else if (role === 'verified') {
              navigation.navigate('AstrologerHome');
            } else {
              // Handle other roles if needed
              // Alert.alert(JSON.stringify(error));
            }
          }
        } else {
          // Token not found, show the login screen
        }
      } catch (error) {
        console.log('Error', error);
      }
    };
    checkLogInStatus();
    spin();
  }, []); // Pass an empty dependency array to run this effect only once

  const handleLogin = async () => {
    const user = {
      email: email,
      password: password,
    };
    // Alert.alert(email, password);
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all the fields.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }
    if (password.length < 5) {
      Alert.alert('Error', 'Password must be at least 5 characters long.');
      return;
    }
    axios
      .post(`${Service_URL}/login`, user, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then(res => {
        const token = res.data.token;
        const role = res.data.role;
        const userId = res.data.userId;
        // Alert.alert(role, userId);
        // const name = 'user_' + userId;
        const userName = 'Anonymous';

        onUserLogin(userId, userName);
        // console.log(
        //   '-------------------------------------------34555555-',
        //   res.data,
        // );
        AsyncStorage.setItem('authToken', token);
        AsyncStorage.setItem('role', role);
        AsyncStorage.setItem('userId', userId);
        setUserId(userId); // Set the userId in your context

        if (role === 'user') {
          signInFirebase();
          navigation.navigate('Parent');
        } else if (role === 'verified') {
          signInFirebase();
          navigation.navigate('AstrologerHome');
        } else if (role === 'disabled') {
          Alert.alert('Your account is disabled by Admin');
        } else if (role === 'pending') {
          Alert.alert(
            'You are not verified or disabled by the Admin',
            'Kindly contact to Admin',
          );
        }
      })
      .catch(error => {
        Alert.alert('Login Error');
      });
  };

  //prevent user to get back on the loginScreen
  useFocusEffect(
    React.useCallback(() => {
      const checkAuthentication = async () => {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          const role = await AsyncStorage.getItem('role');
          if (role === 'user') {
            navigation.navigate('Parent');
          } else if (role === 'verified') {
            navigation.navigate('AstrologerHome');
          }

          //Handle the Android back button press to exit the app
          if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', () => {
              BackHandler.exitApp(); // Exit the app when the back button is pressed
              return true; // Prevent default behavior (i.e., navigating back)
            });
          }
        }
      };
      checkAuthentication();
    }, []),
  );

  const handleSkip = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('role');

      navigation.navigate('Parent');
    } catch (error) {
      console.log('Skip error', error);
    }
  };

  const spin = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 6000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => spin());
  };

  const spinInterpolation = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  async function signInFirebase() {
    try {
      const userCredentials = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const userData = await firestore()
        .collection('users')
        .doc(userCredentials.user.uid)
        .get();

      if (userData.exists) {
        // const data = userData.data();

        await AsyncStorage.setItem(
          'user',
          JSON.stringify({
            id: userData.id,
            ...userData.data(),
          }),
        );
        setUser({
          id: userData.id,
          ...userData.data(),
        });
      }
    } catch (error) {
      console.log('FB error: ', error);
    }
  }

  // useEffect(() => {
  //   getFirstInstallTime().then(firstInstallTime => {
  //     const id = String(firstInstallTime).slice(-5);
  //     setUserID(id);
  //     const name = 'user_' + id;
  //     setUserName(name);
  //   });
  // }, []);

  const onUserLogin = async (userID, userName) => {
    ZegoUIKitPrebuiltCallService.init(
      KeyCenter.ZegocloudKey.ZEGOCLOUD_APPID,
      KeyCenter.ZegocloudKey.ZEGOCLOUD_SIGNIN,
      userID,
      userName,
      [ZIM],
      {
        ringtoneConfig: {
          incomingCallFileName: 'zego_incoming.mp3',
          outgoingCallFileName: 'zego_outgoing.mp3',
        },
        avatarBuilder: ({userInfo}) => {
          return (
            <View style={{width: '100%', height: '100%'}}>
              <Image
                style={{width: '100%', height: '100%'}}
                resizeMode="cover"
                source={{uri: `https://robohash.org/${userInfo.userID}.png`}}
              />
            </View>
          );
        },
        requireConfig: data => {
          return {
            timingConfig: {
              isDurationVisible: true,
              onDurationUpdate: duration => {
                console.log(
                  '########CallWithInvitation onDurationUpdate',
                  duration,
                );
                if (duration === 10 * 60) {
                  ZegoUIKitPrebuiltCallService.hangUp();
                }
              },
            },
            topMenuBarConfig: {
              buttons: [ZegoMenuBarButtonName.minimizingButton],
            },
            onWindowMinimized: () => {
              console.log('[Demo]CallInvitation onWindowMinimized');
              navigation.navigate('HomeScreen');
            },
            onWindowMaximized: () => {
              console.log('[Demo]CallInvitation onWindowMaximized');
              navigation.navigate('ZegoUIKitPrebuiltCallInCallScreen');
            },
          };
        },
      },
    );
  };

  return (
    <KeyboardAvoidingView style={{}}>
      <ScrollView>
        <View style={{height: height / 2.1}}>
          <Pressable
            style={{marginTop: 20, marginLeft: '80%'}}
            onPress={handleSkip}>
            <Text style={{color: '#ffa000', fontSize: 15, fontWeight: '600'}}>
              Skip &gt;&gt;
            </Text>
          </Pressable>

          <View style={{alignItems: 'center', marginTop: 30}}>
            <Animated.Image
              source={require('../assets/icons/Logo/logo.png')}
              style={{
                height: 230,
                width: 230,
                transform: [{rotate: spinInterpolation}],
              }}
            />
            <Text
              style={{
                fontSize: 40,
                //fontFamily: 'Philosopher-BoldItalic',
                fontWeight: '800',
                marginTop: 10,
                color: Colors.black8,
              }}>
              Astrogini
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 30,
            backgroundColor: Colors.title2,
            height: height / 2,
            paddingTop: 20,
          }}>
          <Text
            style={{
              fontSize: 18,
              borderWidth: 1,
              paddingVertical: 4,
              paddingHorizontal: 25,
              borderRadius: 20,
              borderColor: Colors.yellow2,
              color: Colors.black8,
              position: 'absolute',
              marginBottom: 30,
              marginTop: -15,
              alignSelf: 'center',
              backgroundColor: '#fff',
              fontWeight: '500',
            }}>
            First Chat With Astrologer Is{' '}
            <Text style={{color: Colors.yellow2, fontWeight: '700'}}>
              FREE !
            </Text>
          </Text>
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Email"
                style={styles.input}
                value={email}
                onChangeText={text => setEmail(text)}
                placeholderTextColor="#000"
                textAlign="center"
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
                placeholderTextColor="#000"
                textAlign="center"
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonOutline]}
                onPress={() => navigation.navigate('Registration')}>
                <Text style={styles.buttonOutlineText}>Register</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Registration')}
              style={{marginTop: 15, color: '#000'}}>
              <Text style={{color: '#000'}}>
                Don't have an account ?{' '}
                <Text
                  style={{color: '#ffa000', fontWeight: '600', fontSize: 16}}>
                  Sign Up
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LogInScreen;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 30,
    width: 300,
    marginTop: 5,
    color: '#000',
    borderColor: Colors.primaryYellow,
    borderWidth: 1,
    marginBottom: 5,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#fecc03',
    width: 200,
    padding: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 5,
    alignSelf: 'center',
  },
  buttonOutline: {
    backgroundColor: '#ffffff',
    marginTop: 5,
    borderColor: '#fecc03',
    borderWidth: 2,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#fecc03',
    fontWeight: '700',
    fontSize: 16,
  },
});
