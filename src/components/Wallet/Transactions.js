import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Colors} from '../../utils/Colors';
import {dateFormat} from '../../utils/removeEmptyValues';

const Transactions = ({transaction}) => {
  if (!transaction) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const amountSign = amount => {
    if (amount > 0) {
      //return `+ ${amount}`;
      return (
        <Text style={{fontSize: 18, fontWeight: 600, color: '#008000'}}>
          + {amount}
        </Text>
      );
    } else {
      return (
        <Text style={{fontSize: 18, fontWeight: 600, color: '#ff0000'}}>
          + {amount}
        </Text>
      );
    }
  };
  const reversedTransactions = [...transaction].reverse();
  return (
    <ScrollView style={{}}>
      {reversedTransactions.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              marginHorizontal: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: Colors.grey6,
              paddingHorizontal: 10,
              paddingVertical: 5,
              marginBottom: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{color: Colors.black7, fontSize: 15, fontWeight: 500}}>
                {item.description}
              </Text>
              <Text
                style={{color: Colors.grey3, fontSize: 14, fontWeight: 400}}>
                {dateFormat(item.date)}
              </Text>
              <Text
                style={{color: Colors.grey3, fontSize: 14, fontWeight: 400}}>
                # {item.transactionId}
              </Text>
            </View>
            <View>
              <Text>{amountSign(item.amount)}</Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default Transactions;

const styles = StyleSheet.create({});
