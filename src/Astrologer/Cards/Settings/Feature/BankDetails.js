import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import BackButtonHandler from '../../../../components/BackButtonHandler/BackButtonHandler';
import {Colors} from '../../../../utils/Colors';
import {TextInput, Button} from 'react-native-paper';
import {UserType} from '../../../../UserContext';
import axios from 'axios';
import Service_URL from '../../../../utils/Constant';

const BankDetails = () => {
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const {userId} = useContext(UserType);
  const [userData, setUserData] = useState({});
  const [Error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      if (!userId) return;
      if (!bankName || !accountNumber || !accountHolderName || !ifscCode) {
        Alert.alert('Please fill all the fields');
        return;
      }

      const response = await axios.post(
        `${Service_URL}/astrologer/bank-details/${userId}`,
        {bankName, accountHolderName, accountNumber, ifscCode},
      );

      if (response.status === 200) {
        Alert.alert('Bank details updated');
        setBankName('');
        setAccountNumber('');
        setAccountHolderName('');
        setIfscCode('');
        await fetchData();
      }
    } catch (error) {
      console.error(error);
      Alert.alert('An error occurred while updating bank details');
    }
  };

  useEffect(() => {
    if (!userId) {
      setError('User ID not provided');
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${Service_URL}/userInfo/${userId}`);
      const data = response.data;
      await setUserData(data);
      if (!data) {
        setError('User not found');
      } else {
        //await setUserData(data);
        setError(null);
      }
    } catch (error) {
      setError('Error fetching user information');
    }
  };

  return (
    <BackButtonHandler>
      <ScrollView>
        <KeyboardAvoidingView
          style={{flex: 1, paddingVertical: 10, paddingHorizontal: 10}}>
          <View
            style={{
              borderWidth: 0.7,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 10,
              borderColor: Colors.grey2,
              backgroundColor: Colors.title2,
            }}>
            <Text
              style={{
                color: Colors.black7,
                fontSize: 17,
                fontWeight: '500',
                alignSelf: 'center',
                marginBottom: 15,
                textDecorationLine: 'underline',
              }}>
              Bank Details :
            </Text>
            <Text style={styles.text}>
              Account Holder Name :{' '}
              <Text style={{color: Colors.black7}}>
                {' '}
                {userData?.userBankDetail?.accountHolderName}
              </Text>
            </Text>
            <Text style={styles.text}>
              Bank Name :{' '}
              <Text style={{color: Colors.black7}}>
                {userData?.userBankDetail?.bankName}
              </Text>
            </Text>
            <Text style={styles.text}>
              Account Number :{' '}
              <Text style={{color: Colors.black7}}>
                {' '}
                {userData?.userBankDetail?.accountNumber}
              </Text>
            </Text>

            <Text style={styles.text}>
              IFSC Code :{' '}
              <Text style={{color: Colors.black7}}>
                {' '}
                {userData?.userBankDetail?.ifscCode}
              </Text>
            </Text>
          </View>

          <View
            style={{
              gap: 10,
              borderWidth: 0.7,
              borderRadius: 10,
              borderColor: Colors.grey2,
              paddingVertical: 20,
              marginTop: 20,
              paddingHorizontal: 10,
              backgroundColor: Colors.title2,
            }}>
            <Text
              style={{
                color: Colors.black8,
                fontSize: 17,
                fontWeight: '500',
                textDecorationLine: 'underline',
                textDecorationColor: Colors.black7,
              }}>
              Update Bank Details:
            </Text>
            <TextInput
              mode="outlined"
              label="Account Holder Name"
              value={accountHolderName}
              onChangeText={text => setAccountHolderName(text)}
              outlineColor={Colors.black7}
              outlineStyle={{borderRadius: 15}}
              activeOutlineColor={Colors.title1}
              textColor={Colors.black7}
            />
            <TextInput
              mode="outlined"
              label="Bank Name"
              value={bankName}
              onChangeText={text => setBankName(text)}
              outlineColor={Colors.black7}
              outlineStyle={{borderRadius: 15}}
              activeOutlineColor={Colors.title1}
              textColor={Colors.black7}
            />
            <TextInput
              mode="outlined"
              label="Account Number"
              value={accountNumber}
              onChangeText={text => setAccountNumber(text)}
              outlineColor={Colors.black7}
              outlineStyle={{borderRadius: 15}}
              activeOutlineColor={Colors.title1}
              textColor={Colors.black7}
              keyboardType="numeric"
            />

            <TextInput
              mode="outlined"
              label="IFSC Code"
              value={ifscCode}
              onChangeText={text => setIfscCode(text)}
              outlineColor={Colors.black7}
              outlineStyle={{borderRadius: 15}}
              activeOutlineColor={Colors.title1}
              textColor={Colors.black7}
            />
            <Button
              onPress={handleSubmit}
              mode="contained"
              buttonColor={Colors.black7}
              labelStyle={{fontWeight: '500'}}
              style={{width: '70%', alignSelf: 'center', marginTop: 10}}
              textColor="#fff">
              Submit
            </Button>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </BackButtonHandler>
  );
};

export default BankDetails;

const styles = StyleSheet.create({
  text: {
    color: Colors.grey3,
    fontSize: 16,
    fontWeight: '500',
  },
});
