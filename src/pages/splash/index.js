import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ILlogo} from '../../assets';
import {colors, fonts} from '../../utils';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      //replace menonaktifkan button back
      navigation.replace('GetStarted');
    }, 3000);
  }, []);
  return (
    <View style={styles.page}>
      <ILlogo />
      <Text style={styles.title}>MyDoctor</Text>
    </View>
  );
};

export default Splash;
const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 20,
  },
  title: {
    fontSize: 20,
    color: colors.text.primary,
    fontFamily: fonts.primary.normal,
  },
});
