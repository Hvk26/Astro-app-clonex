import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import {Colors} from '../../utils/Colors';

const {width} = Dimensions.get('screen');

const TestimonialContainer = ({data}) => {
  const renderTestimonialItem = ({item}) => (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Image
          source={require('../../assets/icons/Kundli-2.png')}
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.city}>{item.city}</Text>
        </View>
      </View>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  return (
    <View style={{marginTop: 20, marginHorizontal: 1}}>
      <Text style={styles.title}>What Our Customers Say</Text>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderTestimonialItem}
      />
    </View>
  );
};

export default TestimonialContainer;

const styles = StyleSheet.create({
  title: {
    color: Colors.black7,
    alignSelf: 'center',
    fontSize: 17,
    fontFamily: 'Poppins-Bold',
    backgroundColor: Colors.secondaryYellow,
    width: '95%',
    textAlign: 'center',
    borderRadius: 25,
    paddingTop: 10,
    paddingBottom: 7,
  },
  scrollView: {
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: Colors.title2,
    width: width * 0.89,
    paddingHorizontal: 7,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    borderColor: Colors.darkYellow,
    borderWidth: 1.5,
    height: 220,
    marginTop: 15,
    marginLeft: 7,
    marginRight: 17,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    height: 25,
    width: 25,
    marginTop: 4,
  },
  textContainer: {
    marginLeft: 10,
    gap: -6,
  },
  name: {
    fontWeight: '500',
    color: Colors.black7,
    fontSize: 15,
    marginBottom: 5,
  },
  city: {
    fontSize: 13,
    color: Colors.black7,
    fontWeight: '400',
    marginBottom: 5,
  },
  text: {
    textAlign: 'justify',
    color: Colors.black7,
  },
});
