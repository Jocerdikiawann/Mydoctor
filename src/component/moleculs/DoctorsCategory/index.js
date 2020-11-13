import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ILCatUmum} from '../../../assets';
import {colors, fonts} from '../../../utils';

const DoctorsCategory = () => {
  return (
    <View style={styles.container}>
      <ILCatUmum style={styles.ilustrasion} />
      <Text style={styles.label}>Saya butuh</Text>
      <Text style={styles.category}>dokter umum</Text>
    </View>
  );
};

export default DoctorsCategory;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: colors.cardLight,
    alignSelf: 'flex-start',
    borderRadius: 10,
    marginRight: 10,
    width: 100,
    height: 130,
  },
  ilustrasion: {
    marginBottom: 28,
  },
  label: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: colors.text.primary,
  },
  category: {
    fontSize: 12,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
});