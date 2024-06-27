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
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import KeyCenter from '../utils/KeyCenter';
import BackButtonHandler from '../components/BackButtonHandler/BackButtonHandler';
import {Colors} from '../utils/Colors';
import BirthChartText from './BirthChartText/BirthChartText';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import axios from 'axios';
import PlanetData from './BirthChartText/PlanetData';

const BirthChart = () => {
  const {width, height} = Dimensions.get('window');
  const [selectedDate, setSelectedDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [cityOptions, setCityOptions] = useState([]);
  const [tz, setTz] = useState('');
  const [planetData, setPlanetData] = useState({});
  const API_KEY = KeyCenter.vedicastroapi.API_KEY;
  // const handleHourChange = input => {
  //   // Remove non-numeric characters
  //   const numericInput = input.replace(/[^0-9]/g, '');
  //   // Ensure the input is within the range of 0 to 24
  //   if (numericInput >= 0 && numericInput <= 23) {
  //     setHour(numericInput);
  //   } else {
  //     Alert.alert('Enter valid Hour & Minute');
  //   }
  // };
  // const handleMinuteChange = input => {
  //   // Remove non-numeric characters
  //   const numericInput = input.replace(/[^0-9]/g, '');
  //   // Ensure the input is within the range of 0 to 60
  //   if (numericInput >= 0 && numericInput < 60) {
  //     setMinute(numericInput);
  //   } else {
  //     Alert.alert('Enter valid Hour & Minute');
  //   }
  // };

  const getDashaChart = async () => {
    if (!selectedDate || !time || !latitude || !longitude || !tz) {
      Alert.alert('Please fill in all the required details.');
      return;
    }
    const data = {
      selectedDate: selectedDate,
      time: time,
      lat: latitude,
      lon: longitude,
      tzone: tz,
    };

    console.log('data', data);

    const url = `https://api.vedicastroapi.com/v3-json/horoscope/planet-details?dob=${selectedDate}&tob=${time}&lat=${latitude}&lon=${longitude}&tz=${tz}&api_key=${API_KEY}&lang=en`;
    console.log(url);
    try {
      const response = await axios.get(`${url}`);
      if (response) {
        console.log(response.data.response);
        setPlanetData(response.data.response);
        setName('');
        setCityOptions([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectCity = item => {
    setCity(item.name);
    setLatitude(item.coordinates[0]);
    setLongitude(item.coordinates[1]);
    setTz(item.tz);
    setCityOptions([]);
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
    setSelectedDate(formattedDate);
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = time => {
    console.log(time);
    const dateObject = new Date(time);
    const hours = String(dateObject.getUTCHours()).padStart(2, '0');
    const minutes = String(dateObject.getUTCMinutes()).padStart(2, '0');

    // Format the time as HH:MM
    const formattedTime = `${hours}:${minutes}`;
    setTime(formattedTime);
    console.log('formattedTime:', formattedTime);
  };

  useEffect(() => {
    handleCitySelect(city);
  }, [city]);

  return (
    <BackButtonHandler>
      <ScrollView style={{backgroundColor: '#ffffe7 ', width: width}}>
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
              Know Your Birth Planet Details
            </Text>
          </View>
          <View>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.inputTitle}>Name: </Text>
              <TextInput
                placeholder="Enter your name"
                style={styles.textInput}
                placeholderTextColor={'#000'}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <Text style={styles.inputTitle}>Date of Birth: </Text>
              <TouchableOpacity
                style={{
                  borderWidth: 0.5,
                  borderRadius: 30,
                  backgroundColor: '#fff',
                  borderColor: Colors.grey4,
                  justifyContent: 'center',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  flex: 1,
                }}
                onPress={() => showDatePicker()}>
                <Text style={{color: Colors.black7}}>
                  {!selectedDate ? 'Date of Birth' : selectedDate}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <Text style={styles.inputTitle}>Time of Birth: </Text>

              <TouchableOpacity
                style={{
                  borderWidth: 0.5,
                  borderRadius: 30,
                  backgroundColor: '#fff',
                  borderColor: Colors.grey4,
                  justifyContent: 'center',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  flex: 1,
                }}
                onPress={() => showTimePicker()}>
                <Text style={{color: Colors.black7}}>
                  {!time ? 'Time of Birth' : time}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text style={styles.inputTitle}>City :</Text>

              <TextInput
                placeholder="Enter Birth City"
                style={styles.textInput}
                placeholderTextColor={'#000'}
                value={city}
                onChangeText={text => setCity(text)}
              />
            </View>
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
                  marginLeft: 120,
                }}>
                <Text style={{color: Colors.black7, fontWeight: '500'}}>
                  {item.name}, {item.country_name}, {item.tz}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            onPress={getDashaChart}
            style={{
              alignContent: 'center',
              alignItems: 'center',
              backgroundColor: Colors.black8,
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
          {planetData && Object.keys(planetData).length > 0 && (
            <PlanetData data={planetData} />
          )}
        </View>
        <BirthChartText />
      </ScrollView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date()}
      />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
        is24Hour={true}
      />
    </BackButtonHandler>
  );
};

export default BirthChart;

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.grey4,
    paddingVertical: 5,
    paddingHorizontal: 15,
    flex: 1,
    color: Colors.black7,
  },
  inputTitle: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
    width: 120,
  },
});
