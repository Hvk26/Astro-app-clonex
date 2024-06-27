import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';

const ContactScreen = () => {
  return (
    <View style={styles.page}>
      <FlatList
        data={astrologerUsers}
        renderItem={({item}) => (
          <View style={styles.astrologerContainer}>
            <Text style={styles.astrologersName}>{item.name}</Text>
          </View>
        )}
        keyExtractor={item => item._id} // Add a unique key extractor
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({});
