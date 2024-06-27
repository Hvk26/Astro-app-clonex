import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Colors} from '../../utils/Colors';

const {width} = Dimensions.get('screen');

const Testimonials = ({data}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollView}>
      {data.map((item, index) => (
        <View key={index} style={styles.card}>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              paddingTop: 10,
              paddingHorizontal: 10,
            }}>
            <Image
              source={require('../../assets/icons/Kundli-2.png')}
              style={{height: 25, width: 25, marginTop: 4}}
            />
            <View style={{gap: -4}}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.city}>{item.city}</Text>
            </View>
          </View>

          <Text
            style={[
              styles.text,
              {paddingHorizontal: 10, marginTop: 10, textAlign: 'justify'},
            ]}>
            {item.text}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: Colors.title2,
    width: width * 0.89,
    paddingHorizontal: 7,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    borderColor: Colors.darkYellow,
    borderWidth: 1.5,
    height: 220,
  },
  name: {
    fontWeight: '500',
    color: Colors.black7,
    marginBottom: 5,
    fontSize: 15,
  },
  city: {
    fontSize: 13,
    color: Colors.black7,
    fontWeight: '400',
    marginBottom: 5,
  },
  text: {
    textAlign: 'justify',
    color: Colors.black7,
  },
});

export default Testimonials;
