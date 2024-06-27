import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';

const DefaultTab = () => {
  return (
    <ScrollView
      style={{
        marginTop: 10,
        borderBottomColor: Colors.grey3,
        borderBottomWidth: 1,
        paddingBottom: 10,
        paddingHorizontal: 15,
      }}>
      <Text style={styles.textStyle}>
        <Text style={{color: '#cc8400'}}>Astrogini</Text> is an online Astrology
        Consultant and prediction platform. Astrogini is the best and unique
        astrology platform for online Astrology predictions.
        <Text style={{color: '#cc8400'}}> Chat With Astrologer</Text> or{' '}
        <Text style={{color: '#cc8400'}}>Talk to Astrologer</Text> on call and
        get answers to all your problems. Get to know your Astrology Kundli
        Predictions from the best Astrogini Astrologers from India. Get best
        future predictions related to Health, Career, Marriage, Love Life or
        Property Issues over call, chat, query or report.
      </Text>
      <Text style={[styles.textStyle, {marginTop: 7}]}>
        Astrogini is the best astrology website for online{' '}
        <Text style={{color: '#cc8400'}}>Astrology </Text>
        predictions. Astrogini has huge number of expert Vedic astrologers,
        Tarot readers, Numerologists, Vastu experts and more. Astrogini helps
        you connect with these experts over call and chat to get answers to your
        problems and make your life easy and happy.
      </Text>
      <Text style={[styles.textStyle, {marginTop: 7}]}>
        Astrogini provides services like{' '}
        <Text style={{color: '#cc8400'}}>
          Kundli Matching, Kundli predictions{' '}
        </Text>
        which helps the visitor to get the best future predictions across
        different aspects like Health, Career, Love, Marriage and more. While
        using Astrogini, you can trust us for highly accurate, precise and well
        researched astrological content that would resolve most of your worries.
      </Text>
      <View style={{marginTop: 20, marginBottom: 10}}>
        <View
          style={{
            backgroundColor: Colors.secondaryYellow,
            borderRadius: 25,
            padding: 5,
            width: 150,
            alignSelf: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: Colors.black8,
              fontSize: 18,
              fontWeight: 600,
            }}>
            Why Astrogini
          </Text>
        </View>
        <Text style={[styles.textStyle, {marginTop: 7}]}>
          <Text style={{color: '#cc8400'}}>Astrogini</Text>, today, partakes in
          an enormous crowd across the globe with a steadily extending pool of
          1000+ top Vedic Astrologers, Tarot Readers, Numerologists, Vastu
          Specialists from around the world. As we comprehend how one looks for
          just exact expectations for themselves, consequently we guarantee each
          astrologer you interface with on our foundation is the most elite. For
          similar reason, we let users rate the astrologers; and prescribe to
          you just the ones who have a 4+ rating. Along these lines, we
          guarantee you of premium quality predictions. This is one reason why
          we can collect an immense base of over 2Lakh+ users and are right now
          doing more than 1-Lakh minutes of day to day interview. Likewise, one
          more center objective for us is to regard your security so you can
          trust us and definitely talk about us.
        </Text>
        <Text style={[styles.textStyle, {marginTop: 7}]}>
          Apart from allowing you to consult with the best and expert
          astrologers, we also provide various other services like Free live
          sessions, Free Kundli matching, Daily horoscope and much more. Our
          astrology services has helped many users to cater their life issues
          and to get proper remedies for their problems.
        </Text>
        <Text style={[styles.textStyle, {marginTop: 7}]}>
          As Astrogini continues to grow with each passing day, so is growing
          our potential and urge to offer the best of astrology to our users. We
          are working to build the world’s largest community of spiritual and
          wellbeing experts, and we hope you become a part of this journey.
        </Text>
      </View>
    </ScrollView>
  );
};

export default DefaultTab;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 15,
    color: Colors.grey2,
    textAlign: 'justify',
  },
});
