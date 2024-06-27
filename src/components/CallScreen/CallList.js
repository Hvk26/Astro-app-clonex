import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import BackButtonHandler from '../BackButtonHandler/BackButtonHandler';
import axios from 'axios';
import Service_URL from '../../utils/Constant';
import {Colors} from '../../utils/Colors';
import {UserType} from '../../UserContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ZegoUIKitPrebuiltCallService, {
  ZegoSendCallInvitationButton,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import KeyCenter from '../../utils/KeyCenter';
import useAuth from '../../store/useAuth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ZegoUIKitPrebuiltCall, {
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

const imageUrl =
  'https://imgv3.fotor.com/images/gallery/a-man-profile-picture-with-blue-and-green-background-made-by-LinkedIn-Profile-Picture-Maker.jpg';
const CallList = () => {
  const {userId} = useContext(UserType);

  const viewRef = useRef(null);

  const blankPressedHandle = () => {
    viewRef.current.blur();
  };

  console.log('----------------------------?', userId);
  const [astrologers, setAstrologer] = useState({});
  const [contacts, setContacts] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const {walletBalance} = useContext(UserType);
  const navigation = useNavigation();
  const user = useAuth(state => state.user);
  const userName = 'Anonymous';
  useEffect(() => {
    async function fetchAstrologers() {
      try {
        const response = await axios.get(`${Service_URL}/astrologers`);
        if (response.status === 200) {
          const verifiedAstrologers = response.data.filter(
            astrologer => astrologer.role === 'verified',
          );
          setAstrologer(verifiedAstrologers);
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchAstrologers();
  }, []);

  useEffect(() => {
    initService();
    // getUsers();
  }, []);

  // console.log('000000000000000000000000000000', userId, userName);
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
              props.navigation.navigate('HomeScreen');
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

  // const getUsers = async () => {
  //   try {
  //     const userDocs = await firestore()
  //       .collection('users')
  //       .where('email', '!=', user.email)
  //       .get();
  //     const users = [];
  //     userDocs.forEach(doc => {
  //       users.push({
  //         id: doc.id,
  //         ...doc.data(),
  //       });
  //     });
  //     setContacts(users);
  //     console.log(userDocs);
  //   } catch (error) {
  //     console.log('error in fetching data', error);
  //   }
  // };
  // console.log('astrologers=-=========================>', astrologers);

  // const handleVideoCall = (id, amount) => {
  //   console.log(id, amount);
  //   if (walletBalance >= amount) {
  //     navigation.navigate('CallScreen', {astrologerId: id, callRate: amount});
  //   } else {
  //     Alert.alert('Insufficient Balance', 'Please add funds to your wallet.');
  //   }
  // };
  // const handleAudioCall = (id, amount) => {};

  return (
    <TouchableWithoutFeedback onPress={blankPressedHandle}>
      <BackButtonHandler>
        <View style={{marginHorizontal: 10, marginBottom: 67, paddingTop: 20}}>
          {/* <TouchableOpacity onPress={() => navigation.navigate('VoiceCall')}>
          <Text style={{color: '#000'}}>Call Now</Text>
        </TouchableOpacity> */}

          <FlatList
            data={astrologers}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.astrologerContainer}
                onPress={
                  () => navigation.navigate('AstrologerProfile', {user: item})
                  // console.log('///////////////////////////////////', item._id)
                }>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Image
                    source={{
                      uri: item?.image
                        ? `${Service_URL}/${item.image}`
                        : imageUrl,
                    }}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 50,
                      borderColor: '#FBE300',
                      borderWidth: 3,
                    }}
                  />
                  <View style={{}}>
                    <Text style={styles.astrologersName}>
                      {item.name.split(' ')[0]}
                    </Text>
                    <Text style={{color: '#000000', fontSize: 15}}>
                      {item.skills.slice(0, 2).join(', ')}
                      {item.skills.length > 2 && !showMore && '...'}
                    </Text>
                    <Text style={{color: '#000000', fontSize: 15}}>
                      {'eng'}
                      {item.languages.join(', ') || 'eng'}
                    </Text>
                    <Text style={{color: '#000000', fontSize: 15}}>
                      Exp: {item.yearsOfExperience} years
                    </Text>
                    <Text style={{color: '#b30000', fontSize: 15}}>
                      ₹ {item.amount || 0} /min
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 15,
                      paddingHorizontal: 10,
                    }}>
                    <TouchableOpacity style={styles.button}>
                      <ZegoSendCallInvitationButton
                        invitees={[
                          {
                            userID: `${item._id}`,
                            userName: item.name.split(' ')[0],
                          },
                        ]}
                        isVideoCall={false}
                        // resourseID={'zego_data'}
                      />

                      {/* <ZegoSendCallInvitationButton
                      invitees={invitees.map(inviteeID => {
                        return {
                          userID: inviteeID,
                          userName: 'user_' + inviteeID,
                        };
                      })}
                      isVideoCall={false}
                    /> */}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, {borderColor: Colors.pink1}]}>
                      <ZegoSendCallInvitationButton
                        invitees={[
                          {
                            userID: item?._id,
                            userName: item.name.split(' ')[0],
                          },
                        ]}
                        isVideoCall={true}
                        resourseID={'zego_video_call'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item._id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </BackButtonHandler>
    </TouchableWithoutFeedback>
  );
};

export default CallList;

const styles = StyleSheet.create({
  page: {
    padding: 15,
    marginTop: -11,
  },
  astrologerContainer: {
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#BCBCBC',
    borderRadius: 13,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#ffffff',
    shadowColor: '#808080',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
    marginTop: 10,
    flex: 1,
  },
  astrologersName: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000000',
  },
  separator: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    marginTop: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  buttonText: {
    color: '#007300',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    alignItems: 'center',
  },
});
