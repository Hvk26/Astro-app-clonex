import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Service_URL from '../../utils/Constant';
import axios from 'axios';
import {Button} from 'react-native-paper';
import {Colors} from '../../utils/Colors';
import BackButtonHandler from '../BackButtonHandler/BackButtonHandler';
import KeyCenter from '../../utils/KeyCenter';
import Svg, {SvgXml} from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
const {width} = Dimensions.get('screen');
//import Svg, {Image} from 'react-native-svg';
const UsersAstrologyDetails = () => {
  const route = useRoute();
  const id = route.params.recipientId;
  const [error, setError] = useState('');
  const [userData, setUserData] = useState({});
  const [svgData, setSvgData] = useState('');
  const [chartType, setChartType] = useState('D1');
  const API_KEY = KeyCenter.vedicastroapi.API_KEY;

  const navigation = useNavigation();
  // console.log('id', id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Service_URL}/userInfo/${id}`);
        const data = response.data;

        if (!data) {
          setError('User not found');
        } else {
          setUserData(data.userDetail);
          setError(null);
        }
      } catch (error) {
        setError('Error fetching user information');
      }
    };
    fetchData();
    getKundali();
  }, []);

  const url = `https://api.vedicastroapi.com/v3-json/horoscope/chart-image?dob=11/03/1994&tob=11:40&lat=11.76&lon=77.45&tz=5.5&div=${chartType}&color=%23fff&style=north&api_key=${API_KEY}&lang=en&font_size=20&font_style=roboto&colorful_planets=0&size=${width}&stroke=2&format=utf8`;
  const getKundali = async () => {
    try {
      const response = await axios.get(`${url}`);
      if (response) {
        setSvgData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!svgData) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  // console.log(svgData);
  const divisions = [
    {
      key: '1',
      name: 'Lagna Chart',
      endpoint: 'D1',
    },
    {
      key: '2',
      name: 'Dreshkana Chart',
      endpoint: 'D3',
    },
    {
      key: '3',
      name: 'Somanatha Chart',
      endpoint: 'D3-s',
    },
    {
      key: '4',
      name: 'Saptamsa Chart',
      endpoint: 'D7',
    },
    {
      key: '5',
      name: 'Navamsa Chart',
      endpoint: 'D9',
    },

    {
      key: '7',
      name: 'Dasamsa Chart',
      endpoint: 'D10',
    },
    {
      key: '8',
      name: 'Dwadasamsa Chart',
      endpoint: 'D12',
    },
    {
      key: '9',
      name: 'Shodashamsha Chart',
      endpoint: 'D16',
    },
    {
      key: '10',
      name: 'Vimsamsa',
      endpoint: 'D20',
    },
    {
      key: '11',
      name: 'Vimsamsa',
      endpoint: 'D20',
    },
    {
      key: '12',
      name: 'ChaturVishamsha',
      endpoint: 'D24',
    },
    {
      key: '13',
      name: 'Trishamsha',
      endpoint: 'D30',
    },
    {
      key: '14',
      name: 'KhaVedamsha',
      endpoint: 'D40',
    },
    {
      key: '15',
      name: 'AkshaVedamsha',
      endpoint: 'D45',
    },
    {
      key: '16',
      name: 'Shastiamsha',
      endpoint: 'D60',
    },
    {
      key: '17',
      name: 'Bhav-chalit',
      endpoint: 'chalit',
    },
    {
      key: '18',
      name: 'Moon Chart',
      endpoint: 'moon',
    },
    {
      key: '19',
      name: 'Sun Chart',
      endpoint: 'sun',
    },
  ];

  return (
    <BackButtonHandler>
      <TouchableOpacity
        onPress={() => navigation.navigate('UserDosha', userData)}
        style={{
          backgroundColor: Colors.buttonBackground,
          marginTop: 20,
          marginHorizontal: 20,
          paddingVertical: 4,
          paddingHorizontal: 20,
          borderRadius: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: Colors.black8,
            fontSize: 17,
            fontWeight: '500',
          }}>
          Kundali Dosha
        </Text>
        <AntDesign name="right" size={24} color={Colors.black8} />
      </TouchableOpacity>
      {/* <View
        style={{
          borderWidth: 0.7,
          borderColor: Colors.grey2,
          backgroundColor: Colors.title2,
          paddingHorizontal: 15,
          paddingVertical: 15,
          marginHorizontal: 10,
          marginTop: 15,
        }}>
        <Text>Name: {userData?.userDetail?.name}</Text>
        <Text>Name: {userData?.userDetail?.dob}</Text>
        <Text>Name: </Text>
        <Text>Name: </Text>
      </View> */}

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 10,
            marginTop: 20,
            marginBottom: 10,
          }}>
          {divisions.map((div, i) => {
            return (
              <TouchableOpacity
                onPress={() => setChartType(div.endpoint)}
                key={i}
                style={{
                  borderWidth: 1,
                  marginRight: 10,
                  paddingVertical: 5,
                  paddingHorizontal: 12,
                  borderColor: Colors.black7,
                  borderRadius: 10,
                  backgroundColor: Colors.black7,
                }}>
                <Text style={{color: '#fff', fontSize: 15}}>{div.name}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
          alignSelf: 'center',
        }}>
        {svgData ? (
          <SvgXml xml={svgData} width={width} height="100%" />
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </BackButtonHandler>
  );
};

export default UsersAstrologyDetails;

const styles = StyleSheet.create({
  container: {
    width: width - 7,
    alignSelf: 'center',
    marginTop: 10,
    alignContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textDecorationLine: 'underline',
    textDecorationColor: '#000',
  },

  button: {
    backgroundColor: '#4d4dff',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4d4dff',
  },
  text: {
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 5,
    color: '#000',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize: 16,
  },
});
