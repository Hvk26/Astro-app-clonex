import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../../utils/Colors';

const MahadashaF = ({dashaDetail}) => {
  const {mahadasha, antardasha, paryantardasha, Shookshamadasha, Pranadasha} =
    dashaDetail;

  if (
    !mahadasha ||
    !antardasha ||
    !paryantardasha ||
    !Shookshamadasha ||
    !Pranadasha
  ) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No data available</Text>
      </View>
    );
  }

  const DisplayData = ({data, title}) => {
    return (
      <View style={{marginBottom: 20}}>
        <Text style={styles.title}>{title} </Text>
        {data.map((item, i) => {
          return (
            <View
              style={{
                backgroundColor: Colors.background,
                padding: 5,
                paddingHorizontal: 10,
              }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.content}>
                <Text style={styles.contentTitle}>Start: </Text>
                {item.start}
              </Text>
              <Text style={styles.content}>
                <Text style={styles.contentTitle}>End: </Text>
                {item.end}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <ScrollView style={{padding: 15}}>
      <DisplayData data={mahadasha} title="Mahadasha" />
      <DisplayData data={antardasha} title="Antardasha" />
      <DisplayData data={paryantardasha} title="Paryantardasha" />
      <DisplayData data={Shookshamadasha} title="Shookshamadasha" />
      <DisplayData data={Pranadasha} title="Pranadasha" />
      <View style={{height: 80}}></View>
    </ScrollView>
  );
};

export default MahadashaF;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.green,
    marginBottom: 5,
  },
  name: {
    color: Colors.pink1,
    fontSize: 16,
    fontWeight: '500',
    opacity: 0.7,
  },
  content: {
    fontSize: 15,
    color: Colors.grey2,
  },
  contentTitle: {
    color: Colors.black8,
    fontWeight: '500',
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});
