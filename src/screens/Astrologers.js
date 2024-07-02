import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Alert,
  BackHandler,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {UserType} from '../UserContext';
import Service_URL from '../utils/Constant';
import PopUpForm from '../components/PopUp/PopUpForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PopUpLogin from '../components/PopUp/PopUpLogin';
import BackButtonPopUp from '../components/PopUp/BackButtonPopUp';
import BackButtonHandler from '../components/BackButtonHandler/BackButtonHandler';
import babelConfig from '../../babel.config';

const Astrologers = () => {
  const navigation = useNavigation();
  const [astrologerUsers, setAstrologerUsers] = useState([]);
  const {userId, setuserId, walletBalance} = useContext(UserType);
  const [isLoading, setIsLoading] = useState(true);
  // const [requestSent, setSentRequest] = useState(false);
  // const [isRequestSent, setIsRequestSent] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isBackPopupVisible, setIsBackPopupVisible] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isLoginPopUpVisible, setIsLoginPopUpVisible] = useState(false);

  useEffect(() => {
    async function fetchAstrologers() {
      try {
        const response = await axios.get(`${Service_URL}/astrologers`);
        const usersWithButtonState = response.data.map(user => ({
          ...user,
          isButtonDisabled: false,
        }));

        const onlineAstrologers = usersWithButtonState.filter(user => {
          return user.chatOnline == true;
        });

        setAstrologerUsers(onlineAstrologers);

        setIsLoading(false);
      } catch (error) {
        console.log('Error:', error);
        setIsLoading(false);
      }
    }

    fetchAstrologers();

    //prevent back button

    // const backHandler = BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   backAction,
    // );
    // return () => backHandler.remove();
  }, []);

  // const backAction = () => {
  //   setIsBackPopupVisible(true);
  //   return true; // Prevent default back action
  // };

  const handleRequest = async (currentId, selectedUserId, rate) => {
    // Find the index of the user by selectedUserId
    const token = AsyncStorage.getItem('authToken');
    console.log('rate>>>>>>>>>', rate);

    if (walletBalance < rate) {
      Alert.alert(
        'Insufficient Balance',
        'You do not have sufficient balance to send request.',
      );
      return;
    }

    if (userId) {
      setIsLoginPopUpVisible(false);
      const userIndex = astrologerUsers.findIndex(
        user => user._id === selectedUserId,
      );
      if (userIndex === -1) {
        // User not found, handle this case as needed
        return;
      }
      if (astrologerUsers[userIndex].isButtonDisabled) {
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
          const updatedUsers = [...astrologerUsers];
          updatedUsers[userIndex].isButtonDisabled = true;
          // Update the state with the new array
          setAstrologerUsers(updatedUsers);
        }
      } catch (error) {
        console.error('Error: ', error);
      }
      setPopupVisible(true);
    } else {
      setIsLoginPopUpVisible(true);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  const categories = [
    'Offers',
    'Love',
    'Education',
    'Career',
    'Marriage',
    'Health',
  ];

  const imageUrl =
    'https://imgv3.fotor.com/images/gallery/a-man-profile-picture-with-blue-and-green-background-made-by-LinkedIn-Profile-Picture-Maker.jpg';

  return (
    <BackButtonHandler>
      {/* <ScrollView style={{flex: 1, marginTop: 10, backgroundColor: '#ffffe7'}}> */}
      <View style={{marginHorizontal: 10, paddingBottom: 40}}>
        <FlatList
          data={astrologerUsers}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.astrologerContainer}
              onPress={() =>
                navigation.navigate('AstrologerProfile', {user: item})
              }>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Image
                  source={{
                    uri: item.image ? `${Service_URL}/${item.image}` : imageUrl,
                  }}
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
                    {item.name.split(' ')[0]}
                  </Text>
                  <Text style={{color: '#000000', fontSize: 15}}>
                    {item.skills.slice(0, 2).join(', ')}
                    {item.skills.length > 2 && !showMore && '...'}
                  </Text>
                  <Text style={{color: '#000000', fontSize: 15}}>
                    {item.languages.join(', ')}
                  </Text>
                  <Text style={{color: '#000000', fontSize: 15}}>
                    Exp: {item.yearsOfExperience} years
                  </Text>
                  <Text style={{color: '#b30000', fontSize: 15}}>
                    ₹ {item.chatRate} /min
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{height: 10}} />
                  <TouchableOpacity
                    onPress={() =>
                      handleRequest(userId, item._id, item.chatRate)
                    }
                    style={styles.button}>
                    <Text style={styles.buttonText}>Chat</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item._id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
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

        {isBackPopupVisible && (
          <BackButtonPopUp
            isVisible={isBackPopupVisible}
            onClose={() => setIsBackPopupVisible(false)}
          />
        )}
        {/* </ScrollView> */}
      </View>
    </BackButtonHandler>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 15,
    marginTop: -11,
  },
  astrologerContainer: {
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#BCBCBC',
    borderRadius: 13,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#ffffff',
    shadowColor: '#808080',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
    marginTop: 10,
    flex: 1,
  },
  astrologersName: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000000',
  },
  separator: {
    width: '100%',
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
});

export default Astrologers;
