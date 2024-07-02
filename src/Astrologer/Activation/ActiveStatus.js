import {StyleSheet, Text, View, Alert} from 'react-native';
import React, {useContext, useState} from 'react';
import {Colors} from '../../utils/Colors';
import {Switch} from 'react-native-paper';
import Service_URL from '../../utils/Constant';
import axios from 'axios';
import {UserType} from '../../UserContext';

const ActiveStatus = () => {
  const {userId} = useContext(UserType);
  const [chatStatus, setChatStatus] = useState(false);
  const [callStatus, setCallStatus] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [data, setData] = useState([]);

  const toggleChatSwitch = async () => {
    if (!userId) {
      console.log('User ID is not provided');
      return;
    }
    try {
      setChatStatus(prevIsOnline => !prevIsOnline);

      const response = await axios.put(
        `${Service_URL}/astrologer/onlineChat/${userId}`,
        {
          chatStatus: !chatStatus,
        },
      );
      if (response.status === 200) {
        setData(response.data);
        console.log('response>>>>>>>>', response.data);
        Alert.alert('Online Status Changed');
      }
    } catch (error) {
      console.log('Error updating data', error);
    }
  };

  const toggleCallSwitch = async () => {
    if (!userId) {
      console.log('User ID is not provided');
      return;
    }
    try {
      setCallStatus(prevIsOnline => !prevIsOnline);
      console.log('called..........');
      const response = await axios.put(
        `${Service_URL}/astrologer/onlineCall/${userId}`,
        {
          callStatus: !callStatus,
        },
      );
      if (response.status === 200) {
        setData(response.data);
        console.log('called..........@@@2');

        Alert.alert('Online Status Changed');
      }
    } catch (error) {
      console.log('Error updating data', error);
    }
  };

  const toggleIsLiveSwitch = async () => {
    if (!userId) {
      console.log('User ID is not provided');
      return;
    }
    try {
      setIsLive(prevIsOnline => !prevIsOnline);

      const response = await axios.put(
        `${Service_URL}/astrologer/isLive/${userId}`,
        {
          isLive: !isLive,
        },
      );
      if (response.status === 200) {
        setData(response.data);
        console.log('response>>>>>>>>', response.data);
        Alert.alert('Online Status Changed');
      }
    } catch (error) {
      console.log('Error updating data', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* heading */}
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <Text style={[styles.contentHeading, {paddingLeft: 12}]}>Type</Text>
        <Text style={[styles.contentHeading, {}]}>Status</Text>
        <Text style={styles.contentHeading}>Next Online Time</Text>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 15,
        }}>
        {/* Type */}
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              marginBottom: 10,
              alignItems: 'center',
            }}>
            <Text style={styles.contentHeading}>Chat</Text>
            <Text style={{color: Colors.grey2, fontSize: 12}}>India </Text>
          </View>

          <View
            style={{
              marginBottom: 10,
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <Text style={styles.contentHeading}>Call</Text>
            <Text style={{color: Colors.grey2, fontSize: 12}}>India </Text>
          </View>
          <View
            style={{
              marginBottom: 10,
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.contentHeading}>Live</Text>
            <Text style={{color: Colors.grey2, fontSize: 12}}>India </Text>
          </View>
        </View>

        {/* Status */}
        <View style={{alignItems: 'center', gap: 18}}>
          <Switch
            style={{
              marginBottom: 10,
              alignContent: 'center',
              alignItems: 'center',
            }}
            onValueChange={toggleChatSwitch}
            value={data?.chatOnline}
          />
          <Switch
            style={{
              marginBottom: 10,
              alignContent: 'center',
              alignItems: 'center',
            }}
            onValueChange={toggleCallSwitch}
            value={data?.callOnline}
          />
          <Switch
            style={{
              marginBottom: 10,
              alignContent: 'center',
              alignItems: 'center',
            }}
            value={data?.isLive}
            onValueChange={toggleIsLiveSwitch}
          />
        </View>

        {/* Time */}
        <View style={{alignItems: 'center', gap: 25, marginTop: 0}}>
          <View
            style={{
              borderWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 10,
            }}>
            <Text style={{color: Colors.black7, fontWeight: '500'}}>
              12 Oct , 10:30PM
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 10,
            }}>
            <Text style={{color: Colors.black7, fontWeight: '500'}}>
              12 Oct , 10:30PM
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 10,
            }}>
            <Text style={{color: Colors.black7, fontWeight: '500'}}>
              12 Oct , 10:30PM
            </Text>
          </View>
        </View>
      </View>

      {/* <View style={styles.content}>
        <Text style={styles.contentHeading}>Type</Text>
        <Text style={styles.contentHeading}>Status</Text>
        <Text style={styles.contentHeading}>Next Online Time</Text>
      </View>

      <View style={styles.content}>
        <View
          style={{flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
          <Text style={styles.contentHeading}>Chat</Text>
          <Text>
            India <Text>₹ 12.0</Text>
          </Text>
        </View>

        <Switch />
        <View>
          <Text>12 Oct 23, 10:30 PM</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View
          style={{flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
          <Text style={styles.contentHeading}>Call</Text>
          <Text>
            India <Text>₹ 12.0</Text>
          </Text>
        </View>

        <Switch style={{alignSelf: 'center', flex: 1}} />
        <View>
          <Text>12 Oct 23, 10:30 PM</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View
          style={{flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
          <Text style={styles.contentHeading}>Video Call</Text>
          <Text>
            India <Text>₹ 12.0</Text>
          </Text>
        </View>

        <Switch />
        <View>
          <Text>12 Oct 23, 10:30 PM</Text>
        </View>
      </View> */}
    </View>
  );
};

export default ActiveStatus;

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.7,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
    borderColor: Colors.grey5,
    flex: 1,
    marginBottom: 20,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  contentHeading: {
    color: Colors.black7,
    fontSize: 16,
    fontWeight: '500',
  },
});
