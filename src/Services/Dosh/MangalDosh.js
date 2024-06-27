import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';

const MangalDosh = ({data}) => {
  if (!data || !data.response) {
    // If data or doshaData is not defined, return an empty view or handle it accordingly
    return <View />;
  }
  const doshaData = data.response;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mangal Dosha Details</Text>
      {doshaData.factors && Object.keys(doshaData.factors).length > 0 ? (
        <View style={styles.factorContainer}>
          {Object.keys(doshaData.factors).map((factor, index) => (
            <View key={index} style={styles.factorItem}>
              <Text style={styles.factorTitle}>
                {factor.toLocaleUpperCase()}
              </Text>
              <Text style={styles.factorDescription}>
                {doshaData.factors[factor]}
              </Text>
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.noFactors}>No factors available</Text>
      )}
      <Text style={styles.botResponse}>{doshaData.bot_response}</Text>
      <Text style={styles.score}>Mangal Dosha Score: {doshaData.score}%</Text>
      {doshaData.is_dosha_present && (
        <Text style={styles.advice}>It is good to consult an astrologer</Text>
      )}
      {doshaData.cancellation && (
        <View style={styles.cancellationContainer}>
          <Text style={styles.cancellationTitle}>Cancellation Details</Text>
          <Text style={styles.cancellationScore}>
            Cancellation Score: {doshaData.cancellation.cancellationScore}
          </Text>
          <Text style={styles.cancellationReason}>
            Cancellation Reason:{' '}
            {doshaData.cancellation.cancellationReason.join(', ')}
          </Text>
        </View>
      )}
    </View>
  );
};

export default MangalDosh;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  factorContainer: {
    marginBottom: 10,
  },
  factorItem: {
    marginBottom: 5,
  },
  factorTitle: {
    fontWeight: '600',
    fontSize: 16,
    color: '#555',
    textDecorationLine: 'underline',
  },
  factorDescription: {
    color: Colors.grey3,
    fontSize: 15,
    fontWeight: '500',
  },
  botResponse: {
    fontSize: 16,
    marginBottom: 10,
    color: Colors.grey3,
    fontWeight: '500',
  },
  score: {
    fontSize: 16,
    marginBottom: 10,
    color: '#444',
  },
  advice: {
    fontSize: 16,
    marginBottom: 10,
    color: 'green',
  },
  cancellationContainer: {
    backgroundColor: '#ffe4e1',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  cancellationTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#c00',
  },
  cancellationScore: {
    color: '#c00',
  },
  cancellationReason: {
    color: '#c00',
  },
});
