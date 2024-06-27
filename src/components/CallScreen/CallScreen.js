import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useContext, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {UserType} from '../../UserContext';
import {Colors} from '../../utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CallScreen = () => {
  const {params} = useRoute();
  const navigation = useNavigation();
  const {userId, walletBalance} = useContext(UserType);

  const [callRate, setCallRate] = useState(params?.callRate);
  const [callDuration, setCallDuration] = useState(0);
  const [walletId, setWalletId] = useState(null);
  const [callCost, setCallCost] = useState(0);

  useEffect(() => {
    const callTimeInSeconds = (walletBalance / callRate) * 60;
    const timeoutId = setTimeout(() => {
      navigation.goBack();
      Alert.alert(`Call cost ${callCost}`);
    }, callTimeInSeconds * 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [walletBalance, callRate]);

  useEffect(() => {
    const fetchWalletId = async () => {
      try {
        const id = await AsyncStorage.getItem('walletId');
        setWalletId(id);
      } catch (error) {
        console.error('Error fetching wallet ID:', error);
      }
    };
    fetchWalletId();
  }, []);
  useEffect(() => {
    const cost = (callDuration / 60) * callRate; // Convert call duration to minutes
    setCallCost(cost);
  }, [callDuration, callRate]);
  return (
    <View style={styles.page}>
      <View style={styles.cameraPreview} />
      <Text
        style={{
          color: Colors.black7,
          fontSize: 16,
          marginTop: 20,
          marginLeft: 20,
        }}>
        {callDuration}
      </Text>
      <Text
        style={{
          color: Colors.black7,
          fontSize: 16,
          marginTop: 20,
          marginLeft: 20,
        }}>
        Call Cost: {callCost}
      </Text>
    </View>
  );
};

export default CallScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#7b4e80',
  },
  cameraPreview: {
    width: 110,
    height: 150,
    backgroundColor: '#ffff6e',
    position: 'absolute',
    right: 10,
    top: 100,
    borderRadius: 10,
  },
});
