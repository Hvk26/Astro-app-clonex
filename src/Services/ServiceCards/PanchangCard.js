import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import KeyCenter from '../../utils/KeyCenter';
import axios from 'axios';
import {Colors} from '../../utils/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const PanchangCard = () => {
  const [data, setData] = useState({});
  const [time, setTime] = useState('');
  const navigation = useNavigation();

  const API_KEY = KeyCenter.vedicastroapi.API_KEY;

  useEffect(() => {
    const fetchPanchang = async () => {
      try {
        const today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        const yyyy = today.getFullYear();
        if (dd < 10) {
          dd = '0' + dd;
        }
        if (mm < 10) {
          mm = '0' + mm;
        }
        const formattedDate = dd + '/' + mm + '/' + yyyy;
        const API_KEY = KeyCenter.vedicastroapi.API_KEY;
        if (formattedDate) {
          const response = await axios.get(
            `https://api.vedicastroapi.com/v3-json/panchang/panchang?api_key=${API_KEY}&date=${formattedDate}&tz=5.5&lat=28.7&lon=77.1&time=05:20&lang=en`,
          );
          if (response.status === 200) {
            await setData(response.data.response);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPanchang();
  }, []);
  console.log(data);

  if (!data) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={{borderWidth: 1, borderColor: Colors.grey3, borderRadius: 15}}>
      <View
        style={{
          flex: 1,
          paddingVertical: 5,
          paddingHorizontal: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{color: Colors.black7, fontWeight: '500', fontSize: 14}}>
          Today's Panchang
        </Text>
        <Text style={{color: Colors.grey3, fontWeight: '500', fontSize: 14}}>
          New Delhi, Delhi India
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}>
        <Text style={{color: Colors.grey6, fontWeight: '500', fontSize: 14}}>
          Sunrise - Sunset
        </Text>
        <Text style={{color: Colors.grey6, fontWeight: '500', fontSize: 14}}>
          Moonrise - Moonset
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 30,
          marginHorizontal: 10,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#ffe7e7',
            borderColor: '#ff9b9b',
            borderWidth: 1,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 15,
            alignItems: 'center',
          }}>
          <Ionicons name="sunny-outline" size={24} color={'#ff4d4d'} />
          <Text style={{color: Colors.grey2}}>
            {data.advanced_details?.sun_rise}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#d0ecfd',
            borderColor: '#51a9ff',
            borderWidth: 1,
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderRadius: 15,
            alignItems: 'center',
          }}>
          <Ionicons name="moon" size={24} color={Colors.black7} />
          <Text style={{color: Colors.grey2}}>
            {data.advanced_details?.sun_set}
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          marginBottom: 10,
        }}>
        <View>
          <Text style={{color: Colors.black7, fontSize: 15}}>Nakshatra</Text>
          <Text style={{color: Colors.black7, fontSize: 15}}>Yoga</Text>
          <Text style={{color: Colors.black7, fontSize: 15}}>Tithi</Text>
          <Text style={{color: Colors.black7, fontSize: 15}}>Karana</Text>
          <Text style={{color: Colors.black7, fontSize: 15}}>Paksha</Text>
        </View>
        <View style={{paddingRight: 50}}>
          <Text style={{color: Colors.grey2}}>{data.nakshatra?.name}</Text>
          <Text style={{color: Colors.grey2}}>{data.yoga?.name}</Text>
          <Text style={{color: Colors.grey2}}>{data.tithi?.name}</Text>
          <Text style={{color: Colors.grey2}}>{data.karana?.name}</Text>
          <Text style={{color: Colors.grey2}}>
            {data.advanced_details?.masa.paksha}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('Panchang')}
        style={{
          marginHorizontal: 20,
          flexDirection: 'row',
          backgroundColor: Colors.title1,
          flex: 1,
          marginTop: 1,
          marginBottom: 25,
          paddingHorizontal: 35,
          alignItems: 'center',
          borderRadius: 30,
          paddingVertical: 5,
        }}>
        <Text
          style={{
            flex: 1,
            color: Colors.black7,
            fontSize: 15,
            fontWeight: '500',
          }}>
          Know Detailed Panchang
        </Text>
        <FontAwesome5
          name="arrow-circle-right"
          size={24}
          color={Colors.black7}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PanchangCard;

const styles = StyleSheet.create({});
