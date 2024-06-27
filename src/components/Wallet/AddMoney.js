import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../utils/Colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import BackButtonHandler from '../BackButtonHandler/BackButtonHandler';

const AddMoney = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const walletId = route.params;
  const [balance, setBalance] = useState(50);
  const data = [
    {key: '1', amount: 50, discount: '5'},
    {key: '3', amount: 100, discount: '5'},
    {key: '2', amount: 200, discount: '5'},
    {key: '4', amount: 500, discount: '10'},
    {key: '5', amount: 1000, discount: '10'},
    {key: '6', amount: 2000, discount: '10'},
    {key: '7', amount: 5000, discount: '15'},
    {key: '8', amount: 10000, discount: '15'},
    {key: '9', amount: 25000, discount: '25'},
  ];

  const Item = ({amount, discount}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Payment', [amount, walletId])}>
      <Text
        style={
          ([styles.itemText],
          {
            flex: 0.5,
            paddingTop: 30,
            color: Colors.black7,
            fontSize: 17,
            fontWeight: 500,
          })
        }>
        ₹ {amount}
      </Text>
      <Text
        style={[
          styles.itemText,
          {
            backgroundColor: Colors.pink1,
            flex: 0.45,
            width: '100%',
            textAlign: 'center',
            color: '#fff',
            fontWeight: 'bold',
            paddingTop: 2,
          },
        ]}>
        {discount} % Extra
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => (
    <Item amount={item.amount} discount={item.discount} />
  );
  return (
    <BackButtonHandler>
      <View style={{marginTop: 10, marginHorizontal: 15}}>
        <View style={{}}>
          <Text style={styles.balanceText}>Add Money</Text>
          <Text style={styles.balanceAmount}>₹ {balance}</Text>
        </View>

        <FlatList
          data={data}
          renderItem={renderItem}
          numColumns={3}
          contentContainerStyle={styles.gridContainer}
        />
      </View>
    </BackButtonHandler>
  );
};

export default AddMoney;

const styles = StyleSheet.create({
  gridContainer: {
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 90,
    width: 110,
    margin: 10,
    borderRadius: 10,
    elevation: 4,
    borderColor: Colors.primaryYellow,
    borderWidth: 1,
  },
  itemText: {
    fontSize: 15,
    color: Colors.black7,
  },
  balanceText: {
    color: Colors.grey6,
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 1,
  },

  balanceAmount: {
    fontSize: 30,
    fontWeight: '600',
    color: Colors.black7,
  },
});
