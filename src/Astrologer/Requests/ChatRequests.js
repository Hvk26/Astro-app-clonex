import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import BackButtonHandler from '../../components/BackButtonHandler/BackButtonHandler';
import {UserType} from '../../UserContext';
import Service_URL from '../../utils/Constant';
import axios from 'axios';
import ChatRequest from '../../components/ChatScreens/ChatRequest';

const ChatRequests = () => {
  const navigation = useNavigation();
  const {userId, setUserId} = useContext(UserType);
  const [chatRequestUsers, setChatRequestUsers] = useState([]);
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

  const reverseList = [...chatRequestUsers].reverse();

  return (
    <BackButtonHandler style={{}}>
      <ScrollView style={{}}>
        {reverseList.length === 0 ? (
          <Text style={{color: '#000', fontSize: 15}}>
            No Request Available
          </Text>
        ) : (
          <Text
            style={{
              color: '#000',
              fontSize: 15,
              marginVertical: 10,
              marginHorizontal: 10,
            }}>
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

export default ChatRequests;

const styles = StyleSheet.create({});
