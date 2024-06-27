import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Linking,
  Pressable,
  Dimensions,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../utils/Colors';
import Zocial from 'react-native-vector-icons/Zocial';
import BackButtonHandler from '../components/BackButtonHandler/BackButtonHandler';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
const {width} = Dimensions.get('screen');
const ContactUs = () => {
  const [message, setMessage] = useState('');

  const openDialScreen = () => {
    let number = '';
    if (Platform.OS === 'ios') {
      number = 'telprompt:${+919554445866}';
    } else {
      number = 'tel:${+919554445866}';
    }
    Linking.openURL(number);
  };
  const handleWhatsapp = () => {
    Linking.openURL('https://wa.me/919554445866');
  };
  return (
    <BackButtonHandler style={{maxWidth: width}}>
      <ScrollView style={{marginHorizontal: 10, marginVertical: 10}}>
        <Text
          style={{
            backgroundColor: Colors.secondaryYellow,
            textAlign: 'center',
            padding: 2,
            fontSize: 16,
            borderRadius: 25,
            fontFamily: 'Poppins-SemiBold',
            color: Colors.black8,
            paddingTop: 10,
            paddingBottom: 7,
            marginTop: 10,
          }}>
          Contact Us
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            color: Colors.black1,
            marginVertical: 6,
            fontFamily: 'Poppins-Regular',
            marginTop: 15,
          }}>
          We are available 24 hrs for you
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 14,
            color: Colors.black1,
            fontFamily: 'Poppins-Regular',
          }}>
          If you have any further questions or queries please do not hesitate to
          get in touch
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'baseline',
            marginBottom: 10,
            marginTop: 20,
          }}>
          <TouchableOpacity
            onPress={openDialScreen}
            style={{alignContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../assets/icons/Call.png')}
              style={styles.image}
            />
            <Text style={[styles.textStyle, {marginTop: 5, marginBottom: -4}]}>
              Call Us
            </Text>
            <Text style={styles.textStyle}>(+91) 955 444 5866</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL('mailto:info@astrogini.com')}
            style={{alignContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../assets/icons/Email.png')}
              style={styles.image}
            />
            <Text style={[styles.textStyle, {marginTop: 5, marginBottom: -4}]}>
              Get Info
            </Text>
            <Text style={styles.textStyle}>info@astrogini.net</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'baseline',
            marginBottom: 10,
            marginTop: 10,
          }}>
          <TouchableOpacity
            onPress={() => Linking.openURL('mailto:support@astrogini.com')}
            style={{alignContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../assets/icons/Email.png')}
              style={styles.image}
            />
            <Text style={[styles.textStyle, {marginTop: 5, marginBottom: -4}]}>
              Get Support
            </Text>
            <Text style={styles.textStyle}>support@astrogini.net</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL('mailto:grivance@astrogini.com')}
            style={{alignContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../assets/icons/Email.png')}
              style={styles.image}
            />
            <Text style={[styles.textStyle, {marginTop: 5, marginBottom: -4}]}>
              Report At
            </Text>
            <Text style={styles.textStyle}>grievance@astrogini.net</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 10}}>
          <TouchableOpacity
            onPress={handleWhatsapp}
            style={{alignContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../assets/icons/WhatsApp.png')}
              style={styles.image}
            />
            <Text style={[styles.textStyle, {marginTop: 5, marginBottom: -4}]}>
              WhatsApp
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderColor: Colors.grey3,
            paddingVertical: 15,
            paddingHorizontal: 20,
            shadowColor: Colors.yellow,
            elevation: 1,
            shadowOffset: {width: 1, height: 1},
            shadowOpacity: 0.3,
            shadowRadius: 10,
            borderWidth: 0.2,
            borderRadius: 6,
            marginTop: 20,
          }}>
          <Text
            style={{
              backgroundColor: Colors.secondaryYellow,
              textAlign: 'center',
              padding: 2,
              fontSize: 16,
              borderRadius: 25,
              fontFamily: 'Poppins-SemiBold',
              color: Colors.black8,
              paddingTop: 10,
              paddingBottom: 7,
              marginTop: 10,
              marginBottom: 6,
            }}>
            Official Details
          </Text>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              gap: 6,
              alignItems: 'center',
            }}>
            <FontAwesome6
              name="location-dot"
              size={20}
              color={Colors.secondaryYellow}
            />
            <Text
              style={{
                fontSize: 14,
                color: Colors.grey2,
                fontWeight: 400,
                textAlign: 'justify',
              }}>
              Astrogini Services Pvt. Ltd. Plot No 99, IIM Road , Lucknow (UP)
              226201
            </Text>
          </View>
          <Pressable
            onPress={openDialScreen}
            style={{
              marginTop: 10,
              flexDirection: 'row',
              gap: 6,
              alignItems: 'center',
            }}>
            <FontAwesome
              name="mobile-phone"
              size={24}
              color={Colors.secondaryYellow}
            />
            <Text style={styles.textStyle}>(+91) 955 444 5866</Text>
          </Pressable>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              gap: 6,
              alignItems: 'center',
            }}>
            <FontAwesome
              name="whatsapp"
              size={20}
              color={Colors.secondaryYellow}
            />
            <Text style={styles.textStyle} onPress={handleWhatsapp}>
              Astrogini
            </Text>
          </View>
          <Pressable
            onPress={() => Linking.openURL('mailto:info@astrogini.org')}
            style={{
              marginTop: 10,
              flexDirection: 'row',
              gap: 6,
              alignItems: 'center',
            }}>
            <Zocial name="email" size={18} color={Colors.secondaryYellow} />
            <Text style={styles.textStyle}>info@astrogini.net</Text>
          </Pressable>

          <Pressable
            onPress={() => Linking.openURL('mailto:support@astrogini.org')}
            style={{
              marginTop: 10,
              flexDirection: 'row',
              gap: 6,
              alignItems: 'center',
            }}>
            <Zocial name="email" size={18} color={Colors.secondaryYellow} />
            <Text style={styles.textStyle}>support@astrogini.net</Text>
          </Pressable>
          <Text
            style={{
              fontSize: 16,
              color: Colors.black7,
              fontWeight: 600,
              marginTop: 4,
              marginTop: 10,
              marginBottom: 7,
            }}>
            Suggestions :
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Colors.black1,
              textAlign: 'justify',
              marginHorizontal: 4,
              fontFamily: 'Poppins-Regular',
              marginBottom: 8,
            }}>
            We will be glad to hear from you about any business idea OR
            suggestion. If you want to be a part of our Astrogini Family or want
            to do business with us please do contact us.
          </Text>
        </View>
      </ScrollView>
    </BackButtonHandler>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 13,
    color: Colors.grey2,
    fontFamily: 'Poppins-Regular',
  },
  image: {
    height: 50,
    width: 50,
  },
});
