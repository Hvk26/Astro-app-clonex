import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useContext, useState} from 'react';
import axios from 'axios';
import {UserType} from '../../UserContext';
import {useNavigation} from '@react-navigation/native';
import Service_URL from '../../utils/Constant';
import BackButtonHandler from '../BackButtonHandler/BackButtonHandler';
import {Button} from 'react-native-paper';
import {Colors} from '../../utils/Colors';
import PopUpDetail from '../PopUp/PopUpDetail';
const {width} = Dimensions.get('screen');

const CallRequestHandler = ({item, chatRequestUsers, setChatRequestUsers}) => {
  const {userId, setUserId} = useContext(UserType);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const navigation = useNavigation();

  const acceptRequest = async chatRequestId => {
    try {
      const response = await axios.post(
        `${Service_URL}/user/callRequest/accept`,
        {
          senderId: chatRequestId,
          recipientId: userId,
        },
      );

      if (response.ok) {
        setChatRequestUsers(
          chatRequestUsers.filter(request => request._Id !== chatRequestId),
        );
      }
      navigation.navigate('Calls');
    } catch (error) {
      console.log('error accepting the request', error);
    }
  };

  const openDetail = async chatRequestId => {
    navigation.navigate('UsersAstrologyDetails', {recipientId: chatRequestId});
  };

  return (
    <BackButtonHandler style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 10,
          alignSelf: 'center',
          width: width - 7,
        }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 500,
            flex: 1,
            color: '#000',
          }}>
          {item.name} sent you Call request !!
        </Text>
        <View style={{flexDirection: 'row', gap: 5}}>
          <Button
            mode="contained"
            onPress={() => acceptRequest(item?._id)}
            labelStyle={{fontSize: 16}}
            buttonColor={Colors.primaryGreen}
            textColor={Colors.black7}>
            Accept
          </Button>
          <Button
            mode="contained"
            onPress={openDetail}
            labelStyle={{fontSize: 16}}
            //buttonColor={Colors.black7}
            textColor="#fff">
            Detail
          </Button>

          {isPopupVisible && (
            <PopUpDetail
              isVisible={isPopupVisible}
              onClose={() => setPopupVisible(false)}
              clientId={item._id}
            />
          )}
        </View>
      </View>
    </BackButtonHandler>
  );
};

export default CallRequestHandler;

const styles = StyleSheet.create({});
