import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import BackButtonHandler from '../components/BackButtonHandler/BackButtonHandler';
import {UserType} from '../UserContext';
import axios from 'axios';
import Service_URL from '../utils/Constant';
import {Button, Card, Avatar, IconButton} from 'react-native-paper';
import {Colors} from '../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AuthLogin from '../utils/AuthLogin';
const imageUrl =
  'https://imgv3.fotor.com/images/gallery/a-man-profile-picture-with-blue-and-green-background-made-by-LinkedIn-Profile-Picture-Maker.jpg';
const MyFollowing = () => {
  const {userId, setUserId} = useContext(UserType);
  const [followers, setFollowers] = useState([]);
  const {width} = Dimensions.get('window');
  const [showMore, setShowMore] = useState(false);

  const navigation = useNavigation();
  useEffect(() => {
    const fetchFollowingList = async () => {
      try {
        const response = await axios.get(
          `${Service_URL}/user/following/${userId}`,
        );
        if (response.status === 200) {
          setFollowers(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchFollowingList();
  });

  const handleUnfollow = async astroId => {
    console.log(astroId, userId);

    if (!userId) {
      return false;
    }
    try {
      const response = await axios.post(`${Service_URL}/user/unfollow`, {
        userId: userId,
        astroId: astroId,
      });
      if (response.status == 200) {
        Alert.alert(`Success..!!`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (!followers.length) {
    return (
      <View style={{alignSelf: 'center', marginTop: 20}}>
        <Text style={{color: Colors.grey2, fontSize: 15}}>
          You are not following anyone
        </Text>
      </View>
    );
  }
  return (
    <BackButtonHandler>
      {followers &&
        followers.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                marginBottom: 10,
                borderColor: Colors.grey3,
                borderWidth: 1,
                marginHorizontal: 10,
                borderRadius: 10,
                marginTop: 5,
                padding: 4,
              }}>
              <Card.Title
                rightStyle={{marginRight: 15}}
                titleStyle={{
                  marginLeft: 20,
                  marginBottom: 10,
                  fontSize: 17,
                  color: Colors.black8,
                  fontWeight: 500,
                }}
                subtitleStyle={{
                  marginLeft: 20,
                  fontSize: 14,
                  color: Colors.black7,
                }}
                title={item.name}
                subtitle={
                  <View>
                    <Text
                      style={{
                        color: Colors.black4,
                        fontSize: 15,
                        fontWeight: 400,
                      }}>
                      {item.skills.slice(0, 2).join(', ')}
                      {item.skills.length > 2 && !showMore && '...'}
                    </Text>
                    <Text
                      style={{
                        color: Colors.black4,
                        fontSize: 15,
                        fontWeight: 400,
                      }}>
                      {item.languages.join(', ')}
                    </Text>
                  </View>
                }
                left={() => (
                  <Avatar.Image
                    source={{
                      uri: item.image
                        ? `${Service_URL}/${item.image}`
                        : imageUrl,
                    }}
                  />
                )}
                right={() => (
                  <SimpleLineIcons
                    size={24}
                    name="user-unfollow"
                    color={'red'}
                    onPress={() => {
                      handleUnfollow(item._id);
                    }}
                  />
                )}
              />
            </View>
          );
        })}
    </BackButtonHandler>
  );
};

export default MyFollowing;

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
