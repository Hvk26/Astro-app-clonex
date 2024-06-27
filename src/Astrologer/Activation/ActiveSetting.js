import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';
import {Switch} from 'react-native-paper';
const {width} = Dimensions.get('screen');
const ActiveSetting = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  console.log(isSwitchOn);
  return (
    <View style={styles.container}>
      <Text style={{color: Colors.black7, fontSize: 15, fontWeight: 500}}>
        Special offer to attract new users!
      </Text>
      <View style={styles.switchContainer}>
        <Text style={{color: Colors.black7, fontWeight: '500'}}>
          Free Users
        </Text>
        <View>
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        </View>
      </View>
      <View style={styles.switchContainer}>
        <Text style={{color: Colors.black7, fontWeight: '500'}}>
          Paid Users
        </Text>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      </View>
      <View style={styles.switchContainer}>
        <Text
          style={{color: Colors.black7, fontWeight: '500', marginRight: 10}}>
          Premium
        </Text>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      </View>
      <View style={styles.switchContainer}>
        <Text style={{color: Colors.black7, fontWeight: '500'}}>Foreign</Text>
        <Switch
          value={isSwitchOn}
          onValueChange={onToggleSwitch}
          style={{marginLeft: 20}}
        />
      </View>
    </View>
  );
};

export default ActiveSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: Colors.title2,
    paddingHorizontal: 10,
    paddingVertical: 10,

    borderRadius: 20,
  },
  switchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: width / 1.9,
    paddingLeft: 20,
  },
});
