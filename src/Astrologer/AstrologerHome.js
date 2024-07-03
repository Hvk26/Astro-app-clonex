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
  ScrollView,
  StatusBar,
} from 'react-native';
import React, {useLayoutEffect, useState, useContext, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-paper';
import {removeEmptyValues} from '../utils/removeEmptyValues';
import {Colors} from '../utils/Colors';
import Service_URL from '../utils/Constant';
import {UserType} from '../UserContext';
const {width} = Dimensions.get('screen');
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import ActiveSetting from './Activation/ActiveSetting';
import TimeTable from './TimeTable/TimeTable';
import GoLive from './GoLive/GoLive';
import ReportAnonymous from './Report/ReportAnonymous';
import ChatToAssistant from './ChatToAssistant/ChatToAssistant';
import ActiveStatus from './Activation/ActiveStatus';
import CardSection from './Cards/CardSection';
import Feedback from './Feedback/Feedback';

const AstrologerHome = () => {
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
        await setUserData(data);
        if (!data) {
          setError('User not found');
        } else {
          //await setUserData(data);
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
      headerTitle: () => (
        <View>
          <Text style={{color: Colors.black7, fontSize: 16, fontWeight: '500'}}>
            Home
          </Text>
        </View>
      ),

      headerRight: () => (
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
          <SimpleLineIcons name="wallet" size={24} color={Colors.black8} />
          <SimpleLineIcons name="user" size={24} color={Colors.black8} />
        </View>
      ),
    });
  });

  // const handleLogout = async () => {
  //   try {
  //     // Clear the authentication-related AsyncStorage data
  //     await AsyncStorage.removeItem('authToken');
  //     await AsyncStorage.removeItem('userId');
  //     await AsyncStorage.removeItem('role');
  //     // Clear the user data in your context
  //     setUserId(null);
  //     navigation.navigate('LogIn');
  //   } catch (error) {
  //     Alert.alert('Error', 'Failed to logout');
  //   }
  // };

  return (
    <ScrollView
      style={{
        flex: 1,
        paddingHorizontal: 10,
        width: width,
        backgroundColor: '#fff',
      }}>
      <View style={{marginBottom: 10}}>
        <Text style={{color: Colors.black7, fontSize: 16, marginTop: 10}}>
          Welcome, <Text style={{fontWeight: '500'}}>{userData?.name}</Text>
        </Text>
      </View>
      <ActiveSetting />
      <TimeTable />
      <GoLive userName={userData?.name} />
      <TouchableOpacity
        onPress={() => navigation.navigate('Requests')}
        style={{
          marginTop: 10,
          borderWidth: 0.3,
          borderColor: Colors.grey4,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          elevation: 1,
          paddingVertical: 10,
          backgroundColor: Colors.title2,
          flexDirection: 'row',
          borderRadius: 15,
          height: 70,
        }}>
        <Ionicons name="chatbubble-ellipses" size={44} color={Colors.black7} />
        <Text style={{color: Colors.black7, fontSize: 18, fontWeight: '500'}}>
          Requests
        </Text>
        <Ionicons
          name="chevron-forward-outline"
          size={40}
          color={Colors.black7}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('AllChats')}
        style={{
          marginTop: 10,
          borderWidth: 0.3,
          borderColor: Colors.grey4,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          elevation: 1,
          paddingVertical: 10,
          backgroundColor: Colors.title2,
          flexDirection: 'row',
          borderRadius: 15,
          height: 70,
        }}>
        <Ionicons name="chatbubble-ellipses" size={44} color={Colors.black7} />
        <Text style={{color: Colors.black7, fontSize: 18, fontWeight: '500'}}>
          User Chats & Calls
        </Text>
        <Ionicons
          name="chevron-forward-outline"
          size={40}
          color={Colors.black7}
        />
      </TouchableOpacity>
      <ReportAnonymous />
      <ChatToAssistant />
      <ActiveStatus />
      <CardSection />
      <Feedback />
    </ScrollView>
  );
};

export default AstrologerHome;

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
