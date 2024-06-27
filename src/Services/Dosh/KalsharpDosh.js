import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';

const KalsharpDosh = ({data}) => {
  if (!data || !data.response) {
    // If data or doshaData is not defined, return an empty view or handle it accordingly
    return <View />;
  }
  const doshaData = data.response;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Kaal Sarp Dosh Details</Text>
      {doshaData.dosha_type ? (
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.subtitle}>Dosha Type:</Text>
          <Text style={{color: '#222222', fontSize: 16, fontWeight: '500'}}>
            {doshaData.dosha_type}
          </Text>
        </View>
      ) : (
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.subtitle}>Dosha Type: </Text>
          <Text style={{color: '#222222', fontSize: 16, fontWeight: '500'}}>
            No Dosha Present
          </Text>
        </View>
      )}
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.subtitle}>Dosha Presence:</Text>
        <Text style={{color: '#222222', fontSize: 16, fontWeight: '500'}}>
          {' '}
          {doshaData.is_dosha_present ? 'Present' : 'Not Present'}
        </Text>
      </View>

      <View style={{flexDirection: 'row'}}>
        <Text style={styles.subtitle}>Dosha present Mars from Moon: </Text>
        <Text style={{color: '#222222', fontSize: 16, fontWeight: '500'}}>
          {doshaData.is_dosha_present_mars_from_moon
            ? 'Present'
            : 'Not Present'}
        </Text>
      </View>

      <View style={{flexDirection: 'row'}}>
        <Text style={styles.subtitle}>Dosha present Mars from Lagna: </Text>
        <Text style={{color: '#222222', fontSize: 16, fontWeight: '500'}}>
          {doshaData.is_dosha_present_mars_from_lagna
            ? 'Present'
            : "'Not Present'"}
        </Text>
      </View>

      <View style={{flexDirection: 'row'}}>
        <Text style={styles.subtitle}>Dosha Direction: </Text>
        <Text style={{color: '#222222', fontSize: 16, fontWeight: '500'}}>
          {doshaData.dosha_direction}
        </Text>
      </View>

      <View style={{flexDirection: 'row'}}>
        <Text style={styles.subtitle}>Rahu-Ketu Axis:</Text>
        <Text style={{color: '#222222', fontSize: 16, fontWeight: '500'}}>
          {doshaData.rahu_ketu_axis}
        </Text>
      </View>
      <Text style={styles.botResponse}>{doshaData.bot_response}</Text>
      <Text style={styles.remediesTitle}>Remedies:</Text>
      {doshaData.remedies && doshaData.remedies.length > 0 ? (
        <View>
          <Text style={styles.remediesTitle}>Remedies:</Text>
          <View style={styles.bulletPointsContainer}>
            {doshaData.remedies.map((remedy, index) => (
              <View key={index} style={styles.bulletPointItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.remedyItem}>{remedy}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <Text style={styles.remediesTitle}>No remedies available</Text>
      )}
    </ScrollView>
  );
};

export default KalsharpDosh;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
    color: '#616161',
    fontWeight: '500',
  },
  botResponse: {
    fontSize: 16,
    marginBottom: 2,
    color: 'green',
  },
  remediesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  remedyItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  bulletPointsContainer: {
    marginLeft: 20, // Adjust as needed
  },
  bulletPointItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  bulletPoint: {
    fontSize: 16,
    marginRight: 5,
    color: '#333', // Adjust color as needed
  },
});
