import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../utils/Colors';
const HoroscopeData = ({data}) => {
  return (
    <View style={{marginTop: 20, marginBottom: 20}}>
      <Text
        style={{
          alignItems: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          fontSize: 19,
          fontWeight: 'bold',
          color: '#737373',
        }}>
        Daily Horoscope {Object.keys(data).length > 0 && data.zodiac}
      </Text>

      <View style={[styles.dataContainer, {backgroundColor: '#ffe7e7'}]}>
        <View style={{flexDirection: 'row', gap: 5}}>
          <Icons name="family-restroom" size={19} color={'#00bfff'} />
          <Text style={styles.title}>Your Horoscope</Text>
        </View>
        <View style={{marginTop: 10, gap: 10}}>
          {Object.keys(data).length > 0 && (
            <>
              <Text
                style={{color: Colors.black8, fontWeight: 500, fontSize: 15}}>
                Total Score: {data?.bot_response?.total_score?.score}
              </Text>
              <Text style={styles.dailyData}>
                {data?.bot_response?.total_score?.split_response}
              </Text>
            </>
          )}
        </View>
      </View>
      {/* /Status */}
      <View style={[styles.dataContainer, {backgroundColor: '#ffe7e7'}]}>
        <View style={{flexDirection: 'row', gap: 5}}>
          <Icons name="family-restroom" size={19} color={'#00bfff'} />
          <Text style={styles.title}>Status</Text>
        </View>
        <View style={{marginTop: 10, gap: 10}}>
          {Object.keys(data).length > 0 && (
            <>
              <Text style={{color: Colors.grey2}}>
                Score: {data?.bot_response?.status?.score}
              </Text>
              <Text style={styles.dailyData}>
                {data?.bot_response?.status?.split_response}
              </Text>
            </>
          )}
        </View>
      </View>

      {/* /Relationship */}
      <View style={[styles.dataContainer, {backgroundColor: '#ffe7e7'}]}>
        <View style={{flexDirection: 'row', gap: 5}}>
          <Icons name="family-restroom" size={19} color={'#00bfff'} />
          <Text style={styles.title}>Family</Text>
        </View>
        <View style={{marginTop: 10, gap: 10}}>
          {Object.keys(data).length > 0 && (
            <>
              <Text style={{color: Colors.grey2}}>
                Score: {data?.bot_response?.family?.score}
              </Text>
              <Text style={styles.dailyData}>
                {data?.bot_response?.family?.split_response}
              </Text>
            </>
          )}
        </View>
      </View>

      <View style={[styles.dataContainer, {backgroundColor: '#eeeafa'}]}>
        <View style={{flexDirection: 'row', gap: 5}}>
          <FontAwesome name="money" size={18} color={'#009f00'} />
          <Text style={styles.title}>Friends</Text>
        </View>
        <View style={{marginTop: 10, gap: 10}}>
          {Object.keys(data).length > 0 && (
            <>
              <Text style={{color: Colors.grey2}}>
                Score: {data?.bot_response?.friends?.score}
              </Text>
              <Text style={styles.dailyData}>
                {data?.bot_response?.friends?.split_response}
              </Text>
            </>
          )}
        </View>
      </View>

      {/* Love */}
      <View style={[styles.dataContainer, {backgroundColor: '#ebd2d2'}]}>
        <View style={{flexDirection: 'row', gap: 5}}>
          <FontAwesome name="heart" size={18} color={'#b30000'} />
          <Text style={styles.title}>Relationship</Text>
        </View>
        <View style={{marginTop: 10, gap: 10}}>
          {Object.keys(data).length > 0 && (
            <>
              <Text style={{color: Colors.grey2}}>
                Score: {data?.bot_response?.relationship?.score}
              </Text>
              <Text style={styles.dailyData}>
                {data?.bot_response?.relationship?.split_response}
              </Text>
            </>
          )}
        </View>
      </View>

      {/* Career */}
      <View style={[styles.dataContainer, {backgroundColor: '#f5fff5'}]}>
        <View style={{flexDirection: 'row', gap: 5}}>
          <MaterialCommunityIcons
            name="book-education"
            size={19}
            color={'#ff6767'}
          />
          <Text style={styles.title}>Career</Text>
        </View>
        <View style={{marginTop: 10, gap: 10}}>
          {Object.keys(data).length > 0 && (
            <>
              <Text style={{color: Colors.grey2}}>
                Score: {data?.bot_response?.career?.score}
              </Text>
              <Text style={styles.dailyData}>
                {data?.bot_response?.career?.split_response}
              </Text>
            </>
          )}
        </View>
      </View>

      <View style={[styles.dataContainer, {backgroundColor: '#a2c6d0'}]}>
        <View style={{flexDirection: 'row', gap: 5}}>
          <Icons name="flight" size={19} color={'#00bfff'} />
          <Text style={styles.title}>Health</Text>
        </View>
        <View style={{marginTop: 10, gap: 10}}>
          {Object.keys(data).length > 0 && (
            <>
              <Text style={{color: Colors.grey2}}>
                Score: {data?.bot_response?.health?.score}
              </Text>
              <Text style={styles.dailyData}>
                {data?.bot_response?.health?.split_response}
              </Text>
            </>
          )}
        </View>
      </View>
      {/* health */}
      <View style={[styles.dataContainer, {backgroundColor: '#ebebff'}]}>
        <View style={{flexDirection: 'row', gap: 5}}>
          <Icons name="health-and-safety" size={19} color={'blue'} />
          <Text style={styles.title}>Physique</Text>
        </View>
        <View style={{marginTop: 10, gap: 10}}>
          {Object.keys(data).length > 0 && (
            <>
              <Text style={{color: Colors.grey2}}>
                Score: {data?.bot_response?.physique?.score}
              </Text>
              <Text style={styles.dailyData}>
                {data?.bot_response?.physique?.split_response}
              </Text>
            </>
          )}
        </View>
      </View>

      {/* Money */}
      <View style={[styles.dataContainer, {backgroundColor: '#eeeafa'}]}>
        <View style={{flexDirection: 'row', gap: 5}}>
          <FontAwesome name="money" size={18} color={'#009f00'} />
          <Text style={styles.title}>Money</Text>
        </View>
        <View style={{marginTop: 10, gap: 10}}>
          {Object.keys(data).length > 0 && (
            <>
              <Text style={{color: Colors.grey2}}>
                Score: {data?.bot_response?.finances?.score}
              </Text>
              <Text style={styles.dailyData}>
                {data?.bot_response?.finances?.split_response}
              </Text>
            </>
          )}
        </View>
      </View>

      {/* Travel */}

      <View style={[styles.dataContainer, {backgroundColor: '#a2c6d0'}]}>
        <View style={{flexDirection: 'row', gap: 5}}>
          <Icons name="flight" size={19} color={'#00bfff'} />
          <Text style={styles.title}>Travel</Text>
        </View>
        <View style={{marginTop: 10, gap: 10}}>
          {Object.keys(data).length > 0 && (
            <>
              <Text style={{color: Colors.grey2}}>
                Score: {data?.bot_response?.travel?.score}
              </Text>
              <Text style={styles.dailyData}>
                {data?.bot_response?.travel?.split_response}
              </Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default HoroscopeData;

const styles = StyleSheet.create({
  dataContainer: {
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    alignContent: 'center',
    marginHorizontal: '2%',
    marginVertical: '1.5%',
    padding: 6,
  },
  title: {
    color: '#000',
    fontWeight: '500',
    fontSize: 16,
    marginTop: -2.1,
  },
  dailyData: {
    color: '#000',
    fontSize: 15,
    fontWeight: '400',
  },
});
