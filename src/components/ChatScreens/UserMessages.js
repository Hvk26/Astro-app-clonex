import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {
  useState,
  useContext,
  useLayoutEffect,
  useEffect,
  useRef,
} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/FontAwesome6';
import EmojiSelector from 'react-native-emoji-selector';
import {UserType} from '../../UserContext';
import {useNavigation, useRoute} from '@react-navigation/native';
import Service_URL from '../../utils/Constant';
import BackButtonHandler from '../BackButtonHandler/BackButtonHandler';
import {Colors} from '../../utils/Colors';
const {width} = Dimensions.get('screen');
const UserMessages = () => {
  const [showEmojiselector, setShowEmojiSelector] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [messageData, setMessageData] = useState([]);
  const [recipientData, setRecipientData] = useState();
  const {userId, setUserId} = useContext(UserType);
  const navigation = useNavigation();
  const route = useRoute();
  const recipientId = route.params;

  const scrollViewRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: false});
    }
  };

  const handleContentSizeChange = () => {
    scrollToBottom();
  };
  const handleEmojiPress = () => {
    setShowEmojiSelector(!showEmojiselector);
  };

  // to fetch messages
  const fetchMessages = async () => {
    const {recipientId} = route.params;
    try {
      const response = await fetch(
        `${Service_URL}/messages/${userId}/${recipientId}`,
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
    const intervalId = setInterval(() => {
      fetchMessages();
    }, 2000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // function to send the messages
  const handleSend = async () => {
    try {
      const {recipientId} = route.params;
      const requestData = {
        senderId: userId,
        recipientId: recipientId,
        messageType: 'text',
        messageText: message,
      };

      const response = await fetch(`${Service_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify(requestData), // Convert the data to JSON format
      });

      if (response.ok) {
        setMessage('');
        fetchMessages();
      }
    } catch (error) {
      console.log('error in sending message', error);
    }
  };

  useEffect(() => {
    const fetchRecipientData = async () => {
      try {
        // Access recipientId from route.params
        const {recipientId} = route.params;
        const response = await fetch(`${Service_URL}/user/${recipientId}`);
        const data = await response.json(); // Use response.json() to parse JSON data
        setRecipientData(data);
      } catch (error) {
        console.error('Error Retrieving Details:', error);
      }
    };
    fetchRecipientData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 18}}>
          <Ionicons
            name="arrow-back"
            size={25}
            style={{marginLeft: -10}}
            color={'#000000'}
            onPress={() => navigation.pop()}
          />

          {selectedMessages.length > 0 ? (
            <View>
              <Text style={{fontSize: 16, fontWeight: '500'}}>
                {selectedMessages.length}
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('UsersAstrologyDetails', recipientId)
              }
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                justifyContent: 'center',
              }}>
              <EvilIcons name="circle-user" size={24} color={Colors.pink2} />
              <Text
                style={{fontSize: 18, fontWeight: '500', color: Colors.black7}}>
                {recipientData?.name}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ),
      headerRight: () =>
        selectedMessages.length > 0 ? (
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Ionicons name="arrow-redo-sharp" size={29} color={'#00000'} />
            <Ionicons name="arrow-undo" size={29} color={'#00000'} />
            <MaterialIcons
              onPress={() => deleteMessages(selectedMessages)}
              name="delete"
              size={29}
              color={'#00000'}
            />
          </View>
        ) : null,
    });
  }, [recipientData, selectedMessages]);

  // format time
  const formatTime = time => {
    const options = {hour: 'numeric', minute: 'numeric'};

    return new Date(time).toLocaleString('en-US', options);
  };

  // to select messages for deletion
  const handleSelectMessage = message => {
    // check if msg already selected
    const isSelected = selectedMessages.includes(message._id);
    if (isSelected) {
      setSelectedMessages(prevMessage =>
        prevMessage.filter(id => id !== message._id),
      );
    } else {
      setSelectedMessages(prevMessage => [...prevMessage, message._id]);
    }
  };

  //detete selected messages

  const deleteMessages = async messageIds => {
    try {
      const response = await fetch(`${Service_URL}/deleteMessages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({messages: messageIds}),
      });

      if (response.ok) {
        setSelectedMessages(prevMessage =>
          prevMessage.filter(id => !messageIds.includes(id)),
        );
        fetchMessages();
      } else {
        console.log('error in deleting msgs', response.status());
      }
    } catch (error) {
      console.error('Error deleting msgs', error);
    }
  };

  return (
    <BackButtonHandler>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: '#F0F0F0',
          width: width - 7,
          alignSelf: 'center',
        }}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{flexGrow: 1}}
          onContentSizeChange={handleContentSizeChange}>
          {messageData.map((item, index) => {
            if (item.messageType === 'text') {
              const isSelected = selectedMessages.includes(item._id);
              return (
                <Pressable
                  onLongPress={() => handleSelectMessage(item)}
                  key={index}
                  style={{
                    ...(item?.senderId?._id === userId
                      ? {
                          alignSelf: 'flex-end',
                          margin: 10,
                          backgroundColor: '#DCf8C6',
                          padding: 8,
                          maxWidth: '60%',
                          borderRadius: 7,
                        }
                      : {
                          alignSelf: 'flex-start',
                          backgroundColor: '#ffffff',
                          padding: 8,
                          margin: 10,
                          borderRadius: 7,
                          maxWidth: '60%',
                        }),
                    ...(isSelected && {
                      width: '100%',
                      backgroundColor: '#ffffff',
                    }),
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      textAlign: 'left',
                      color: '#000',
                      minWidth: 70,
                    }}>
                    {item?.message}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'right',
                      fontSize: 11,
                      color: '#8e948f',
                      marginTop: 5,
                    }}>
                    {formatTime(item.timeStamp)}
                  </Text>
                </Pressable>
              );
            }
          })}
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderTopWidth: 1,
            borderColor: '#dddddd',
            marginBottom: showEmojiselector ? 0 : 15,
          }}>
          <Entypo
            onPress={handleEmojiPress}
            name="emoji-happy"
            size={27}
            color={Colors.black4}
            style={{marginRight: 5}}
          />
          <TextInput
            value={message}
            onChangeText={text => setMessage(text)}
            style={{
              flex: 1,
              height: 40,
              borderWidth: 1,
              borderColor: '#dddddd',
              borderRadius: 20,
              paddingHorizontal: 10,
              marginRight: 10,
              color: '#000',
            }}
            placeholderTextColor={'#000'}
            placeholder="type your message here...."
          />

          <Pressable onPress={handleSend} disabled={message.trim() === ''}>
            <Ionicons style={{}} name="send" size={27} color={'#000000'} />
          </Pressable>
        </View>
        {showEmojiselector && (
          <EmojiSelector
            onEmojiSelected={emoji => {
              setMessage(prevMessage => prevMessage + emoji);
            }}
            style={{height: 350}}
          />
        )}
      </KeyboardAvoidingView>
    </BackButtonHandler>
  );
};

export default UserMessages;

const styles = StyleSheet.create({});
