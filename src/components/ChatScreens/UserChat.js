import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {UserType} from '../../UserContext';
import Service_URL from '../../utils/Constant';
import BackButtonHandler from '../BackButtonHandler/BackButtonHandler';
import {Colors} from '../../utils/Colors';
const {width} = Dimensions.get('screen');

const UserChat = ({user}) => {
  const navigation = useNavigation();
  const [messagesData, setMessageData] = useState([]);
  const {userId, setUserId} = useContext(UserType);

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `${Service_URL}/messages/${userId}/${user._id}`,
      );
      const data = await response.json();
      if (response.ok) {
        setMessageData(data);
      } else {
        console.log('error in fetching message', response.status.message);
      }
    } catch (error) {
      console.log('error in fetching message', error);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(() => {
      fetchMessages(); // Call fetchMessages every second
    }, 2000); //

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const getLastMessage = () => {
    const userMessage = messagesData.filter(
      message => message.messageType === 'text',
    );

    const n = userMessage.length;
    return userMessage[n - 1];
  };

  const lastMessage = getLastMessage();

  const formatTime = time => {
    const options = {hour: 'numeric', minute: 'numeric'};

    return new Date(time).toLocaleString('en-US', options);
  };
  const imageUrl = 'https://avatar.iran.liara.run/public/boy';

  return (
    <BackButtonHandler>
      <Pressable
        onPress={() =>
          navigation.navigate('ChatMessages', {
            recipientId: user._id,
          })
        }
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          padding: 10,
          borderWidth: 1,
          borderColor: Colors.grey5,
          borderRadius: 10,
          marginBottom: 5,
        }}>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            resizeMode: 'cover',
          }}
          source={{uri: imageUrl}}
        />

        <View style={{flex: 1}}>
          <Text style={{fontSize: 16, fontWeight: '500', color: Colors.black7}}>
            {user?.name}
          </Text>
          {lastMessage ? (
            <Text style={styles.textMessage}>{lastMessage?.message}</Text>
          ) : (
            <Text style={styles.textMessage}>No messages</Text>
          )}
        </View>
        <View>
          <Text style={{fontSize: 13, fontWeight: '500', color: Colors.grey3}}>
            {lastMessage && formatTime(lastMessage?.timeStamp)}
          </Text>
        </View>
      </Pressable>
    </BackButtonHandler>
  );
};

export default UserChat;

const styles = StyleSheet.create({
  textMessage: {
    marginTop: 3,
    color: 'gray',
    fontWeight: '500',
    color: Colors.grey3,
  },
});
