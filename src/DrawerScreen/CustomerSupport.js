import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import BackButtonHandler from '../components/BackButtonHandler/BackButtonHandler';
import {Colors} from '../utils/Colors';
import {Button, TextInput} from 'react-native-paper';
import {generateUniqueId} from '../utils/removeEmptyValues';
import axios from 'axios';
import Service_URL from '../utils/Constant';
import {UserType} from '../UserContext';

const CustomerSupport = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const {userId, setUserId} = useContext(UserType);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [issue, setIssue] = useState('');

  const handleMessage = async () => {
    try {
      if (!name || !email || !phoneNumber || !issue) {
        Alert.alert(
          'Validation Error',
          'Please fill in all the required fields.',
        );
        return;
      }
      const reportId = generateUniqueId();
      const data = {
        userId,
        reportId,
        name,
        email,
        phoneNumber,
        issue,
      };
      const response = await axios.post(`${Service_URL}/grievance/`, data);
      if (response.status === 200) {
        setEmail('');
        setName('');
        setIssue('');
        setPhoneNumber('');
        Alert.alert(
          'Your issue has been raised',
          `Your ticket number is ${response.data.reportId}`,
        );
      } else {
        console.log(response.error);
        Alert.alert(
          'Error',
          'Failed to submit the form. Please try again later.',
        );
      }
    } catch (error) {
      console.error('Error sending grievance:', error);
      Alert.alert(
        'Error',
        'An error occurred while sending the grievance. Please try again later.',
      );
    }
  };

  // useEffect(() => {
  //   setName('');
  //   setEmail('');
  //   setIssue('');
  //   setPhoneNumber('');
  // }, [handleMessage]);

  return (
    <BackButtonHandler style={{}}>
      <ScrollView
        style={{
          marginHorizontal: 10,
          marginVertical: 10,
        }}>
        <View
          style={{
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#cc8400',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 17,
              fontWeight: 500,
              backgroundColor: Colors.secondaryYellow,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              paddingVertical: 5,
              color: Colors.black7,
            }}>
            Get In Touch
          </Text>
          <View
            style={{
              marginHorizontal: 5,
              marginVertical: 5,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                fontWeight: 500,
                color: Colors.black7,
              }}>
              We want to hear from you !
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 13,
                fontWeight: 400,
                color: Colors.black7,
                marginTop: 10,
              }}>
              If you have any questions about the site or need support, please
              fill out the below form, and we will respond to your request as
              quick as possible.
            </Text>
            <View>
              <TextInput
                label="Name"
                mode="outlined"
                outlineColor={Colors.title1}
                contentStyle={{color: Colors.black1}}
                placeholderTextColor={{color: Colors.black1}}
                outlineStyle={{
                  borderRadius: 10,
                  height: 45,
                  maxWidth: 350,
                }}
                onChangeText={text => setName(text)}
              />
              <TextInput
                label="Email"
                mode="outlined"
                outlineColor={Colors.title1}
                contentStyle={{color: Colors.black1}}
                placeholderTextColor={{color: Colors.black1}}
                outlineStyle={{
                  borderRadius: 10,
                  height: 45,
                  maxWidth: 350,
                }}
                onChangeText={text => setEmail(text)}
              />
              <TextInput
                label="Contact Number"
                mode="outlined"
                outlineColor={Colors.title1}
                contentStyle={{color: Colors.black1}}
                placeholderTextColor={{color: Colors.black1}}
                outlineStyle={{
                  borderRadius: 10,
                  height: 45,
                  maxWidth: 350,
                }}
                onChangeText={text => setPhoneNumber(text)}
              />
              <TextInput
                label="Tell us about your Issue"
                multiline={true}
                mode="outlined"
                numberOfLines={6}
                outlineColor={Colors.title1}
                contentStyle={{color: Colors.black1}}
                placeholderTextColor={{color: Colors.black1}}
                outlineStyle={{
                  borderRadius: 10,
                  maxWidth: 350,
                }}
                onChangeText={text => setIssue(text)}
              />
            </View>
            <Button
              icon="email"
              mode="contained"
              style={{
                backgroundColor: Colors.secondaryYellow,
                width: 200,
                alignItems: 'center',
                alignSelf: 'center',
                marginTop: 15,
              }}
              onPress={handleMessage}>
              SEND MESSAGE
            </Button>
          </View>
        </View>
      </ScrollView>
    </BackButtonHandler>
  );
};

export default CustomerSupport;

const styles = StyleSheet.create({});
