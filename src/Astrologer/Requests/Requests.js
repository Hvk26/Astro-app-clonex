import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React, {useState} from 'react';
import CallRequests from './CallRequests';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import BackButtonHandler from '../../components/BackButtonHandler/BackButtonHandler';
import {Colors} from '../../utils/Colors';
import ChatRequests from './ChatRequests';

const Requests = () => {
  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();
  const [routes] = useState([
    {key: 'first', title: 'Chat Request'},
    {key: 'second', title: 'Call Request'},
  ]);

  const FirstRoute = () => <ChatRequests />;
  const SecondRoute = () => <CallRequests />;

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

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

export default Requests;

const styles = StyleSheet.create({});
