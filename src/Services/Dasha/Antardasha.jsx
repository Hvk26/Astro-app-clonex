import {StyleSheet, Text, View, FlatList, ScrollView} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';

const Antardasha = ({dashaDetail}) => {
  const {antardasha_order, antardashas} = dashaDetail;

  if (!antardashas || !antardasha_order) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No data available</Text>
      </View>
    );
  }

  const AntardashaItem = ({antardasha, dates}) => (
    <View style={styles.antardashaContainer}>
      <FlatList
        data={antardasha.map((dasha, index) => ({
          dasha,
          startDate: dates[index],
          endDate: dates[index + 1] || 'N/A',
        }))}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <View style={styles.dashaNameContainer}>
              <Text style={styles.value}>{item.dasha}</Text>
            </View>
            <View style={styles.dateContainer}>
              {/* <Text style={styles.value}>
                {new Date(item.startDate).toDateString()}
              </Text> */}
              <Text style={styles.value}>
                {/* {item.endDate !== 'N/A'
                  ? new Date(item.endDate).toDateString()
                  : 'N/A'} */}
                {item.endDate}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );

  const DashaItem = ({dasha, index}) => (
    <View style={styles.dashaContainer}>
      <Text style={styles.mainDasha}>Main Dasha: {dasha[0].split('/')[0]}</Text>
      <AntardashaItem
        antardasha={antardashas[index]}
        dates={antardasha_order[index]}
      />
    </View>
  );

  return (
    <ScrollView style={{paddingHorizontal: 10}}>
      {antardashas.map((dasha, index) => (
        <DashaItem key={index} dasha={dasha} index={index} />
      ))}
      <View style={{height: 80}}></View>
    </ScrollView>
  );
};

export default Antardasha;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  dashaContainer: {
    padding: 10,
    borderWidth: 1,
    marginTop: 15,
  },
  mainDasha: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.green,
    marginBottom: 10,
  },
  antardashaContainer: {
    marginLeft: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  dashaNameContainer: {
    width: '50%',
  },
  dateContainer: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  value: {
    fontSize: 16,
    color: Colors.black7,
  },
});
