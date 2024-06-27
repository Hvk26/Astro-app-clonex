import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
const ChatToAssistant = () => {
  return (
    <View style={{}}>
      <TouchableOpacity
        style={{
          marginTop: 10,
          backgroundColor: '#fff',
          borderWidth: 0.3,
          borderColor: Colors.grey4,
          flex: 1,
          backgroundColor: Colors.title2,
          flexDirection: 'row',
          borderRadius: 15,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          elevation: 1,
          paddingVertical: 10,
          height: 70,
        }}>
        <Ionicons
          name="chatbox-ellipses-outline"
          size={40}
          color={Colors.black7}
        />
        <Text style={{color: Colors.black7, fontSize: 16, fontWeight: '500'}}>
          Chat as your own Assistant
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

export default ChatToAssistant;

const styles = StyleSheet.create({});
