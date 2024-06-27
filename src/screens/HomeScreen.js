import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Pressable,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slide from '../components/Carousel/Slide';
import {useNavigation} from '@react-navigation/native';
import AstrologerCard from '../components/Profile/AstrologerCard';
import BackButtonPopUp from '../components/PopUp/BackButtonPopUp';
import {Colors} from '../utils/Colors';
import {getStaticdata} from '../utils/apis';
import Testimonials from '../components/Testimonials/Testimonials';
import Service_URL from '../utils/Constant';
import axios from 'axios';
import FrontIcons from '../components/FrontScreen/FrontIcons';
import TestimonialContainer from '../components/Testimonials/TestimonialContainer';
import YoutubeCard from '../components/YouTube/YoutubeCard';

const color = 'rgb(244, 170, 54)';

const HomeScreen = () => {
  const {height, width} = Dimensions.get('window');
  const [data, setData] = useState({});
  const navigation = useNavigation();
  const [isBackPopupVisible, setIsBackPopupVisible] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Service_URL}/data.json`);

        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    return () => backHandler.remove();
  }, [navigation]);

  const backAction = () => {
    setIsBackPopupVisible(true);

    return true; // Prevent default back action
  };

  const testimonials = data?.testimonials;

  return (
    <ScrollView style={{width: width}}>
      <TouchableOpacity
        onPress={() => navigation.navigate('SearchBar')}
        style={{
          marginVertical: 10,
          borderWidth: 1.5,
          borderColor: Colors.primaryYellow,
          shadowColor: '#d3d3d3',
          borderRadius: 25,
          flexDirection: 'row',
          alignContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          alignSelf: 'center',
          width: '95%',
        }}>
        <Ionicons
          name="search-outline"
          size={24}
          style={{marginLeft: 10}}
          color={Colors.primaryYellow}
          // onPress={() => navigation.navigate('SearchBar')}
        />
        <Text style={{color: Colors.black1, fontSize: 15, padding: 8}}>
          Search astrologers...
        </Text>
      </TouchableOpacity>

      <View>
        <Slide />
      </View>
      <View
        style={{
          marginVertical: 10,
          marginHorizontal: 15,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <View style={styles.titleContainer}>
          <Pressable
            onPress={() => navigation.navigate('DailyHoroscope')}
            style={styles.imageContainer}>
            <Image
              source={require('../assets/icons/Horoscope.jpg')}
              style={styles.image}
            />
          </Pressable>
          <Text style={styles.textHeading}> Daily </Text>
          <Text style={styles.textHeading}>Horoscope</Text>
        </View>

        <View style={styles.titleContainer}>
          <Pressable
            onPress={() => navigation.navigate('BirthChart')}
            style={styles.imageContainer}>
            <Image
              source={require('../assets/icons/Kundli-2.png')}
              style={styles.image}
            />
          </Pressable>
          <Text style={styles.textHeading}> Free </Text>
          <Text style={styles.textHeading}>Kundli</Text>
        </View>
        <View style={styles.titleContainer}>
          <Pressable
            onPress={() => navigation.navigate('KundliMatch')}
            style={styles.imageContainer}>
            <Image
              source={require('../assets/icons/Kundli-1.png')}
              style={styles.image}
            />
          </Pressable>
          <Text style={styles.textHeading}> Kundli </Text>
          <Text style={styles.textHeading}>Matching</Text>
        </View>

        <View style={styles.titleContainer}>
          <Pressable
            onPress={() => navigation.navigate('Panchang')}
            style={styles.imageContainer}>
            <Image
              source={require('../assets/icons/Panchang.jpg')}
              style={styles.image}
            />
          </Pressable>
          <Text style={styles.textHeading}> Daily</Text>
          <Text style={styles.textHeading}>Panchang</Text>
        </View>
      </View>

      <View>
        <AstrologerCard title={'Astrologers'} />
      </View>

      <View
        style={{
          //maxWidth: width,
          backgroundColor: color,
          marginVertical: 10,
          borderRadius: 80,
          // paddingVertical: 5,
          marginTop: 20,
          marginHorizontal: 8,
          paddingTop: 12,
          paddingBottom: 4,
        }}>
        {data?.usersData && (
          <>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <View style={styles.counterContainer}>
                <Text style={styles.counterNumber}>
                  {data.usersData.userNumber}
                </Text>
                <Text style={styles.counterText}>
                  {data.usersData.astrologers}
                </Text>
              </View>
              <View style={styles.counterContainer}>
                <Text style={styles.counterNumber}>
                  {data.usersData.userNumber}
                </Text>
                <Text style={styles.counterText}>{data.usersData.users}</Text>
              </View>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <View style={styles.counterContainer}>
                <Text style={styles.counterNumber}>
                  {data.usersData.callNumber}
                </Text>
                <Text style={styles.counterText}>{data.usersData.calls}</Text>
              </View>
              <View style={styles.counterContainer}>
                <Text style={styles.counterNumber}>
                  {data.usersData.chatNumber}
                </Text>
                <Text style={styles.counterText}>{data.usersData.chats}</Text>
              </View>
            </View>
          </>
        )}
      </View>

      <View>
        <AstrologerCard title={'Live Astologers'} />
      </View>

      <View>
        <YoutubeCard />
      </View>

      <View>
        {testimonials && <TestimonialContainer data={testimonials} />}
      </View>

      <View style={{marginBottom: 20}}>
        <FrontIcons />
      </View>
      {isBackPopupVisible && (
        <BackButtonPopUp
          isVisible={isBackPopupVisible}
          onClose={() => setIsBackPopupVisible(false)}
        />
      )}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: '#FBE300',
    padding: 7,
    margin: 5,
    borderRadius: 40,
  },
  image: {height: 60, width: 60},
  titleContainer: {
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textHeading: {
    fontSize: 14,
    color: Colors.black7,
  },
  counterContainer: {
    alignContent: 'center',
    alignItems: 'center',
    gap: -10,
    marginBottom: 15,
  },
  counterText: {
    fontSize: 15,
    color: '#fff',
    // fontFamily: 'Poppins-Italic',
    fontWeight: '500',
  },
  counterNumber: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
  },
});
