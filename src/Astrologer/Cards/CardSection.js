import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
const {width} = Dimensions.get('screen');
const CardSection = () => {
  const navigation = useNavigation();
  const data = [
    {
      key: '1',
      icon: <Feather name="phone-call" size={30} color={'#000'} />,
      title: 'Call',
      bgcolor: '#ffb29a',
      routeScreen: 'CallHistoty',
    },
    {
      key: '3',
      icon: (
        <Ionicons name="chatbox-ellipses-outline" size={30} color={'#000'} />
      ),
      title: 'Chat',
      bgcolor: '#db7373',
      routeScreen: 'ChatHistoty',
    },
    {
      key: '2',
      icon: <Feather name="file-text" size={30} color={'#000'} />,
      title: 'Report',
      bgcolor: '#a6f1a6',
      routeScreen: 'Report',
    },
    {
      key: '4',
      icon: <Ionicons name="wallet-outline" size={30} color={'#000'} />,
      title: 'Wallet',
      bgcolor: Colors.yellow,
      routeScreen: '',
    },
    {
      key: '5',
      icon: (
        <MaterialCommunityIcons
          name="file-clock-outline"
          size={30}
          color={'#000'}
        />
      ),
      title: 'Waitlist',
      bgcolor: '#b29aff',
      routeScreen: 'Waitlist',
    },
    {
      key: '6',
      icon: (
        <AntDesign name="customerservice" size={30} color={Colors.black7} />
      ),
      title: 'Support',
      bgcolor: '#ff80e0',
      routeScreen: 'ChatSupport',
    },
    {
      key: '7',
      icon: <Feather name="gift" size={30} color={'#000'} />,
      title: 'Offers',
      bgcolor: '#ff794d',
      routeScreen: '',
    },
    {
      key: '8',
      icon: (
        <MaterialCommunityIcons
          name="account-star-outline"
          size={30}
          color={'#000'}
        />
      ),
      title: 'Reviews',
      bgcolor: '#70dc70',
      routeScreen: 'Review',
    },
    {
      key: '9',
      icon: <Feather name="settings" size={30} color={'#000'} />,
      title: 'Settings',
      bgcolor: '#00bfff',
      routeScreen: 'Setting',
    },
  ];
  const Item = ({icon, title, bgcolor, routeScreen}) => (
    <TouchableOpacity
      style={{
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 0.7,
        borderRadius: 12,
        width: width / 3.3,
        height: width / 3.5,
        marginVertical: 2,
        marginHorizontal: 2,
        borderColor: Colors.grey3,
      }}
      onPress={() => navigation.navigate(routeScreen)}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          //paddingHorizontal: 25,
          paddingVertical: 15,
          alignItems: 'center',
          gap: 10,
        }}>
        <View
          style={{
            borderWidth: 1,
            paddingVertical: 6,
            paddingHorizontal: 6,
            borderRadius: 30,
            backgroundColor: bgcolor,
            borderColor: Colors.grey4,
          }}>
          {icon}
        </View>

        <Text
          style={{
            flex: 1,
            alignSelf: 'center',
            color: Colors.black7,
            fontWeight: '500',
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
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        renderItem={renderItem}
        numColumns={3}
        contentContainerStyle={styles.gridContainer}
      />
    </View>
  );
};

export default CardSection;

const styles = StyleSheet.create({
  gridContainer: {
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 90,
    width: 110,
    margin: 10,
    borderRadius: 10,
    elevation: 4,
    borderColor: Colors.primaryYellow,
    borderWidth: 1,
  },
  itemText: {
    fontSize: 15,
    color: Colors.black7,
  },
  balanceText: {
    color: Colors.grey6,
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 1,
  },

  icon: {
    fontSize: 30,
    fontWeight: '600',
    color: Colors.black7,
  },
});
