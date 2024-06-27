import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import YoutubeCard from '../../../../components/YouTube/YoutubeCard';
import {Colors} from '../../../../utils/Colors';

const TrainingReels = () => {
  return (
    <View>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 17,
          paddingVertical: 15,
          color: Colors.black7,
          fontWeight: '500',
          textDecorationLine: 'underline',
        }}>
        Training Videos
      </Text>
      <YoutubeCard />
    </View>
  );
};

export default TrainingReels;

const styles = StyleSheet.create({});
