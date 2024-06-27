import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useEffect, useState, useCallback, useContext} from 'react';
import {useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PopUpForm from '../PopUp/PopUpForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PopUpLogin from '../PopUp/PopUpLogin';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import BackButtonHandler from '../BackButtonHandler/BackButtonHandler';
import Service_URL from '../../utils/Constant';
import {Colors} from '../../utils/Colors';
import {UserType} from '../../UserContext';
import axios from 'axios';
const {height, width} = Dimensions.get('screen');

const AstrologerProfile = () => {
  const route = useRoute();
  const {user} = route?.params;
  const {userId, setUserId} = useContext(UserType);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [textShown, setTextShown] = useState(false);
  const [follow, setFollow] = useState(false);
  const [numLines, setNumLines] = useState(undefined);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isLoginPopUpVisible, setIsLoginPopUpVisible] = useState(false);
  const [sheetVisible, setSheetVisible] = useState(false);

  const toggleTextShown = () => {
    setTextShown(!textShown);
  };

  useEffect(() => {
    setNumLines(textShown ? undefined : 2);
  }, [textShown]);

  const checkToken = async () => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');
      if (authToken) {
        setIsPopupVisible(true);
      } else {
        setIsLoginPopUpVisible(true);
      }
    } catch (error) {
      console.error('Error checking token:', error.message);
    }
  };

  const handleFollowing = async () => {
    console.log(userId, user._id);

    let api = follow ? 'unfollow' : 'follow';
    console.log(api);
    try {
      const response = await axios.post(`${Service_URL}/user/${api}`, {
        userId: userId,
        astroId: user._id,
      });
      if (response.status == 200) {
        setFollow(!follow);
        Alert.alert(`You ${api} successfully`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onTextLayout = useCallback(
    e => {
      if (e.nativeEvent.lines.length > 2 && !textShown) {
        setShowMoreButton(true);
        setNumLines(2);
      }
    },
    [textShown],
  );
  const imageUrl =
    'https://imgv3.fotor.com/images/gallery/a-man-profile-picture-with-blue-and-green-background-made-by-LinkedIn-Profile-Picture-Maker.jpg';
  const text = `Welcome to my astrologer profile! I am ${user.name}, a passionate and experienced astrologer with a deep understanding of the cosmic forces that shape our lives. Astrology is not just a profession for me; it's a lifelong journey of exploration and enlightenment.\n\nMy fascination with the stars and planets began at a young age, and over the years, I've dedicated myself to the study of astrology. I've had the privilege of helping countless individuals navigate the complexities of their lives through the insights and guidance provided by this ancient art.\n\nWith a compassionate and empathetic approach, I offer personalized astrological readings and consultations. Whether you're seeking answers to specific questions, looking for insights into your relationships, or simply curious about your life's purpose, I'm here to assist you.\n\nMy mission is to empower you with the knowledge and wisdom that astrology can provide. I believe that understanding the celestial influences on your life can lead to greater self-awareness and personal growth. Let's embark on a journey of self-discovery together and uncover the celestial map that guides your path.\n\nThank you for considering me as your astrologer. I look forward to connecting with you and being a part of your transformative journey.`;
  return (
    <BackButtonHandler style={{flex: 1, maxWidth: width}}>
      <ScrollView style={{}} contentContainerStyle={{paddingBottom: 55}}>
        <View style={styles.container}>
          <View
            style={{display: 'flex', flexDirection: 'row', gap: 15, flex: 1}}>
            <View style={{alignItems: 'center'}}>
              <Image
                source={{
                  uri: user.image ? `${Service_URL}/${user.image}` : imageUrl,
                }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 70,
                  borderColor: '#FBE300',
                  borderWidth: 3,
                }}
              />
              <Text style={{fontSize: 18, color: '#000'}}>★★★★★</Text>
              <Text style={{color: '#5f5f5f', fontSize: 12}}>2345 orders</Text>
            </View>
            <View style={{marginLeft: 1}}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#000',
                      fontWeight: '500',
                    }}>
                    {user.name.split(' ')[0]}
                  </Text>
                  <Ionicons
                    name="checkmark-circle"
                    size={22}
                    color={'#008020'}
                    style={{paddingTop: 5}}
                  />
                  <Text
                    onPress={handleFollowing}
                    style={{
                      backgroundColor: Colors.title1,
                      color: Colors.black7,
                      paddingHorizontal: 4,
                      paddingVertical: 2,
                      alignItems: 'center',
                      alignSelf: 'center',
                      borderRadius: 5,
                    }}>
                    {follow ? 'Unfollow' : 'Follow'}
                  </Text>
                  <Entypo
                    onPress={() => {
                      setSheetVisible(true);
                    }}
                    name="dots-three-vertical"
                    size={24}
                    color={Colors.grey2}
                    style={{marginLeft: 25, position: 'relative'}}
                  />
                </View>
              </View>

              <Text style={styles.title}>{user.skills.join(', ')}</Text>
              <Text style={styles.title}>{user.languages.join(', ')}</Text>
              <Text style={styles.title}>
                Exp: {user.yearsOfExperience} years
              </Text>
              <Text style={[styles.title, {color: 'red'}]}>
                ₹ {user.amount}/min
              </Text>
            </View>
          </View>
          <View style={styles.recordDetails}>
            <View
              style={{
                borderColor: '#d3d3d3',
                borderRightWidth: 1,
                paddingRight: '22.5%',
                display: 'flex',
                flexDirection: 'row',
                gap: 6,
              }}>
              <Text>
                <Ionicons name="logo-wechat" size={20} color={'#000000'} />
              </Text>
              <Text style={styles.recordText}>34k mins</Text>
            </View>
            <View
              style={{
                paddingLeft: 20,
                display: 'flex',
                flexDirection: 'row',
                gap: 6,
              }}>
              <Text>
                <Ionicons name="call" size={20} color={'#000000'} />
              </Text>
              <Text style={styles.recordText}>7k mins</Text>
            </View>
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text
            style={{color: Colors.grey2, textAlign: 'justify', fontSize: 14}}
            onTextLayout={onTextLayout}
            numberOfLines={numLines}
            ellipsizeMode="tail">
            {text}
          </Text>

          {showMoreButton ? (
            <Text onPress={toggleTextShown} style={{color: '#ff3333'}}>
              {textShown ? 'Read Less' : 'Read More'}
            </Text>
          ) : null}
        </View>
      </ScrollView>

      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity style={styles.bottomButton} onPress={checkToken}>
          <Ionicons name="logo-wechat" size={24} color={'#ffbf00'} />
          <Text style={styles.bottomButtonText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton}>
          <Ionicons name="call" size={24} color={'#ffbf00'} />
          <Text style={styles.bottomButtonText}>Call</Text>
        </TouchableOpacity>
      </View>

      {isPopupVisible && (
        <PopUpForm
          isVisible={isPopupVisible}
          onClose={() => setIsPopupVisible(false)}
        />
      )}

      {isLoginPopUpVisible && (
        <PopUpLogin
          isVisible={isLoginPopUpVisible}
          onClose={() => setIsLoginPopUpVisible(false)}
        />
      )}

      <Modal
        style={{
          width: '100%',
          marginLeft: 0,
          marginBottom: 0,
        }}
        isVisible={sheetVisible}>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            height: 200,
            backgroundColor: 'transparent',
            width: '100%',
            borderRadius: 14,
            gap: 2,
          }}>
          <TouchableOpacity
            onPress={() => setSheetVisible(false)}
            style={{
              borderColor: '#141414',
              borderRadius: 15,
              borderWidth: 1,
              alignItems: 'center',
              backgroundColor: '#fff',
            }}>
            <Text
              style={{
                padding: 16,
                fontSize: 20,
                fontWeight: '500',
                color: '#ff3333',
              }}>
              Report & Block
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSheetVisible(false)}
            style={{
              borderColor: '#141414',
              borderRadius: 15,
              borderWidth: 1,
              alignItems: 'center',
              backgroundColor: '#fff',
            }}>
            <Text
              style={{
                padding: 16,
                fontSize: 20,
                fontWeight: '500',
                color: '#008020',
              }}>
              Follow {user.name}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSheetVisible(false)}
            style={{
              borderColor: '#141414',
              borderRadius: 15,
              borderWidth: 1,
              alignItems: 'center',
              backgroundColor: '#fff',
            }}>
            <Text
              style={{
                padding: 16,
                fontSize: 20,
                fontWeight: '800',
                color: '#858585',
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </BackButtonHandler>
  );
};

export default AstrologerProfile;

const styles = StyleSheet.create({
  recordDetails: {
    marginTop: 9,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTop: 1,
    borderColor: Colors.grey2,
    width: '80%',
    marginHorizontal: '10%',
    display: 'flex',
    flexDirection: 'row',
  },
  recordText: {
    color: '#5f5f5f',
    fontSize: 13,
  },
  container: {
    borderWidth: 1,
    borderColor: Colors.grey2,
    borderRadius: 13,
    padding: 6,
    backgroundColor: '#ffffff',
    shadowColor: Colors.grey3,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
    width: width - 14,
    alignSelf: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 15,
    color: Colors.grey2,
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 7,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: Colors.grey2,
    backgroundColor: '#e7e7e7',
  },
  bottomButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    flexDirection: 'row',
    width: 130,
    height: 50,
    justifyContent: 'space-evenly',
    gap: 15,
    alignContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primaryYellow,
    borderRadius: 35,
  },
  bottomButtonText: {
    color: '#ffbf00',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textContainer: {
    borderWidth: 1,
    borderColor: Colors.grey2,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: width - 14,
    padding: 10,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
});
