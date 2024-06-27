import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useContext, useState} from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../../utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserType} from '../../../UserContext';
import LogoutPopup from '../../../components/PopUp/LogoutPopup';

const {width, height} = Dimensions.get('screen');
const Setting = () => {
  const navigation = useNavigation();
  const {userId, setUserId} = useContext(UserType);
  const [isVisible, setIsVisible] = useState(false);
  const data = [
    {
      key: '1',
      icon: <SimpleLineIcons name="screen-smartphone" size={34} />,
      title: 'Update Phone Number',
      bgcolor: '#ADD8E6',
      routeScreen: 'NumberUpdation',
    },
    {
      key: '2',
      icon: <AntDesign name="contacts" size={34} />,
      title: 'Important Phone Number',
      bgcolor: '#FFC0CB',
      routeScreen: 'ImportantNumber',
    },
    {
      key: '3',
      icon: <AntDesign name="youtube" size={34} />,
      title: 'Training Reels',
      bgcolor: '#98FB98',
      routeScreen: 'TrainingReels',
    },
    {
      key: '4',
      icon: <SimpleLineIcons name="book-open" size={34} />,
      title: 'Terms and Conditions',
      bgcolor: '#ffb29a',
      routeScreen: 'TermOfUse',
    },
    {
      key: '5',
      icon: <FontAwesome name="bank" size={34} />,
      title: 'Bank Details',
      bgcolor: '#FFDAB9',
      routeScreen: 'BankDetail',
    },
    {
      key: '6',
      icon: <MaterialIcons name="request-page" size={34} />,
      title: 'Price Change Request',
      bgcolor: '#FFB6C1',
      routeScreen: 'PriceChangeReq',
    },
    {
      key: '7',
      icon: <MaterialCommunityIcons name="form-select" size={34} />,
      title: 'Download Form 16A',
      bgcolor: '#FFFFE0',
      routeScreen: 'Form16',
    },
    {
      key: '8',
      icon: <Feather name="file" size={34} />,
      title: 'Pay Slip',
      bgcolor: '#FFFF99',
      routeScreen: 'PaySlip',
    },
    {
      key: '9',
      icon: <Feather name="users" size={34} />,
      title: 'Membership',
      bgcolor: '#ffb29a',
      routeScreen: 'Membership',
    },
  ];

  const Item = ({icon, title, bgcolor, routeScreen}) => (
    <TouchableOpacity onPress={() => navigation.navigate(routeScreen)}>
      <View
        style={{
          borderWidth: 0.7,
          width: width / 3.2,
          height: 130,
          margin: 1.2,
          borderRadius: 10,
          alignItems: 'center',
          //justifyContent: 'center',
          paddingTop: 20,
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 1,
            borderWidth: 0.7,
            width: 50,
            height: 50,
            borderRadius: 25,
            marginBottom: 10,
            alignSelf: 'center',
            backgroundColor: bgcolor,
          }}>
          {icon}
        </View>
        <Text
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: '#000',
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => (
    <Item
      icon={item.icon}
      title={item.title}
      bgcolor={item.bgcolor}
      routeScreen={item.routeScreen}
    />
  );

  const handleLogout = async () => {
    try {
      // Clear the authentication-related AsyncStorage data
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('role');
      // Clear the user data in your context
      setUserId(null);
      navigation.navigate('LogIn');
    } catch (error) {
      Alert.alert('Error', 'Failed to logout');
    }
  };

  const onClose = () => {
    setIsVisible(!isVisible);
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
      }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        numColumns={3}
        contentContainerStyle={styles.gridContainer}
      />
      <TouchableOpacity
        style={styles.stickyButton}
        onPress={() => setIsVisible(true)}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      <LogoutPopup
        isVisible={isVisible}
        onClose={onClose}
        handleLogout={handleLogout}
      />
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  stickyButton: {
    position: 'absolute',
    bottom: 10, // Adjust bottom value as needed
    left: 20, // Adjust left value as needed
    right: 20, // Adjust right value as needed
    backgroundColor: Colors.buttonBackground,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
