import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';

const BirthChartText = () => {
  return (
    <View style={{paddingHorizontal: 12, marginVertical: 15}}>
      <Text
        style={{
          fontSize: 15,
          textAlign: 'justify',
          color: Colors.black8,
          fontWeight: '500',
          textDecorationLine: 'underline',
        }}>
        Kundli In Brief:
      </Text>
      <Text
        style={{
          fontSize: 14,
          textAlign: 'justify',
          color: Colors.black8,
          fontWeight: '400',
          marginTop: 5,
        }}>
        Key components that affects your Birth Journal or Kundli :
      </Text>
      <Text
        style={{
          marginTop: 15,
          color: Colors.grey2,
          textAlign: 'justify',
          fontSize: 14,
        }}>
        A “Birth Journal,” commonly known as a “Kundli” or “Kundali,” is an
        astrological birth chart in Hindu astrology. It is a graphical
        representation of the positions of celestial bodies at the exact time
        and location of a person’s birth. The Kundli is used in Vedic astrology
        to analyze an individual’s personality traits, strengths, weaknesses,
        life events, and potential future outcomes.
      </Text>
      <Text
        style={{
          marginTop: 10,
          color: Colors.grey2,
          textAlign: 'justify',
          fontSize: 14,
          marginBottom: 10,
        }}>
        Here are some key components and information typically found in a Kundli
        :
      </Text>
      <View style={styles.para}>
        <Text style={{color: Colors.grey2, textAlign: 'justify', fontSize: 14}}>
          <Text style={{color: Colors.black7, fontWeight: '500'}}>
            1. Planetary Positions :
          </Text>{' '}
          The Kundli displays the positions of the Sun, Moon, and planets in the
          twelve astrological houses at the time of birth. Each planet’s
          placement in a specific house and zodiac sign influences various
          aspects of the individual’s life.
        </Text>
      </View>

      <View style={styles.para}>
        <Text style={{color: Colors.grey2, textAlign: 'justify', fontSize: 14}}>
          <Text style={{color: Colors.black7, fontWeight: '500'}}>
            2. Ascendant (Lagna) :{'  '}
          </Text>
          The sign rising on the eastern horizon at the time of birth is called
          the Ascendant or Lagna. It represents the individual’s self-image,
          physical appearance, and overall approach to life.
        </Text>
      </View>
      <View style={styles.para}>
        <Text style={{color: Colors.grey2, textAlign: 'justify', fontSize: 14}}>
          <Text style={{color: Colors.black7, fontWeight: '500'}}>
            3. Zodiac Signs And Houses :
          </Text>{' '}
          The Kundli is divided into twelve sections, each corresponding to one
          of the twelve zodiac signs and astrological houses. These houses
          represent different areas of life, such as career, relationships,
          health, and finances.
        </Text>
      </View>

      <View style={styles.para}>
        <Text style={{color: Colors.grey2, textAlign: 'justify', fontSize: 14}}>
          <Text style={{color: Colors.black7, fontWeight: '500'}}>
            4. Bhavas (Houses) :
          </Text>{' '}
          Each house in the Kundli represents specific aspects of life and is
          ruled by a particular planet. The placement of planets in different
          houses indicates where and how their energies manifest in the
          individual’s life.
        </Text>
      </View>
      <View style={styles.para}>
        <Text style={{color: Colors.grey2, textAlign: 'justify', fontSize: 14}}>
          <Text style={{color: Colors.black7, fontWeight: '500'}}>
            5. Planetary Aspects :{' '}
          </Text>
          The Kundli shows the aspects or angular relationships between planets,
          which influence their interactions and effects on each other.
          Planetary aspects can indicate strengths, challenges, and
          opportunities in different areas of life.
        </Text>
      </View>
      <View style={styles.para}>
        <Text style={{color: Colors.grey2, textAlign: 'justify', fontSize: 14}}>
          <Text style={{color: Colors.black7, fontWeight: '500'}}>
            6. Dasha System :
          </Text>{' '}
          The Kundli may also include information about the individual’s Dasha
          (planetary periods) and Bhukti (sub-periods) based on the Vimshottari
          Dasha system. These periods reflect the timing of major life events
          and transitions predicted by astrology.
        </Text>
      </View>
      <View style={styles.para}>
        <Text style={{color: Colors.grey2, textAlign: 'justify', fontSize: 14}}>
          <Text style={{color: Colors.black7, fontWeight: '500'}}>
            7. Yogas And Doshas :
          </Text>{' '}
          Certain combinations of planetary placements, known as Yogas, are
          considered auspicious or inauspicious in Vedic astrology. The Kundli
          may identify Yogas that indicate specific talents, strengths, or
          challenges in the individual’s life. Doshas, such as Mangal Dosha or
          Kaal Sarp Dosha, are planetary afflictions that may require remedies
          or precautions.
        </Text>
      </View>
    </View>
  );
};

export default BirthChartText;

const styles = StyleSheet.create({
  para: {
    flexDirection: 'row',
    marginTop: 5,
  },
});
