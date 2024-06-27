import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Linking,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import BackButtonHandler from '../../../../components/BackButtonHandler/BackButtonHandler';
import {Colors} from '../../../../utils/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Service_URL from '../../../../utils/Constant';

const Form16 = () => {
  const pdfUrl = `${Service_URL}/Form16.pdf`;
  const handleDownload = async () => {
    try {
      await Linking.openURL(pdfUrl);
    } catch (error) {
      Alert.alert('Error In downloading');
      console.log(error);
    }
  };
  return (
    <BackButtonHandler>
      <SafeAreaView>
        <View style={{marginVertical: 10, marginHorizontal: 10}}>
          <Text style={{color: Colors.black8, fontSize: 17}}>
            Download Form16 PDF:{' '}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleDownload}
          style={{
            borderWidth: 0.7,
            borderColor: Colors.grey3,
            marginVertical: 10,
            marginHorizontal: 10,
            paddingHorizontal: 50,
            paddingVertical: 10,
            borderRadius: 12,
            backgroundColor: Colors.title2,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 70,
          }}>
          <FontAwesome name="file-pdf-o" size={45} color={Colors.black8} />
          <Text style={{fontSize: 17, color: Colors.black8, fontWeight: '500'}}>
            Download Form 16
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </BackButtonHandler>
  );
};

export default Form16;

const styles = StyleSheet.create({});
