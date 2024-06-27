import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';

const Kundli = ({kundali}) => {
  const classes = [
    {
      key: 1,
      Class: 'Varna',
      description:
        'It is the classification of individuals in four classes specifically Brahmin, Kshatriya, Vaishya, and Shudra.',
    },
    {
      key: 2,
      Class: 'Vashya',
      description:
        'The Vashya signifies the power or dominance in Vedic astrology. Vahsya classifies an individual into five sorts – Human, Wild Creatures, Little creatures, Waterborne creatures and Insect.',
    },
    {
      key: 3,
      Class: 'Tara',
      description:
        'It is the classification of individuals in four classes specifically Brahmin, Kshatriya, Vaishya, and Shudra. It is utilized to indicate the birth star similarity of the individual.',
    },
    {
      key: 4,
      Class: 'Yoni',
      description:
        'It is the sexual similarity the two individuals would impart to one another.',
    },
    {
      key: 5,
      Class: 'Rasyadhipati ',
      description: 'This characterizes who is the Master of the zodiac.',
    },
    {
      key: 6,
      Class: 'Gana',
      description:
        'The three Ganas in Astrology are : Dev, Manav and Rakshasa.',
    },
    {
      key: 7,
      Class: 'Rashi',
      description:
        'This class indicates love that the two individuals would share. The classification considers the specific place of the Moon in the lady’s and husband to be’s horoscope.',
    },
    {
      key: 8,
      Class: 'Nadi',
      description:
        'Nadi Koot is connected with the strength of the lady and the husband to be. The 3 Nadis in astrology are : Vata (air), Pitta (bile) and Kappa (phlegm).',
    },
  ];
  return (
    <View style={{marginBottom: 15, marginTop: 20}}>
      <Text style={styles.heading}>Kundli Matching Process</Text>
      <Text style={[styles.para, {textAlign: 'justify'}]}>
        Kundli Milan is also known as ‘Gunn Milan’. Truly, the characteristics
        introduced in the horoscope are coordinated, consequently known as ‘Gunn
        Milan’. The total number of viewpoints/credits matched in the horoscope
        is 36. In the event that 18 out of 36 properties matches, which means
        atleast 50% properties are common, then the marriage is allowed by
        astrologers.
      </Text>
      <Text style={styles.heading}>What Happens During Kundli Milan ?</Text>
      <Text style={styles.para}>
        The entire course of horoscope matching is called AshtaKoot Milan in
        Vedic astrology. Here, Ashta implies 8 and Kootas are classifications.
        These eight classifications of boundaries portray various parts of life.
        These 8 boundaries are considered for estimating one’s similarity with
        the other individual. Every one of these boundaries convey a few
        focuses, which in complete make 36 gunas. The more the gunas match, the
        more compatible you are with the other individual in your life.
      </Text>
      <Text style={styles.heading}>
        The eight boundaries or classes among which the focuses have been
        divided are :
      </Text>
      {classes.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              gap: 6,
              flex: 1,
              marginBottom: 5,
            }}>
            <Text
              style={{
                color: Colors.black7,
                fontWeight: '500',
                fontSize: 14,
                flex: 0.05,
              }}>
              {index + 1}.
            </Text>
            <Text
              style={{
                color: Colors.black7,
                fontWeight: '500',
                fontSize: 14,
                flex: 0.25,
              }}>
              {item.Class}:
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                flex: 0.7,
                fontSize: 14,
                color: Colors.grey2,
              }}>
              {item.description}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default Kundli;

const styles = StyleSheet.create({
  para: {
    color: Colors.black1,
    textAlign: 'justify',
    fontSize: 15,
    marginBottom: 10,
    paddingRight: 8,
  },
  heading: {
    color: Colors.black1,
    textAlign: 'justify',
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});
