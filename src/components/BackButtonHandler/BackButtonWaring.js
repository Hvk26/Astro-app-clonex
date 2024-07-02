// BackButtonHandlerWithPrompt.js

import React, {useEffect, useState} from 'react';
import {BackHandler, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const BackButtonWarning = ({children}) => {
  const navigation = useNavigation();
  const [promptVisible, setPromptVisible] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (navigation.canGoBack() && !promptVisible) {
          setPromptVisible(true);
          return true;
        } else if (promptVisible) {
          setPromptVisible(false);
          return true; // Prevent default back button behavior
        }
        return false; // Default back button behavior
      },
    );

    return () => {
      backHandler.remove();
    };
  }, [navigation]);

  const handleConfirm = () => {
    navigation.goBack();
    setPromptVisible(false);
  };

  const handleCancel = () => {
    setPromptVisible(false);
  };

  return (
    <>
      {children}
      {promptVisible &&
        Alert.alert(
          'Warning',
          'Do you want to end the chat?',
          [
            {text: 'Yes', onPress: handleConfirm},
            {text: 'No', onPress: handleCancel, style: 'cancel'},
          ],
          {cancelable: false},
        )}
    </>
  );
};

export default BackButtonWarning;
