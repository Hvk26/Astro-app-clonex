import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import useAuth from './useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from '../utils/Colors';

const checkCredentials = () => {
  const setUser = useAuth(state => state.setUser);
  useEffect(() => {
    (async () => {
      const userString = await AsyncStorage.getItem('user');
      if (userString) {
        setUser(JSON.parse(userString));
      }
    })();
  }, []);
  return (
    <View style={{backgroundColor: Colors.primaryYellow}}>
      <ActivityIndicator size={'large'} color={Colors.content1} />
    </View>
  );
};

export default checkCredentials;

const styles = StyleSheet.create({});
