import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React, {useState} from 'react';
import DefaultTab from './AboutUsTab/DefaultTab';
import OurMission from './AboutUsTab/OurMission';
import OurVision from './AboutUsTab/OurVision';
import OurStory from './AboutUsTab/OurStory';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import BackButtonHandler from '../components/BackButtonHandler/BackButtonHandler';
import {Colors} from '../utils/Colors';

const Aboutus = () => {
  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();
  const [routes] = useState([
    {key: 'first', title: 'About Us'},
    {key: 'second', title: 'Mission'},
    {key: 'third', title: 'Vision'},
    {key: 'fourth', title: 'Story'},
  ]);
  const FirstRoute = () => <DefaultTab />;
  const SecondRoute = () => <OurMission />;
  const ThirdRoute = () => <OurVision />;
  const FourthRoute = () => <OurStory />;

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute,
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

export default Aboutus;

const styles = StyleSheet.create({});
