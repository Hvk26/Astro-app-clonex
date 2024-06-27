import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useLayoutEffect, useState, useEffect, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Service_URL from '../../utils/Constant';
import {UserType} from '../../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PopUpLogin from '../PopUp/PopUpLogin';
import PopUpForm from '../PopUp/PopUpForm';
import FilterPopup from '../PopUp/FilterPopup';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {Colors} from '../../utils/Colors';
import BackButtonHandler from '../BackButtonHandler/BackButtonHandler';

const SearchBar = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isLoginPopUpVisible, setIsLoginPopUpVisible] = useState(false);
  const width = Dimensions.get('window').width;
  const navigation = useNavigation();
  const {userId, setuserId} = useContext(UserType);
  const [userInput, setUserInput] = useState('');
  const [showMore, setShowMore] = useState(false);
  const [searchResults, setSearchResults] = useState([]); // Initialize with an empty array
  const [astrologerUsers, setAstrologerUsers] = useState([]);
  const [isFilterPopupVisible, setIsFilterPopupVisible] = useState(false);
  //flter

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const handleApplyFilter = filters => {};

  const openFilterPopup = () => {
    setIsFilterPopupVisible(true);
  };

  const closeFilterPopup = () => {
    setIsFilterPopupVisible(false);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.header}>
          <EvilIcons
            name="arrow-left"
            size={24}
            color="#000"
            onPress={() => navigation.navigate('Main')}
          />
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={'Search Astrologers...'}
              style={styles.input}
              placeholderTextColor="#000"
              autoFocus={true}
              onChangeText={searchBarData}
            />
          </View>
        </View>
      ),
      headerRight: () => (
        <FontAwesome
          name="sliders"
          size={24}
          color={Colors.black7}
          onPress={openFilterPopup}
        />
      ),
    });
  }, []);

  // localhost:3000/search?name=hsf&skills=sfdg,gdgdg&languages=Hindi,English&yearsOfExperience=1,5

  const getResult = async () => {
    if (skillString || languagesString) {
      try {
        //const response = await axios.get(`${Service_URL}/search?name=${name}`);
        console.log(skillString, languagesString);
        const response = await axios.get(
          `${Service_URL}/search?name=&skills=${skillString}&languages=${languagesString}`,
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
        return [];
      }
    }
  };

  const fetchSearchResults = async name => {
    try {
      //const response = await axios.get(`${Service_URL}/search?name=${name}`);
      console.log(name, skillString, languagesString);
      const response = await axios.get(
        `${Service_URL}/search?name=${name}&skills=${skillString}&languages=${languagesString}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching search results:', error);
      return [];
    }
  };

  useEffect(() => {
    const updateSearchResults = async () => {
      // Check if there is any input before making the API call
      if (userInput.trim() !== '') {
        const results = await fetchSearchResults(userInput);
        setSearchResults(results);
      } else {
        // If no input, set search results to an empty array
        setSearchResults([]);
      }
    };
    getResult();
    updateSearchResults();
  }, [userInput, selectedSkills, selectedLanguages]);

  const searchBarData = input => {
    setUserInput(input);
  };

  const handleRequest = async (currentId, selectedUserId) => {
    console.log(currentId, selectedUserId);
    // Find the index of the user by selectedUserId
    const token = AsyncStorage.getItem('authToken');
    if (userId) {
      setIsLoginPopUpVisible(false);
      const userIndex = searchResults.findIndex(
        user => user._id === selectedUserId,
      );
      if (userIndex === -1) {
        // User not found, handle this case as needed
        return;
      }
      if (searchResults[userIndex].isButtonDisabled) {
        Alert.alert('Request Already Sent', 'You have already sent a request.');
        return;
      }
      try {
        const response = await axios.post(`${Service_URL}/request`, {
          currentId,
          selectedUserId,
        });

        if (response.status === 200) {
          // Create a new array with updated user state
          const updatedUsers = [...searchResults];
          updatedUsers[userIndex].isButtonDisabled = true;
          // Update the state with the new array
          setSearchResults(updatedUsers);
        }
      } catch (error) {
        console.error('Error: ', error);
      }
      setPopupVisible(true);
    } else {
      setIsLoginPopUpVisible(true);
    }
  };

  const imageUrl =
    'https://imgv3.fotor.com/images/gallery/a-man-profile-picture-with-blue-and-green-background-made-by-LinkedIn-Profile-Picture-Maker.jpg';

  //console.log(userInput);
  const skillString = selectedSkills.join(',');
  const languagesString = selectedLanguages.join(',');
  // console.log(skillString, languagesString);
  // console.log(selectedSkills, selectedLanguages);
  return (
    <BackButtonHandler>
      <ScrollView style={{backgroundColor: '#fff', flex: 1}}>
        {userInput === '' &&
          selectedSkills.length === 0 &&
          selectedLanguages.length === 0 && (
            <>
              <View style={{marginVertical: 10, marginHorizontal: 5}}>
                <Text
                  style={{
                    color: Colors.black7,
                    fontSize: 17,
                    fontWeight: '400',
                  }}>
                  Top Services
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <TouchableOpacity
                    style={[
                      styles.serviceContainer,
                      {backgroundColor: '#c9fdc9'},
                    ]}>
                    <Ionicons
                      name="call-outline"
                      size={20}
                      color={Colors.black7}
                    />
                    <Text style={styles.serciceText}>Call</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.serviceContainer,
                      {backgroundColor: '#ffcdcd'},
                    ]}>
                    <Ionicons
                      name="chatbubble-ellipses-outline"
                      size={20}
                      color={Colors.black7}
                    />
                    <Text style={styles.serciceText}>Chat</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.serviceContainer,
                      {backgroundColor: '#ffffcd'},
                    ]}>
                    <MaterialIcons
                      name="online-prediction"
                      size={20}
                      color={Colors.black7}
                    />
                    <Text style={styles.serciceText}>Live</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{marginVertical: 5, marginHorizontal: 5}}>
                <Text
                  style={{
                    color: Colors.black7,
                    fontSize: 17,
                    fontWeight: '400',
                  }}>
                  Quick Link
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <TouchableOpacity
                    style={styles.IconContainer}
                    onPress={() => navigation.navigate('WalletTransaction')}>
                    <Image
                      source={require('../../assets/icons/wallet.png')}
                      style={{height: 30, width: 30}}
                    />
                    <Text style={styles.iconText}>Wallet</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.IconContainer}
                    onPress={() => navigation.navigate('Customer')}>
                    <Image
                      source={require('../../assets/icons/support.png')}
                      style={{height: 28, width: 25}}
                    />
                    <Text style={styles.iconText}>Customer</Text>
                    <Text style={styles.iconText}>Support</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.IconContainer}
                    onPress={() => navigation.navigate('OrderHistory')}>
                    <Image
                      source={require('../../assets/icons/bag.png')}
                      style={{height: 28, width: 25}}
                    />
                    <Text style={styles.iconText}>Order</Text>
                    <Text style={styles.iconText}>History</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.IconContainer}
                    onPress={() => navigation.navigate('UserProfile')}>
                    <Image
                      source={require('../../assets/icons/profile.png')}
                      style={{height: 28, width: 28}}
                    />
                    <Text style={styles.iconText}>Profile</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}

        <View style={{marginVertical: 10, marginHorizontal: 10}}>
          {searchResults &&
            searchResults.map(result =>
              result.role === 'verified' ? (
                <TouchableOpacity
                  key={result._id}
                  style={styles.astrologerContainer}
                  onPress={() =>
                    navigation.navigate('AstrologerProfile', {
                      user: result,
                    })
                  }>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Image
                      source={{uri: imageUrl}}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 50,
                        borderColor: '#FBE300',
                        borderWidth: 3,
                      }}
                    />
                    <View style={{}}>
                      <Text style={styles.astrologersName}>
                        {' '}
                        {result?.name.split(' ')[0]}
                      </Text>
                      <Text style={{color: '#000000', fontSize: 15}}>
                        {result?.skills.slice(0, 2).join(', ')}
                        {result?.skills.length > 2 && !showMore && '...'}
                      </Text>
                      <Text style={{color: '#000000', fontSize: 15}}>
                        {result?.languages.join(', ')}
                      </Text>
                      <Text style={{color: '#000000', fontSize: 15}}>
                        Exp: {result?.yearsOfExperience} years
                      </Text>
                      <Text style={{color: '#b30000', fontSize: 15}}>
                        ₹ {result?.amount} /min
                      </Text>
                    </View>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{height: 10}} />
                      <TouchableOpacity
                        onPress={() => handleRequest(userId, result._id)}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Chat</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ) : null,
            )}
        </View>

        {isPopupVisible && (
          <PopUpForm
            isVisible={isPopupVisible}
            onClose={() => setPopupVisible(false)}
          />
        )}
        {isLoginPopUpVisible && (
          <PopUpLogin
            isVisible={isLoginPopUpVisible}
            onClose={() => setIsLoginPopUpVisible(false)}
          />
        )}
        <FilterPopup
          isVisible={isFilterPopupVisible}
          onClose={closeFilterPopup}
          onApplyFilter={handleApplyFilter}
          selectedSkills={selectedSkills}
          selectedLanguages={selectedLanguages}
          onSelectSkills={setSelectedSkills}
          onSelectLanguages={setSelectedLanguages}
          getResult={getResult}
        />
      </ScrollView>
    </BackButtonHandler>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    width: '100%',
    color: Colors.black7,
    fontSize: 15,
  },
  page: {
    padding: 15,
    marginTop: -11,
  },
  astrologerContainer: {
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#BCBCBC',
    borderRadius: 13,
    padding: 6,
    backgroundColor: '#ffffff',
    marginBottom: 10,
    shadowColor: '#808080',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
  },
  astrologersName: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000000',
  },
  separator: {
    width: '100%',
    height: 1,

    backgroundColor: '#f0f0f0',
    marginTop: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ffffff',
    width: 90, // Set the width to your desired value
    height: 35, // Increase the height to make the button longer
    borderRadius: 10,
    borderColor: '#007300',
    borderWidth: 1,
    alignItems: 'center', // Center text horizontally
    justifyContent: 'center', // Center text vertically
  },
  buttonText: {
    color: '#007300',
    fontSize: 16,
    fontWeight: '500',
  },
  serviceContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.grey4,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 8,
    // shadowOpacity: 0.1,
    // shadowColor: Colors.grey3,
    // shadowOffset: {width: 10, height: 15},
    // shadowRadius: 10,
  },
  serciceText: {
    color: Colors.black7,
    fontSize: 15,
    fontWeight: '500',
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  IconContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.grey5,
    alignContent: 'center',
    alignItems: 'center',
    //paddingHorizontal: 20,
    width: 85,
    height: 90,
    padding: 8,
  },
  iconText: {
    color: Colors.grey2,
    fontSize: 14,
  },
});
