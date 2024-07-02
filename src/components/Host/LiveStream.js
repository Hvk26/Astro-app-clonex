import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {UserType} from '../../UserContext';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Service_URL from '../../utils/Constant';
import BackButtonHandler from '../BackButtonHandler/BackButtonHandler';

const LiveStream = () => {
  const {userId, setUserId} = useContext(UserType);
  const [astrologerUsers, setAstrologerUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const imageUrl =
    'https://imgv3.fotor.com/images/gallery/a-man-profile-picture-with-blue-and-green-background-made-by-LinkedIn-Profile-Picture-Maker.jpg';
  useEffect(() => {
    async function fetchAstrologers() {
      try {
        const response = await axios.get(`${Service_URL}/astrologers`);
        const data = response.data;
        setAstrologerUsers(data);
        setIsLoading(false);
      } catch (error) {
        console.log('Error:', error);
        setIsLoading(false);
      }
    }

    fetchAstrologers();
  }, []);

  const onlineAstrologers = astrologerUsers.filter(user => user.isLive == true);
  console.log('2', onlineAstrologers);
  return (
    <BackButtonHandler style={styles.container}>
      <FlatList
        data={onlineAstrologers}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.astrologerContainer}
            onPress={() => navigation.navigate('AudiencePage', {data: item})}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20,
              }}>
              <Image
                source={{uri: imageUrl}}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 70,
                  borderColor: '#FBE300',
                  borderWidth: 3,
                }}
              />
              <View style={{}}>
                <Text style={styles.astrologersName}>
                  {item.name.split(' ')[0]}
                </Text>
                <Text style={{color: '#000000', fontSize: 15}}>
                  {console.log('item', item)}
                  {item.skills.join(', ')}
                </Text>
                <Text style={{color: '#000000', fontSize: 15}}>
                  {item.languages.join(', ')}
                </Text>
                <Text style={{color: '#000000', fontSize: 15}}>
                  Exp: {item.yearsOfExperience} years
                </Text>
              </View>
            </View>
            <View
              style={{
                marginLeft: '80%',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 3,
              }}>
              <MaterialIcons
                name="online-prediction"
                size={22}
                color={'#006700'}
              />
              <Text style={{color: '#006700'}}>LIVE</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </BackButtonHandler>
  );
};

export default LiveStream;

const styles = StyleSheet.create({
  astrologerContainer: {
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 13,
    padding: 10,
    backgroundColor: '#ffffff',
    marginTop: 15,
    marginRight: 10,
    marginLeft: 10,
    shadowColor: '#808080',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5, // for Android
  },
  astrologersName: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000000',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
