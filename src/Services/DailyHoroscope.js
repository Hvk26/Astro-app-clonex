import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import {zodiacSign} from '../utils/ZodiacImages';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import KeyCenter from '../utils/KeyCenter';
import BackButtonHandler from '../components/BackButtonHandler/BackButtonHandler';
import {Picker} from '@react-native-picker/picker';
import {Colors} from '../utils/Colors';
import HoroscopeData from './Horoscope.js/HoroscopeData';

const DailyHoroscope = () => {
  const [horoscopeData, setHoroscopeData] = useState({});
  const [zodiac, setZodiac] = useState('1');
  const [selectedDate, setSelectedDate] = useState();
  const [selectedCat, setSelectedCat] = useState('1');

  const API_KEY = KeyCenter.vedicastroapi.API_KEY;

  const generateNextSevenDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      dates.push(nextDate);
    }
    return dates;
  };

  const formatDate = date => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Generate next 7 dates
  const nextSevenDates = generateNextSevenDates();

  const getHoroscope = async () => {
    try {
      const response = await axios.get(
        `https://api.vedicastroapi.com/v3-json/prediction/daily-sun?zodiac=${zodiac}&date=${selectedDate}&show_same=true&api_key=${API_KEY}&lang=en&split=true&type=big`,
      );
      if (response.status === 200) {
        setHoroscopeData(response.data.response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setSelectedDate(formatDate(new Date()));
  }, []);

  useEffect(() => {
    getHoroscope();
  }, [zodiac, selectedDate]);

  return (
    <BackButtonHandler>
      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <Text
            style={{
              flex: 1,
              width: 50,
              color: Colors.black7,
              fontSize: 15,
              fontWeight: '500',
            }}>
            Select Date:
          </Text>
          <Picker
            style={{flex: 1}}
            dropdownIconColor={'#000'}
            selectionColor={'red'}
            itemStyle={{color: 'red'}}
            selectedValue={selectedDate}
            onValueChange={itemValue => setSelectedDate(itemValue)}>
            {nextSevenDates.map((date, index) => (
              <Picker.Item
                style={{
                  borderWidth: 0.6,
                  borderColor: Colors.grey3,
                  color: '#000',
                }}
                key={index}
                label={formatDate(date)}
                value={formatDate(date)}
              />
            ))}
          </Picker>
        </View>
        <View style={{marginBottom: 5}}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 10}}>
            {zodiacSign.map((cat, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    marginTop: 0.25,
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setZodiac(cat.value);
                    setSelectedCat(cat.value);
                  }}>
                  <View
                    style={{
                      borderRadius: 50,
                      padding: 0.24,
                      borderColor: selectedCat === cat.value ? 'red' : 'yellow',
                      borderWidth: 2,
                      margin: 2,
                    }}>
                    <Image
                      source={cat.uri}
                      style={{
                        width: hp(9),
                        height: hp(9),
                        borderRadius: 50,
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: hp(1.6),
                      color: selectedCat === cat.value ? 'red' : '#000',
                      marginLeft: 11,
                    }}>
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        {horoscopeData && <HoroscopeData data={horoscopeData} />}
      </ScrollView>
    </BackButtonHandler>
  );
};

const styles = StyleSheet.create({
  dataContainer: {
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    alignContent: 'center',
    marginHorizontal: '2%',
    marginVertical: '1.5%',
    padding: 6,
  },
  title: {
    color: '#000',
    fontWeight: '500',
    fontSize: 16,
    marginTop: -2.1,
  },
  dailyData: {
    color: '#000',
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'Open Sans',
  },
});
export default DailyHoroscope;
