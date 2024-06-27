import AsyncStorage from '@react-native-async-storage/async-storage';
import Service_URL from './Constant';

export const handleRequest = async (currentId, selectedUserId) => {
  // Find the index of the user by selectedUserId
  if (userId) {
    try {
      const response = await axios.post(`${Service_URL}/request`, {
        currentId,
        selectedUserId,
      });

      if (response.status === 200) {
        // Create a new array with updated user state
        Alert.alert('Request send..');
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  }
};
