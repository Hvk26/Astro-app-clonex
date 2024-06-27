import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Main from './Main';
import OrderHistory from '../DrawerScreen/OrderHistory';
import WalletTransactions from '../DrawerScreen/WalletTransactions';
import MyFollowing from '../DrawerScreen/MyFollowing';
import CustomerSupport from '../DrawerScreen/CustomerSupport';
import CustomDrawer from '../DrawerScreen/CustomDrawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FreeService from '../Services/FreeService';
import Feather from 'react-native-vector-icons/Feather';
import {Colors} from '../utils/Colors';
import Miscellaneous from '../DrawerScreen/Miscellaneous';
import Aboutus from '../DrawerScreen/AboutUs';
import ContactUs from '../DrawerScreen/ContactUs';
import HomeScreen from '../screens/HomeScreen';

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  const navigation = useNavigation();
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerLabelStyle: {marginLeft: -15, color: '#000'},
        headerShown: false,
        headerStyle: {
          backgroundColor: '#FBE300',
          shadowColor: '#fff',
        },
      }}>
      <Drawer.Screen
        name="Main"
        component={Main}
        options={{
          drawerLabel: 'Home',
          drawerIcon: () => (
            <Entypo name="home" size={20} color={Colors.black7} />
          ),
        }}
      />
      <Drawer.Screen
        name="OrderHistory"
        component={OrderHistory}
        options={{
          headerShown: true,
          drawerIcon: () => (
            <FontAwesome name="history" size={20} color={Colors.black7} />
          ),
          headerTitle: () => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{fontSize: 16, color: Colors.black7, fontWeight: 500}}>
                Order History
              </Text>
            </View>
          ),

          drawerLabel: () => (
            <Text style={{fontSize: 15, color: Colors.black7, fontWeight: 400}}>
              Order History
            </Text>
          ),
          drawerLabel: 'Order History',
        }}
      />
      <Drawer.Screen
        name="WalletTransaction"
        component={WalletTransactions}
        options={{
          headerShown: true,
          drawerIcon: () => (
            <Entypo name="wallet" size={20} color={Colors.black7} />
          ),
          headerTitle: () => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{fontSize: 16, color: Colors.black7, fontWeight: 500}}>
                Transaction
              </Text>
            </View>
          ),

          drawerLabel: () => (
            <Text style={{fontSize: 15, color: Colors.black7, fontWeight: 400}}>
              Wallet Transaction
            </Text>
          ),
          drawerLabel: 'Wallet Transactions',
        }}
      />
      <Drawer.Screen
        name="Follower"
        component={MyFollowing}
        options={{
          headerShown: true,
          drawerIcon: () => (
            <FontAwesome name="user-plus" size={20} color={Colors.black7} />
          ),
          headerTitle: () => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{fontSize: 16, color: Colors.black7, fontWeight: 500}}>
                Following
              </Text>
            </View>
          ),

          drawerLabel: () => (
            <Text style={{fontSize: 15, color: Colors.black7, fontWeight: 400}}>
              My Followings
            </Text>
          ),
          drawerLabel: 'My Followings',
        }}
      />
      {/* <Drawer.Screen
        name="Blog"
        component={Blog}
        options={{
          drawerIcon: () => (
            <Foundation name="social-blogger" size={24} color={Colors.black7} />
          ),
          headerTitle: () => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{fontSize: 16, color: Colors.black7, fontWeight: 400}}>
                Blog
              </Text>
            </View>
          ),
          headerStyle: {
            backgroundColor: '#FBE300',
          },
          drawerLabel: () => (
            <Text style={{fontSize: 15, color: Colors.black7, fontWeight: 400}}>
              Blog
            </Text>
          ),
          drawerLabel: 'Blog',
        }}
      /> */}
      <Drawer.Screen
        name="FreeService"
        component={FreeService}
        options={{
          headerShown: true,
          drawerIcon: () => (
            <FontAwesome name="star-o" size={20} color={Colors.black7} />
          ),
          headerTitle: () => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{fontSize: 16, color: Colors.black7, fontWeight: 500}}>
                Free Services
              </Text>
            </View>
          ),

          drawerLabel: () => (
            <Text style={{fontSize: 15, color: Colors.black7, fontWeight: 400}}>
              Free Services
            </Text>
          ),
          drawerLabel: 'Free Services',
        }}
      />
      {/* <Drawer.Screen
        name="Other Services"
        component={Miscellaneous}
        options={{
          headerShown: true,
          drawerIcon: () => (
            <FontAwesome name="star-o" size={20} color={Colors.black7} />
          ),
          headerTitle: () => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{fontSize: 16, color: Colors.black7, fontWeight: 500}}>
                Other Services
              </Text>
            </View>
          ),

          drawerLabel: () => (
            <Text style={{fontSize: 15, color: Colors.black7, fontWeight: 400}}>
              Other Services
            </Text>
          ),
          drawerLabel: 'Other Services',
        }}
      /> */}
      <Drawer.Screen
        name="Customer"
        component={CustomerSupport}
        options={{
          headerShown: true,
          drawerIcon: () => (
            <AntDesign name="customerservice" size={20} color={Colors.black7} />
          ),
          headerTitle: () => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{fontSize: 16, color: Colors.black7, fontWeight: 500}}>
                Customer Support
              </Text>
            </View>
          ),

          drawerLabel: () => (
            <Text style={{fontSize: 15, color: Colors.black7, fontWeight: 400}}>
              Customer Support
            </Text>
          ),
          drawerLabel: 'Customer Support',
        }}
      />
      <Drawer.Screen
        name="Contact"
        component={ContactUs}
        options={{
          headerShown: true,
          drawerIcon: () => (
            <AntDesign name="contacts" size={20} color={Colors.black7} />
          ),
          headerTitle: () => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{fontSize: 16, color: Colors.black7, fontWeight: 500}}>
                Contact Us
              </Text>
            </View>
          ),
          drawerLabel: () => (
            <Text style={{fontSize: 15, color: Colors.black7, fontWeight: 400}}>
              Customer Support
            </Text>
          ),
          drawerLabel: 'Contact Us',
        }}
      />
      <Drawer.Screen
        name="About"
        component={Aboutus}
        options={{
          headerShown: true,
          drawerIcon: () => (
            <Feather name="grid" size={20} color={Colors.black7} />
          ),
          headerTitle: () => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{fontSize: 16, color: Colors.black7, fontWeight: 500}}>
                About Astrogini
              </Text>
            </View>
          ),

          drawerLabel: () => (
            <Text style={{fontSize: 20, color: Colors.black7, fontWeight: 400}}>
              About Astrogini
            </Text>
          ),
          drawerLabel: 'About Astrogini',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({});
