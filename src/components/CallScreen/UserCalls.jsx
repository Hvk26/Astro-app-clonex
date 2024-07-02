import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ScrollViewBase,
  Image,
  TouchableWithoutFeedback,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import BackButtonHandler from '../BackButtonHandler/BackButtonHandler';
import {Colors} from '../../utils/Colors';
import axios from 'axios';
import Service_URL from '../../utils/Constant';
import {UserType} from '../../UserContext';
import ZegoUIKitPrebuiltCallService, {
  ZegoSendCallInvitationButton,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import * as ZIM from 'zego-zim-react-native';
import KeyCenter from '../../utils/KeyCenter';
import useAuth from '../../store/useAuth';
const imageUrl = 'https://avatar.iran.liara.run/public/boy';

const {width} = Dimensions.get('window');
const UserCalls = ({user}) => {
  const navigation = useNavigation();
  const {userId} = useContext(UserType);
  const currentUser = useAuth(state => state.user);
  const userName = 'Anonymous';
  const viewRef = useRef(null);

  const blankPressedHandle = () => {
    viewRef.current.blur();
  };

  useEffect(() => {
    initService();
  }, []);

  const initService = () => {
    const name = 'user_' + userId;
    ZegoUIKitPrebuiltCallService.init(
      KeyCenter.ZegocloudKey.ZEGOCLOUD_APPID,
      KeyCenter.ZegocloudKey.ZEGOCLOUD_SIGNIN,
      userId,
      userName,
      [ZIM],
      {
        ringtoneConfig: {
          incomingCallFileName: 'zego_incoming.mp3',
          outgoingCallFileName: 'zego_outgoing.mp3',
        },
        avatarBuilder: () => {
          return (
            <View style={{width: '100%', height: '100%'}}>
              <Image
                style={{width: '100%', height: '100%'}}
                resizeMode="cover"
                source={{
                  uri:
                    `https://robohash.org/${userId}.png` ||
                    'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.553209589.1714521600&semt=ais',
                }}
              />
            </View>
          );
        },
        requireConfig: data => {
          return {
            timingConfig: {
              isDurationVisible: true,
              onDurationUpdate: duration => {
                console.log(
                  '########CallWithInvitation onDurationUpdate',
                  duration,
                );
                if (duration === 10 * 60) {
                  ZegoUIKitPrebuiltCallService.hangUp();
                }
              },
            },
            topMenuBarConfig: {
              buttons: [ZegoMenuBarButtonName.minimizingButton],
            },
            onWindowMinimized: () => {
              console.log('[Demo]CallInvitation onWindowMinimized');
              props.navigation.navigate('Calls');
            },
            onWindowMaximized: () => {
              console.log('[Demo]CallInvitation onWindowMaximized');
              props.navigation.navigate('ZegoUIKitPrebuiltCallInCallScreen');
            },
          };
        },
      },
    );

    // ZegoUIKitPrebuiltCallService.init(
    //   KeyCenter.ZegocloudKey.ZEGOCLOUD_APPID,
    //   KeyCenter.ZegocloudKey.ZEGOCLOUD_SIGNIN,
    //   userId,
    //   userName,
    //   [ZIM, ZPNs],
    //   {
    //     ringtoneConfig: {
    //       incomingCallFileName: 'zego_incoming.wav',
    //       outgoingCallFileName: 'zego_outgoing.wav',
    //     },
    //     // notifyWhenAppRunningInBackgroundOrQuit: true,
    //     androidNotificationConfig: {
    //       channelId: 'zego_video_call',
    //       channelName: 'zego_video_call',
    //     },
    //     // requireConfig: data => {
    //     //   return {
    //     //     onHangUp: duration => {
    //     //       console.log(duration);
    //     //       navigation.goBack();
    //     //     },
    //     //   };
    //     // },
    //   },
    // );
  };

  return (
    <TouchableWithoutFeedback>
      <View
        style={{
          borderWidth: 1,
          flex: 1,
          flexDirection: 'column',
          paddingVertical: 4,
          paddingHorizontal: 10,
          borderRadius: 10,
          gap: 10,
          marginTop: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            borderBottomColor: Colors.black7,
            borderBottomWidth: 0.7,
            paddingBottom: 10,
          }}>
          <View style={{flexDirection: 'row', gap: 20}}>
            <Image
              source={{uri: imageUrl}}
              style={{width: 60, height: 60, borderRadius: 30}}
            />
            <Text
              style={{fontSize: 17, fontWeight: '500', color: Colors.black8}}>
              {user.name}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 10,
              gap: 20,
            }}>
            <Pressable style={styles.button}>
              <ZegoSendCallInvitationButton
                invitees={[
                  {
                    userID: user?._id,
                    userName: user?.name.split(' ')[0],
                  },
                ]}
                isVideoCall={false}
                // resourseID={'zego_data'}
              />
            </Pressable>
            <Pressable style={[styles.button, {borderColor: Colors.pink1}]}>
              <ZegoSendCallInvitationButton
                invitees={[
                  {
                    userID: user?._id,
                    userName: user?.name.split(' ')[0],
                  },
                ]}
                isVideoCall={true}
                resourseID={'zego_video_call'}
              />
            </Pressable>
          </View>
        </View>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('UsersAstrologyDetails', {
              recipientId: user._id,
            })
          }
          style={{
            flex: 1,
            alignItems: 'center',
            paddingVertical: 4,
            borderRadius: 10,
            marginBottom: 5,
            backgroundColor: Colors.secondaryYellow,
          }}>
          <Text style={{color: Colors.black7, fontSize: 17}}>User Detail</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UserCalls;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ffffff',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: '#007300',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
});
