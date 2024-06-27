import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {UserType} from '../../UserContext';
import AuthLogin from '../../utils/AuthLogin';
import ChatScreen from '../ChatScreens/ChatScreen';

const Chat = () => {
  const {userId, setuserId} = useContext(UserType);

  return userId ? (
    <View>
      <ChatScreen />
    </View>
  ) : (
    <AuthLogin />
  );
};

export default Chat;

const styles = StyleSheet.create({});
