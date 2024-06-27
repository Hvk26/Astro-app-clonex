import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {UserType} from '../../UserContext';
import axios from 'axios';
import Service_URL from '../../utils/Constant';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../utils/Colors';
import {dateFormat} from '../../utils/removeEmptyValues';
import AuthLogin from '../../utils/AuthLogin';

const Report = () => {
  const {userId, setUserId} = useContext(UserType);
  const [grievanceData, setGrivanceData] = useState([]);

  //console.log(userId);
  const navigation = useNavigation();

  useEffect(() => {
    const getGrievance = async () => {
      const response = await axios.get(`${Service_URL}/grievance/${userId}`);
      if (response.status === 200) {
        // console.log(response);
        setGrivanceData(response.data);
      }
    };

    if (userId) {
      getGrievance();
    }
  }, [userId]);

  if (!grievanceData) {
    return (
      <Text
        style={{
          textAlign: 'center',
          fontSize: 15,
          color: Colors.black7,
          fontWeight: 500,
        }}>
        No Data Found
      </Text>
    );
  }
  const reverseReport = [...grievanceData].reverse();
  return userId ? (
    <ScrollView style={{marginHorizontal: 10, marginVertical: 10}}>
      {reverseReport &&
        reverseReport.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                borderWidth: 1,
                borderRadius: 10,
                borderColor: Colors.grey6,
                paddingHorizontal: 5,
                paddingVertical: 5,
                marginBottom: 10,
              }}>
              <Text
                style={{color: Colors.grey3, fontSize: 16, fontWeight: 500}}>
                Ticket number:
                <Text style={{color: Colors.black7}}> {item.reportId}</Text>
              </Text>
              <Text
                style={{color: Colors.grey3, fontSize: 15, fontWeight: 500}}>
                Issue:{' '}
                <Text
                  style={{color: Colors.grey3, fontSize: 15, fontWeight: 400}}>
                  {item.issue}
                </Text>
              </Text>
              <Text
                style={{color: Colors.grey3, fontSize: 15, fontWeight: 500}}>
                Date:{' '}
                <Text
                  style={{color: Colors.grey3, fontSize: 15, fontWeight: 400}}>
                  {dateFormat(item.createdAt)}
                </Text>
              </Text>
              <Text
                style={{color: Colors.grey3, fontSize: 16, fontWeight: 500}}>
                Status:{' '}
                <Text
                  style={{
                    color: item.isResolved ? 'green' : 'red',
                    fontSize: 15,
                    fontWeight: 500,
                  }}>
                  {item.isResolved ? 'Resolved' : 'Pending'}
                </Text>
              </Text>
            </TouchableOpacity>
          );
        })}
    </ScrollView>
  ) : (
    <AuthLogin />
  );
};

export default Report;

const styles = StyleSheet.create({});
