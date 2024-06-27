import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import BackButtonHandler from '../../../components/BackButtonHandler/BackButtonHandler';
import {Colors} from '../../../utils/Colors';

const Waitlist = () => {
  const data = [
    {
      id: '25673275',
      name: 'Sachin',
      country: 'India',
      type: 'Call',
      status: 'WAITING',
      duration: '26',
      date: '10 July 24, 12:45 AM',
      token: '1',
    },
    {
      id: '25673275',
      name: 'Piyush',
      country: 'India',
      type: 'Chat',
      status: 'WAITING',
      duration: '26',
      date: '09 Oct 24, 12:45 AM',
      token: '2',
    },
    {
      id: '25673275',
      name: 'Rajesh',
      country: 'India',
      type: 'Chat',
      status: 'WAITING',
      duration: '26',
      date: '04 Jan 24, 10:45 AM',
      token: '3',
    },
  ];

  const Card = ({item}) => {
    return (
      <View
        style={{
          borderWidth: 0.7,
          marginHorizontal: 3,
          borderRadius: 12,
          paddingHorizontal: 10,
          marginTop: 15,
          paddingVertical: 15,
        }}>
        <View>
          <Text style={{color: Colors.black7, fontWeight: '500', fontSize: 16}}>
            {item.name} (Id:{item.id})
          </Text>
          <Text style={{color: Colors.grey3, fontWeight: '500'}}>
            {item.country}
          </Text>
          <Text style={{color: Colors.grey3}}>{item.date}</Text>
          <Text style={{color: Colors.black7}}>
            Type: <Text style={{fontWeight: '500'}}>{item.type}</Text>
          </Text>
          <Text style={{color: Colors.black7}}>
            Token No: <Text style={{fontWeight: '500'}}>{item.token}</Text>
          </Text>
          <Text style={{color: Colors.green}}>
            Status: <Text style={{fontWeight: '500'}}>{item.status}</Text>
          </Text>
          <Text style={{color: Colors.black7}}>
            Duration:{' '}
            <Text style={{fontWeight: '500'}}>{item.duration} Mins</Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            marginVertical: 10,
          }}>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              paddingHorizontal: 20,
              borderRadius: 12,
              paddingVertical: 5,
              backgroundColor: Colors.black7,
            }}>
            <Text style={{color: '#fff', fontWeight: '500'}}>User Detail</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              paddingHorizontal: 20,
              borderRadius: 12,
              paddingVertical: 5,
              backgroundColor: Colors.black7,
            }}>
            <Text style={{color: '#fff', fontWeight: '500'}}>
              Start Offline Session
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <BackButtonHandler>
      <ScrollView>
        {data &&
          data.map((item, index) => {
            return <Card key={index} item={item} />;
          })}
      </ScrollView>
    </BackButtonHandler>
  );
};

export default Waitlist;

const styles = StyleSheet.create({});
