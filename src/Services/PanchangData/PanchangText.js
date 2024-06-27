import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';

const PanchangText = () => {
  return (
    <View>
      <Text
        style={{
          textAlign: 'center',
          color: '#000',
          fontWeight: '500',
          fontSize: 18,
          textDecorationLine: 'underline',
        }}>
        Panchang
      </Text>
      <Text style={{color: Colors.grey2, fontSize: 14, textAlign: 'justify'}}>
        A Panchang, also known as Panchanga or Hindu Calendar, is a traditional
        Hindu astrological almanac that provides comprehensive information about
        various aspects of time and celestial events. The word “Panchang” is
        derived from the Sanskrit words “Pancha,” meaning five, and “Anga,”
        meaning limb or part. Therefore, Panchang refers to the five elements of
        time.
      </Text>
      <Text
        style={{
          color: Colors.grey2,
          fontSize: 14,
          textAlign: 'justify',
          marginVertical: 10,
        }}>
        The key components of a Panchang typically include :
      </Text>
      <Text
        style={{
          color: Colors.grey2,
          fontSize: 14,
          textAlign: 'justify',
          marginBottom: 10,
        }}>
        <Text style={{color: Colors.black8, fontSize: 14, fontWeight: '500'}}>
          Tithi (Lunar Day) :{' '}
        </Text>
        The phases of the moon on a particular day, which are important in
        determining auspicious and inauspicious times for various activities.
        The lunar month is divided into 30 tithis, each representing a specific
        angle between the positions of the sun and the moon.
      </Text>
      <Text
        style={{
          color: Colors.grey2,
          fontSize: 14,
          textAlign: 'justify',
          marginBottom: 10,
        }}>
        <Text style={{color: Colors.black8, fontSize: 14, fontWeight: '500'}}>
          Nakshatra (Lunar Mansion) :{' '}
        </Text>
        The position of the moon in one of the 27 or 28 lunar mansions or
        constellations, which influences various aspects of life. Each Nakshatra
        has its own unique qualities and is associated with specific deities.
      </Text>
      <Text
        style={{
          color: Colors.grey2,
          fontSize: 14,
          textAlign: 'justify',
          marginBottom: 10,
        }}>
        <Text style={{color: Colors.black8, fontSize: 14, fontWeight: '500'}}>
          Yoga :
        </Text>{' '}
        Combinations of specific positions of the sun and moon that has
        astrological significance, and is believed to have particular effects on
        a person’s nature and behavior. There are 27 yogas, each associated with
        specific qualities and influences.
      </Text>
      <Text
        style={{
          color: Colors.grey2,
          fontSize: 14,
          textAlign: 'justify',
          marginBottom: 10,
        }}>
        <Text style={{color: Colors.black8, fontSize: 14, fontWeight: '500'}}>
          Karana :{' '}
        </Text>
        Half of a Tithi, resulting in a total of 11 Karanas in a lunar month.
        Karanas are associated with various activities and are considered while
        determining the auspiciousness of specific events.
      </Text>
      <Text
        style={{
          color: Colors.grey2,
          fontSize: 14,
          textAlign: 'justify',
          marginBottom: 10,
        }}>
        <Text style={{color: Colors.black8, fontSize: 14, fontWeight: '500'}}>
          Vara (Weekday) :
        </Text>{' '}
        The day of the week, named after the seven classical planets in Hindu
        astrology, which is significant in determining auspicious timings for
        different activities. Each day is associated with a specific deity and
        has its own set of favorable and unfavorable activities.
      </Text>
      <Text
        style={{
          color: Colors.grey2,
          fontSize: 14,
          textAlign: 'justify',
          marginBottom: 10,
        }}>
        <Text style={{color: Colors.black8, fontSize: 14, fontWeight: '500'}}>
          Rahu Kalam,
        </Text>{' '}
        Yamagandam, and Gulikai : Inauspicious time periods associated with the
        nodes of the moon (Rahu and Ketu), which are considered in Hindu
        astrology for timing certain activities.
      </Text>
      <Text
        style={{
          color: Colors.grey2,
          fontSize: 14,
          textAlign: 'justify',
          marginBottom: 10,
        }}>
        <Text style={{color: Colors.black8, fontSize: 14, fontWeight: '500'}}>
          Sunrise and Sunset Times :
        </Text>{' '}
        Important for various daily rituals and prayers.
      </Text>
      <Text
        style={{
          color: Colors.grey2,
          fontSize: 14,
          textAlign: 'justify',
          marginBottom: 10,
        }}>
        <Text style={{color: Colors.black8, fontSize: 14, fontWeight: '500'}}>
          Abhijit Muhurat :
        </Text>{' '}
        A highly auspicious time period believed to be favorable for important
        activities, including weddings and other significant events.
      </Text>
      <Text>
        Panchangs are widely used for determining auspicious timings for events,
        festivals, rituals, and ceremonies in Hindu culture. They play a crucial
        role in guiding individuals in planning their activities in harmony with
        the celestial influences for positive outcomes. Panchangs are created
        based on complex calculations involving the positions of celestial
        bodies. They are often prepared by expert astrologers and are available
        in printed formats as well as online.
      </Text>
    </View>
  );
};

export default PanchangText;

const styles = StyleSheet.create({});
