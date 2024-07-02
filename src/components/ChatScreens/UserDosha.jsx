import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import KeyCenter from '../../utils/KeyCenter';
import BackButtonHandler from '../BackButtonHandler/BackButtonHandler';
import {Colors} from '../../utils/Colors';
import axios from 'axios';
import Mahadasha from '../../Services/Dasha/Mahadasha';
import MahadashaPrediction from '../../Services/Dasha/MahadashaPrediction';
import ChardashaS from '../../Services/Dasha/ChardashaS';
import ChardashaC from '../../Services/Dasha/ChardashaC';
import Antardasha from '../../Services/Dasha/Antardasha';
import MahadashaF from '../../Services/Dasha/MahadashaF';

const {width} = Dimensions.get('screen');

const UserDosha = () => {
  const route = useRoute();
  const data = route.params;
  const API_KEY = KeyCenter.vedicastroapi.API_KEY;
  const [dashaType, setDashaType] = useState('maha-dasha');
  const [dashaDetail, setDashaDetail] = useState({});
  const [language, setLanguage] = useState('en');

  const url = `https://api.vedicastroapi.com/v3-json/dashas/${dashaType}?dob=${data.dob}&tob=${data.timeOfBirth}&lat=${data.lat}&lon=${data.long}&tz=5.5&api_key=${API_KEY}&lang=${language}`;

  const dashas = [
    {
      key: '1',
      name: 'Mahadasha',
      endpoint: 'maha-dasha',
    },
    {
      key: '2',
      name: 'Mahadasha Pridictions',
      endpoint: 'maha-dasha-predictions',
    },
    {
      key: '3',
      name: 'Chardasha Current',
      endpoint: 'char-dasha-current',
    },

    {
      key: '5',
      name: 'Chardasha Sub',
      endpoint: 'char-dasha-sub',
    },
    {
      key: '6',
      name: 'Antardasha',
      endpoint: 'antar-dasha',
    },

    {
      key: '7',
      name: 'Mahadasha Full',
      endpoint: 'current-mahadasha-full',
    },
    // {
    //   key: '8',
    //   name: 'Paryantar Dasha',
    //   endpoint: 'paryantar-dasha',
    // },
    // {
    //   key: '9',
    //   name: 'Specific Sub Dasha',
    //   endpoint: 'specific-sub-dasha',
    // },
    // {
    //   key: '10',
    //   name: 'Yogini Dasha',
    //   endpoint: 'yogini-dasha-main',
    // },
    // {
    //   key: '11',
    //   name: 'Yogini Dasha Sub',
    //   endpoint: 'yogini-dasha-sub',
    // },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}`);
        if (response) {
          setDashaDetail(response.data.response);
        } else {
          setDashaDetail([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dashaType]);

  console.log('>>>>>>>>>>>>>>>>>>>>>>', url);
  return (
    <BackButtonHandler>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 10,
            marginTop: 20,
            marginBottom: 10,
          }}>
          {dashas.map((dasha, i) => {
            return (
              <TouchableOpacity
                onPress={() => setDashaType(dasha.endpoint)}
                key={i}
                style={{
                  marginRight: 10,
                  paddingHorizontal: 14,
                  borderColor: Colors.black7,
                  borderRadius: 10,
                  backgroundColor: Colors.buttonBackground,
                  height: 30,
                  paddingTop: 3,
                }}>
                <Text
                  style={{
                    color: Colors.black8,
                    fontSize: 16,
                    textAlign: 'center',
                  }}>
                  {dasha.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <View>
        {dashaType == 'maha-dasha' && <Mahadasha dashaDetail={dashaDetail} />}
      </View>
      <View>
        {dashaType == 'maha-dasha-predictions' && (
          <MahadashaPrediction dashaDetail={dashaDetail?.dashas} />
        )}
      </View>
      <View>
        {dashaType == 'char-dasha-current' && (
          <ChardashaC dashaDetail={dashaDetail} />
        )}
      </View>
      <View>
        {dashaType == 'char-dasha-sub' && dashaDetail && (
          <ChardashaS dashaDetail={dashaDetail} />
        )}
      </View>
      <View>
        {dashaType == 'antar-dasha' && dashaDetail && (
          <Antardasha dashaDetail={dashaDetail} />
        )}
      </View>
      <View>
        {dashaType == 'current-mahadasha-full' && dashaDetail && (
          <MahadashaF dashaDetail={dashaDetail} />
        )}
      </View>
    </BackButtonHandler>
  );
};

export default UserDosha;

const styles = StyleSheet.create({
  heading: {
    color: Colors.black8,
    fontSize: 16,
    flex: 1,
  },
  subHeading: {
    color: Colors.green,
    fontSize: 16,
    textAlign: 'justify',
    width: '55%',
  },
  item: {
    color: Colors.green,
    fontSize: 16,
    width: '55%',
    textAlign: 'justify',
  },
});
