import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackButtonHandler from '../components/BackButtonHandler/BackButtonHandler';
import axios from 'axios';
import Service_URL from '../utils/Constant';
import KeyCenter from '../utils/KeyCenter';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {Colors} from '../utils/Colors';
import {Table, Row} from 'react-native-table-component';
import PanchangData from './PanchangData/PanchangData';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import PanchangText from './PanchangData/PanchangText';

const {width} = Dimensions.get('screen');
const Panchang = () => {
  const [panchang, setPanchang] = useState({});
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [cityOptions, setCityOptions] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [date, setDate] = useState('');
  const [city, setCity] = useState('');
  const [tz, setTz] = useState('');
  const API_KEY = KeyCenter.vedicastroapi.API_KEY;

  const fetchPanchang = async () => {
    try {
      if (!date || !latitude || !longitude || !tz) {
        Alert.alert('Please fill in all the required details.');
        return;
      }
      console.log(date, latitude, longitude, tz);
      const response = await axios.get(
        `https://api.vedicastroapi.com/v3-json/panchang/panchang?api_key=${API_KEY}&date=${date}&tz=${tz}&lat=${latitude}&lon=${longitude}&time=05:20&lang=en`,
      );
      if (response.status === 200) {
        setPanchang(response.data.response);
      }
    } catch (error) {
      console.log(error);
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }
  };

  const handleCitySelect = async input => {
    console.log('city', city);
    try {
      if (input) {
        const response = await fetch(
          `https://api.vedicastroapi.com/v3-json/utilities/geo-search?city=${input}&api_key=${API_KEY}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();

        if (result.response) {
          setCityOptions(result.response);
        } else {
          console.error('No geonames found for the provided city.');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const selectCity = item => {
    setCity(item.name);
    setLatitude(item.coordinates[0]);
    setLongitude(item.coordinates[1]);
    setTz(item.tz);
    setCityOptions([]);
  };
  useEffect(() => {
    handleCitySelect(city);
    //fetchPanchang();
  }, [city]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = date => {
    console.log('A date has been picked: ', date);
    const dateObject = new Date(date);

    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const year = dateObject.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    console.log(formattedDate);
    setDate(formattedDate);
    hideDatePicker();
  };

  if (!panchang) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const tithiData = [
    ['Name', panchang.tithi?.name],
    ['Diety', panchang.tithi?.diety],
    ['Tithi', panchang.tithi?.next_tithi],
    ['Type', panchang.tithi?.type],
    ['Number', panchang.tithi?.number],
    ['Start', panchang.tithi?.start],
    ['End', panchang.tithi?.end],
    ['Meaning', panchang.tithi?.meaning],
    ['Special', panchang.tithi?.special],
  ];

  const nakshatraData = [
    ['Name', panchang.nakshatra?.name],
    ['Lord', panchang.nakshatra?.lord],
    ['Diety', panchang.nakshatra?.diety],
    ['Number', panchang.nakshatra?.number],
    ['Start', panchang.nakshatra?.start],
    ['End', panchang.nakshatra?.end],
    ['Next Nakshatra', panchang.nakshatra?.next_nakshatra],
    ['Meaning', panchang.nakshatra?.meaning],
    ['Special', panchang.nakshatra?.special],
  ];

  const karanData = [
    ['Name', panchang.karana?.name],
    ['Lord', panchang.karana?.lord],
    ['Diety', panchang.karana?.diety],
    ['Number', panchang.karana?.number],
    ['Start', panchang.karana?.start],
    ['End', panchang.karana?.end],
    ['Next Nakshatra', panchang.karana?.next_karana],
    ['Meaning', panchang.karana?.meaning],
    ['Special', panchang.karana?.special],
  ];

  const otherData = [
    ['Day', panchang.day?.name],
    ['Ayanamsa', panchang.ayanamsa?.name],
    ['Rasi', panchang.rasi?.name],
    ['Gulika', panchang?.gulika],
    ['yamakanta', panchang?.yamakanta],
    ['rahukaal', panchang?.rahukaal],
  ];

  const yogaData = [
    ['Name', panchang.yoga?.name],
    ['Number', panchang.yoga?.number],
    ['Start', panchang.yoga?.start],
    ['End', panchang.yoga?.end],
    ['Next Yoga', panchang.yoga?.next_yoga],
    ['Meaning', panchang.yoga?.meaning],
    ['Special', panchang.yoga?.special],
  ];

  const masaData = [
    ['Amanta Number', panchang.advanced_details?.masa.amanta_number],
    ['Amanta Date', panchang.advanced_details?.masa.amanta_date],
    ['Amanta Name', panchang.advanced_details?.masa.amanta_name],
    [
      'Alternate Amanta Name',
      panchang.advanced_details?.masa.alternate_amanta_name,
    ],
    ['Amanta Start', panchang.advanced_details?.masa.amanta_start],
    ['Amanta End', panchang.advanced_details?.masa.amanta_end],
    ['Adhik Maasa', panchang.advanced_details?.masa.adhik_maasa ? 'Yes' : 'No'],
    ['Ayana', panchang.advanced_details?.masa.ayana],
    ['Purnimanta Date', panchang.advanced_details?.masa.purnimanta_date],
    ['Purnimanta Number', panchang.advanced_details?.masa.purnimanta_number],
    ['Purnimanta Name', panchang.advanced_details?.masa.purnimanta_name],
    [
      'Alternate Purnimanta Name',
      panchang.advanced_details?.masa.alternate_purnimanta_name,
    ],
    ['Moon Phase', panchang.advanced_details?.masa.moon_phase],
    ['Paksha', panchang.advanced_details?.masa.paksha],
    ['Ritu', panchang.advanced_details?.masa.ritu],
    ['Ritu Tamil', panchang.advanced_details?.masa.ritu_tamil],
  ];

  const yearsData = [
    ['Kali Year', panchang.advanced_details?.years.kali],
    ['Saka Year', panchang.advanced_details?.years.saka],
    ['Vikram Samvat', panchang.advanced_details?.years.vikram_samvaat],
    [
      'Kali Samvat Number',
      panchang.advanced_details?.years.kali_samvaat_number,
    ],
    ['Kali Samvat Name', panchang.advanced_details?.years.kali_samvaat_name],
    [
      'Vikram Samvaat Number',
      panchang.advanced_details?.years.vikram_samvaat_number,
    ],
    [
      'Vikram Samvaat Number',
      panchang.advanced_details?.years.vikram_samvaat_name,
    ],
    [
      'Saka Samvat Number',
      panchang.advanced_details?.years.saka_samvaat_number,
    ],
    ['Saka Samvat Name', panchang.advanced_details?.years.saka_samvaat_name],
  ];

  return (
    <BackButtonHandler>
      <ScrollView
        style={{paddingHorizontal: 12, marginTop: 20, marginBottom: 15}}>
        <View style={{marginBottom: 15, alignSelf: 'center'}}>
          <Text
            style={{
              color: Colors.black8,
              fontSize: 18,
              fontWeight: '500',
              textDecorationLine: 'underline',
            }}>
            Today's Panchang
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            marginBottom: 10,
            borderWidth: 0.5,
            paddingHorizontal: 10,
            paddingVertical: 20,
            borderRadius: 20,
            backgroundColor: Colors.title2,
          }}>
          <View style={{flex: 1, flexDirection: 'row', gap: 20}}>
            <TouchableOpacity
              onPress={showDatePicker}
              style={{
                borderWidth: 0.7,
                flex: 1,
                alignItems: 'center',
                paddingVertical: 8,
                borderRadius: 30,
                width: 80,
                marginBottom: 10,
                borderColor: Colors.grey3,
                backgroundColor: '#fff',
              }}>
              <Text
                style={{fontSize: 15, fontWeight: '400', color: Colors.black8}}>
                {!date ? 'Select Date' : date}
              </Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={{
              borderWidth: 0.7,
              borderRadius: 30,
              padding: 5,
              paddingHorizontal: 10,
              backgroundColor: '#fff',
              alignItems: 'center',
              textAlign: 'center',
              color: '#000',
            }}
            value={city}
            onChangeText={text => setCity(text)}
            placeholder="Search City.."
            placeholderTextColor="#000"
          />
          {cityOptions.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => selectCity(item)}
              style={{
                borderWidth: 0.2,
                backgroundColor: '#fff',
                paddingHorizontal: 10,
                paddingVertical: 10,
                marginBottom: 3,
                borderRadius: 10,
                position: 'relative',
                marginTop: 5,
              }}>
              <Text style={{color: Colors.black7, fontWeight: '500'}}>
                {item.name}, {item.country_name}, {item.tz}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={fetchPanchang}
            style={{
              alignItems: 'center',
              marginTop: 20,
              borderWidth: 0.7,
              width: 160,
              justifyContent: 'center',
              alignSelf: 'center',
              paddingVertical: 5,
              borderRadius: 30,
              backgroundColor: '#000',
            }}>
            <Text style={{color: '#fff', fontSize: 15, fontWeight: '500'}}>
              Get Panchang
            </Text>
          </TouchableOpacity>
        </View>

        {Object.keys(panchang).length > 0 && (
          <View>
            <View
              style={{
                borderWidth: 1,
                borderColor: Colors.grey2,
                borderRadius: 20,
                backgroundColor: Colors.title2,
              }}>
              <View
                style={{
                  gap: 15,
                  paddingHorizontal: 10,
                  paddingTop: 15,
                  paddingBottom: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Colors.black7,
                    fontWeight: '500',
                  }}>
                  Date: {panchang.date}
                </Text>
                <View style={{flexDirection: 'row', gap: 15}}>
                  <Ionicons name="sunny" size={26} color={'#fc6b03'} />
                  <Text style={{paddingTop: 6, color: Colors.black7}}>
                    Sun Rise:
                  </Text>
                  <Text
                    style={{
                      marginLeft: width * 0.33,
                      paddingTop: 6,
                      color: Colors.black7,
                    }}>
                    {panchang.advanced_details?.sun_rise}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', gap: 15}}>
                  <Feather name="sunset" size={26} color={'#000'} />
                  <Text
                    style={{
                      paddingTop: 6,
                      color: Colors.black7,
                    }}>
                    Sun Set:
                  </Text>
                  <Text
                    style={{
                      marginLeft: width * 0.35,
                      paddingTop: 6,
                      color: Colors.black7,
                    }}>
                    {panchang.advanced_details?.sun_set}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', gap: 15}}>
                  <Ionicons name="moon" size={26} color={'#000'} />
                  <Text
                    style={{
                      paddingTop: 6,
                      color: Colors.black7,
                    }}>
                    Moon Rise:
                  </Text>
                  <Text
                    style={{
                      marginLeft: width * 0.3,
                      paddingTop: 6,
                      color: Colors.black7,
                    }}>
                    {panchang.advanced_details?.moon_rise}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', gap: 15}}>
                  <Ionicons name="moon" size={26} color={'#000'} />
                  <Text
                    style={{
                      paddingTop: 6,
                      color: Colors.black7,
                    }}>
                    Moon Set:
                  </Text>
                  <Text
                    style={{
                      marginLeft: width * 0.32,
                      paddingTop: 6,
                      color: Colors.black7,
                    }}>
                    {panchang.advanced_details?.moon_set}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', gap: 15}}>
                  <Ionicons name="moon" size={26} color={'#000'} />
                  <Text
                    style={{
                      paddingTop: 6,
                      color: Colors.black7,
                    }}>
                    Next New Moon
                  </Text>
                  <Text
                    style={{
                      marginLeft: width * 0.14,
                      paddingTop: 6,
                      color: Colors.black7,
                    }}>
                    {panchang.advanced_details?.next_new_moon}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', gap: 15}}>
                  <Ionicons name="moon" size={26} color={'#000'} />
                  <Text
                    style={{
                      paddingTop: 6,
                      color: Colors.black7,
                    }}>
                    Next Full Moon
                  </Text>
                  <Text
                    style={{
                      marginLeft: width * 0.15,
                      paddingTop: 6,
                      color: Colors.black7,
                    }}>
                    {panchang.advanced_details?.next_full_moon}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                marginTop: 15,
                marginBottom: 10,
                backgroundColor: Colors.title2,
                borderRadius: 20,
                borderColor: Colors.grey2,
                borderWidth: 1,
                paddingBottom: 10,
              }}>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingTop: 15,
                  paddingBottom: 10,
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    color: Colors.black7,
                    fontWeight: '500',
                    marginBottom: 10,
                    textDecorationLine: 'underline',
                  }}>
                  Year Details:
                </Text>
                <PanchangData data={yearsData} />
              </View>
            </View>

            <View
              style={{
                marginTop: 15,
                marginBottom: 10,
                backgroundColor: Colors.title2,
                borderRadius: 20,
                borderColor: Colors.grey2,
                borderWidth: 1,
                paddingBottom: 10,
              }}>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingTop: 15,
                  paddingBottom: 10,
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    color: Colors.black7,
                    fontWeight: '500',
                    marginBottom: 10,
                    textDecorationLine: 'underline',
                  }}>
                  Other:
                </Text>
                <PanchangData data={otherData} />
              </View>
            </View>

            <View
              style={{
                marginTop: 15,
                marginBottom: 10,
                backgroundColor: Colors.title2,
                borderRadius: 20,
                borderColor: Colors.grey2,
                borderWidth: 1,
                paddingBottom: 10,
              }}>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingTop: 15,
                  paddingBottom: 10,
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    color: Colors.black7,
                    fontWeight: '500',
                    marginBottom: 10,
                    textDecorationLine: 'underline',
                  }}>
                  Tithi:
                </Text>
                <PanchangData data={tithiData} />
              </View>
            </View>

            <View
              style={{
                marginTop: 15,
                marginBottom: 10,
                backgroundColor: Colors.title2,
                borderRadius: 20,
                borderColor: Colors.grey2,
                borderWidth: 1,
                paddingBottom: 10,
              }}>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingTop: 15,
                  paddingBottom: 10,
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    color: Colors.black7,
                    fontWeight: '500',
                    marginBottom: 10,
                    textDecorationLine: 'underline',
                  }}>
                  Nakshatra:
                </Text>
                <PanchangData data={nakshatraData} />
              </View>
            </View>

            <View
              style={{
                marginTop: 15,
                marginBottom: 10,
                backgroundColor: Colors.title2,
                borderRadius: 20,
                borderColor: Colors.grey2,
                borderWidth: 1,
                paddingBottom: 10,
              }}>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingTop: 15,
                  paddingBottom: 10,
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    color: Colors.black7,
                    fontWeight: '500',
                    marginBottom: 10,
                    textDecorationLine: 'underline',
                  }}>
                  Karana:
                </Text>
                <PanchangData data={karanData} />
              </View>
            </View>

            <View
              style={{
                marginTop: 15,
                marginBottom: 10,
                backgroundColor: Colors.title2,
                borderRadius: 20,
                borderColor: Colors.grey2,
                borderWidth: 1,
                paddingBottom: 10,
              }}>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingTop: 15,
                  paddingBottom: 10,
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    color: Colors.black7,
                    fontWeight: '500',
                    marginBottom: 10,
                    textDecorationLine: 'underline',
                  }}>
                  Yoga:
                </Text>
                <PanchangData data={yogaData} />
              </View>
            </View>

            <View
              style={{
                marginTop: 15,
                marginBottom: 10,
                backgroundColor: Colors.title2,
                borderRadius: 20,
                borderColor: Colors.grey2,
                borderWidth: 1,
                paddingBottom: 10,
              }}>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingTop: 15,
                  paddingBottom: 10,
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    color: Colors.black7,
                    fontWeight: '500',
                    marginBottom: 10,
                    textDecorationLine: 'underline',
                  }}>
                  Masa:
                </Text>
                <PanchangData data={masaData} />
              </View>
            </View>
          </View>
        )}

        <PanchangText />

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
          maximumDate={new Date()}
        />
      </ScrollView>
    </BackButtonHandler>
  );
};

export default Panchang;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6, color: Colors.black7},
  row: {flexDirection: 'row', backgroundColor: '#FFF1C1'},
});
