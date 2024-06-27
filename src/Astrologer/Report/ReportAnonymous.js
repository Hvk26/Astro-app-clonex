import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
const ReportAnonymous = () => {
  return (
    <View>
      <TouchableOpacity
        style={{
          marginTop: 10,
          borderWidth: 0.2,
          borderColor: Colors.grey4,
          flex: 1,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          elevation: 1,
          paddingVertical: 10,
          backgroundColor: Colors.title2,
          flexDirection: 'row',
          borderRadius: 15,
          height: 70,
        }}>
        <View style={{flex: 1}}>
          <Text style={{color: Colors.black8, fontSize: 16}}>
            Report an Astrologer
          </Text>
          <Text style={{color: Colors.grey2, fontSize: 13}}>
            If any astrologer violates our policies, please complaint
            anonymously
          </Text>
        </View>
        <Ionicons
          name="chevron-forward-outline"
          size={40}
          color={Colors.black7}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ReportAnonymous;

const styles = StyleSheet.create({});
