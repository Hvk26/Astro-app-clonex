import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Dimensions,
  Modal,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {encode} from 'base-64';
import KeyCenter from '../utils/KeyCenter';
import DashaData from './DashaData';
import BackButtonHandler from '../components/BackButtonHandler/BackButtonHandler';
import {Colors} from '../utils/Colors';

const DashaChart = () => {
  const {width, height} = Dimensions.get('window');
  const [selectedDate, setSelectedDate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [name, setName] = useState('');
  const [dashaChart, setDashaChart] = useState('');
  const astrologyApi = KeyCenter.astrologyApi;
  const auth = encode(`${astrologyApi.username}:${astrologyApi.password}`);
  const [city, setCity] = useState('');
  const [geoDetail, setGeoDetail] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const handleHourChange = input => {
    // Remove non-numeric characters
    const numericInput = input.replace(/[^0-9]/g, '');
    // Ensure the input is within the range of 0 to 24
    if (numericInput >= 0 && numericInput <= 23) {
      setHour(numericInput);
    } else {
      Alert.alert('Enter valid Hour & Minute');
    }
  };
  const handleMinuteChange = input => {
    // Remove non-numeric characters
    const numericInput = input.replace(/[^0-9]/g, '');
    // Ensure the input is within the range of 0 to 60
    if (numericInput >= 0 && numericInput < 60) {
      setMinute(numericInput);
    } else {
      Alert.alert('Enter valid Hour & Minute');
    }
  };

  const getDashaChart = async () => {
    if (!selectedDate || !hour || !minute || !latitude || !longitude || !city) {
      Alert.alert('Please fill in all the required details.');
      return;
    }
    const dateString = selectedDate;
    const dateArray = dateString.split('-');
    const year = dateArray[0];
    const month = dateArray[1];
    const day = dateArray[2];
    const data = {
      day: day,
      month: month,
      year: year,
      hour: hour,
      min: minute,
      lat: latitude,
      lon: longitude,
      tzone: 5.5,
    };
    await fetch(`https://json.astrologyapi.com/v1/current_vdasha`, {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + auth,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          console.error(`HTTP error! Status: ${response.status}`);
          return response.text();
        }
        return response.json();
      })
      .then(data => {
        setDashaChart(data);
        setSelectedDate('');
        setHour('');
        setMinute('');
        setCity('');
      })
      .catch(error => {
        Alert.alert('Something went wrong');
        console.log(error);
      });
  };

  const handleCitySelect = async input => {
    try {
      const data = {
        place: city,
        maxRows: 6,
      };
      if (city) {
        const response = await fetch(
          `https://json.astrologyapi.com/v1/geo_details`,
          {
            method: 'POST',
            headers: {
              Authorization: 'Basic ' + auth,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          },
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setGeoDetail(result);
        if (result.geonames && result.geonames.length > 0) {
          const {latitude, longitude} = result.geonames[0];
          console.log('Latitude:', latitude);
          console.log('Longitude:', longitude);
          setLatitude(latitude);
          setLongitude(longitude);
        } else {
          console.error('No geonames found for the provided city.');
          Alert.alert('No City Found');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleCitySelect(city);
  }, [city]);
  //console.log(geoDetail);

  return (
    <BackButtonHandler>
      <ScrollView style={{width: width}}>
        <View
          style={{
            marginHorizontal: 10,
            marginVertical: 10,
            padding: 10,
            borderRadius: 15,
            borderWidth: 1,
          }}>
          <Text
            style={{
              color: '#000',
              fontSize: 16,
              fontWeight: '500',
              textDecorationLine: 'underline',
              textDecorationColor: '#000',
            }}>
            Vimshottari Dasha:
          </Text>
          <Text style={{color: '#000', fontSize: 14}}>
            Inspired by the ancient wisdom of Vedic astrology, the Vimshottari
            Dasha is a predictive system that unfolds the tapestry of an
            individual's life through a sequential cycle of planetary periods
            spanning 120 years. Rooted in cosmic energies and lunar positions,
            each planet's dasha influences distinct aspects of life, shaping
            experiences and events. This profound astrological tool, with its
            Mahadasha and Antardasha intricacies, offers insights into career,
            relationships, health, and spiritual growth. Vimshottari Dasha
            serves as a guide, providing a celestial roadmap for understanding
            life's journey and navigating the ebb and flow of cosmic energies
            with profound depth and timeless relevance.
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: 10,
            borderWidth: 1,
            padding: 10,
            borderRadius: 15,
            margin: 15,
            backgroundColor: Colors.title2,
          }}>
          <View
            style={{
              alignContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 16,
                fontWeight: '500',
                textDecorationLine: 'underline',
                textDecorationColor: '#000',
              }}>
              Enter Your Birth Details
            </Text>
          </View>
          <View>
            <View style={{}}>
              <Text style={styles.inputTitle}>Name: </Text>
              <TextInput
                placeholder="Enter your name"
                style={styles.textInput}
                placeholderTextColor={'#000'}
              />
            </View>
            <View style={{width: width}}>
              <Text style={styles.inputTitle}>Date of Birth: </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  gap: 5,
                }}>
                <TextInput
                  placeholder="Date of Birth (dd-mm-yyyy)"
                  style={styles.textInput}
                  placeholderTextColor={'#000'}
                  value={selectedDate}
                  keyboardType="numeric"
                  maxLength={10}

                  // onChangeText={handleDobChange}
                />
                <FontAwesome
                  name="calendar"
                  style={{padding: 6}}
                  size={24}
                  color={'blue'}
                  onPress={() => setShowModal(true)}
                />
              </View>
              <Modal
                visible={showModal}
                animationType="fade"
                style={{height: height * 0.7}}>
                <Calendar
                  style={{borderRadius: 10, elevation: 10, margin: 40}}
                  onDayPress={day => {
                    setSelectedDate(day.dateString);
                    setShowModal(false);
                  }}
                  markedDates={{
                    [selectedDate]: {
                      selected: true,
                      marked: true,
                    },
                  }}
                />
              </Modal>
            </View>
            <View>
              <Text style={styles.inputTitle}>Time of Birth: </Text>
              <View style={{flexDirection: 'row', gap: 5}}>
                <TextInput
                  placeholder="Hr"
                  style={styles.textInput}
                  placeholderTextColor={'#000'}
                  keyboardType="numeric"
                  maxLength={2}
                  value={hour}
                  onChangeText={handleHourChange}
                />
                <TextInput
                  placeholder="Min"
                  style={styles.textInput}
                  placeholderTextColor={'#000'}
                  keyboardType="numeric"
                  value={minute}
                  maxLength={2}
                  onChangeText={handleMinuteChange}
                />
              </View>
            </View>
            <View>
              <Text style={styles.inputTitle}>City :</Text>

              <TextInput
                placeholder="Enter Birth City"
                style={styles.textInput}
                placeholderTextColor={'#000'}
                value={city}
                onChangeText={text => setCity(text)}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={getDashaChart}
            style={{
              alignContent: 'center',
              alignItems: 'center',
              backgroundColor: Colors.black7,
              marginHorizontal: 100,
              borderRadius: 30,
              borderWidth: 1,
              padding: 5,
              marginVertical: 5,
            }}>
            <Text style={{fontSize: 15, color: '#fff', fontWeight: '500'}}>
              Get Data
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{marginHorizontal: 10, marginVertical: 10}}>
          {dashaChart ? (
            <DashaData dashaChart={dashaChart} />
          ) : (
            <Text
              style={{
                textAlign: 'center',
                marginTop: 20,
                fontSize: 16,
                color: '#FF0000',
              }}>
              Please fill in the required details to generate the chart.
            </Text>
          )}
        </View>
      </ScrollView>
    </BackButtonHandler>
  );
};

export default DashaChart;

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 30,
    padding: 3,
    marginVertical: 3,
    paddingHorizontal: 12,
    color: Colors.black7,
  },
  inputTitle: {
    color: '#000',
    fontSize: 14,
    fontWeight: '400',
  },
});
