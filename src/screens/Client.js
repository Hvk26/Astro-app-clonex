import React, {useState, useEffect, useLayoutEffect, useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Service_URL from '../utils/Constant';

const Client = () => {
  const navigation = useNavigation();
  const [clientUsers, setClientrUsers] = useState([]);

  useEffect(() => {
    async function fetchAstrologers() {
      try {
        const response = await axios.get(`${Service_URL}/client`);
        setClientrUsers(response.data);

        console.log(response.data);
      } catch (error) {
        console.log('Error:', error);
      }
    }

    fetchAstrologers();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <Text style={{fontSize: 25, fontWeight: 'bold', color: '#000000'}}>
          Users
        </Text>
      ),
    });
  });

  const callUser = user => {
    //console.warn('clicked');
    navigation.navigate('CallingScreen', {user});
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <View style={styles.page}>
        <FlatList
          data={clientUsers}
          renderItem={({item}) => (
            <Pressable
              style={styles.astrologerContainer}
              onPress={() => callUser(item)}>
              <Text style={styles.astrologersName}>{item.name}</Text>
            </Pressable>
          )}
          keyExtractor={item => item._id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  page: {
    padding: 15,
  },
  astrologerContainer: {
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#cccc00',
    marginBottom: 10,
  },
  astrologersName: {
    fontSize: 26,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    width: '90%',
    fontSize: 18,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});
export default Client;
