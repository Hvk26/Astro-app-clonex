import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import BackButtonHandler from '../components/BackButtonHandler/BackButtonHandler';
import {Colors} from '../utils/Colors';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Wallet from '../components/Tabs/Wallet';
import Call from '../components/Tabs/Call';
import Chat from '../components/Tabs/Chat';
import Report from '../components/Tabs/Report';
import {UserType} from '../UserContext';
import {getBalance} from '../utils/UpdateWallet';

const WalletTransactions = () => {
  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();
  const [routes] = useState([
    {key: 'first', title: 'Wallet'},
    {key: 'second', title: 'Call'},
    {key: 'third', title: 'Chat'},
    {key: 'fourth', title: 'Report'},
  ]);

  const FirstRoute = () => <Wallet />;
  const SecondRoute = () => <Call />;
  const ThirdRoute = () => <Chat />;
  const FourthRoute = () => <Report />;

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

export default WalletTransactions;

const styles = StyleSheet.create({});
