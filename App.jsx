/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {UserContext} from './src/UserContext';
import AppNavigator from './src/AppNavigator/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';
// import {ZegoCallInvitationDialog} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import messaging from '@react-native-firebase/messaging';
import {
  ZegoCallInvitationDialog,
  ZegoUIKitPrebuiltCallFloatingMinimizedView,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {Alert} from 'react-native';
function App() {
  useEffect(() => {
    getDeviceToken();
  }, []);

  const getDeviceToken = async () => {
    let token = await messaging().getToken();
    console.log('token>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', token);
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        'A Foregound message arrived!!!!!!!!',
        JSON.stringify(remoteMessage.notification.body),
      );
    });
    return unsubscribe;
  }, []);

  return (
    <UserContext>
      <NavigationContainer>
        <ZegoCallInvitationDialog />
        <AppNavigator />
        <ZegoUIKitPrebuiltCallFloatingMinimizedView />
      </NavigationContainer>
    </UserContext>
  );
}

export default App;
