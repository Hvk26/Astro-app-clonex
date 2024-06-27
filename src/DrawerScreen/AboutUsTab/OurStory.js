import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';

const OurStory = () => {
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
        <Text style={{color: '#cc8400', fontWeight: 500}}>
          Astrogini Services Pvt. Ltd. (Astrogini)
        </Text>{' '}
        is an organization started in India, with main functioning in Lucknow,
        Delhi. Founded by educationalist and philanthropist Mr. Ranjan Bajpai,
        our mission is to enrich the life of every person we come in contact
        with by providing excellence in Vedic astrology and remedial rituals.
        Mr. Bajpai’s thought is that “spirituality is an important element for a
        social change,” and his energetic efforts have created diverse solutions
        in the form of astrology and remedy services such as Vedic Astrology,
        Nadi Astrology, Betel Leaf (Royal), and Vishnu Maya Reading.
      </Text>
      <Text style={[styles.textStyle, {marginBottom: 15}]}>
        Remedial Services include Fire Prayers (Homas), Poojas and Temple
        Services, Energized Products (Products composed of five elements, pancha
        loka, energized in power rituals), and Customized Packages and Programs
        that focus on improving key areas of life such as health, finances,
        relationship, education, etc. to fulfill your needs and bring more
        positivity into your life.
      </Text>
      <Text style={[styles.textStyle, {marginBottom: 15}]}>
        We also bring Priest Services directly to your home or office, or you
        can take part virtually while rituals are performed at our Homa center.
      </Text>
      <Text style={[styles.textStyle, {marginBottom: 15}]}>
        Astrogini is continually funding research into the Vedic sciences to
        merge the technologies of the ancient traditions with our modern
        science.
      </Text>
      <Text style={[styles.textStyle, {marginBottom: 15}]}>
        Astrogini Services Pvt. Ltd. (Astrogini) is a certified company. The
        company’s Mission is “Ancient Vedic Wisdom for Modern Times,” and it has
        established a successful global presence and brought tremendous changes
        in the areas of finance, relationship, career, spirituality, health,
        business, children/family, travel and helped resolve personal problems
        in the lives of its members/users.
      </Text>
    </ScrollView>
  );
};

export default OurStory;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 15,
    color: Colors.grey2,
    textAlign: 'justify',
  },
});
