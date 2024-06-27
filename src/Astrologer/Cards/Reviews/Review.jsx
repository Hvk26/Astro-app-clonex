import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import BackButtonHandler from '../../../components/BackButtonHandler/BackButtonHandler';
import {Colors} from '../../../utils/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import ReviewPopUp from './ReviewPopUp';
const {width} = Dimensions.get('screen');

const Review = () => {
  const [isVisible, setIsVisible] = useState(false);

  const data = [
    {
      id: '536536',
      name: 'Ramesh Kumar',
      service: 'Chat',
      review: 'Great service, highly recommend!',
      date: '12 Oct 2023',
      profilePic: 'https://avatar.iran.liara.run/public/boy',
      star: '★★★★★',
    },
    {
      id: '872942',
      name: 'Priya Patel',
      service: 'Call',
      review: 'Very professional, fixed the issue quickly.',
      date: '25 Sep 2023',
      profilePic: 'https://avatar.iran.liara.run/public/girl',
      star: '★★★★',
    },
    {
      id: '349573',
      name: 'Ananya Mishra',
      service: 'Chat',
      review: 'Excellent workmanship, would hire again.',
      date: '5 Nov 2023',
      profilePic: 'https://avatar.iran.liara.run/public/girl',
      star: '★★★★★',
    },
    {
      id: '645892',
      name: 'Rajesh Singh',
      service: 'Call',
      review: 'Transformed my backyard, exceeded expectations!',
      date: '18 Aug 2023',
      profilePic: 'https://avatar.iran.liara.run/public/boy',
      star: '★★★★★',
    },
    {
      id: '194738',
      name: 'Deepika Sharma',
      service: 'Chat',
      review: 'Beautiful job, very satisfied with the results.',
      date: '7 Dec 2023',
      profilePic: 'https://avatar.iran.liara.run/public/girl',
      star: '★★★★★',
    },
  ];

  const onClose = () => {
    setIsVisible(!isVisible);
  };
  
  const Card = ({item}) => {
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.orderId}>
          Order Id: <Text style={styles.orderIdValue}>{item.id}</Text>
        </Text>
        <View style={styles.reviewContainer}>
          <Image source={{uri: item.profilePic}} style={styles.profilePic} />
          <View style={styles.reviewContent}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.service}>
              Service: <Text style={styles.serviceValue}>{item.service}</Text>
            </Text>
            <Text style={styles.review}>
              Review: <Text style={styles.reviewValue}>{item.review}</Text>
            </Text>
            <Text style={{fontSize: 16, color: Colors.lightYellow1}}>
              {item.star}{' '}
              <Text style={{fontSize: 14, color: Colors.grey3}}>
                {item.date}
              </Text>
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => setIsVisible(true)}
          style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
          <Text
            style={{
              fontSize: 16,
              textDecorationLine: 'underline',
              color: Colors.green,
            }}>
            Reply to this review
          </Text>
          <Entypo name="reply" size={22} color={Colors.green} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <BackButtonHandler>
      <>
        <ScrollView style={styles.scrollView}>
          {data.map((item, index) => (
            <Card key={index} item={item} />
          ))}
          <ReviewPopUp isVisible={isVisible} onClose={onClose} />
        </ScrollView>
      </>
    </BackButtonHandler>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
  },
  cardContainer: {
    borderWidth: 0.7,
    borderColor: Colors.grey5,
    marginTop: 15,
    marginHorizontal: 10,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  orderId: {
    color: Colors.black7,
    fontSize: 16,
    alignSelf: 'center',
  },
  orderIdValue: {
    fontWeight: '500',
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    gap: 15,
  },
  profilePic: {
    height: 60,
    width: 60,
  },
  reviewContent: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    color: Colors.black7,
    fontSize: 15,
    fontWeight: '500',
  },
  service: {
    color: Colors.black7,
    fontSize: 15,
    fontWeight: '500',
  },
  serviceValue: {
    color: Colors.green,
  },
  review: {
    color: Colors.black7,
    fontSize: 15,
    fontWeight: '500',
  },
  reviewValue: {
    color: Colors.black7,
    flexWrap: 'wrap',
    maxWidth: '100%',
    fontWeight: '400',
  },
});

export default Review;
