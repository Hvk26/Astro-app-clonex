import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';
import {Table, Row} from 'react-native-table-component';

const PanchangData = ({data}) => {
  return (
    <Table
      borderStyle={{
        borderWidth: 1,
        borderColor: Colors.grey2,
      }}>
      {data.map((rowData, index) => (
        <Row
          key={index}
          data={rowData}
          style={[styles.row, index % 2 && {backgroundColor: '#F7F6E7'}]}
          textStyle={styles.text}
        />
      ))}
    </Table>
  );
};

export default PanchangData;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6, color: Colors.black7},
  row: {flexDirection: 'row', backgroundColor: '#FFF1C1'},
});
