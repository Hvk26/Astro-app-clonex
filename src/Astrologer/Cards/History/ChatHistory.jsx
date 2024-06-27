import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';
import BackButtonHandler from '../../../components/BackButtonHandler/BackButtonHandler';
import {Colors} from '../../../utils/Colors';
const {width, height} = Dimensions.get('screen');
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
const ChatHistory = () => {
  const navigation = useNavigation();
  const data = [
    {
      key: '1',
      name: 'Rajesh Kumar',
      userId: '1234568990',
      orderId: 'IND1234',
      orderDate: '2024-04-25',
      orderTime: '09:30 AM',
      duration: 45,
      status: 'COMPLETED',
      amount: 75.0,
      rate: 20,
      profilePic: 'https://avatar.iran.liara.run/public/boy',
      gender: 'Male',
      dob: '28-June-1993',
      tob: '9:30 PM',
      pob: 'Lucknow, UP, India',
    },
    {
      key: '2',
      name: 'Priya Sharma',
      userId: '1234568990',
      orderId: 'IND5678',
      orderDate: '2024-04-26',
      orderTime: '11:00 AM',
      duration: 60,
      status: 'PENDING',
      amount: 100.0,
      rate: 30,
      profilePic: 'https://avatar.iran.liara.run/public/girl',
      gender: 'Female',
      dob: '21-Aug-1991',
      tob: '905:30 PM',
      pob: 'Kanpur, UP, India',
    },
    {
      key: '3',
      name: 'Amit Patel',
      userId: '1234568990',
      orderId: 'IND91011',
      orderDate: '2024-04-27',
      orderTime: '02:00 PM',
      duration: 30,
      status: 'CANCELLED',
      amount: 50.0,
      rate: 25,
      profilePic: 'https://avatar.iran.liara.run/public/boy',
      gender: 'Male',
      dob: '28-July-1996',
      tob: '11:30 AM',
      pob: 'Patna, Bihar, India',
    },
    {
      key: '4',
      name: 'Anjali Singh',
      userId: '1234568990',
      orderId: 'IND121314',
      orderDate: '2024-04-28',
      orderTime: '03:30 PM',
      duration: 55,
      status: 'COMPLETED',
      amount: 90.0,
      rate: 22,
      profilePic: 'https://avatar.iran.liara.run/public/boy',
      gender: 'Female',
      dob: '28-March-1993',
      tob: '9:30 PM',
      pob: 'Jaipur, Rajasthan, India',
    },
    {
      key: '5',
      name: 'Sunil Gupta',
      userId: '1234568990',
      orderId: 'IND151617',
      orderDate: '2024-04-29',
      orderTime: '10:00 AM',
      duration: 40,
      status: 'PENDING',
      amount: 80.0,
      rate: 28,
      profilePic: 'https://avatar.iran.liara.run/public/boy',
      gender: 'Male',
      dob: '02-Jan-1993',
      tob: '2:30 AM',
      pob: 'Surat, Gujrat, India',
    },
  ];

  const Card = ({item}) => {
    return (
      <View
        style={{
          width: width,
          // marginHorizontal: 5,
          paddingHorizontal: 10,
          borderRadius: 10,
          alignSelf: 'center',
          paddingVertical: 15,
          borderColor: Colors.title5,
          borderWidth: 0.7,
          backgroundColor: '#fff',
          marginTop: 10,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 16, fontWeight: '500', color: Colors.black8}}>
            Order Id: <Text> {item.orderId}</Text>
          </Text>
          <Pressable onPress={() => console.log('clicked')}>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color={Colors.black8}
            />
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            paddingRight: 40,
          }}>
          <Text style={{fontSize: 16, fontWeight: '500', color: Colors.black8}}>
            Name: <Text style={{fontWeight: '400'}}>{item.name}</Text>
          </Text>
          <Text style={{fontSize: 16, fontWeight: '500', color: Colors.black8}}>
            Rs {item.amount}
          </Text>
        </View>
        <View style={{marginTop: 10}}>
          <Text style={{fontSize: 14, color: Colors.grey3}}>
            {item.orderDate}, {item.orderTime}
          </Text>
          <Text style={{fontSize: 14, color: Colors.grey3, marginTop: 5}}>
            Duration: <Text>{item.duration} minutes</Text>
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: Colors.black8,
              marginTop: 5,
              fontWeight: '500',
            }}>
            Rate: <Text>₹ {item.rate}/ minute</Text>
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: Colors.black8,
              marginTop: 5,
              fontWeight: '500',
            }}>
            Status:{' '}
            <Text style={{color: '#008000', fontWeight: 'bold'}}>
              {item.status}
            </Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 20,
          }}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Suggest Remedy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('KundaliAstro', {data: item});
            }}>
            <Text style={styles.buttonText}>Open Kundali</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#ff1b1b',
            width: 150,
            marginTop: 15,
            alignItems: 'center',
            paddingVertical: 6,
            borderRadius: 20,
            marginLeft: 20,
            borderColor: Colors.black7,
            borderWidth: 0.7,
          }}>
          <Text style={[styles.buttonText, {color: '#fff'}]}>Refund</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <BackButtonHandler>
      <ScrollView style={{}}>
        {data &&
          data.map((item, index) => {
            return <Card key={index} item={item} />;
          })}
      </ScrollView>
    </BackButtonHandler>
  );
};

export default ChatHistory;

const styles = StyleSheet.create({
  button: {
    borderWidth: 0.7,
    borderColor: Colors.black7,
    borderRadius: 25,
    width: 150,
    alignItems: 'center',
    paddingVertical: 6,
    backgroundColor: '#fff',
  },
  buttonText: {color: Colors.black7, fontSize: 15, fontWeight: '500'},
});
