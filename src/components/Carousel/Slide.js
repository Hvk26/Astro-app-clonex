import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
const {width} = Dimensions.get('screen');
const Slide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    require('../../assets/images/Slider2.jpg'),
    require('../../assets/images/slide.jpg'),
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);
  return (
    <FlatList
      data={[images[currentIndex]]}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <View style={styles.imageContainer}>
          <ImageBackground source={item} style={{...styles.image, width}}>
            <Text
              style={{
                color: '#fff',
                textAlign: 'justify',
                alignSelf: 'center',
                marginTop: 30,
                fontSize: 22,
                fontWeight: 'bold',
                fontFamily: 'Manrope-Bold',
              }}>
              Astrology Reveals The Truth Of Life
            </Text>
            <Text
              style={{
                color: '#fff',
                alignSelf: 'center',
                textAlign: 'justify',
                fontWeight: '500',
                fontFamily: 'Poppins-Medium',
              }}>
              Horoscopes* Kundli* Vastu* Numerology
            </Text>
          </ImageBackground>
        </View>
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default Slide;

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 10,
  },
  image: {
    height: 120,
    borderRadius: 15,
    width: 200,
  },
});
