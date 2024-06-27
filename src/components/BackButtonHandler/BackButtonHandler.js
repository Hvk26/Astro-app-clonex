// BackButtonHandler.js

import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const BackButtonHandler = ({children}) => {
  const navigation = useNavigation();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (navigation.canGoBack()) {
          navigation.goBack();
          return true;
        }
        return false;
      },
    );
    return () => {
      backHandler.remove();
    };
  }, [navigation]);

  return children;
};

export default BackButtonHandler;
