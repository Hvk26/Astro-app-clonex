import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import axios from 'axios';
import {UserType} from '../../UserContext';
import ChatRequest from './ChatRequest';
import Service_URL from '../../utils/Constant';
import {useNavigation, useRoute} from '@react-navigation/native';
import BackButtonHandler from '../BackButtonHandler/BackButtonHandler';

const ChatList = () => {
  navigation = useNavigation();
  const {userId, setUserId} = useContext(UserType);
  const [chatRequestUsers, setChatRequestUsers] = useState([]); // State to store chat request users
  const route = useRoute();

  useEffect(() => {
    fetchChatList();
  }, [chatRequestUsers]);

  const fetchChatList = async () => {
    try {
      const response = await axios.get(`${Service_URL}/chatList/${userId}`);
      if (response.status === 200) {
        setChatRequestUsers(response.data);
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              marginLeft: -18,
              fontSize: 20,
              color: '#000000',
              fontWeight: '500',
            }}>
            Requests
          </Text>
        </View>
      ),
    });
  }, []);

  const reverseList = [...chatRequestUsers].reverse();
  return (
    <BackButtonHandler style={{padding: 10, marginHorizontal: 12}}>
      <ScrollView>
        {reverseList.length === 0 ? (
          <Text style={{color: '#000', fontSize: 15}}>
            No Request Available
          </Text>
        ) : (
          <Text style={{color: '#000', fontSize: 15, marginTop: 5}}>
            Your Chat Request:
          </Text>
        )}
        {reverseList.map((item, key) => (
          <ChatRequest
            key={key}
            item={item}
            chatRequestUsers={reverseList}
            setChatRequestUsers={reverseList}
          />
        ))}
      </ScrollView>
    </BackButtonHandler>
  );
};

export default ChatList;

const styles = StyleSheet.create({});
