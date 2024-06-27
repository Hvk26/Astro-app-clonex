import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
const TimeTable = () => {
  return (
    <View>
      <TouchableOpacity
        style={{
          marginTop: 10,
          borderWidth: 0.3,
          borderColor: Colors.grey4,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          elevation: 1,
          paddingVertical: 10,
          backgroundColor: Colors.title2,
          flexDirection: 'row',
          borderRadius: 15,
          height: 70,
        }}>
        <Ionicons
          name="calendar-number-outline"
          size={40}
          color={Colors.black7}
        />
        <Text style={{color: Colors.black7, fontSize: 18, fontWeight: '500'}}>
          Weekly Time-Table
        </Text>
        <Ionicons
          name="chevron-forward-outline"
          size={40}
          color={Colors.black7}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TimeTable;

const styles = StyleSheet.create({});
