import {
  StyleSheet,
  Text,
  View,
  Modal,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {UserType} from '../../UserContext';
import axios from 'axios';
import Service_URL from '../../utils/Constant';
import {Button} from 'react-native-paper';
import {Table, Row, Column} from 'react-native-table-component';
import {Colors} from '../../utils/Colors';

const transparentColor = 'rgba(0, 0, 0, 0.5)';

const PopUpDetail = ({isVisible, onClose, clientId}) => {
  const {userId, setUserId} = useContext(UserType);
  const [userData, setUserData] = useState({});
  const [error, setError] = useState('');
  const handleClose = () => {
    onClose();
  };
  console.log(clientId, userId);

  useEffect(() => {
    if (!userId) {
      setError('User ID not provided');
      return;
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Service_URL}/userInfo/${clientId}`);
        const data = response.data;

        if (!data) {
          setError('User not found');
        } else {
          setUserData(data);
          setError(null);
        }
      } catch (error) {
        setError('Error fetching user information');
      }
    };
    fetchData();
  }, []);

  
  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            backgroundColor: transparentColor,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.container}>
            <Text style={[styles.title, {position: 'relative', top: 0}]}>
              User Details
            </Text>
            <View>
              {userData.userDetail ? (
                <React.Fragment>
                  <View style={[styles.textContainer, {gap: 70}]}>
                    <Text style={{color: Colors.grey2}}>Name:</Text>
                    <Text style={styles.text}>{userData.userDetail.name}</Text>
                  </View>

                  <View style={[styles.textContainer, {gap: 23}]}>
                    <Text style={{color: Colors.grey2}}>Place of Birth:</Text>
                    <Text style={styles.text}>
                      {userData.userDetail.placeOfBirth}
                    </Text>
                  </View>

                  <View style={[styles.textContainer, {gap: 26}]}>
                    <Text style={{color: Colors.grey2}}>Time Of Birth:</Text>
                    <Text style={styles.text}>
                      {userData.userDetail.timeOfBirth}
                    </Text>
                  </View>

                  <View style={[styles.textContainer, {gap: 24}]}>
                    <Text style={{color: Colors.grey2}}>Date of birth: </Text>
                    <Text style={styles.text}>{userData.userDetail.dob}</Text>
                  </View>
                </React.Fragment>
              ) : (
                <Text>Loading user data...</Text>
              )}
            </View>
            <View style={{flexDirection: 'row', gap: 15, marginTop: 15}}>
              <Button mode="contained" onPress={handleClose}>
                Cancel
              </Button>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default PopUpDetail;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '45%',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textDecorationLine: 'underline',
    textDecorationColor: '#000',
  },

  button: {
    backgroundColor: '#4d4dff',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4d4dff',
  },
  text: {
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 5,
    color: '#000',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
