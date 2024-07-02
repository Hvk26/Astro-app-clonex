import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import React from 'react';
import BackButtonHandler from '../../components/BackButtonHandler/BackButtonHandler';
import {Colors} from '../../utils/Colors';

const ChardashaS = ({dashaDetail}) => {
  const Dasha = ({dasha}) => {
    const {
      main_dasha,
      main_dasha_lord,
      sub_dasha_list,
      sub_dasha_end_dates,
      sub_dasha_start_date,
    } = dasha;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.label}>Dasha: </Text>
          <Text style={styles.value}>{main_dasha}</Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.label}>Dasha Lord: </Text>
          <Text style={styles.value}>{main_dasha_lord}</Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.label}>Dasha Start Date: </Text>
          <Text style={styles.value}>
            {new Date(sub_dasha_start_date).toDateString()}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: '',
            marginBottom: 10,
            marginLeft: 35,
          }}>
          <Text
            style={{
              width: '50%',
              color: Colors.green,
              fontWeight: '600',
              fontSize: 16,
            }}>
            Dasha Name
          </Text>
          <Text style={{color: Colors.green, fontWeight: '600', fontSize: 16}}>
            End Date
          </Text>
        </View>
        <FlatList
          data={sub_dasha_list?.map((dasha, index) => ({
            dasha,
            endDate: sub_dasha_end_dates[index],
          }))}
          renderItem={({item}) => (
            <View style={styles.itemContainer}>
              <View style={{width: '50%'}}>
                <Text style={styles.value}>{item.dasha}</Text>
              </View>

              <View style={{width: '50%'}}>
                <Text style={styles.value}>
                  {new Date(item.endDate).toDateString()}
                </Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };
  console.log('>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<', dashaDetail);
  return (
    <ScrollView style={{paddingHorizontal: 10}}>
      {Array.isArray(dashaDetail) &&
        dashaDetail.map((dasha, index) => <Dasha key={index} dasha={dasha} />)}
      <View style={{height: 80}}></View>
    </ScrollView>
  );
};

export default ChardashaS;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    marginTop: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
    color: Colors.green,
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    color: Colors.black7,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: 35,
  },
});
