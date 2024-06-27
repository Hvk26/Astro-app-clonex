import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {UserType} from '../UserContext';
import axios from 'axios';
import Service_URL from '../utils/Constant';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Brands from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {Colors} from '../utils/Colors';
import LogoutPopup from '../components/PopUp/LogoutPopup';
const {width} = Dimensions.get('screen');

const CustomDrawer = props => {
  const {userId, setUserId} = useContext(UserType);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const onClose = () => {
    setIsVisible(!isVisible);
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(`${Service_URL}/userInfo/${userId}`);
      const data = response.data;
      if (!data) {
        setError('User not found');
      } else {
        setUserData(data);
        setError(null);
      }
    } catch (error) {
      setError('Error fetching user information');
    }
  };

  useEffect(() => {
    fetchData();
  }); // Pass an empty dependency array

  // if (!userData) {
  //   return (
  //     <View>
  //       <Text>Loading user data...</Text>
  //     </View>
  //   );
  // }

  //Logout

  const handleLogout = async () => {
    try {
      // Clear the authentication-related AsyncStorage data
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('role');
      // Clear the user data in your context
      setUserId(null);
      // Navigate the user back to the login screen
      navigation.navigate('LogIn'); // Change 'Login' to the actual login screen name.
    } catch (error) {
      // Handle any errors that occur during logout
      Alert.alert('Error', 'Failed to logout');
    }
  };
  // const profileImage = '../assets/images/profile.png';

  const imageUrl = `${Service_URL}/${userData?.image}`;
  const token = AsyncStorage.getItem('authToken');

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <ImageBackground
          style={{height: 90, marginTop: -5}}
          source={require('../assets/images/bgMain.jpg')}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 28,
              left: 30,
              flexDirection: 'row',
              gap: 15,
            }}>
            <View>
              {userData ? (
                <Pressable
                  onPress={() => navigation.navigate('UserProfile')}
                  style={{paddingLeft: 20}}>
                  <Text
                    style={{
                      color: Colors.black7,
                      fontSize: 15,
                      fontWeight: 500,
                    }}>
                    {userData?.name?.length > 15
                      ? `${userData.name.substring(0, 15)}...`
                      : userData.name}
                  </Text>
                  <Text
                    style={{
                      color: Colors.black7,
                      fontSize: 15,
                      textAlign: 'center',
                    }}>
                    {userData.phoneNumber}
                  </Text>
                </Pressable>
              ) : (
                <Text style={{color: Colors.black7, fontSize: 15}}>Guest</Text>
              )}
            </View>

            <Feather
              name="edit"
              size={20}
              style={{}}
              onPress={() => navigation.navigate('UserProfile')}
              color={Colors.pink1}
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('UserProfile')}
            style={{
              position: 'absolute',
              left: width / 3.5 - 100,
              bottom: -90 / 2,
            }}>
            <Image
              source={{uri: imageUrl}}
              onPress={() => navigation.navigate('UserProfile')}
              style={{
                height: 90,
                width: 90,
                borderRadius: 100 / 2,
                borderWidth: 4,
                borderColor: '#fff',
              }}
            />
          </TouchableOpacity>
        </ImageBackground>
        <View style={{marginTop: 110 / 2}}>
          <DrawerItemList {...props} />
        </View>
        <View style={{paddingLeft: 20, paddingBottom: 5, marginTop: 10}}>
          <Text style={{color: 'blue', fontSize: 14}}>Follow Us:</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingBottom: 5,
            marginTop: 10,
            marginBottom: 10,
          }}>
          <Entypo name="facebook-with-circle" size={24} color={'#316FF6'} />
          <Entypo name="instagram-with-circle" size={24} color={'#E1306C'} />
          <Entypo name="twitter-with-circle" size={24} color={'#1DA1F2'} />
          <Entypo name="youtube-with-circle" size={24} color={'#EA4335'} />
          <Brands name="whatsapp" size={24} color={Colors.primaryGreen} />
        </View>
      </DrawerContentScrollView>

      {userId && (
        <View style={{padding: 10, borderTopWidth: 1, borderTopColor: '#ccc'}}>
          <TouchableOpacity
            onPress={() => setIsVisible(true)}
            style={{
              paddingVertical: 10,
              backgroundColor: '#141414',
              alignItems: 'center',
              borderRadius: 35,
            }}>
            <Text style={{color: '#fff', fontSize: 15, fontWeight: 'bold'}}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {!userId && (
        <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('LogIn')}
            style={{
              paddingVertical: 10,
              backgroundColor: '#141414',
              alignItems: 'center',
              borderRadius: 35,
            }}>
            <Text style={{color: '#fff', fontSize: 15, fontWeight: '500'}}>
              LogIn
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <LogoutPopup
        isVisible={isVisible}
        onClose={onClose}
        handleLogout={handleLogout}
      />
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({});
