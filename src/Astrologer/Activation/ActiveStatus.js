import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';
import {Switch} from 'react-native-paper';
const ActiveStatus = () => {
  return (
    <View style={styles.container}>
      {/* heading */}
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <Text style={[styles.contentHeading, {paddingLeft: 12}]}>Type</Text>
        <Text style={[styles.contentHeading, {}]}>Status</Text>
        <Text style={styles.contentHeading}>Next Online Time</Text>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 15,
        }}>
        {/* Type */}
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              marginBottom: 10,
              alignItems: 'center',
            }}>
            <Text style={styles.contentHeading}>Chat</Text>
            <Text style={{color: Colors.grey2, fontSize: 12}}>India </Text>
          </View>

          <View
            style={{
              marginBottom: 10,
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <Text style={styles.contentHeading}>Call</Text>
            <Text style={{color: Colors.grey2, fontSize: 12}}>India </Text>
          </View>
          <View
            style={{
              marginBottom: 10,
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.contentHeading}>Video Call</Text>
            <Text style={{color: Colors.grey2, fontSize: 12}}>India </Text>
          </View>
        </View>

        {/* Status */}
        <View style={{alignItems: 'center', gap: 18}}>
          <Switch
            style={{
              marginBottom: 10,
              alignContent: 'center',
              alignItems: 'center',
            }}
          />
          <Switch
            style={{
              marginBottom: 10,
              alignContent: 'center',
              alignItems: 'center',
            }}
          />
          <Switch
            style={{
              marginBottom: 10,
              alignContent: 'center',
              alignItems: 'center',
            }}
          />
        </View>

        {/* Time */}
        <View style={{alignItems: 'center', gap: 25, marginTop: 0}}>
          <View
            style={{
              borderWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 10,
            }}>
            <Text style={{color: Colors.black7, fontWeight: '500'}}>
              12 Oct , 10:30PM
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 10,
            }}>
            <Text style={{color: Colors.black7, fontWeight: '500'}}>
              12 Oct , 10:30PM
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 10,
            }}>
            <Text style={{color: Colors.black7, fontWeight: '500'}}>
              12 Oct , 10:30PM
            </Text>
          </View>
        </View>
      </View>

      {/* <View style={styles.content}>
        <Text style={styles.contentHeading}>Type</Text>
        <Text style={styles.contentHeading}>Status</Text>
        <Text style={styles.contentHeading}>Next Online Time</Text>
      </View>

      <View style={styles.content}>
        <View
          style={{flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
          <Text style={styles.contentHeading}>Chat</Text>
          <Text>
            India <Text>₹ 12.0</Text>
          </Text>
        </View>

        <Switch />
        <View>
          <Text>12 Oct 23, 10:30 PM</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View
          style={{flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
          <Text style={styles.contentHeading}>Call</Text>
          <Text>
            India <Text>₹ 12.0</Text>
          </Text>
        </View>

        <Switch style={{alignSelf: 'center', flex: 1}} />
        <View>
          <Text>12 Oct 23, 10:30 PM</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View
          style={{flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
          <Text style={styles.contentHeading}>Video Call</Text>
          <Text>
            India <Text>₹ 12.0</Text>
          </Text>
        </View>

        <Switch />
        <View>
          <Text>12 Oct 23, 10:30 PM</Text>
        </View>
      </View> */}
    </View>
  );
};

export default ActiveStatus;

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.7,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
    borderColor: Colors.grey5,
    flex: 1,
    marginBottom: 20,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  contentHeading: {
    color: Colors.black7,
    fontSize: 16,
    fontWeight: '500',
  },
});
