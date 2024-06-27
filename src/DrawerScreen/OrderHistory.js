import * as React from 'react';
import {View, useWindowDimensions} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';

import WalletTransactions from './WalletTransactions';


export default function OrderHistory() {
  return <WalletTransactions />;
}
