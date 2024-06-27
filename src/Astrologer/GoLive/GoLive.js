import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../utils/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GoLive = ({userName}) => {
  const navigation = useNavigation();
  const golive = () => {
    //onPress={() => navigation.navigate('HostPage', userData)}
  };
  // useEffect(async () => {
  //   const userName = await AsyncStorage.getItem('userName');
  //   console.log('>>>>>>>>>>>>>>>>>>>', userName);
  // });

  console.log('userName: ' + userName);

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate('HostPage', {userName: userName})}
        style={{
          marginTop: 10,
          borderWidth: 0.3,
          borderColor: Colors.grey4,
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          elevation: 1,
          backgroundColor: Colors.title2,
          borderRadius: 15,
          paddingVertical: 10,
          height: 70,
        }}>
        <Ionicons
          name="videocam-outline"
          size={30}
          color={'#fff'}
          style={{
            borderWidth: 1,
            paddingHorizontal: 8,
            borderRadius: 30,
            paddingVertical: 6,
            alignItems: 'center',
            backgroundColor: Colors.green,
            justifyContent: 'center',
          }}
        />
        <Text style={{color: Colors.black7, fontSize: 18, fontWeight: '500'}}>
          Go Live Now!! 😍
        </Text>
        <Ionicons
          name="chevron-forward-outline"
          size={40}
          color={Colors.black7}
        />
      </TouchableOpacity>
    </View>
  );
};

export default GoLive;

const styles = StyleSheet.create({});
