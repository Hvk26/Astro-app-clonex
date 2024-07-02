import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useContext, useEffect, useLayoutEffect} from 'react';
import {UserType} from '../../UserContext';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Service_URL from '../../utils/Constant';
import BackButtonHandler from '../BackButtonHandler/BackButtonHandler';
import UserCalls from './UserCalls';

const Calls = () => {
  const [acceptedCalls, setAcceptedCalls] = useState([]);
  const {userId, setUserId} = useContext(UserType);
  const navigation = useNavigation();

  useEffect(() => {
    const acceptedCallList = async () => {
      try {
        const response = await axios.get(
          `${Service_URL}/user/acceptedCallList/${userId}`,
        );

        if (response.status === 200) {
          // Extract unique user IDs using a Set
          const uniqueUserIds = new Set(response.data.map(user => user._id));
          // Convert the Set back to an array
          const uniqueUsers = Array.from(uniqueUserIds).map(userId => {
            // Find the user with the matching ID
            return response.data.find(user => user._id === userId);
          });

          setAcceptedCalls(uniqueUsers);
        }
      } catch (error) {
        console.log('Error in showing chat list', error);
      }
    };
    acceptedCallList();
  }, []);

  if (!userId) {
    return (
      <BackButtonHandler
        style={{
          padding: 20,
          marginTop: '50%',
          width: 'auto',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 16, color: '#000', marginBottom: 10}}>
          You are Not Logged In
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('LogIn')}
          style={{
            paddingVertical: 15,
            backgroundColor: '#FBE300',
            alignItems: 'center',
            alignContent: 'center',
            borderRadius: 15,
            width: 100,
            height: 50,
          }}>
          <Text style={{color: '#000', fontSize: 15, fontWeight: 500}}>
            Log In
          </Text>
        </TouchableOpacity>
      </BackButtonHandler>
    );
  }
  return (
    <BackButtonHandler>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 5, marginHorizontal: 5}}>
          {acceptedCalls.map((user, index) => (
            <UserCalls key={index} user={user} />
          ))}
        </View>
      </ScrollView>
    </BackButtonHandler>
  );
};

export default Calls;

const styles = StyleSheet.create({});
