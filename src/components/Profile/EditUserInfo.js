import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  Modal,
  Image,
} from 'react-native';
import {Country, City} from 'country-state-city';
import {Picker} from '@react-native-picker/picker';
import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {launchImageLibrary} from 'react-native-image-picker';
import Service_URL from '../../utils/Constant';
import BackButtonHandler from '../BackButtonHandler/BackButtonHandler';
import {Colors} from '../../utils/Colors';
import {Button} from 'react-native-paper';
import ImagePicker from '../PopUp/ImagePicker';
import axios from 'axios';
import {removeEmptyValues} from '../../utils/removeEmptyValues';

const EditUserInfo = () => {
  const navigation = useNavigation();
  const route = useRoute({});
  const data = route.params.userData;
  const [userdata, setUserData] = useState(data);
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState(userdata.name);
  const [phoneNumber, setPhoneNumber] = useState(userdata.phoneNumber);
  const [cities, setCities] = useState([]); // State to hold cities
  const [selectedCity, setSelectedCity] = useState(''); // State to manage selected city
  const [bio, setBio] = useState(userdata.bio);
  const [selectedCountry, setSelectedCountry] = useState(userdata.country);

  const countryData = Country.getAllCountries();

  for (const country of countryData) {
    const countryName = country.name;
  }
  const handleCountryChange = value => {
    setSelectedCountry(value);
    const countryCode = countryData.find(
      country => country.name === value,
    )?.isoCode;
    console.log('data', countryCode);
    if (countryCode) {
      const fetchedCities = City.getCitiesOfCountry(countryCode).map(
        cityData => cityData.name,
      );
      setCities(fetchedCities);
    }
  };

  useEffect(() => {
    handleCountryChange(selectedCountry);
  }, []);
  const handleSubmit = () => {
    if (name.length > 15) {
      return Alert.alert('Name should contain maximum 15 characters.');
    }
    const user = {
      name: name,
      phoneNumber: phoneNumber,
      bio: bio,
      country: selectedCountry,
      city: selectedCity,
    };

    const updatedUser = removeEmptyValues(user);

    // Send the put request to the backend API
    axios
      .put(`${Service_URL}/edit-userInfo/${userdata._id}`, updatedUser)
      .then(res => {
        setBio('');
        setPhoneNumber('');
        setSelectedCity('');
        setSelectedCountry('');

        if (res.status === 200) {
          navigation.pop();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const imagePicker = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxheight: 200,
      maxWidth: 200,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('Image picker was canceled');
      } else if (response.error) {
        console.error('Image picker error:', response.error);
      } else {
        //console.log(response);
        imageUpload(response.assets[0]);
      }
    });
  };

  // const imagePicker = () => {
  //   const options = {
  //     mediaType: 'photo', // Set the media type to photo
  //     includeBase64: false,
  //     maxheight: 200,
  //     maxWidth: 200,
  //   };
  //   launchImageLibrary(options, response => {
  //     if (response.didCancel) {
  //       console.log('Image picker was canceled');
  //     } else if (response.error) {
  //       console.error('Image picker error:', response.error);
  //     } else {
  //       setImage(response.uri);
  //     }
  //   });
  // };

  const onClose = () => {
    setIsVisible(false);
  };

  const imageUpload = async image => {
    try {
      const imageData = new FormData();
      imageData.append('image', {
        uri: image.uri,
        type: image.type,
        name: image.fileName,
        fileName: image.fileName,
      });
      // console.log('data: ', imageData);
      const headers = {
        accept: 'application/json',
        'content-type': 'multipart/form-data',
      };
      const opts = {
        method: 'PUT',
        url: `${Service_URL}/edit-userInfo/image/${userdata._id}`,
        headers: headers,
        data: imageData,
      };
      const response = await axios.request(opts);
      if (response.status === 200) {
        Alert.alert('Image Uploaded');
        navigation.pop();
      } else {
        Alert.alert('Error uploading image');
      }
    } catch (error) {
      //console.log(JSON.stringify(error));
      Alert.alert('Error uploading image');
    }
  };

  const imageUrl = `${Service_URL}/${userdata?.image}`;
  return (
    <BackButtonHandler style={styles.container}>
      <KeyboardAvoidingView>
        <ScrollView style={{margin: 20}}>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity onPress={imagePicker}>
              <View
                style={{
                  height: 103,
                  width: 103,
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: Colors.yellow,
                  borderWidth: 2,
                  padding: 5,
                }}>
                <ImageBackground
                  source={{uri: imageUrl}}
                  style={{height: 100, width: 100}}
                  imageStyle={{borderRadius: 15}}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon
                      name="camera"
                      size={35}
                      color="#ffffc7"
                      style={{
                        opacity: 0.8,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: '#ffff',
                        borderRadius: 10,
                        alignSelf: 'center',
                      }}
                    />
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
            <Text
              style={{
                marginTop: 10,
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center',
                color: '#0040ff',
              }}>
              {userdata?.name}
            </Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" size={20} color={Colors.pink2} />
              <TextInput
                style={styles.textInput}
                value={name}
                onChangeText={text => setName(text)}
                placeholder="Enter Name"
                placeholderTextColor={'#666666'}
                autoCorrect={false}
              />
            </View>

            <View style={styles.action}>
              <Ionicons name="call-outline" size={24} color={Colors.pink2} />
              <TextInput
                style={styles.textInput}
                value={phoneNumber}
                onChangeText={text => setPhoneNumber(text)}
                placeholder="Mobile"
                keyboardType="number-pad"
                placeholderTextColor={'#666666'}
                autoCorrect={false}
              />
            </View>

            <View style={styles.action}>
              <FontAwesome
                name="pencil-square-o"
                size={20}
                color={Colors.pink2}
              />
              <TextInput
                style={styles.textInput}
                value={bio}
                onChangeText={text => setBio(text)}
                placeholder="Bio"
                placeholderTextColor={'#666666'}
                autoCorrect={false}
              />
            </View>

            <View style={styles.action}>
              <Icon name="map-marker-outline" size={20} color={Colors.pink2} />
              <Picker
                style={styles.textInput}
                selectedValue={selectedCountry}
                onValueChange={handleCountryChange}>
                <Picker.Item label="Select a country" value="" />
                {countryData.map(country => (
                  <Picker.Item
                    key={country.isoCode}
                    label={country.name}
                    value={country.name}
                  />
                ))}
              </Picker>
            </View>

            <View style={styles.action}>
              <FontAwesome name="globe" size={20} color={Colors.pink2} />
              <Picker
                style={styles.textInput}
                selectedValue={selectedCity}
                onValueChange={value => setSelectedCity(value)}>
                <Picker.Item label="Select a city" value="" />
                {cities.map(city => (
                  <Picker.Item key={city} label={city} value={city} />
                ))}
              </Picker>
            </View>

            <Button
              mode="contained"
              onPress={handleSubmit}
              labelStyle={{fontSize: 16}}
              style={{backgroundColor: '#FF6347', width: 140}}>
              Submit
            </Button>
          </View>
          {/* ................................................... */}
          {isVisible && <ImagePicker isVisible={isVisible} onClose={onClose} />}

          {/* <View>
            {image ? (
              <ImageBackground
                source={{uri: image}}
                style={{width: 100, height: 100}}
              />
            ) : null}
            <Button onPress={imagePicker}>Press</Button>
          </View> */}
        </ScrollView>
      </KeyboardAvoidingView>
    </BackButtonHandler>
  );
};

export default EditUserInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
    height: 50,
    width: 300,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },

  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d5d5d5',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});
