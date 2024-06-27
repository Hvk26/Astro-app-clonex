import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Service_URL from '../../utils/Constant';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../utils/Colors';

const AstrologerCard = ({title}) => {
  const [astrologers, setAstrologer] = useState([]);
  const {width} = Dimensions.get('screen');
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchAstrologers() {
      try {
        const response = await axios.get(`${Service_URL}/astrologers`);
        if (response.status === 200) {
          const verifiedAstrologers = response.data.filter(
            astrologer => astrologer.role === 'verified',
          );

          setAstrologer(verifiedAstrologers);
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchAstrologers();
  }, []);

  const handleCardRoute = item => {
    if (title === 'Astrologers') {
      navigation.navigate('AstrologerProfile', {user: item});
    } else {
      // Navigate to Live Stream screen
      // You need to replace 'LiveStream' with the actual name of your Live Stream screen
      navigation.navigate('Live');
    }
  };

  const imageUrl =
    'https://imgv3.fotor.com/images/gallery/a-man-profile-picture-with-blue-and-green-background-made-by-LinkedIn-Profile-Picture-Maker.jpg';
  //console.log(astrologers);
  return (
    <View style={{flex: 1, marginTop: 10}}>
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 6,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 16, fontWeight: '500', color: Colors.black8}}>
          {title}
        </Text>

        <Pressable
          onPress={() => navigation.navigate('Astrologers')}
          style={{
            position: 'relative',
            display: 'flex',
          }}>
          <Text
            style={{color: Colors.black1, fontSize: 14, fontWeight: 'bold'}}>
            View All
          </Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{}}>
        {astrologers.map((item, index) => {
          return (
            <TouchableOpacity
              style={styles.cardContainer}
              key={index}
              onPress={() => handleCardRoute(item)}>
              <View
                style={{
                  width: width * 0.43,
                  //height: 200,
                  borderRadius: 12,
                  borderWidth: 1.1,
                  borderColor: Colors.primaryYellow,
                  marginLeft: 5,
                  alignContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 5,
                  paddingBottom: 15,
                }}>
                <Image
                  source={{
                    uri: item?.image ? `${Service_URL}/${item.image}` : imageUrl,
                  }}
                  style={{
                    width: 85,
                    height: 85,
                    borderRadius: 60,
                    borderColor: '#cebc0f',
                    borderWidth: 3,
                  }}
                />
                <View
                  style={{
                    alignContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <Text style={{fontSize: 17, color: '#000'}}>
                    {item.name.split(' ')[0]}
                  </Text>

                  {title === 'Astrologers' ? (
                    <Text style={{color: '#000'}}>
                      ₹
                      <Text style={{color: Colors.black1}}>
                        {item.amount} /min
                      </Text>
                    </Text>
                  ) : null}

                  {title === 'Astrologers' ? (
                    <View
                      style={{
                        borderColor: Colors.black7,
                        borderWidth: 1.5,
                        width: 100,
                        alignContent: 'center',
                        alignItems: 'center',
                        marginTop: 10,
                        borderRadius: 15,
                        backgroundColor: Colors.black7,
                      }}>
                      <Text
                        style={{padding: 5, color: '#fff', fontWeight: '600'}}>
                        Chat
                      </Text>
                    </View>
                  ) : null}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default AstrologerCard;

const styles = StyleSheet.create({
  cardContainer: {
    shadowColor: Colors.black1,
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10, // for Android
    marginRight: 5,
    marginLeft: 5,
    paddingLeft: 5,
    paddingBottom: 15,
  },
});
