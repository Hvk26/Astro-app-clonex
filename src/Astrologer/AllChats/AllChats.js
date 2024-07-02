import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React, {useState, useLayoutEffect} from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Colors} from '../../utils/Colors';
import BackButtonHandler from '../../components/BackButtonHandler/BackButtonHandler';
import ChatScreen from '../../components/ChatScreens/ChatScreen';
import Calls from '../../components/CallScreen/Calls';
import {useNavigation} from '@react-navigation/native';

const AllChats = () => {
  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();
  const navigation = useNavigation();
  const [routes] = useState([
    {key: 'first', title: 'Chats'},
    {key: 'second', title: 'Calls'},
  ]);
  const FirstRoute = () => <ChatScreen />;
  const SecondRoute = () => <Calls />;

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text
          style={{
            fontSize: 17,
            color: '#000000',
            fontWeight: 500,
          }}>
          All Chats
        </Text>
      ),
    });
  }, []);
  
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: '#000'}}
      style={{backgroundColor: '#fff', height: 40}}
      renderLabel={({route, focused}) => (
        <Text
          style={{
            color: focused ? Colors.pink1 : Colors.black7,
            fontWeight: '600',
          }}>
          {route.title}
        </Text>
      )}
    />
  );
  return (
    <BackButtonHandler>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />
    </BackButtonHandler>
  );
};

export default AllChats;

const styles = StyleSheet.create({});
