import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../../../utils/Colors';

const ImportantNumbers = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
        paddingHorizontal: 10,
      }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '500',
          textDecorationLine: 'underline',
          color: Colors.black8,
          marginBottom: 10,
        }}>
        Contact Us
      </Text>
      <Text
        style={{
          fontSize: 15,
          fontWeight: '400',
          marginBottom: 10,
          color: Colors.black8,
        }}>
        We are available 24 hrs for you
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 15,
          fontWeight: '400',
          color: Colors.grey2,
        }}>
        If you have any further questions or queries please do not hesitate to
        get in touch
      </Text>
      <View
        style={{
          flexDirection: 'row',
          gap: 20,
          paddingTop: 20,
        }}>
        <Text
          style={{
            color: Colors.grey2,
            fontSize: 16,
            fontWeight: '500',
            textDecorationLine: 'underline',
          }}>
          Support:
        </Text>
        <Text style={{color: Colors.black8}}>(+91) 955 444 5866</Text>
      </View>
    </View>
  );
};

export default ImportantNumbers;

const styles = StyleSheet.create({});
