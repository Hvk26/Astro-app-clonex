import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Switch,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import React, {useLayoutEffect, useState, useContext, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {UserType} from '../../UserContext';
import axios from 'axios';
import Service_URL from '../../utils/Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../../utils/Colors';
import {Button} from 'react-native-paper';
const {width} = Dimensions.get('screen');
import {removeEmptyValues} from '../../utils/removeEmptyValues';
const AstroHome = () => {
  const {userId, setUserId} = useContext(UserType);
  const [isOnline, setIsOnline] = useState(false);
  const [amount, setAmount] = useState('');
  const [Error, setError] = useState(null);
  const [userData, setUserData] = useState({});
  const navigation = useNavigation();
  const [waitTime, setWaitTime] = useState('');
  // Online status of Astrologer
  const toggleSwitch = async () => {
    //console.log('Toggle switch called');

    if (!userId) {
      console.log('User ID is not provided');
      return;
    }
    try {
      setIsOnline(prevIsOnline => !prevIsOnline);
      // Use functional form of setState
      const response = await axios.put(
        `${Service_URL}/astrologer/updateOnline/${userId}`,
        {
          isOnline: !isOnline,
        },
      );
      if (response.status === 200) {
        Alert.alert('Online Status Changed');
      }
    } catch (error) {
      console.log('Error updating data', error);
    }
  };

  //astrologer can update the amount
  const updateData = async () => {
    if (!amount && !waitTime) {
      Alert.alert('Nothing to update');
      return false;
    }
    const data = {
      amount: amount,
      waitTime: waitTime,
    };

    const updatedData = removeEmptyValues(data);
    //console.log(updatedData);
    await axios
      .put(`${Service_URL}/astrologer/update/${userId}`, updatedData)
      .then(response => {
        if (response.status === 200) {
          Alert.alert('Update Successful');
          setAmount('');
          setWaitTime('');
        }
      })
      .catch(error => {
        Alert.alert('Update Failed');
      });
  };

  useEffect(() => {
    if (!userId) {
      setError('User ID not provided');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`${Service_URL}/userInfo/${userId}`);
        const data = response.data;

        if (!data) {
          setError('User not found');
        } else {
          setUserData(data);
          setError(null);
        }
      } catch (error) {
        setError('Error fetching user information');
      }
    };
    fetchData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <Text
          style={{
            fontSize: 17,
            fontWeight: 500,
            color: '#000000',
          }}>
          Home
        </Text>
      ),
      headerRight: () => (
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
          <Ionicons
            onPress={() => navigation.navigate('ChatList')}
            name="people-sharp"
            size={25}
            color={'#0040ff'}
          />
          <FontAwesome
            onPress={handleLogout}
            name="power-off"
            size={25}
            color={Colors.black7}
          />
        </View>
      ),
    });
  });

  const handleLogout = async () => {
    try {
      // Clear the authentication-related AsyncStorage data
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('role');
      // Clear the user data in your context
      setUserId(null);
      // Navigate the user back to the login screen
      navigation.navigate('LogIn'); // Change 'Login' to the actual login screen name.
    } catch (error) {
      // Handle any errors that occur during logout
      Alert.alert('Error', 'Failed to logout');
    }
  };

  return (
    <View style={{backgroundColor: '#ffffe7', height: '100%', maxWidth: width}}>
      <View
        style={{
          marginTop: 10,
          marginLeft: 10,
          width: width - 7,
          alignSelf: 'center',
        }}>
        <Text style={{fontSize: 17, fontWeight: 500, color: Colors.grey2}}>
          Hello {userData?.name}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: '#e6e6e6',
          backgroundColor: '#FBE300',
          margin: 20,
          height: 'auto',
          borderRadius: 20,
          shadowColor: '#eef32f',
          display: 'flex',
          justifyContent: 'space-between',
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 10,
          paddingBottom: 10,
          width: width - 17,
          alignSelf: 'center',
        }}>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isOnline ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isOnline}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            margin: 10,
            gap: 5,
          }}>
          <Pressable
            onPress={() => navigation.navigate('HostPage', userData)}
            style={styles.buttonContainer}>
            <Text style={styles.textHeading}>Go Live</Text>
            <Ionicons
              name="videocam"
              size={30}
              color={'#ff4d4d'}
              style={{alignItems: 'baseline'}}
            />
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('ChatScreen')}
            style={styles.buttonContainer}>
            <Text style={styles.textHeading}>Chat</Text>
            <Ionicons name="chatbubbles" size={30} color={'#ff4d4d'} />
          </Pressable>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: width - 7,
          alignSelf: 'flex-start',
        }}>
        <TextInput
          value={amount}
          placeholder="Set Amount"
          style={styles.textInput}
          keyboardType="number-pad"
          onChangeText={text => setAmount(text)}
          placeholderTextColor="#000"
        />
        <TextInput
          value={waitTime}
          placeholder="Wait Time (minutes)"
          style={styles.textInput}
          keyboardType="number-pad"
          onChangeText={text => setWaitTime(text)}
          placeholderTextColor="#000"
        />
      </View>
      <View style={{marginTop: 10, width: width - 10, alignSelf: 'flex-end'}}>
        <Button mode="contained" style={{width: 150}} onPress={updateData}>
          Update
        </Button>
      </View>
    </View>
  );
};

export default AstroHome;

const styles = StyleSheet.create({
  textHeading: {
    fontSize: 18,
    // fontWeight: 500,
    color: '#ffff',
    alignItems: 'center',
  },
  buttonContainer: {
    borderLeftColor: '#000',
    borderColor: '#ffff',
    backgroundColor: '#668cff',
    borderWidth: 2,
    borderRadius: 20,
    width: 130,
    height: 70,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 11,
  },
  textInput: {
    width: '60%',
    marginLeft: 10,
    marginRight: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    color: '#000',
  },
});
