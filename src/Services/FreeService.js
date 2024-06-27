import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {encode} from 'base-64';
import KeyCenter from '../utils/KeyCenter';
import BackButtonHandler from '../components/BackButtonHandler/BackButtonHandler';
import {Colors} from '../utils/Colors';
import YoutubeCard from '../components/YouTube/YoutubeCard';
import HoroscopeCard from './ServiceCards/HoroscopeCard';
import PanchangCard from './ServiceCards/PanchangCard';

const FreeService = () => {
  const navigation = useNavigation();
  const {width, height} = Dimensions.get('window');

  // useEffect(() => {
  //   fetch(`https://json.astrologyapi.com/v1/basic_panchang`, {
  //     method: 'POST',
  //     headers: {
  //       Authorization: 'Basic ' + auth,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         console.error(`HTTP error! Status: ${response.status}`);
  //         return response.text();
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       setPanchangData(data);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }, []);

  return (
    <BackButtonHandler>
      <ScrollView style={{width: width, backgroundColor: '#ffffe7'}}>
        {/* <View style={{width: '100%'}}>
          <ImageBackground
            source={require('../assets/icons/bg-horoscope.jpg')}
            style={{height: imageHeight}}>
            <Text
              style={{
                color: '#fff',
                fontSize: 35,
                fontWeight: '500',
                paddingLeft: 30,
                paddingTop: 30,
              }}>
              Daily Horoscope
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('DailyHoroscope')}
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                borderColor: '#fff',
                padding: 2,
                borderWidth: 1,
                borderRadius: 30,
                margin: 15,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 22,
                  fontWeight: '500',
                  padding: 5,
                }}>
                Get Todays Horoscope
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View> */}

        <View style={{paddingVertical: 10, paddingHorizontal: 15}}>
          <HoroscopeCard />
        </View>

        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 10,
            flexDirection: 'row',
            gap: 10,
            flex: 1,
            marginTop: 10,
          }}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Image
              source={require('../assets/icons/kundli-200.jpg')}
              style={{
                width: hp(19),
                height: hp(19),
                borderRadius: 10,
              }}
            />
          </View>
          <View
            style={{
              paddingTop: 2,
              paddingBottom: 6,
              flex: 1,
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, fontWeight: '500', color: '#000'}}>
              Free Kundali
            </Text>

            <Text
              style={{
                textAlign: 'justify',
                color: Colors.grey2,
                fontSize: 13,
                marginTop: 5,
              }}>
              Provide your birth information to receive a tailored kundali
              report, offering a comprehensive analysis.
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('BirthChart')}
              style={{
                alignSelf: 'center',
                backgroundColor: Colors.black7,
                alignContent: 'center',
                justifyContent: 'center',
                borderRadius: 30,
                paddingHorizontal: 25,
                paddingVertical: 7,
                marginTop: 10,
              }}>
              <Text style={{color: '#fff', fontSize: 15, fontWeight: '500'}}>
                Get Report
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{paddingVertical: 10, paddingHorizontal: 15}}>
          <PanchangCard />
        </View>

        {/* <View
          style={{
            borderRadius: 10,
            borderWidth: 1,
            padding: 10,
            borderColor: Colors.grey3,
            // marginVertical: 10,
            marginHorizontal: 10,
            marginTop: 10,
          }}>
          <View style={[styles.panchangContainer, {flexDirection: 'row'}]}>
            <View>
              <Text style={{color: '#000', fontWeight: '500'}}>
                Today's Panchang
              </Text>
              <Text style={{color: '#848484'}}>Sunrise- Sunset</Text>
              <View
                style={[
                  styles.timeContainer,
                  {backgroundColor: '#ffe7e7', borderColor: '#ff9b9b'},
                ]}>
                <Ionicons name="sunny" size={22} color={'#ff4d4d'} />
                {panchangData && (
                  <Text style={{color: '#848484'}}>
                    {panchangData.vedic_sunrise}
                  </Text>
                )}
              </View>
              <View style={{marginTop: 5}}>
                <Text style={{color: '#000', fontWeight: '400'}}>
                  Nakshatra
                </Text>
                <Text style={{color: '#000', fontWeight: '400'}}>Tithi</Text>
                <Text style={{color: '#000', fontWeight: '400'}}>Yog</Text>
                <Text style={{color: '#000', fontWeight: '400'}}>Karan</Text>
              </View>
            </View>
            <View>
              <Text style={{color: '#000'}}>New Delhi, Delhi India</Text>
              <Text style={{color: '#767676'}}>Moonrise-Moonset</Text>
              <View
                style={[
                  styles.timeContainer,
                  {backgroundColor: '#d0ecfd', borderColor: '#51a9ff'},
                ]}>
                <Ionicons name="moon-sharp" size={22} color={'#51a9ff'} />
                {panchangData && (
                  <Text style={{color: '#848484'}}>
                    {panchangData.vedic_sunset}
                  </Text>
                )}
              </View>
              {panchangData && (
                <View style={{marginTop: 5}}>
                  <Text style={{color: '#848484'}}>
                    {panchangData.nakshatra}
                  </Text>
                  <Text style={{color: '#848484'}}>{panchangData.tithi}</Text>
                  <Text style={{color: '#848484'}}>{panchangData.yog}</Text>
                  <Text style={{color: '#848484'}}>{panchangData.karan}</Text>
                </View>
              )}
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Panchang')}
            style={{
              backgroundColor: Colors.black7,
              width: '100%',
              flexDirection: 'row',
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              padding: 8,
              borderRadius: 30,
              borderWidth: 1,
              marginTop: 5,
            }}>
            <Text
              style={{
                marginLeft: '40%',
                color: '#fff',
                fontWeight: '500',
              }}>
              View More
            </Text>
            <Ionicons name="chevron-forward-outline" size={22} color={'#000'} />
          </TouchableOpacity>
        </View> */}
        {/* <View
          style={{
            borderRadius: 10,
            borderWidth: 1,
            padding: 10,
            borderColor: Colors.grey3,
            marginHorizontal: 10,
            marginTop: 10,
          }}>
          <Text style={{color: '#000', fontSize: 15, fontWeight: '500'}}>
            Know Your Vimshottari Dasha
          </Text>
          <Text
            style={{
              textAlign: 'justify',
              color: Colors.grey2,
              fontSize: 13,
              marginTop: 5,
            }}>
            It is famous system of planetary cycles used in Vedic astrology to
            understand the timing of events in a person’s life.
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('DashaChart')}
            style={{
              backgroundColor: Colors.black7,
              width: '100%',
              flexDirection: 'row',
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              padding: 8,
              borderRadius: 30,
              borderWidth: 1,
              marginTop: 5,
            }}>
            <Text
              style={{
                marginLeft: '40%',
                color: '#fff',
                fontWeight: '400',
              }}>
              View More
            </Text>
            <Ionicons name="chevron-forward-outline" size={22} color={'#000'} />
          </TouchableOpacity>
        </View> */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}>
          <View style={{flex: 1, paddingHorizontal: 10}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                color: '#000',
              }}>
              Track Your Planets
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                color: Colors.grey2,
                fontSize: 13,
                marginTop: 5,
              }}>
              Planets in Astrology play vital role to operate human lives. All
              these planets and objects affect to "The Planet Earth" in a
              positive or negative way.
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('BirthChart')}
              style={{
                alignSelf: 'center',
                backgroundColor: Colors.black7,
                alignContent: 'center',
                justifyContent: 'center',
                borderRadius: 30,
                paddingHorizontal: 25,
                paddingVertical: 7,
                marginTop: 10,
              }}>
              <Text
                style={{color: '#fff', alignSelf: 'center', fontWeight: '500'}}>
                Track
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Image
              source={require('../assets/icons/planets.jpg')}
              style={{
                width: hp(19),
                height: hp(19),
                borderRadius: 10,
              }}
            />
          </View>
        </View>

        <View style={{marginBottom: 15, marginTop: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Text
              style={{
                paddingHorizontal: 20,
                fontSize: 16,
                fontWeight: '500',
                color: Colors.black8,
              }}>
              Watch Astrology Videos
            </Text>
            <Text
              style={{
                paddingHorizontal: 20,
                fontSize: 16,
                fontWeight: '500',
                color: Colors.grey2,
              }}>
              View All
            </Text>
          </View>

          <View style={{flex: 1, alignItems: 'center'}}>
            <YoutubeCard />
          </View>
        </View>
      </ScrollView>
    </BackButtonHandler>
  );
};

export default FreeService;
const styles = StyleSheet.create({
  panchangContainer: {
    justifyContent: 'flex-start',
    gap: 60,
  },
  timeContainer: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginVertical: 6,
  },
});
