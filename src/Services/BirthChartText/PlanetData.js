import {StyleSheet, Text, View} from 'react-native';
import React, {Fragment} from 'react';
import {Colors} from '../../utils/Colors';
import {Table, Row} from 'react-native-table-component';
import PanchangData from '../PanchangData/PanchangData';

const PlanetData = ({data}) => {
  const length = Object.keys(data).length;

  const details1 = [
    ['Basic Avastha', data[0]?.basic_avastha],
    ['Full Name', data[0]?.full_name],
    ['Global Degree', data[0]?.global_degree],
    ['House', data[0]?.house],
    ['is_combust', data[0]?.is_planet_set ? 'Yes' : 'No'],
    ['Local Degree', data[0]?.is_combust ? 'Yes' : 'No'],
    ['s_planet_set', data[0]?.local_degree],
    ['Lord Status', data[0]?.lord_status],
    ['Nakshatra', data[0]?.nakshatra],
    ['Nakshatra Lord', data[0]?.nakshatra_lord],
    ['Nakshatra Number', data[0]?.nakshatra_no],
    ['Nakshatra Pada', data[0]?.Nakshatra_pada],
    ['Name', data[0]?.name],
    ['Rasi Number', data[0]?.Rasi_no],
    ['Zodiac', data[0]?.zodiac],
    ['Zodiac Lord', data[0]?.zodiac_lord],
  ];
  const details2 = [
    ['Basic Avastha', data[1]?.basic_avastha],
    ['Full Name', data[1]?.full_name],
    ['Global Degree', data[1]?.global_degree],
    ['House', data[1]?.house],
    ['is_combust', data[1]?.is_planet_set ? 'Yes' : 'No'],
    ['Local Degree', data[1]?.is_combust ? 'Yes' : 'No'],
    ['s_planet_set', data[1]?.local_degree],
    ['Lord Status', data[1]?.lord_status],
    ['Nakshatra', data[1]?.nakshatra],
    ['Nakshatra Lord', data[1]?.nakshatra_lord],
    ['Nakshatra Number', data[1]?.nakshatra_no],
    ['Nakshatra Pada', data[1]?.Nakshatra_pada],
    ['Name', data[1]?.name],
    ['Rasi Number', data[1]?.Rasi_no],
    ['Zodiac', data[1]?.zodiac],
    ['Zodiac Lord', data[1]?.zodiac_lord],
  ];

  const details3 = [
    ['Basic Avastha', data[2]?.basic_avastha],
    ['Full Name', data[2]?.full_name],
    ['Global Degree', data[0]?.global_degree],
    ['House', data[2]?.house],
    ['is_combust', data[2]?.is_planet_set ? 'Yes' : 'No'],
    ['Local Degree', data[2]?.is_combust ? 'Yes' : 'No'],
    ['s_planet_set', data[2]?.local_degree],
    ['Lord Status', data[2]?.lord_status],
    ['Nakshatra', data[2]?.nakshatra],
    ['Nakshatra Lord', data[2]?.nakshatra_lord],
    ['Nakshatra Number', data[2]?.nakshatra_no],
    ['Nakshatra Pada', data[2]?.Nakshatra_pada],
    ['Name', data[2]?.name],
    ['Rasi Number', data[2]?.Rasi_no],
    ['Zodiac', data[2]?.zodiac],
    ['Zodiac Lord', data[2]?.zodiac_lord],
  ];
  const details4 = [
    ['Basic Avastha', data[3]?.basic_avastha],
    ['Full Name', data[3]?.full_name],
    ['Global Degree', data[3]?.global_degree],
    ['House', data[3]?.house],
    ['is_combust', data[3]?.is_planet_set ? 'Yes' : 'No'],
    ['Local Degree', data[3]?.is_combust ? 'Yes' : 'No'],
    ['s_planet_set', data[3]?.local_degree],
    ['Lord Status', data[3]?.lord_status],
    ['Nakshatra', data[3]?.nakshatra],
    ['Nakshatra Lord', data[3]?.nakshatra_lord],
    ['Nakshatra Number', data[3]?.nakshatra_no],
    ['Nakshatra Pada', data[3]?.Nakshatra_pada],
    ['Name', data[3]?.name],
    ['Rasi Number', data[3]?.Rasi_no],
    ['Zodiac', data[3]?.zodiac],
    ['Zodiac Lord', data[3]?.zodiac_lord],
  ];
  const details5 = [
    ['Basic Avastha', data[4]?.basic_avastha],
    ['Full Name', data[4]?.full_name],
    ['Global Degree', data[4]?.global_degree],
    ['House', data[4]?.house],
    ['is_combust', data[4]?.is_planet_set ? 'Yes' : 'No'],
    ['Local Degree', data[4]?.is_combust ? 'Yes' : 'No'],
    ['s_planet_set', data[4]?.local_degree],
    ['Lord Status', data[4]?.lord_status],
    ['Nakshatra', data[4]?.nakshatra],
    ['Nakshatra Lord', data[4]?.nakshatra_lord],
    ['Nakshatra Number', data[4]?.nakshatra_no],
    ['Nakshatra Pada', data[4]?.Nakshatra_pada],
    ['Name', data[4]?.name],
    ['Rasi Number', data[4]?.Rasi_no],
    ['Zodiac', data[4]?.zodiac],
    ['Zodiac Lord', data[4]?.zodiac_lord],
  ];
  const details6 = [
    ['Basic Avastha', data[5]?.basic_avastha],
    ['Full Name', data[5]?.full_name],
    ['Global Degree', data[5]?.global_degree],
    ['House', data[5]?.house],
    ['is_combust', data[5]?.is_planet_set ? 'Yes' : 'No'],
    ['Local Degree', data[5]?.is_combust ? 'Yes' : 'No'],
    ['s_planet_set', data[5]?.local_degree],
    ['Lord Status', data[5]?.lord_status],
    ['Nakshatra', data[5]?.nakshatra],
    ['Nakshatra Lord', data[5]?.nakshatra_lord],
    ['Nakshatra Number', data[5]?.nakshatra_no],
    ['Nakshatra Pada', data[5]?.Nakshatra_pada],
    ['Name', data[5]?.name],
    ['Rasi Number', data[5]?.Rasi_no],
    ['Zodiac', data[5]?.zodiac],
    ['Zodiac Lord', data[5]?.zodiac_lord],
  ];
  const details7 = [
    ['Basic Avastha', data[6]?.basic_avastha],
    ['Full Name', data[6]?.full_name],
    ['Global Degree', data[6]?.global_degree],
    ['House', data[6]?.house],
    ['is_combust', data[6]?.is_planet_set ? 'Yes' : 'No'],
    ['Local Degree', data[6]?.is_combust ? 'Yes' : 'No'],
    ['s_planet_set', data[6]?.local_degree],
    ['Lord Status', data[6]?.lord_status],
    ['Nakshatra', data[6]?.nakshatra],
    ['Nakshatra Lord', data[6]?.nakshatra_lord],
    ['Nakshatra Number', data[6]?.nakshatra_no],
    ['Nakshatra Pada', data[6]?.Nakshatra_pada],
    ['Name', data[6]?.name],
    ['Rasi Number', data[6]?.Rasi_no],
    ['Zodiac', data[6]?.zodiac],
    ['Zodiac Lord', data[6]?.zodiac_lord],
  ];
  const details8 = [
    ['Basic Avastha', data[7]?.basic_avastha],
    ['Full Name', data[7]?.full_name],
    ['Global Degree', data[7]?.global_degree],
    ['House', data[7]?.house],
    ['is_combust', data[7]?.is_planet_set ? 'Yes' : 'No'],
    ['Local Degree', data[7]?.is_combust ? 'Yes' : 'No'],
    ['s_planet_set', data[7]?.local_degree],
    ['Lord Status', data[7]?.lord_status],
    ['Nakshatra', data[7]?.nakshatra],
    ['Nakshatra Lord', data[7]?.nakshatra_lord],
    ['Nakshatra Number', data[7]?.nakshatra_no],
    ['Nakshatra Pada', data[7]?.Nakshatra_pada],
    ['Name', data[7]?.name],
    ['Rasi Number', data[7]?.Rasi_no],
    ['Zodiac', data[7]?.zodiac],
    ['Zodiac Lord', data[7]?.zodiac_lord],
  ];
  const details9 = [
    ['Basic Avastha', data[8]?.basic_avastha],
    ['Full Name', data[8]?.full_name],
    ['Global Degree', data[8]?.global_degree],
    ['House', data[8]?.house],
    ['is_combust', data[8]?.is_planet_set ? 'Yes' : 'No'],
    ['Local Degree', data[8]?.is_combust ? 'Yes' : 'No'],
    ['s_planet_set', data[8]?.local_degree],
    ['Lord Status', data[8]?.lord_status],
    ['Nakshatra', data[8]?.nakshatra],
    ['Nakshatra Lord', data[8]?.nakshatra_lord],
    ['Nakshatra Number', data[8]?.nakshatra_no],
    ['Nakshatra Pada', data[8]?.Nakshatra_pada],
    ['Name', data[8]?.name],
    ['Rasi Number', data[8]?.Rasi_no],
    ['Zodiac', data[8]?.zodiac],
    ['Zodiac Lord', data[8]?.zodiac_lord],
  ];
  const details10 = [
    ['Basic Avastha', data[9]?.basic_avastha],
    ['Full Name', data[9]?.full_name],
    ['Global Degree', data[9]?.global_degree],
    ['House', data[9]?.house],
    ['is_combust', data[9]?.is_planet_set ? 'Yes' : 'No'],
    ['Local Degree', data[9]?.is_combust ? 'Yes' : 'No'],
    ['s_planet_set', data[9]?.local_degree],
    ['Lord Status', data[9]?.lord_status],
    ['Nakshatra', data[9]?.nakshatra],
    ['Nakshatra Lord', data[9]?.nakshatra_lord],
    ['Nakshatra Number', data[9]?.nakshatra_no],
    ['Nakshatra Pada', data[9]?.Nakshatra_pada],
    ['Name', data[9]?.name],
    ['Rasi Number', data[9]?.Rasi_no],
    ['Zodiac', data[9]?.zodiac],
    ['Zodiac Lord', data[9]?.zodiac_lord],
  ];

  const panchang = [
    ['Ayanamsa', data.panchang?.ayanamsa],
    ['Day Lord', data.panchang?.day_lord],
    ['Day of Birth', data.panchang?.day_of_birth],
    ['Hora Lord', data.panchang?.hora_lord],
    ['Karana', data.panchang?.karana],
    ['Sunrise At Birth', data.panchang?.sunrise_at_birth],
    ['Sunset At Birth', data.panchang?.sunset_at_birth],
    ['Tithi', data.panchang?.tithi],
    ['Yoga', data.panchang?.yoga],
  ];

  // const gem = data.lucky_gem?.join(', ');
  // const colors = data.lucky_colors?.join(', ');
  // const letters = data.lucky_letters?.join(', ');
  // const name_start = data.lucky_name_start?.join(', ');
  // const lucky_num = data.lucky_num?.join(', ');

  // const birthDetail = [
  //   ['Birth Dasha', data?.birth_dasa],
  //   ['Birth Dasha Time', data?.birth_dasa_time],
  //   ['Current Birth Dasha', data?.current_dasa],
  //   ['Lucky Colors', colors],
  //   ['Lucky Gem', gem],
  //   ['Lucky Letters', letters],
  //   ['Lucky Names', name_start],
  //   ['Lucky Numbers', lucky_num],
  //   ['Nakshatra', data?.nakshatra],
  //   ['Nakshatra Pada', data?.nakshatra_pada],
  // ];

  // console.log(birthDetail);

  return (
    <View>
      {data && (
        <View
          style={{
            marginTop: 10,
            marginBottom: 10,
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}>
          <View style={styles.textContainer}>
            <Text style={styles.heading}>Birth Dasha:</Text>
            <Text style={styles.desc}>{data.birth_dasa}</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.heading}>Birth Dasha Time:</Text>
            <Text style={styles.desc}>{data.birth_dasa_time}</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.heading}>Current Birth Dasha</Text>
            <Text style={styles.desc}>{data.current_dasa}</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.heading}>Current Dasa Time:</Text>
            <Text style={styles.desc}>{data.current_dasa_time}</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.heading}>Lucky Colors:</Text>
            <Text style={styles.desc}>{data.lucky_colors[0]}</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.heading}>Lucky Gem:</Text>
            <Text style={styles.desc}>{data.lucky_gem[0]}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.heading}>Lucky Letters:</Text>
            {data.lucky_letters.map((item, index) => {
              return (
                <Text style={styles.desc} key={index}>
                  {item}
                </Text>
              );
            })}
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.heading}>Lucky Name letters:</Text>

            {data.lucky_name_start.map((item, index) => {
              return (
                <Text style={styles.desc} key={index}>
                  {item}
                </Text>
              );
            })}
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.heading}>Lucky Numbers:</Text>
            {data.lucky_num.map((item, index) => {
              return <Text style={styles.desc}>{item}</Text>;
            })}
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.heading}>Nakshatra:</Text>
            <Text style={styles.desc}>{data.nakshatra}</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.heading}>Nakshatra Pada:</Text>
            <Text style={styles.desc}>{data.nakshatra_pada}</Text>
          </View>
        </View>
      )}
      <View style={{marginTop: 10, marginBottom: 10}}>
        <Text
          style={{
            color: Colors.black7,
            fontSize: 15,
            fontWeight: '500',
            marginBottom: 10,
          }}>
          Birth Details :
        </Text>
        {panchang && <PanchangData data={panchang} />}
      </View>
      <View style={{marginTop: 10, marginBottom: 10}}>
        <Text
          style={{
            color: Colors.black7,
            fontSize: 15,
            fontWeight: '500',
            marginBottom: 10,
          }}>
          Ascendant:
        </Text>
        {details1 && <PanchangData data={details1} />}
      </View>
      <View style={{marginTop: 10}}>
        <Text
          style={{
            color: Colors.black7,
            fontSize: 15,
            fontWeight: '500',
            marginBottom: 10,
          }}>
          Sun:
        </Text>
        {details2 && <PanchangData data={details2} />}
      </View>
      <View style={{marginTop: 10}}>
        <Text
          style={{
            color: Colors.black7,
            fontSize: 15,
            fontWeight: '500',
            marginBottom: 10,
          }}>
          Moon:
        </Text>
        {details3 && <PanchangData data={details3} />}
      </View>
      <View style={{marginTop: 10}}>
        <Text
          style={{
            color: Colors.black7,
            fontSize: 15,
            fontWeight: '500',
            marginBottom: 10,
          }}>
          Mars:
        </Text>
        {details4 && <PanchangData data={details4} />}
      </View>
      <View style={{marginTop: 10}}>
        <Text
          style={{
            color: Colors.black7,
            fontSize: 15,
            fontWeight: '500',
            marginBottom: 10,
          }}>
          Mercury:
        </Text>
        {details5 && <PanchangData data={details5} />}
      </View>
      <View style={{marginTop: 10}}>
        <Text
          style={{
            color: Colors.black7,
            fontSize: 15,
            fontWeight: '500',
            marginBottom: 10,
          }}>
          Jupiter:
        </Text>
        {details5 && <PanchangData data={details6} />}
      </View>
      <View style={{marginTop: 10}}>
        <Text
          style={{
            color: Colors.black7,
            fontSize: 15,
            fontWeight: '500',
            marginBottom: 10,
          }}>
          Venus:
        </Text>
        {details7 && <PanchangData data={details7} />}
      </View>
      <View style={{marginTop: 10}}>
        <Text
          style={{
            color: Colors.black7,
            fontSize: 15,
            fontWeight: '500',
            marginBottom: 10,
          }}>
          Saturn:
        </Text>
        {details8 && <PanchangData data={details8} />}
      </View>
      <View style={{marginTop: 10}}>
        <Text
          style={{
            color: Colors.black7,
            fontSize: 15,
            fontWeight: '500',
            marginBottom: 10,
          }}>
          Rahu:
        </Text>
        {details9 && <PanchangData data={details9} />}
      </View>
    </View>
  );
};

export default PlanetData;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6, color: Colors.black7},
  row: {flexDirection: 'row', backgroundColor: '#FFF1C1'},
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,

    flex: 1,
  },
  heading: {
    color: Colors.black7,
    fontWeight: '400',
    fontSize: 15,
    width: 110,
  },
  desc: {
    color: Colors.grey2,
    fontWeight: '400',
    fontSize: 15,
    flex: 1,
    flexDirection: 'row',
  },
});
