import React, {useState, useCallback, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import {Colors} from '../../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import PaymentLogs from '../Wallet/PaymentLogs';
import Transactions from '../Wallet/Transactions';
import {UserType} from '../../UserContext';
import {getBalance} from '../../utils/UpdateWallet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthLogin from '../../utils/AuthLogin';

const Wallet = () => {
  const navigation = useNavigation();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const handlePress = index => {
    if (index !== focusedIndex) {
      setFocusedIndex(index);
    }
  };

  const {userId, setUserId, addToWallet, setWalletBalance, walletBalance} =
    useContext(UserType);
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    if (userId) {
      getBalance(userId)
        .then(response => {
          setTransaction(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [navigation]);

  let transactionLog = transaction?.transactions;
  return userId ? (
    <ScrollView style={styles.container}>
      <Text style={styles.balanceText}>Available Balance</Text>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceAmount}>₹ {walletBalance}</Text>
        <TouchableOpacity
          style={styles.rechargeButton}
          onPress={() =>
            navigation.navigate('AddMoney', transaction._id, setIndex)
          }>
          <Text style={styles.rechargeButtonText}>Recharge</Text>
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <TouchableOpacity
          style={[
            styles.optionSection,
            focusedIndex === 0 && {backgroundColor: Colors.yellow},
          ]}
          onPress={() => handlePress(0)}>
          <Text
            style={[
              styles.optionText,
              focusedIndex === 0 && {color: Colors.black7},
            ]}>
            Wallet Transactions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.optionSection,
            focusedIndex === 1 && {backgroundColor: Colors.yellow},
          ]}
          onPress={() => handlePress(1)}>
          <Text
            style={[
              styles.optionText,
              focusedIndex === 1 && {color: Colors.black7},
            ]}>
            Payment Logs
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 10}}>
        {focusedIndex === 0 && <Transactions transaction={transactionLog} />}
        {focusedIndex === 1 && <PaymentLogs />}
      </View>
    </ScrollView>
  ) : (
    <AuthLogin />
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  balanceText: {
    color: Colors.grey6,
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
  },

  balanceAmount: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.black7,
  },
  rechargeButton: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.black7,
    backgroundColor: Colors.yellow,
    paddingHorizontal: 25,
    paddingVertical: 7,
  },
  rechargeButtonText: {
    fontSize: 18,
    fontWeight: '400',
    color: Colors.black7,
  },
  optionSection: {
    borderRadius: 15,
    borderWidth: 1.2,
    borderColor: Colors.grey5,
    backgroundColor: '#e6e6e6',
    paddingHorizontal: 20,
    paddingVertical: 7,
  },
  optionText: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.grey3,
  },
});

export default Wallet;
