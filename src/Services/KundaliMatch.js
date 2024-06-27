import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Table, Row} from 'react-native-table-component';
import BackButtonHandler from '../components/BackButtonHandler/BackButtonHandler';
import {Colors} from '../utils/Colors';
import {Button} from 'react-native-paper';
import {getGeoLocation} from '../utils/apis';
import axios from 'axios';
import Service_URL from '../utils/Constant';
import KeyCenter from '../utils/KeyCenter';
import Kundli from './KundliData/Kundli';
import PanchangData from './PanchangData/PanchangData';
const {width} = Dimensions.get('screen');

const KundaliMatch = () => {
  const [boyDOB, setBoyDOB] = useState('');
  const [boyTOB, setBoyTOB] = useState('');
  const [boyLocation, setBoyLocation] = useState('');

  const [boyLat, setBoyLat] = useState('28.7041');
  const [boyLong, setBoyLong] = useState('77.1025');
  const [girlDOB, setGirlDOB] = useState('');
  const [girlTOB, setGirlTOB] = useState('');
  const [girlLocation, setGirlLocation] = useState('');
  const [girlLat, setGirlLat] = useState('28.7041');
  const [girlLong, setGirlLong] = useState('77.1025');
  const [kundali, setKundali] = useState({});

  const [showData, setShowData] = useState(false);
  const API_KEY = KeyCenter.vedicastroapi.API_KEY;
  //console.log(API_KEY);
  const fetchKundali = async () => {
    try {
      const response = await axios.get(
        `https://api.vedicastroapi.com/v3-json/matching/ashtakoot?boy_dob=${boyDOB}&boy_tob=${boyTOB}&boy_tz=5.5&boy_lat=${boyLat}&boy_lon=${boyLong}&girl_dob=${girlDOB}&girl_tob=${girlTOB}&girl_tz=5.5&girl_lat=${girlLat}&girl_lon=${girlLong}&api_key=${API_KEY}&lang=en`,
      );

      if (response.status === 200) {
        setKundali(response.data.response);
        setShowData(true);
      } else {
        Alert.alert('Error', 'Failed to fetch data');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to fetch data');
    }
  };

  // useEffect(() => {
  //   const fetchBoyLocation = async () => {
  //     try {
  //       const locationData = await getGeoLocation(boyLocation);
  //       if (
  //         locationData &&
  //         locationData.response &&
  //         locationData.response.length > 0
  //       ) {
  //         setBoyLat(locationData.response[0].coordinates[0]);
  //         setBoyLong(locationData.response[0].coordinates[1]);
  //       } else {
  //         Alert.alert('No City Found');
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       Alert.alert('Error fetching location data');
  //     }
  //   };

  //   const fetchGirlLocation = async () => {
  //     try {
  //       const locationData = await getGeoLocation(girlLocation);
  //       if (
  //         locationData &&
  //         locationData.response &&
  //         locationData.response.length > 0
  //       ) {
  //         setGirlLat(locationData.response[0].coordinates[0]);
  //         setGirlLong(locationData.response[0].coordinates[1]);
  //       } else {
  //         Alert.alert('No City Found');
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       Alert.alert('Error fetching location data');
  //     }
  //   };

  //   if (boyLocation) {
  //     fetchBoyLocation();
  //   }

  //   if (girlLocation) {
  //     fetchGirlLocation();
  //   }
  // }, [boyLocation, girlLocation]);

  //console.log(kundali);
  const tara = [
    ['Name', kundali.tara?.name],
    ['Boy Tara', kundali.tara?.boy_tara],
    ['Girl Tara', kundali.tara?.girl_tara],
    ['Tara', kundali.tara?.tara],
    ['Description', kundali.tara?.description],
    ['Score', kundali.tara?.full_score],
  ];

  const gana = [
    ['Name', kundali.gana?.name],
    ['Boy Gana', kundali.gana?.boy_gana],
    ['Girl Gana', kundali.gana?.girl_gana],
    ['Gana', kundali.gana?.gana],
    ['Description', kundali.gana?.description],
    ['Score', kundali.gana?.full_score],
  ];

  const yoni = [
    ['Name', kundali.yoni?.name],
    ['Boy Yoni', kundali.yoni?.boy_yoni],
    ['Girl Yoni', kundali.yoni?.girl_yoni],
    ['Yoni', kundali.yoni?.yoni],
    ['Description', kundali.yoni?.description],
    ['Score', kundali.yoni?.full_score],
  ];
  const bhakoot = [
    ['Name', kundali.bhakoot?.name],
    ['Boy Rasi', kundali.bhakoot?.boy_rasi],
    ['Girl Rasi', kundali.bhakoot?.girl_rasi],
    ['Boy Rasi Name', kundali.bhakoot?.boy_rasi_name],
    ['Girl Rasi Name', kundali.bhakoot?.girl_rasi_name],
    ['Bhakoot', kundali.bhakoot?.bhakoot],
    ['Description', kundali.bhakoot?.description],
    ['Score', kundali.bhakoot?.full_score],
  ];

  const grahamaitri = [
    ['Name', kundali.grahamaitri?.name],
    ['Boy Lord', kundali.grahamaitri?.boy_lord],
    ['Girl Lord', kundali.grahamaitri?.girl_lord],
    ['Grahamaitri', kundali.grahamaitri?.grahamaitri],
    ['Description', kundali.grahamaitri?.description],
    ['Score', kundali.grahamaitri?.full_score],
  ];
  const vasya = [
    ['Name', kundali.vasya?.name],
    ['Boy Vasya', kundali.vasya?.boy_vasya],
    ['Girl Vasya', kundali.vasya?.girl_vasya],
    ['Vasya', kundali.vasya?.vasya],
    ['Description', kundali.vasya?.description],
    ['Score', kundali.vasya?.full_score],
  ];

  const nadi = [
    ['Name', kundali.nadi?.name],
    ['Boy Nadi', kundali.nadi?.boy_nadi],
    ['Girl Nadi', kundali.nadi?.girl_nadi],
    ['Nadi', kundali.nadi?.nadi],
    ['Description', kundali.nadi?.description],
    ['Score', kundali.nadi?.full_score],
  ];
  const varna = [
    ['Name', kundali.varna?.name],
    ['Boy Varna', kundali.varna?.boy_varna],
    ['Girl Varna', kundali.varna?.girl_varna],
    ['Varna', kundali.varna?.varna],
    ['Description', kundali.varna?.description],
    ['Score', kundali.varna?.full_score],
  ];

  return (
    <BackButtonHandler>
      <ScrollView
        style={{marginHorizontal: 10, marginTop: 20, marginBottom: 15}}>
        <View style={{marginBottom: 15, alignSelf: 'center'}}>
          <Text
            style={{
              color: Colors.black1,
              fontSize: 18,
              fontWeight: '500',
              textDecorationLine: 'underline',
            }}>
            Kundli Match Making
          </Text>
        </View>

        <View
          style={{
            marginBottom: 10,
            backgroundColor: Colors.title2,
            borderRadius: 20,
            borderColor: Colors.grey2,
            borderWidth: 1,
            paddingBottom: 10,
          }}>
          <View
            style={{
              paddingHorizontal: 10,
              paddingTop: 15,
              paddingBottom: 10,
            }}>
            <Text
              style={{
                alignSelf: 'center',
                color: Colors.black1,
                fontSize: 14,
                paddingBottom: 10,
                fontWeight: '500',
                textDecorationLine: 'underline',
              }}>
              Boys Detail
            </Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputHeading}>Boys DOB:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="DD/MM/YYYY"
                placeholderTextColor={Colors.black7}
                onChangeText={text => setBoyDOB(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputHeading}>Boys TOB:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="HH:MM"
                placeholderTextColor={Colors.black7}
                onChangeText={text => setBoyTOB(text)}
              />
            </View>
            {/* <View style={styles.inputContainer}>
              <Text style={styles.inputHeading}>Location</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter City Name"
                placeholderTextColor={Colors.black7}
                onChangeText={text => setBoyLocation(text)}
              />
            </View> */}
          </View>
        </View>

        <View
          style={{
            marginBottom: 10,
            backgroundColor: Colors.title2,
            borderRadius: 20,
            borderColor: Colors.grey2,
            borderWidth: 1,
            paddingBottom: 10,
            marginTop: 10,
          }}>
          <View
            style={{
              paddingHorizontal: 10,
              paddingTop: 15,
              paddingBottom: 10,
            }}>
            <Text
              style={{
                alignSelf: 'center',
                color: Colors.black1,
                fontSize: 14,
                paddingBottom: 10,
                fontWeight: '500',
                textDecorationLine: 'underline',
              }}>
              Girl's Detail
            </Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputHeading}>Girl's DOB:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="DD/MM/YYYY"
                placeholderTextColor={Colors.black7}
                onChangeText={text => setGirlDOB(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputHeading}>Girl's TOB:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="HH:MM"
                placeholderTextColor={Colors.black7}
                onChangeText={text => setGirlTOB(text)}
              />
            </View>
            {/* <View style={styles.inputContainer}>
              <Text style={styles.inputHeading}>Location</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter City Name"
                placeholderTextColor={Colors.black7}
                onChangeText={text => setGirlLocation(text)}
              />
            </View> */}
          </View>
        </View>

        <View style={{alignSelf: 'center'}}>
          <Button
            mode="contained"
            contentStyle={{backgroundColor: Colors.black7}}
            onPress={fetchKundali}
            style={{width: width / 3}}>
            Submit
          </Button>
        </View>

        {showData ? (
          <View>
            <View style={{marginTop: 15}}>
              <Text
                style={{color: Colors.pink1, fontSize: 18, fontWeight: '500'}}>
                Kundali Match Score: {kundali.score}
              </Text>
              <Text
                style={{
                  textAlign: 'justify',
                  color: Colors.green,
                  fontSize: 16,
                }}>
                {kundali.bot_response}
              </Text>
            </View>

            <View
              style={{
                marginTop: 15,
                marginBottom: 10,
                backgroundColor: Colors.title2,
                borderRadius: 20,
                borderColor: Colors.grey2,
                borderWidth: 1,
                paddingBottom: 10,
              }}>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingTop: 15,
                  paddingBottom: 10,
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    color: Colors.black7,
                    fontWeight: '500',
                    marginBottom: 10,
                    textDecorationLine: 'underline',
                  }}>
                  Tara
                </Text>
                <PanchangData data={tara} />
              </View>
            </View>

            <View
              style={{
                marginTop: 15,
                marginBottom: 10,
                backgroundColor: Colors.title2,
                borderRadius: 20,
                borderColor: Colors.grey2,
                borderWidth: 1,
                paddingBottom: 10,
              }}>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingTop: 15,
                  paddingBottom: 10,
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    color: Colors.black7,
                    fontWeight: '500',
                    marginBottom: 10,
                    textDecorationLine: 'underline',
                  }}>
                  Gana
                </Text>
                <PanchangData data={gana} />
              </View>
            </View>

            <View
              style={{
                marginTop: 15,
                marginBottom: 10,
                backgroundColor: Colors.title2,
                borderRadius: 20,
                borderColor: Colors.grey2,
                borderWidth: 1,
                paddingBottom: 10,
              }}>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingTop: 15,
                  paddingBottom: 10,
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    color: Colors.black7,
                    fontWeight: '500',
                    marginBottom: 10,
                    textDecorationLine: 'underline',
                  }}>
                  Yoni
                </Text>
                <PanchangData data={yoni} />
              </View>
            </View>

            <View
              style={{
                marginTop: 15,
                marginBottom: 10,
                backgroundColor: Colors.title2,
                borderRadius: 20,
                borderColor: Colors.grey2,
                borderWidth: 1,
                paddingBottom: 10,
              }}>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingTop: 15,
                  paddingBottom: 10,
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    color: Colors.black7,
                    fontWeight: '500',
                    marginBottom: 10,
                    textDecorationLine: 'underline',
                  }}>
                  Bhakoot
                </Text>
                <PanchangData data={bhakoot} />
              </View>
            </View>

            <View
              style={{
                marginTop: 15,
                marginBottom: 10,
                backgroundColor: Colors.title2,
                borderRadius: 20,
                borderColor: Colors.grey2,
                borderWidth: 1,
                paddingBottom: 10,
              }}>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingTop: 15,
                  paddingBottom: 10,
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    color: Colors.black7,
                    fontWeight: '500',
                    marginBottom: 10,
                    textDecorationLine: 'underline',
                  }}>
                  Grahamaitri
                </Text>
                <PanchangData data={grahamaitri} />
              </View>
            </View>

            <View
              style={{
                marginTop: 15,
                marginBottom: 10,
                backgroundColor: Colors.title2,
                borderRadius: 20,
                borderColor: Colors.grey2,
                borderWidth: 1,
                paddingBottom: 10,
              }}>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingTop: 15,
                  paddingBottom: 10,
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    color: Colors.black7,
                    fontWeight: '500',
                    marginBottom: 10,
                    textDecorationLine: 'underline',
                  }}>
                  Vasya
                </Text>
                <PanchangData data={vasya} />
              </View>
            </View>

            <View
              style={{
                marginTop: 15,
                marginBottom: 10,
                backgroundColor: Colors.title2,
                borderRadius: 20,
                borderColor: Colors.grey2,
                borderWidth: 1,
                paddingBottom: 10,
              }}>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingTop: 15,
                  paddingBottom: 10,
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    color: Colors.black7,
                    fontWeight: '500',
                    marginBottom: 10,
                    textDecorationLine: 'underline',
                  }}>
                  Nadi
                </Text>
                <PanchangData data={nadi} />
              </View>
            </View>

            <View
              style={{
                marginTop: 15,
                marginBottom: 10,
                backgroundColor: Colors.title2,
                borderRadius: 20,
                borderColor: Colors.grey2,
                borderWidth: 1,
                paddingBottom: 10,
              }}>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingTop: 15,
                  paddingBottom: 10,
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    color: Colors.black7,
                    fontWeight: '500',
                    marginBottom: 10,
                    textDecorationLine: 'underline',
                  }}>
                  Varna
                </Text>
                <PanchangData data={varna} />
              </View>
            </View>
          </View>
        ) : null}

        <View>
          <Kundli />
        </View>
      </ScrollView>
    </BackButtonHandler>
  );
};

export default KundaliMatch;

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.grey4,
    paddingVertical: 5,
    paddingHorizontal: 15,
    flex: 0.7,
    color: Colors.black7,
  },
  inputHeading: {
    paddingTop: 10,
    color: Colors.black7,
    fontSize: 14,
    flex: 0.3,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 15,
    marginBottom: 10,
  },
});
