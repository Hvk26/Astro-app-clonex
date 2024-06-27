import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../utils/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const FrontIcons = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        marginTop: 20,
        marginBottom: 65,
        marginHorizontal: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View style={styles.titleContainer}>
        <Pressable
          // onPress={() => navigation.navigate('DailyHoroscope')}
          style={styles.imageContainer}>
          <FontAwesome6 name="clipboard-user" size={45} color={Colors.black8} />
        </Pressable>
        <Text style={styles.textHeading}> Verified </Text>
        <Text style={styles.textHeading}>Astrologers</Text>
      </View>

      <View style={styles.titleContainer}>
        <Pressable
          //onPress={() => navigation.navigate('BirthChart')}
          style={styles.imageContainer}>
          <FontAwesome5
            name="hand-holding-usd"
            size={45}
            color={Colors.black8}
            style={{alignSelf: 'center'}}
          />
        </Pressable>
        <Text style={styles.textHeading}> Secure </Text>
        <Text style={styles.textHeading}>Payments</Text>
      </View>
      <View style={styles.titleContainer}>
        <Pressable
          //onPress={() => navigation.navigate('KundliMatch')}
          style={styles.imageContainer}>
          <MaterialCommunityIcons
            name="shield-lock-outline"
            size={50}
            color={Colors.black8}
          />
        </Pressable>
        <Text style={styles.textHeading}> Private & </Text>
        <Text style={styles.textHeading}>Confidential</Text>
      </View>
    </View>
  );
};

export default FrontIcons;

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: Colors.grey1,
    padding: 7,
    margin: 5,
    borderRadius: 50,
    height: 80,
    width: 80,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {height: 60, width: 60},
  titleContainer: {
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textHeading: {
    fontSize: 14,
    color: Colors.black7,
  },
  counterContainer: {
    alignContent: 'center',
    alignItems: 'center',
    gap: -10,
    marginBottom: 15,
  },
  counterText: {
    fontSize: 15,
    color: '#fff',
    // fontFamily: 'Poppins-Italic',
    fontWeight: '500',
  },
  counterNumber: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
  },
});
