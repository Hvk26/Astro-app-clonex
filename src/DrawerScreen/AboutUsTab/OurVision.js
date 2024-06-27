import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';

const OurVision = () => {
  return (
    <ScrollView
      style={{
        marginTop: 10,
        borderBottomColor: Colors.grey3,
        borderBottomWidth: 1,
        paddingBottom: 10,
        paddingHorizontal: 15,
      }}>
      <Text style={[styles.textStyle, {marginBottom: 15}]}>
        At <Text style={{color: '#cc8400', fontWeight: 500}}>Astrogini</Text>,
        we envision a world where individuals embrace the profound wisdom of
        astrology to navigate their lives with clarity, purpose, and
        empowerment. We aspire to be the guiding light, unlocking the
        transformative potential of celestial insights for every person,
        fostering a deeper connection to self and the universe.
      </Text>
      <Text style={[styles.textStyle, {marginBottom: 15}]}>
        Our vision is to redefine astrology as a dynamic tool for personal
        growth, providing innovative and personalized astrological services that
        inspire individuals to embark on a journey of self-discovery. We strive
        to create a community where people feel supported, understood, and
        motivated to embrace their unique strengths and challenges.
      </Text>
      <Text style={[styles.textStyle, {marginBottom: 15}]}>
        We see Astrogini as a trailblazer in the astrology industry, pushing the
        boundaries of traditional practices through cutting-edge technology and
        a commitment to authenticity. Our aim is to cultivate a global community
        that values the profound impact of astrology on personal and collective
        well-being.
      </Text>
      <Text style={[styles.textStyle, {marginBottom: 15}]}>
        In pursuit of our vision, we are dedicated to continuous research,
        education, and collaboration with skilled astrologers to offer the
        highest quality insights and services. We envision a future where
        astrology is not just a cultural curiosity, but an indispensable tool
        for individuals seeking purpose, fulfillment, and harmony in their
        lives.
      </Text>
      <Text style={[styles.textStyle, {marginBottom: 15}]}>
        At Astrogini, we believe that astrology has the power to unite people
        across cultures and backgrounds, fostering a deeper understanding of
        ourselves and others. Our vision is to be a catalyst for positive
        change, promoting a world where individuals are empowered to navigate
        life’s journey with confidence, resilience, and a profound sense of
        purpose.
      </Text>
    </ScrollView>
  );
};

export default OurVision;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 15,
    color: Colors.grey2,
    textAlign: 'justify',
  },
});
