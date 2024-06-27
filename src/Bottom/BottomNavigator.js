import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Astrologers from '../screens/Astrologers';
import LiveStream from '../components/Host/LiveStream';
import CallList from '../components/CallScreen/CallList';
import UserProfile from '../components/Profile/UserProfile';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {useNavigation} from '@react-navigation/native';
import {Colors} from '../utils/Colors';
import {UserType} from '../UserContext';
import {getBalance} from '../utils/UpdateWallet';
const Bottom = createBottomTabNavigator();

const BottomNavigator = () => {
  const navigation = useNavigation();
  const {userId, setUserId, addToWallet, setWalletBalance, walletBalance} =
    useContext(UserType);

  console.log(userId);
  useEffect(() => {
    getBalance(userId)
      .then(res => {
        setWalletBalance(res?.balance);
      })
      .catch(err => {
        console.log(err);
      });
  });
  return (
    <Bottom.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#FBE300',
          height: 50,
        },
        tabBarStyle: {
          backgroundColor: '#FBE300',
          borderRadius: 30,
          marginBottom: 10,
          paddingTop: 5,
          paddingBottom: 5,
          height: 55,
          marginHorizontal: 10,
          position: 'absolute',
        },

        headerLeft: () => {
          return (
            <TouchableOpacity style={{marginLeft: 10}}>
              <MaterialIcons
                name="menu"
                size={23}
                color={Colors.black7}
                onPress={() => navigation.openDrawer()}
              />
            </TouchableOpacity>
          );
        },
      }}>
      <Bottom.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={Colors.black8}
            />
          ),
          title: () => (
            <Text style={{color: Colors.black7, fontWeight: '500'}}>Home</Text>
          ),
          headerTitle: () => {
            return (
              <View>
                <Image
                  source={require('../assets/icons/Logo/logo3.png')}
                  style={{width: 110, height: 35}}
                />
              </View>
            );
          },
          headerRight: () => {
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignContent: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <Text
                  style={{
                    color: Colors.black7,
                    fontSize: 17,
                    fontWeight: '400',
                    marginRight: 10,
                    borderWidth: 1.2,
                    borderColor: Colors.black7,
                    borderRadius: 10,
                    paddingHorizontal: 5,
                    paddingVertical: 1,
                  }}>
                  ₹ {walletBalance}
                </Text>
                <TouchableOpacity
                  style={{marginRight: 10}}
                  onPress={() => navigation.navigate('WalletTransaction')}>
                  <SimpleLineIcons
                    name="wallet"
                    size={24}
                    color={Colors.black7}
                  />
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />

      <Bottom.Screen
        name="Astrologers"
        component={Astrologers}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={
                focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'
              }
              size={24}
              color={Colors.black7}
            />
          ),
          title: () => (
            <Text style={{color: Colors.black7, fontWeight: '500'}}>Chat</Text>
          ),
          headerTitle: () => {
            return (
              <View>
                <Text
                  style={{fontSize: 16, color: Colors.black7, fontWeight: 500}}>
                  Chat With Astrologer
                </Text>
              </View>
            );
          },
          headerRight: () => {
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignContent: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SearchBar')}
                  style={{}}>
                  <AntDesign name="filter" size={25} color={Colors.black7} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{marginRight: 10}}
                  onPress={() => navigation.navigate('WalletTransaction')}>
                  <SimpleLineIcons
                    name="wallet"
                    size={24}
                    color={Colors.black7}
                  />
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />
      <Bottom.Screen
        name="LiveStream"
        component={LiveStream}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name={focused ? 'play-box' : 'play-box-outline'}
              size={24}
              color={Colors.black7}
            />
          ),
          title: () => (
            <Text style={{color: Colors.black7, fontWeight: '500'}}>Live</Text>
          ),
          headerTitle: () => {
            return (
              <View>
                <Text
                  style={{fontSize: 16, color: Colors.black7, fontWeight: 500}}>
                  Live Session
                </Text>
              </View>
            );
          },

          headerRight: () => {
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignContent: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SearchBar')}
                  style={{}}>
                  <AntDesign name="filter" size={25} color={Colors.black7} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{marginRight: 10}}
                  onPress={() => navigation.navigate('WalletTransaction')}>
                  <SimpleLineIcons
                    name="wallet"
                    size={24}
                    color={Colors.black7}
                  />
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />

      <Bottom.Screen
        name="CallList"
        component={CallList}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'call' : 'call-outline'}
              size={24}
              color={Colors.black7}
            />
          ),
          title: () => (
            <Text style={{color: Colors.black7, fontWeight: '500'}}>Call</Text>
          ),
          headerTitle: () => {
            return (
              <View>
                <Text
                  style={{fontSize: 16, color: Colors.black7, fontWeight: 500}}>
                  Talk With Astrologer
                </Text>
              </View>
            );
          },

          headerRight: () => {
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignContent: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SearchBar')}
                  style={{}}>
                  <AntDesign name="filter" size={25} color={Colors.black7} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{marginRight: 10}}
                  onPress={() => navigation.navigate('WalletTransaction')}>
                  <SimpleLineIcons
                    name="wallet"
                    size={24}
                    color={Colors.black7}
                  />
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />
      <Bottom.Screen
        name="User"
        component={UserProfile}
        options={{
          tabBarIcon: ({focused}) => (
            <FontAwesome
              name={focused ? 'user' : 'user-o'}
              size={24}
              color={Colors.black7}
            />
          ),
          title: () => (
            <Text style={{color: Colors.black7, fontWeight: '500'}}>User</Text>
          ),
          headerTitle: () => {
            return (
              <View>
                <Text
                  style={{fontSize: 16, color: Colors.black7, fontWeight: 500}}>
                  Profile
                </Text>
              </View>
            );
          },
        }}
      />
    </Bottom.Navigator>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({});
