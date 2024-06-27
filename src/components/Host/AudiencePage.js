import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import ZegoUIKitPrebuiltLiveStreaming, {
  AUDIENCE_DEFAULT_CONFIG,
  ZegoMenuBarButtonName,
} from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn';
import * as ZIM from 'zego-zim-react-native';
import KeyCenter from '../../utils/KeyCenter';
import {UserType} from '../../UserContext';
import Service_URL from '../../utils/Constant';
import axios from 'axios';

const AudiencePage = () => {
  const {userId, setUserId} = useContext(UserType);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();

  const fetchData = async () => {
    try {
      console.log('Fetching user data for user ID:', userId);
      const response = await axios.get(`${Service_URL}/userInfo/${userId}`);
      console.log('Response data:', response.data);

      const data = response.data;

      if (!data) {
        setError('User not found');
      } else {
        setUserData(data);
        setError(null);
      }
    } catch (error) {
      console.error('Error fetching user information:', error);
      setError('Error fetching user information');
    }
  };

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, []); // Pass an empty dependency array

  const {data} = route.params;
  function generateRandomUserID(length) {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    let randomUserID = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      randomUserID += characters.charAt(randomIndex);
    }

    return randomUserID;
  }
  const userID = userId ? userId : generateRandomUserID(8);
  const liveID = data._id;

  const userName = userData ? userData?.name : 'Guest';

  // const userName = data.name;
  // if (!userData) {
  //   return (
  //     <View>
  //       <Text>Loading user data...</Text>
  //     </View>
  //   );
  // }
  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltLiveStreaming
        appID={KeyCenter.LiveStreamKey.APP_ID}
        appSign={KeyCenter.LiveStreamKey.APP_SIGN}
        userID={userID}
        userName={userName}
        liveID={liveID}
        config={{
          ...AUDIENCE_DEFAULT_CONFIG,
          onLeaveLiveStreaming: () => {
            navigation.navigate('LiveStream');
          },
          topMenuBarConfig: {
            buttons: [
              ZegoMenuBarButtonName.minimizingButton,
              ZegoMenuBarButtonName.leaveButton,
            ],
          },
          onWindowMinimized: () => {
            console.log('[Demo]AudiencePage onWindowMinimized');
            navigation.navigate('LiveStream');
          },
          onWindowMaximized: () => {
            console.log('[Demo]AudiencePage onWindowMaximized');
            navigation.navigate('AudiencePage', {
              userID: userID,
              userName: userName,
              liveID: liveID,
            });
          },
        }}
        plugins={[ZIM]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  avView: {
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex: 1,
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'red',
  },
  ctrlBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 50,
    width: '100%',
    height: 50,
    zIndex: 2,
  },
  ctrlBtn: {
    flex: 1,
    width: 48,
    height: 48,
    marginLeft: 37 / 2,
    position: 'absolute',
  },
});
export default AudiencePage;
