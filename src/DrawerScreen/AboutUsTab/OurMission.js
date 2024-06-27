import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';

const OurMission = () => {
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
        our mission is to empower individuals on their journey of self-discovery
        by providing personalized and insightful astrological guidance. We are
        committed to demystifying astrology, making it accessible, relevant, and
        transformative for people from all walks of life.
      </Text>
      <Text style={[styles.textStyle, {marginBottom: 15}]}>
        Our central goal is to make a platform for individuals who look for
        astrological guidance to improve life. We need to assist individuals who
        are carrying on with a terrible period of life in the most confided
        manner.
      </Text>
      <Text style={[styles.textStyle, {marginBottom: 15}]}>
        We strive to make astrology approachable and understandable for
        everyone, offering accessible and relatable interpretations that
        resonate with individuals at various levels of astrological familiarity.
        We are dedicated to delivering highly personalized astrological
        services, helping them navigate life’s twists and turns with confidence
        and clarity. We embrace innovation and technology to enhance the
        astrological experience, ensuring that our clients receive the most
        relevant guidance in the fast-paced world we live in.
      </Text>
      <Text style={[styles.textStyle, {marginBottom: 15}]}>
        Integrity is at the core of our mission. We pledge to uphold ethical
        standards in our astrological practices, ensuring authenticity,
        transparency, and a genuine commitment to the well-being of our clients.
        We aim to build a supportive and inclusive community where individuals
        can connect, share experiences, and learn from each other. We want to
        create a space that fosters a sense of belonging and mutual growth among
        our clients and astrologers.
      </Text>
      <Text style={[styles.textStyle, {marginBottom: 15}]}>
        Astrogini is driven by the mission to make a positive impact on the
        lives of individuals. In fulfilling our mission, we strive to be a
        trusted companion on the journey of self-discovery, empowering
        individuals to harness the wisdom of the cosmos for a brighter and more
        purposeful future.
      </Text>
    </ScrollView>
  );
};

export default OurMission;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 15,
    color: Colors.grey2,
    textAlign: 'justify',
  },
});
