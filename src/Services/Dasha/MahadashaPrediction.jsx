import React, {useState} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  FlatList,
  ScrollView,
} from 'react-native';
import BackButtonHandler from '../../components/BackButtonHandler/BackButtonHandler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../../utils/Colors';

const MahadashaPrediction = ({dashaDetail}) => {
  const [openedIndex, setOpenedIndex] = useState(null);

  const toggleAccordion = index => {
    setOpenedIndex(openedIndex === index ? null : index);
  };

  const renderAccordionItem = ({item, index}) => (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => toggleAccordion(index)}>
        <View style={styles.header}>
          <Text style={styles.title}>{item.dasha}</Text>
          <AntDesign
            name={openedIndex === index ? 'caretup' : 'caretdown'}
            size={16}
          />
        </View>
      </TouchableWithoutFeedback>
      {openedIndex === index && (
        <View style={styles.content}>
          <Text style={styles.subHeading}>
            Start Year: {item.dasha_start_year}
          </Text>
          <Text style={styles.subHeading}>End Year: {item.dasha_end_year}</Text>
          <View style={{paddingVertical: 8}}>
            <Text style={styles.subHeading}>Planet detail: </Text>
            <Text style={styles.prediction}>{item.planet_in_zodiac}</Text>
          </View>

          <View style={{paddingVertical: 8}}>
            <Text style={styles.subHeading}>Prediction: </Text>
            <Text style={styles.prediction}>{item.prediction}</Text>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <BackButtonHandler>
      <FlatList
        data={dashaDetail}
        renderItem={renderAccordionItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </BackButtonHandler>
  );
};

export default MahadashaPrediction;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    marginTop: 8,
  },
  title: {
    fontWeight: '600',
    color: Colors.green,
    opacity: 0.7,
    fontSize: 16,
    textTransform: 'uppercase',
  },
  details: {
    fontWeight: '400',
    color: Colors.black8,
    opacity: 0.6,
    fontSize: 15,
  },
  subHeading: {
    color: Colors.black8,
    opacity: 0.7,
    fontSize: 15,
    fontWeight: '500',
  },
  prediction: {
    fontWeight: '400',
    color: Colors.grey2,
    opacity: 0.6,
    fontSize: 15,
    textAlign: 'justify',
    lineHeight: 21,
  },
});
