import {StyleSheet, Text, View, Alert} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import BackButtonHandler from '../../../../components/BackButtonHandler/BackButtonHandler';
import {Colors} from '../../../../utils/Colors';
import {Button, TextInput} from 'react-native-paper';
import {UserType} from '../../../../UserContext';
import axios from 'axios';
import Service_URL from '../../../../utils/Constant';

const NumberUpdation = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userData, setUserData] = useState({});
  const [Error, setError] = useState(null);

  const {userId} = useContext(UserType);

  const updateHandler = async () => {
    try {
      const response = await axios.put(
        `${Service_URL}/astrologer/updatePhone/${userId}`,
        {phoneNumber},
      );
      if (response.status === 200) {
        Alert.alert('Phone number updated successfully');
        setPhoneNumber('');
      } else {
        console.log('Unexpected response status:', response.status);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Alert.alert('Phone number already exists');
      } else {
        console.log('Phone Number Updation Error', error);
      }
    }
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
  return (
    <BackButtonHandler>
      <View style={{flex: 1}}>
        <View style={{backgroundColor: Colors.title2}}>
          <Text
            style={{
              alignSelf: 'center',
              fontWeight: '500',
              paddingVertical: 2,
              color: Colors.black8,
            }}>
            You will get call and chat alert on these numbers
          </Text>
        </View>

        <View style={{marginTop: 20, paddingHorizontal: 15, gap: 15}}>
          <View>
            <Text
              style={{color: Colors.black7, fontSize: 15, fontWeight: '500'}}>
              Registered Number: <Text>{userData?.phoneNumber}</Text>
            </Text>
          </View>
          <Text style={{color: Colors.black7, fontSize: 15, fontWeight: '500'}}>
            Phone Number :
          </Text>
          <TextInput
            mode="outlined"
            label="Phone Number"
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
            outlineColor={Colors.black7}
            outlineStyle={{borderRadius: 15}}
            activeOutlineColor={Colors.title1}
            textColor={Colors.black7}
            keyboardType="numeric"
            maxLength={10}
          />

          <Button
            onPress={updateHandler}
            mode="contained"
            icon="phone"
            buttonColor={Colors.black7}
            labelStyle={{fontWeight: '500'}}
            style={{width: '70%', alignSelf: 'center'}}
            textColor="#fff">
            Submit
          </Button>
        </View>
      </View>
    </BackButtonHandler>
  );
};

export default NumberUpdation;

const styles = StyleSheet.create({});
