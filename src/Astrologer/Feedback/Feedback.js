import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';
import {Button} from 'react-native-paper';

const Feedback = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 10,
        marginVertical: 10,
        borderWidth: 0.7,
        borderColor: Colors.grey3,
        borderRadius: 15,
      }}>
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 10,
          marginTop: 10,

          backgroundColor: Colors.title2,
          borderRadius: 20,
        }}>
        <Text
          style={{
            flex: 1,
            color: Colors.black7,
            fontSize: 16,
            fontWeight: '500',
          }}>
          Feedback to Admin!
        </Text>
        <Text style={{flex: 1, color: Colors.grey2, fontSize: 14}}>
          Please Share your honest feedback to help us improve
        </Text>
        <TextInput
          placeholder="Write here..."
          placeholderTextColor={'#000'}
          multiline={true}
          numberOfLines={7}
          style={{
            backgroundColor: '#fff',
            borderRadius: 20,
            marginTop: 10,
            textAlignVertical: 'top',
            paddingHorizontal: 10,
            color: Colors.black7,
          }}
        />
        <Button
          textColor="#fff"
          mode="contained"
          style={{marginTop: 15, width: 200, alignSelf: 'center'}}
          buttonColor="#000">
          Submit
        </Button>
      </View>
    </View>
  );
};

export default Feedback;

const styles = StyleSheet.create({});
