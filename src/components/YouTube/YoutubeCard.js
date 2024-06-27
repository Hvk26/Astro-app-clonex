import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, Dimensions} from 'react-native';
import axios from 'axios';
import Service_URL from '../../utils/Constant';
import {Colors} from '../../utils/Colors';
const {width} = Dimensions.get('screen');
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import YoutubeIframe from 'react-native-youtube-iframe';

const YoutubeCard = () => {
  const [data, setData] = useState([]);
  const [playing, setPlaying] = useState(false);
  const onYoutubeError = error => {
    console.error('Youtube error:', error);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Service_URL}/data.json`);

        if (response.status === 200) {
          setData(response.data.youTube);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  const handlePlay = () => {
    setPlaying(prev => !prev);
  };

  const renderYoutubeCard = ({item}) => (
    <View style={styles.card}>
      <YoutubeIframe
        videoId={item.videoId}
        height={190}
        width={335}
        play={playing}
        onError={onYoutubeError}
        onPress={handlePlay}
        borderColor={Colors.yellow}
        borderWidth={2}
      />
    </View>
  );

  return (
    <View
      style={{
        marginTop: 10,
        marginHorizontal: -2,
      }}>
      <FlatList
        horizontal
        data={data}
        showsHorizontalScrollIndicator={false}
        renderItem={renderYoutubeCard}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.scrollView}
      />
    </View>
  );
};

export default YoutubeCard;

const styles = StyleSheet.create({
  youtubePlayer: {
    height: 200,
  },
  scrollView: {},
  card: {
    borderWidth: 1,
    borderColor: Colors.lightYellow1,
    borderRadius: 10,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    padding: 5,
    marginRight: 10,
    marginLeft: 15,
  },
});
