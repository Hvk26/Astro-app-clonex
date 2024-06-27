import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import AuthLogin from '../../utils/AuthLogin';
import {UserType} from '../../UserContext';

const Call = () => {
  const {userId, setuserId} = useContext(UserType);

  return userId ? (
    <View>
      <Text>Chat</Text>
    </View>
  ) : (
    <AuthLogin />
  );
};

export default Call;

const styles = StyleSheet.create({});
