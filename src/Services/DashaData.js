import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Table, Row} from 'react-native-table-component';

const DashaData = ({dashaChart}) => {
  console.log('data: ', dashaChart);
  const tableHead = ['Planet', 'Start', 'End'];

  const tableData = Object.keys(dashaChart).map(key => [
    dashaChart[key].planet,
    dashaChart[key].start,
    dashaChart[key].end,
  ]);
  return (
    <View style={styles.container}>
      <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text} />
        {tableData.map((rowData, index) => (
          <Row
            key={index}
            data={rowData}
            style={index % 2 === 1 ? styles.rowOdd : styles.rowEven}
            textStyle={styles.text}
          />
        ))}
      </Table>
    </View>
  );
};

export default DashaData;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 12, paddingTop: 30, backgroundColor: '#ffffd8'},
  head: {
    height: 40,
    backgroundColor: '#808B97, color:"#000',
    fontWeight: '500',
  },
  text: {margin: 6, color: '#000', fontWeight: '400'},
  row: {flexDirection: 'row', backgroundColor: '#FFF1C1'},
});
