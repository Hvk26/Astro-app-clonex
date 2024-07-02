import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Parent from '../Other/Parent';
import Splash from '../screens/Splash';
import AudiencePage from '../components/Host/AudiencePage';
import LogInScreen from '../screens/LogInScreen';
import ChatMessages from '../components/ChatScreens/ChatMessages';
import ChatList from '../components/ChatScreens/ChatList';
import AstrologerProfile from '../components/Profile/AstrologerProfile';
import EditUserInfo from '../components/Profile/EditUserInfo';
import HostPage from '../components/Host/HostPage';
import Client from '../screens/Client';
import RegistrationScreen from '../screens/RegistrationScreen';
import AstroHome from '../components/HomeScreen/AstroHome';
import ChatScreen from '../components/ChatScreens/ChatScreen';
import UserProfile from '../components/Profile/UserProfile';
import SearchBar from '../components/SearchBar/SearchBar';
import DailyHoroscope from '../Services/DailyHoroscope';
import BirthChart from '../Services/BirthChart';
import DashaChart from '../Services/DashaChart';
import Panchang from '../Services/Panchang';
import Main from '../Drawer/Main';
import AddMoney from '../components/Wallet/AddMoney';
import {Colors} from '../utils/Colors';
import Payment from '../components/Wallet/Payment';
import WalletTransactions from '../DrawerScreen/WalletTransactions';
import UsersAstrologyDetails from '../components/ChatScreens/UsersAstrologyDetails';
import CustomerSupport from '../DrawerScreen/CustomerSupport';
import LiveStream from '../components/Host/LiveStream';
import KundaliMatch from '../Services/KundaliMatch';
import TermsOfUse from '../components/TermsofUse/TermsOfUse';
import AstrologerHome from '../Astrologer/AstrologerHome';
import {
  ZegoUIKitPrebuiltCallInCallScreen,
  ZegoUIKitPrebuiltCallWaitingScreen,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import CallHistroy from '../Astrologer/Cards/History/CallHistroy';
import ChatHistory from '../Astrologer/Cards/History/ChatHistory';
import Kundli from '../Astrologer/Cards/History/Kundli';
import Report from '../Astrologer/Cards/Report/Report';
import Waitlist from '../Astrologer/Cards/Waitlist/Waitlist';
import Review from '../Astrologer/Cards/Reviews/Review';
import Support from '../Astrologer/Cards/Support/Support';
import Setting from '../Astrologer/Cards/Settings/Setting';
import PriceChangeRequest from '../Astrologer/Cards/Settings/Feature/PriceChangeRequest';
import NumberUpdation from '../Astrologer/Cards/Settings/Feature/NumberUpdation';
import ImportantNumbers from '../Astrologer/Cards/Settings/Feature/ImportantNumbers';
import BankDetails from '../Astrologer/Cards/Settings/Feature/BankDetails';
import TermOfUse from '../Astrologer/Cards/Settings/Feature/TermOfUse';
import Membership from '../Astrologer/Cards/Settings/Feature/Membership';
import Form16 from '../Astrologer/Cards/Settings/Feature/Form16';
import PaySlip from '../Astrologer/Cards/Settings/Feature/PaySlip';
import TrainingReels from '../Astrologer/Cards/Settings/Feature/TrainingReels';
import Requests from '../Astrologer/Requests/Requests';
import Calls from '../components/CallScreen/Calls';
import AllChats from '../Astrologer/AllChats/AllChats';
import UserDosha from '../components/ChatScreens/UserDosha';
// import TestCall from '../components/CallScreen/TestCall';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LogIn"
        component={LogInScreen}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="VoiceCall"
        component={TestCall}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Parent"
        component={Parent}
        options={{headerShown: false}}
      />
      <Stack.Screen
        options={{headerShown: false}}
        // DO NOT change the name
        name="ZegoUIKitPrebuiltCallWaitingScreen"
        component={ZegoUIKitPrebuiltCallWaitingScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        // DO NOT change the name
        name="ZegoUIKitPrebuiltCallInCallScreen"
        component={ZegoUIKitPrebuiltCallInCallScreen}
      />
      <Stack.Screen
        name="DailyHoroscope"
        component={DailyHoroscope}
        options={{
          headerShown: true,
          headerBackButtonMenuEnabled: true,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 17,
                color: Colors.black7,
                fontWeight: '500',
              }}>
              Horoscope
            </Text>
          ),
          headerStyle: {
            backgroundColor: '#FBE300',
          },
        }}
      />
      <Stack.Screen
        name="AudiencePage"
        component={AudiencePage}
        options={{
          headerStyle: {
            backgroundColor: '#FBE300',
          },
        }}
      />
      <Stack.Screen
        name="ChatMessages"
        component={ChatMessages}
        options={{
          headerStyle: {
            backgroundColor: '#FBE300',
          },
        }}
      />
      <Stack.Screen
        name="ChatList"
        component={ChatList}
        options={{
          headerStyle: {
            backgroundColor: '#FBE300',
          },
        }}
      />
      <Stack.Screen
        name="AstrologerProfile"
        component={AstrologerProfile}
        options={{
          headerStyle: {
            backgroundColor: '#FBE300',
          },
          headerTitle: () => (
            <Text style={{fontSize: 17, color: '#000'}}>Profile</Text>
          ),
        }}
      />
      <Stack.Screen
        name="EditUserInfo"
        component={EditUserInfo}
        options={{
          headerTitle: () => (
            <Text style={{fontSize: 17, color: '#000', fontWeight: 500}}>
              Edit Profile
            </Text>
          ),
          headerBackButtonMenuEnabled: true,
          headerStyle: {
            backgroundColor: '#FBE300',
            shadowColor: '#fff',
          },

          tabBarIcon: () => (
            <AntDesign name="user" size={24} color={'#000000'} />
          ),
        }}
      />
      <Stack.Screen
        name="HostPage"
        component={HostPage}
        options={{
          headerShown: false,
          headerTitle: 'Live',
          headerBackVisible: true,
          headerStyle: {
            backgroundColor: '#FBE300',
            shadowColor: '#fff',
          },
          title: () => <Text style={{color: '#000000'}}>Live</Text>,
          tabBarIcon: () => (
            <AntDesign name="user" size={24} color={'#000000'} />
          ),
        }}
      />
      <Stack.Screen
        name="Client"
        component={Client}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AstroHome"
        component={AstroHome}
        options={{
          headerStyle: {
            backgroundColor: '#FBE300',
          },
        }}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          headerStyle: {
            backgroundColor: '#FBE300',
          },
        }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          headerStyle: {
            backgroundColor: '#FBE300',
          },
          headerTitle: () => (
            <Text style={{fontSize: 17, color: '#141414', fontWeight: '500'}}>
              User Profile
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="SearchBar"
        component={SearchBar}
        options={{
          headerBackVisible: true,
          headerStyle: {
            backgroundColor: '#FBE300',
            shadowColor: '#000',
          },
        }}
      />

      <Stack.Screen
        name="BirthChart"
        component={BirthChart}
        options={{
          headerBackButtonMenuEnabled: true,
          headerStyle: {
            backgroundColor: '#FBE300',
            shadowColor: '#000',
          },
          headerTitle: () => (
            <Text
              style={{
                fontSize: 17,
                color: Colors.black7,
                fontWeight: '500',
              }}>
              Birth Chart
            </Text>
          ),
        }}
      />

      <Stack.Screen
        name="DashaChart"
        component={DashaChart}
        options={{
          headerBackButtonMenuEnabled: true,
          headerStyle: {
            backgroundColor: '#FBE300',
            shadowColor: '#000',
          },
          headerTitle: () => (
            <Text
              style={{
                fontSize: 17,
                color: Colors.black7,
                fontWeight: '500',
              }}>
              Dasha Chart
            </Text>
          ),
        }}
      />

      <Stack.Screen
        name="Panchang"
        component={Panchang}
        options={{
          headerBackButtonMenuEnabled: true,
          headerStyle: {
            backgroundColor: '#FBE300',
            shadowColor: '#000',
          },
          headerTitle: () => (
            <Text
              style={{
                fontSize: 17,
                color: Colors.black7,
                fontWeight: '500',
              }}>
              Today's Panchang
            </Text>
          ),
        }}
      />

      <Stack.Screen
        name="AddMoney"
        component={AddMoney}
        options={{
          // headerBackButtonMenuEnabled: true,
          headerStyle: {
            backgroundColor: '#FBE300',
            shadowColor: '#000',
          },
          headerTitle: () => (
            <Text
              style={{
                fontSize: 17,
                color: Colors.black7,
                fontWeight: '400',
                // marginLeft: 20,
              }}>
              Add Money To Wallet
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{
          // headerBackButtonMenuEnabled: true,
          headerStyle: {
            backgroundColor: '#FBE300',
            shadowColor: '#000',
          },
          headerTitle: () => (
            <Text
              style={{
                fontSize: 17,
                color: Colors.black7,
                fontWeight: '400',
                // marginLeft: 20,
              }}>
              Payment Information
            </Text>
          ),
        }}
      />
      <Stack.Screen name="Transaction" component={WalletTransactions} />
      <Stack.Screen
        name="UsersAstrologyDetails"
        component={UsersAstrologyDetails}
        options={{
          headerStyle: {
            backgroundColor: '#FBE300',
            shadowColor: '#000',
          },
          headerTitle: () => (
            <Text
              style={{
                fontSize: 17,
                color: Colors.black7,
                fontWeight: '400',
                // marginLeft: 20,
              }}>
              User Information
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="CustomerSupport"
        component={CustomerSupport}
        options={{
          headerStyle: {
            backgroundColor: '#FBE300',
            shadowColor: '#000',
          },
          headerTitle: () => (
            <Text
              style={{
                fontSize: 17,
                color: Colors.black7,
                fontWeight: '500',
              }}>
              Customer Support
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="Live"
        component={LiveStream}
        options={{
          headerStyle: {
            backgroundColor: '#FBE300',
            shadowColor: '#000',
          },
          headerTitle: () => (
            <Text
              style={{
                fontSize: 17,
                color: Colors.black7,
                fontWeight: '500',
              }}>
              Live Session
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="KundliMatch"
        component={KundaliMatch}
        options={{
          headerStyle: {
            backgroundColor: '#FBE300',
            shadowColor: '#000',
          },
          headerTitle: () => (
            <Text
              style={{
                fontSize: 17,
                color: Colors.black7,
                fontWeight: '500',
              }}>
              Match Kundli
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="TermsOfUse"
        component={TermsOfUse}
        options={{
          headerStyle: {
            backgroundColor: '#FBE300',
            shadowColor: '#000',
          },
          headerTitle: () => (
            <Text
              style={{
                fontSize: 17,
                color: Colors.black7,
                fontWeight: '500',
              }}>
              Terms of Use
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="AstrologerHome"
        component={AstrologerHome}
        options={{
          headerStyle: {
            backgroundColor: '#FBE300',
            shadowColor: '#000',
          },
          headerBackButtonMenuEnabled: false,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="CallHistoty"
        component={CallHistroy}
        options={{
          headerStyle: {
            backgroundColor: '#FBE300',
            shadowColor: '#000',
          },
          headerBackButtonMenuEnabled: true,
          //headerBackVisible: true,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 17,
                color: Colors.black7,
                fontWeight: '400',
              }}>
              Call History
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="ChatHistoty"
        component={ChatHistory}
        options={{
          headerStyle: {
            backgroundColor: '#FBE300',
            shadowColor: '#000',
          },
          headerBackButtonMenuEnabled: true,
          //headerBackVisible: true,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 17,
                color: Colors.black7,
                fontWeight: '400',
              }}>
              Chat History
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="KundaliAstro"
        component={Kundli}
        options={{
          headerStyle: {
            backgroundColor: '#FBE300',
            shadowColor: '#000',
          },
          headerBackButtonMenuEnabled: true,
          //headerBackVisible: true,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 17,
                color: Colors.black7,
                fontWeight: '400',
              }}>
              Kundali
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="ReportScreen"
        component={Report}
        options={{
          headerStyle: {
            backgroundColor: '#FBE300',
            shadowColor: '#000',
          },
          headerBackButtonMenuEnabled: true,
          //headerBackVisible: true,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 17,
                color: Colors.black7,
                fontWeight: '400',
              }}>
              Report
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="Waitlist"
        component={Waitlist}
        options={{
          headerStyle: {
            backgroundColor: '#FBE300',
            shadowColor: '#000',
          },
          headerBackButtonMenuEnabled: true,
          //headerBackVisible: true,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 17,
                color: Colors.black7,
                fontWeight: '400',
              }}>
              Waitlist
            </Text>
          ),
        }}
      />

      <Stack.Screen
        name="Review"
        component={Review}
        options={{
          headerStyle: {
            backgroundColor: '#FBE300',
            shadowColor: '#000',
          },
          headerBackButtonMenuEnabled: true,
          //headerBackVisible: true,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 17,
                color: Colors.black7,
                fontWeight: '400',
              }}>
              Reviews
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="Report"
        component={Report}
        options={{
          headerStyle: {
            backgroundColor: '#FBE300',
            shadowColor: '#000',
          },
          headerBackButtonMenuEnabled: true,
          //headerBackVisible: true,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 17,
                color: Colors.black7,
                fontWeight: '400',
              }}>
              Report
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="ChatSupport"
        component={Support}
        options={{
          headerStyle: {
            backgroundColor: '#FBE300',
            shadowColor: '#000',
          },
          headerBackButtonMenuEnabled: true,
          //headerBackVisible: true,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 17,
                color: Colors.black7,
                fontWeight: '400',
              }}>
              Chat Support
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{
          headerStyle: {
            backgroundColor: '#FBE300',
            shadowColor: '#000',
          },
          headerBackButtonMenuEnabled: true,
          //headerBackVisible: true,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 17,
                color: Colors.black7,
                fontWeight: '400',
              }}>
              Setting
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="PriceChangeReq"
        component={PriceChangeRequest}
        options={{
          headerStyle: {
            backgroundColor: '#FBE300',
            shadowColor: '#000',
          },
          headerBackButtonMenuEnabled: true,
          //headerBackVisible: true,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 17,
                color: Colors.black7,
                fontWeight: '400',
              }}>
              Price Change Request
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="NumberUpdation"
        component={NumberUpdation}
        options={{
          headerStyle: {
            backgroundColor: '#FBE300',
            shadowColor: '#000',
          },
          headerBackButtonMenuEnabled: true,
          //headerBackVisible: true,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 17,
                color: Colors.black7,
                fontWeight: '400',
              }}>
              Update Phone Number
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="ImportantNumber"
        component={ImportantNumbers}
        options={{
          headerStyle: {
            backgroundColor: '#FBE300',
            shadowColor: '#000',
          },
          headerBackButtonMenuEnabled: true,
          //headerBackVisible: true,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 17,
                color: Colors.black7,
                fontWeight: '400',
              }}>
              Save Important Numbers
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="BankDetail"
        component={BankDetails}
        options={{
          headerStyle: {
            backgroundColor: '#FBE300',
            shadowColor: '#000',
          },
          headerBackButtonMenuEnabled: true,
          //headerBackVisible: true,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 17,
                color: Colors.black7,
                fontWeight: '400',
              }}>
              Bank Details
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="TermOfUse"
        component={TermOfUse}
        options={{
          headerStyle: {
            backgroundColor: '#FBE300',
            shadowColor: '#000',
          },
          headerBackButtonMenuEnabled: true,
          //headerBackVisible: true,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 17,
                color: Colors.black7,
                fontWeight: '400',
              }}>
              Terms And Conditions
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="Membership"
        component={Membership}
        options={{
          headerStyle: {
            backgroundColor: '#FBE300',
            shadowColor: '#000',
          },
          headerBackButtonMenuEnabled: true,
          //headerBackVisible: true,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 17,
                color: Colors.black7,
                fontWeight: '400',
              }}>
              Membership
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="Form16"
        component={Form16}
        options={{
          headerStyle: {
            backgroundColor: '#FBE300',
            shadowColor: '#000',
          },
          headerBackButtonMenuEnabled: true,
          //headerBackVisible: true,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 17,
                color: Colors.black7,
                fontWeight: '400',
              }}>
              Download Form 16A
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="PaySlip"
        component={PaySlip}
        options={{
          headerStyle: {
            backgroundColor: '#FBE300',
            shadowColor: '#000',
          },
          headerBackButtonMenuEnabled: true,
          //headerBackVisible: true,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 17,
                color: Colors.black7,
                fontWeight: '400',
              }}>
              Pay Slip
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="TrainingReels"
        component={TrainingReels}
        options={{
          headerStyle: {
            backgroundColor: '#FBE300',
            shadowColor: '#000',
          },
          headerBackButtonMenuEnabled: true,
          //headerBackVisible: true,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 17,
                color: Colors.black7,
                fontWeight: '400',
              }}>
              Training Reels
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="Requests"
        component={Requests}
        options={{
          headerStyle: {
            backgroundColor: '#FBE300',
            shadowColor: '#000',
          },
          headerBackButtonMenuEnabled: true,
          //headerBackVisible: true,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 17,
                color: Colors.black7,
                fontWeight: '400',
              }}>
              Requests
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="Calls"
        component={Calls}
        options={{
          headerStyle: {
            backgroundColor: '#FBE300',
            shadowColor: '#000',
          },
          headerBackButtonMenuEnabled: true,
          //headerBackVisible: true,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 17,
                color: Colors.black7,
                fontWeight: '400',
              }}>
              Calls
            </Text>
          ),
        }}
      />

      <Stack.Screen
        name="AllChats"
        component={AllChats}
        options={{
          headerStyle: {
            backgroundColor: '#FBE300',
            shadowColor: '#000',
          },
          headerBackButtonMenuEnabled: true,
          //headerBackVisible: true,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 17,
                color: Colors.black7,
                fontWeight: '400',
              }}>
              All Chats
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="UserDosha"
        component={UserDosha}
        options={{
          headerStyle: {
            backgroundColor: '#FBE300',
            shadowColor: '#000',
          },
          headerBackButtonMenuEnabled: true,
          //headerBackVisible: true,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 17,
                color: Colors.black7,
                fontWeight: '400',
              }}>
              Kundali Dosha
            </Text>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
