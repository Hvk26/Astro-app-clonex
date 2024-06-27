import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackButtonHandler from '../components/BackButtonHandler/BackButtonHandler';
import {Colors} from '../utils/Colors';
import KeyCenter from '../utils/KeyCenter';
import Collapsible from 'react-native-collapsible';
import axios from 'axios';
import MangalDosh from '../Services/Dosh/MangalDosh';
import KalsharpDosh from '../Services/Dosh/KalsharpDosh';
import ManglikDosh from '../Services/Dosh/ManglikDosh';
import PaapShamaya from '../Services/Dosh/PaapShamaya';
import PitraDosh from '../Services/Dosh/PitraDosh';
const {width, height} = Dimensions.get('window');
const Miscellaneous = () => {
  const [boyDOB, setBoyDOB] = useState('31/07/1992');
  const [boyTOB, setBoyTOB] = useState('01:30');
  const [city, setCity] = useState('Pune');
  const [apiEndPoint, setApiEndPoint] = useState('mangal-dosh');

  const [coordinates, setCoordinates] = useState({
    latitude: '',
    longitude: '',
  });

  const [isVisibleMangalDosh, setisVisibleMangalDosh] = useState(false);
  const [isVisibleKaalDosh, setisVisibleKaalDosh] = useState(false);
  const [isVisibleManglikDosh, setisVisibleManglikDosh] = useState(false);
  const [isVisiblePaapShamayaDosh, setisVisiblePaapShamayaDosh] =
    useState(false);
  const [isVisiblePitraDosh, setisVisiblePitraDosh] = useState(false);
  const [data, setData] = useState([]);
  const API_KEY = KeyCenter.vedicastroapi.API_KEY;

  const getMatch = async () => {
    const URL = `https://api.vedicastroapi.com/v3-json/dosha/${apiEndPoint}?dob=${boyDOB}&tob=${boyTOB}&lat=${coordinates.latitude}&lon=${coordinates.longitude}&tz=5.5&api_key=${API_KEY}&lang=en`;
    console.log(URL);
    try {
      const response = await axios.get(`${URL}`);
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCitySelect = async input => {
    //console.log(input);
    try {
      if (!input) {
        // Handle the case where the city name is empty
        return;
      }
      const response = await axios.get(
        `https://api.vedicastroapi.com/v3-json/utilities/geo-search?city=${input}&api_key=${API_KEY}`,
      );

      if (response.status === 200) {
        const getResponse = response.data.response[0];
        const latitude = parseFloat(getResponse.coordinates[0]);
        const longitude = parseFloat(getResponse.coordinates[1]);
        //console.log(latitude, longitude);
        // Set the state with the obtained coordinates
        setCoordinates({
          latitude: latitude,
          longitude: longitude,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleCitySelect(city);
  }, [city]);

  const isDateFormatValid = dateString => {
    // Regular expression for DD/MM/YYYY format
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return dateRegex.test(dateString);
  };

  const isTimeFormatValid = timeString => {
    // Regular expression for HH:MM format
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return timeRegex.test(timeString);
  };

  const handleDateInputChange = (text, isBoy) => {
    if (isBoy) {
      setBoyDOB(text);
    }
  };
  const handleTimeInputChange = (text, isBoy) => {
    if (isBoy) {
      setBoyTOB(text);
    }
  };
  const handlePress = () => {
    if (isDateFormatValid(boyDOB) && isTimeFormatValid(boyTOB)) {
      // Date and time formats are valid, make the API call
      getMatch();
    } else {
      // Show an error message or handle invalid formats
      console.log('Invalid date or time format. Please enter correct values.');
    }
  };
  console.log(data);
  console.log(coordinates.latitude);

  const toggleMangalDosh = () => {
    setisVisibleMangalDosh(!isVisibleMangalDosh);
    setApiEndPoint('mangal-dosh');
  };
  const toggleKaalSharpDosh = () => {
    setisVisibleKaalDosh(!isVisibleKaalDosh);
    setApiEndPoint('kaalsarp-dosh');
  };
  const toggleManglikDosh = () => {
    setisVisibleManglikDosh(!isVisibleManglikDosh);
    setApiEndPoint('manglik-dosh');
  };
  const togglePaapShamayaDosh = () => {
    setisVisiblePaapShamayaDosh(!isVisiblePaapShamayaDosh);
    setApiEndPoint('papasamaya');
  };
  const togglePitraDoshDosh = () => {
    setisVisiblePitraDosh(!isVisiblePitraDosh);
    setApiEndPoint('pitra-dosh');
  };

  return (
    <BackButtonHandler styles={{width: width}}>
      <ScrollView>
        <View style={styles.constainer}>
          <View style={{flexDirection: 'column', gap: 5}}>
            <Text style={styles.title}>Enter Details</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Date of Birth: </Text>
              <TextInput
                style={styles.textInput}
                placeholder="DD/MM/YYYY"
                onChangeText={text => handleDateInputChange(text, true)}
                placeholderTextColor={Colors.grey2}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Time of Birth:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="HH:MM"
                onChangeText={text => handleTimeInputChange(text, true)}
                placeholderTextColor={Colors.grey2}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>City of Birth:{'  '}</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter Birth City"
                onChangeText={text => setCity(text)}
                placeholderTextColor={Colors.grey2}
              />
            </View>
          </View>
          <Pressable
            onPress={handlePress}
            style={{
              alignContent: 'center',
              alignItems: 'center',
              marginTop: 15,
              backgroundColor: Colors.black7,
              width: '50%',
              alignSelf: 'center',
              borderRadius: 30,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                padding: 5,
                fontWeight: '500',
              }}>
              Submit
            </Text>
          </Pressable>
        </View>

        {/**Mangal Dosh Section */}
        <View style={styles.collapseContainer}>
          <TouchableOpacity
            style={styles.expandTitleConatiner}
            onPress={toggleMangalDosh}>
            <Text style={[styles.title, {color: Colors.title5}]}>
              Mangal Dosh
            </Text>
          </TouchableOpacity>
          <Collapsible collapsed={isVisibleMangalDosh}>
            {apiEndPoint === 'mangal-dosh' && <MangalDosh data={data} />}
          </Collapsible>
        </View>
        {/**Kalsharp Section */}
        <View style={styles.collapseContainer}>
          <TouchableOpacity
            style={styles.expandTitleConatiner}
            onPress={toggleKaalSharpDosh}>
            <Text style={[styles.title, {color: Colors.title5}]}>
              Kaalsharp Dosh
            </Text>
          </TouchableOpacity>
          <Collapsible collapsed={isVisibleKaalDosh}>
            {apiEndPoint === 'kaalsarp-dosh' && <KalsharpDosh data={data} />}
          </Collapsible>
        </View>
        {/**Manglik Dosh Section */}
        <View style={styles.collapseContainer}>
          <TouchableOpacity
            style={styles.expandTitleConatiner}
            onPress={toggleManglikDosh}>
            <Text style={[styles.title, {color: Colors.title5}]}>
              Manglik Dosh
            </Text>
          </TouchableOpacity>
          <Collapsible collapsed={isVisibleManglikDosh}>
            {apiEndPoint === 'manglik-dosh' && <ManglikDosh data={data} />}
          </Collapsible>
        </View>
        {/**Papa Shamaya */}
        <View style={styles.collapseContainer}>
          <TouchableOpacity
            style={styles.expandTitleConatiner}
            onPress={togglePaapShamayaDosh}>
            <Text style={[styles.title, {color: Colors.title5}]}>
              Papa Shamaya
            </Text>
          </TouchableOpacity>
          <Collapsible collapsed={isVisiblePaapShamayaDosh}>
            {apiEndPoint === 'papasamaya' && <PaapShamaya data={data} />}
          </Collapsible>
        </View>
        {/**Pitra Dosh */}
        <View style={styles.collapseContainer}>
          <TouchableOpacity
            style={styles.expandTitleConatiner}
            onPress={togglePitraDoshDosh}>
            <Text style={[styles.title, {color: Colors.title5}]}>
              Pitra Dosh
            </Text>
          </TouchableOpacity>
          <Collapsible collapsed={isVisiblePitraDosh}>
            {apiEndPoint === 'pitra-dosh' && <PitraDosh data={data} />}
          </Collapsible>
        </View>
      </ScrollView>
    </BackButtonHandler>
  );
};

export default Miscellaneous;

const styles = StyleSheet.create({
  constainer: {
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.grey4,
    marginHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: Colors.background,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 7,
    flex: 1,
    paddingHorizontal: 10,
  },
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
  labelText: {
    color: Colors.content1,
    fontSize: 15,
    fontWeight: '500',
    width: 100,
  },
  title: {
    color: Colors.black7,
    fontSize: 17,
    fontWeight: '600',
    textDecorationLine: 'underline',
    marginLeft: 10,
    alignSelf: 'center',
    paddingVertical: 6,
  },
  collapseContainer: {
    marginHorizontal: 10,
    marginBottom: 5,
    marginTop: 5,
  },
  expandTitleConatiner: {
    borderRadius: 1,
    borderWidth: 1,
    borderColor: Colors.grey4,
    marginBottom: 10,
  },
});
