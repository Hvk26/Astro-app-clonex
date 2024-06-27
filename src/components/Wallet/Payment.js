import {
  Button,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET} from '@env';
import {useNavigation, useRoute} from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';
import {Colors} from '../../utils/Colors';
import {TextInput} from 'react-native-paper';
import BackButtonHandler from '../BackButtonHandler/BackButtonHandler';
import {walletRecharge} from '../../utils/UpdateWallet';
import {UserType} from '../../UserContext';

const Payment = () => {
  const route = useRoute();
  const keyID = RAZORPAY_KEY_ID;
  //const secretKey = RAZORPAY_KEY_SECRET;
  const value = route?.params;
  console.log(route?.params);
  const currency = 'INR';
  const {userId, setUserId, addToWallet, setWalletBalance, walletBalance} =
    useContext(UserType);
  const [cardHolderName, setCardHolderName] = useState('');
  const [totalAmount, setTotalAmount] = useState(value[0]);
  const [description, setDescription] = useState('');
  const [gst, setGst] = useState(18);
  const [email, setEmail] = useState('');
  const [mob, setMob] = useState('');
  const [name, setName] = useState('');

  const navigation = useNavigation();
  console.log(totalAmount);

  const gstAmount = totalAmount * (gst / 100);
  const totalAmountPaid = gstAmount + totalAmount;

  const handlePayment = async () => {
    var options = {
      description: 'Astrpgini recharge payment',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: currency,
      key: keyID,
      amount: totalAmountPaid * 100,
      name: name,
      order_id: '', //automatically generated
      prefill: {
        email: email,
        contact: mob,
        name: name,
      },
      theme: {color: '#53a20e'},
    };
    await RazorpayCheckout.open(options)
      .then(data => {
        console.log(`Success: ${data.razorpay_payment_id}`);

        walletRecharge({
          transactionId: data.razorpay_payment_id,
          walletId: value[1],
          userId: userId,
          amount: totalAmount,
          description: description,
        }).then(() => {
          addToWallet(totalAmount);
          Alert.alert('Payment Done Successfully ..!!');
        });
      })
      .then(() => {
        navigation.pop();
        navigation.pop();
      })
      .catch(error => {
        Alert.alert('Transaction Failed');
      });
  };
  return (
    <BackButtonHandler>
      <KeyboardAvoidingView>
        <ScrollView>
          <View
            style={{
              marginTop: 15,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: Colors.grey6,
              marginHorizontal: 15,
              paddingVertical: 15,
              backgroundColor: '#fff',
              elevation: 5,
              padding: 10,
            }}>
            <Text
              style={{fontSize: 16, color: Colors.grey3, fontWeight: '600'}}>
              Payment Details
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Text style={styles.paymentItems}>Total Amount</Text>
              <Text style={styles.paymentItems}>₹ {totalAmount}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Text style={styles.paymentItems}>GST ({gst}%)</Text>
              <Text style={styles.paymentItems}>₹ {gstAmount}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Text
                style={[
                  styles.paymentItems,
                  {fontSize: 18, fontWeight: '600'},
                ]}>
                Total Payable Amount
              </Text>
              <Text
                style={[
                  styles.paymentItems,
                  {fontSize: 18, fontWeight: '600'},
                ]}>
                ₹ {totalAmountPaid}
              </Text>
            </View>
          </View>
          <View style={{marginTop: 10, marginHorizontal: 10, gap: 5}}>
            {/* <TextInput
              label="Amount"
              outlineColor={Colors.title1}
              mode="outlined"
              outlineStyle={{borderRadius: 15}}
              keyboardType="numeric"
              contentStyle={{color: Colors.black1}}
              placeholderTextColor={{color: Colors.black1}}
              value={totalAmount}
            /> */}
            <TextInput
              label="Name"
              outlineColor={Colors.title1}
              mode="outlined"
              outlineStyle={{borderRadius: 15}}
              contentStyle={{color: Colors.black1}}
              placeholderTextColor={{color: Colors.black1}}
              onChangeText={text => setName(text)}
            />
            <TextInput
              label="Email"
              outlineColor={Colors.title1}
              mode="outlined"
              outlineStyle={{borderRadius: 15}}
              contentStyle={{color: Colors.black1}}
              placeholderTextColor={{color: Colors.black1}}
              onChangeText={text => setEmail(text)}
            />
            <TextInput
              label="Phone Number"
              outlineColor={Colors.title1}
              mode="outlined"
              keyboardType="numeric"
              outlineStyle={{borderRadius: 15}}
              contentStyle={{color: Colors.black1}}
              placeholderTextColor={{color: Colors.black1}}
              onChangeText={text => setMob(text)}
            />
            <TextInput
              label="Description"
              outlineColor={Colors.title1}
              mode="outlined"
              outlineStyle={{borderRadius: 15}}
              contentStyle={{color: Colors.black1}}
              placeholderTextColor={{color: Colors.black1}}
              value={description}
              onChangeText={text => setDescription(text)}
            />
          </View>
          <TouchableOpacity
            onPress={handlePayment}
            style={{
              marginHorizontal: 20,
              marginVertical: 20,
              alignContent: 'center',
              alignItems: 'center',
              backgroundColor: Colors.primaryGreen,
              borderRadius: 10,
            }}>
            <Text
              style={{
                paddingVertical: 10,
                fontSize: 15,
                fontWeight: '500',
                color: Colors.black7,
              }}>
              Pay Now
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </BackButtonHandler>
  );
};

export default Payment;

const styles = StyleSheet.create({
  paymentItems: {
    fontSize: 14,
    color: Colors.black5,
    fontWeight: '400',
  },
});
