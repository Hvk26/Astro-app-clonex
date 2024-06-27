import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import BackButtonHandler from '../components/BackButtonHandler/BackButtonHandler';
import {Colors} from './Colors';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const AuthLogin = () => {
  const navigation = useNavigation();
  return (
    <BackButtonHandler>
      <View style={{marginHorizontal: 20, marginVertical: 20}}>
        <Text
          style={{alignSelf: 'center', marginBottom: 20, color: Colors.grey2}}>
          You are not logged In..!!
        </Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('LogIn')}
          buttonColor={Colors.yellow}
          textColor={Colors.black1}
          style={{alignSelf: 'center'}}>
          Sign In
        </Button>
      </View>
    </BackButtonHandler>
  );
};

export default AuthLogin;

const styles = StyleSheet.create({});
