import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BackButtonHandler from '../../components/BackButtonHandler/BackButtonHandler';
import {Colors} from '../../utils/Colors';

const Mahadasha = ({dashaDetail}) => {
  const data = [
    ['Dasha Remaining at birth', dashaDetail?.dasha_remaining_at_birth],
  ];

  return (
    <BackButtonHandler>
      <View
        style={{
          flexDirection: 'row',
          // justifyContent: 'space-evenly',
          marginTop: 20,
          paddingHorizontal: 10,
        }}>
        <Text style={styles.heading}>Dasha Remaining at Birth </Text>
        <Text style={styles.subHeading}>
          {dashaDetail?.dasha_remaining_at_birth}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          // justifyContent: 'space-evenly',
          marginTop: 10,
          paddingHorizontal: 10,
        }}>
        <Text style={styles.heading}>Dasha Start Date </Text>
        <Text style={styles.subHeading}>{dashaDetail?.dasha_start_date}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          // justifyContent: 'space-evenly',
          marginTop: 10,
          paddingHorizontal: 10,
        }}>
        <Text style={styles.heading}>Mahadasha</Text>
        <View style={styles.subHeading}>
          {dashaDetail?.mahadasha?.map((item, i) => {
            return (
              <Text
                key={i}
                style={{color: Colors.green, fontSize: 16, marginBottom: 2}}>
                {item}
              </Text>
            );
          })}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          // justifyContent: 'space-evenly',
          marginTop: 10,
          paddingHorizontal: 10,
        }}>
        <Text style={styles.heading}>Mahadasha Order</Text>
        <View style={styles.subHeading}>
          {dashaDetail?.mahadasha_order?.map((item, i) => {
            return (
              <Text
                style={{color: Colors.green, fontSize: 16, marginBottom: 2}}>
                {item}
              </Text>
            );
          })}
        </View>
      </View>
    </BackButtonHandler>
  );
};

export default Mahadasha;

const styles = StyleSheet.create({
  heading: {
    color: Colors.black8,
    fontSize: 16,
    flex: 1,
  },
  subHeading: {
    color: Colors.green,
    fontSize: 16,
    textAlign: 'justify',
    width: '55%',
  },
  item: {
    color: Colors.green,
    fontSize: 16,
    width: '55%',
    textAlign: 'justify',
  },
});
