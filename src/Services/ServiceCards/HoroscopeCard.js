import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import {Colors} from '../../utils/Colors';
import KeyCenter from '../../utils/KeyCenter';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

const HoroscopeCard = () => {
  const [horoscopeData, setHoroscopeData] = useState(null);

  const [time, setTime] = useState('');
  const navigation = useNavigation();

  function getCurrentTime() {
    const today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();

    // Add leading zeros if needed
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    // Convert to 12-hour format and determine AM/PM
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 12-hour clock, so 0 becomes 12

    const formatedTime = hours + ':' + minutes + ' ' + ampm;
    setTime(formatedTime);
    return hours + ':' + minutes + ' ' + ampm;
  }

  useEffect(() => {
    const fetchHoroscope = async () => {
      try {
        const today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; // January is 0!
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
            `https://api.vedicastroapi.com/v3-json/prediction/daily-sun`,
            {
              params: {
                zodiac: 1,
                date: formattedDate,
                show_same: true,
                api_key: API_KEY,
                lang: 'en',
                split: true,
                type: 'small',
              },
            },
          );
          if (response.status === 200) {
            await setHoroscopeData(response.data.response);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchHoroscope();
    getCurrentTime();
  }, []);

  //console.log(horoscopeData);
  if (!horoscopeData) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
  }
  return (
    <ImageBackground
      imageStyle={{borderRadius: 20}}
      source={require('../../assets/icons/bg-hc.jpeg')}
      style={{
        height: 270,
        flex: 1,
        borderRadius: 20,
      }}>
      {/* <View style={{paddingTop: 20, paddingLeft: 15}}>
        <Text
          style={{
            color: '#fff',
            fontSize: 15,
            marginTop: 10,
          }}>
          Your daily horoscope is ready
        </Text>
        {Object.keys(horoscopeData).length > 0 && (
          <View>
            <Text style={{color: '#fff', marginTop: 20, fontSize: 13}}>
              Lucky Color:{' '}
              <Text
                style={{
                  color: horoscopeData?.lucky_color_code,
                  fontSize: 15,
                  fontWeight: '400',
                }}>
                {horoscopeData?.lucky_color}
              </Text>
            </Text>
            <View
              style={{
                backgroundColor: horoscopeData?.lucky_color_code,
                height: 20,
                width: 20,
                borderRadius: 10,
                marginTop: 10,
              }}
            />
          </View>
        )}
        {Object.keys(horoscopeData).length > 0 && (
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <Text style={{color: '#fff', marginTop: 20, fontSize: 13}}>
                Lucky Number:{' '}
              </Text>
              <Text
                style={{
                  color: '#ffff',
                  fontSize: 15,
                  fontWeight: '400',
                  marginTop: 10,
                }}>
                {horoscopeData?.lucky_number.join(', ')}
              </Text>
            </View>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <Text>Time:</Text>
              <Text>{time}</Text>
            </View>
          </View>
        )}
      </View> */}
      <View style={{marginTop: 10, marginLeft: 15}}>
        <Text
          style={{
            color: '#fff',
            fontSize: 15,
            marginTop: 10,
          }}>
          Your daily horoscope is ready
        </Text>
      </View>
      <View style={{marginTop: 20}}>
        {Object.keys(horoscopeData).length > 0 && (
          <View style={{marginTop: 5, marginLeft: 15}}>
            <Text style={{color: '#fff', fontSize: 13}}>
              Lucky Color:{' '}
              <Text
                style={{
                  color: horoscopeData?.lucky_color_code,
                  fontSize: 15,
                  fontWeight: '400',
                }}>
                {horoscopeData?.lucky_color}
              </Text>
            </Text>
            <View
              style={{
                backgroundColor: horoscopeData?.lucky_color_code,
                height: 20,
                width: 20,
                borderRadius: 10,
                marginTop: 10,
              }}
            />
          </View>
        )}
      </View>

      <View
        style={{
          marginLeft: 15,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 40,
        }}>
        <View>
          <Text style={{color: '#fff', marginTop: 20, fontSize: 13}}>
            Lucky Number:{' '}
          </Text>
          {Object.keys(horoscopeData).length > 0 && (
            <Text
              style={{
                color: '#ffff',
                fontSize: 15,
                fontWeight: '400',
                marginTop: 10,
              }}>
              {horoscopeData?.lucky_number.join(', ')}
            </Text>
          )}
        </View>
        <View>
          <Text style={{color: '#fff', marginTop: 20, fontSize: 13}}>Time</Text>
          <Text
            style={{
              color: '#ffff',
              fontSize: 15,
              fontWeight: '400',
              marginTop: 10,
            }}>
            {time}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('DailyHoroscope')}
        style={{
          marginHorizontal: 20,
          flexDirection: 'row',
          backgroundColor: Colors.title1,
          flex: 1,
          marginTop: 20,
          marginBottom: 25,
          paddingHorizontal: 20,
          alignItems: 'center',
          borderRadius: 30,
        }}>
        <Text
          style={{
            flex: 1,
            color: Colors.black7,
            fontSize: 15,
            fontWeight: '500',
          }}>
          Know your Detailed Horoscope
        </Text>
        <FontAwesome5
          name="arrow-circle-right"
          size={24}
          color={Colors.black7}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default HoroscopeCard;

const styles = StyleSheet.create({});
