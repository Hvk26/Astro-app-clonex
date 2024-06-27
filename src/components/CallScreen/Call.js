import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import useAuth from '../../store/useAuth';
import firestore from '@react-native-firebase/firestore';
import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn';
const Call = () => {
  const user = useAuth(state => state.user);
  const setState = useAuth(state => state.setUser);
  const [astrologers, setAstrologers] = useState([]);
  useEffect(() => {
    initService();
    getUsers();
  }, []);

  const initService = () => {
    ZegoUIKitPrebuiltCallService.init(
      '1120446852',
      '4b60e9d73d45293aa39178fb303ac10c3e518481cf753a6d2022bff94219a90d',
      
    );
  };

  const getUsers = async () => {
    const userDocs = await firestore()
      .collection('users')
      .where('email', '!=', user.email)
      .get();

    const users = [];
    userDocs.forEach(doc => {
      users.push({
        id: doc.id,
        ...doc.data(),
      });
      setAstrologers(users);
    });
  };
  return (
    <View>
      <Text>Call</Text>
    </View>
  );
};

export default Call;

const styles = StyleSheet.create({});
