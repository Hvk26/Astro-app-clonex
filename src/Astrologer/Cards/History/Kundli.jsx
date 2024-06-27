import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {Checkbox} from 'react-native-paper';
import {Colors} from '../../../utils/Colors';
import BackButtonHandler from '../../../components/BackButtonHandler/BackButtonHandler';

const Kundli = () => {
  const route = useRoute();
  const data = route.params.data;
  const [checked, setChecked] = React.useState(false);

  console.log(data);

  useEffect(() => {});
  return (
    <BackButtonHandler>
      <View
        style={{
          marginTop: 10,
          borderWidth: 0.7,
          marginHorizontal: 10,
          borderColor: Colors.grey4,
          elevation: -3,
          borderRadius: 15,
          height: '15%',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: 'row',
            gap: 10,
            paddingHorizontal: 5,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Image
              source={{uri: data.profilePic}}
              style={{height: 60, width: 60}}
            />
          </View>
          <View
            style={{flexDirection: 'column', gap: 4, justifyContent: 'center'}}>
            <Text style={{color: Colors.black7, fontWeight: '500'}}>
              {data.name}
            </Text>
            <Text style={{color: Colors.grey2}}>
              {data.gender} | {data.dob} | {data.tob}
            </Text>
            <Text style={{color: Colors.grey2}}>{data.pob}</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 12,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 10,
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <View>
                <Feather
                  name="edit"
                  size={22}
                  onPress={() => {
                    Alert.alert('Unable to Display Information');
                  }}
                  color={Colors.grey2}
                />
              </View>

              <View style={{}}>
                <Checkbox
                  //size="large"
                  style={{width: 30, height: 30, color: Colors.grey2}}
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
              </View>
            </View>
            <View>
              <Text
                onPress={() => {
                  Alert.alert('Unable to Display Information');
                }}
                style={{
                  color: Colors.pink1,
                  textDecorationLine: 'underline',
                  fontSize: 16,
                }}>
                View Kundli
              </Text>
            </View>
          </View>
        </View>
      </View>
    </BackButtonHandler>
  );
};

export default Kundli;

const styles = StyleSheet.create({});
