import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../utils';
import {Button, Gap} from '../../atoms';
import DarkProfile from './darkProfile';

const Headers = ({onPress, title, type, photo, desc}) => {
  if (type === 'dark-profile') {
    //kalo mau buat component gunakan CamelCase
    return (
      <DarkProfile
        onPress={onPress}
        title={title}
        type={type}
        photo={photo}
        desc={desc}
      />
    );
  }
  return (
    <View style={styles.page(type)}>
      <Button
        type="icon-only"
        icon={type === 'dark' ? 'back-light' : 'back-dark'}
        onPress={onPress}
      />
      <Text style={styles.text(type)}>{title}</Text>
      <Gap width={24} />
    </View>
  );
};

export default Headers;

const styles = StyleSheet.create({
  //type ini akan condition untuk menentukan colors dll
  page: (type) => ({
    paddingHorizontal: 16,
    paddingVertical: 30,
    //menggunakan param type disini contohnya
    backgroundColor: type === 'dark' ? colors.secondary : colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: type === 'dark' ? 20 : 0,
    borderBottomRightRadius: type === 'dark' ? 20 : 0,
  }),

  text: (type) => ({
    textAlign: 'center',
    flex: 1,
    fontSize: 20,
    fontFamily: fonts.primary.normal,
    color: type === 'dark' ? colors.white : colors.text.primary,
    textTransform: 'capitalize',
  }),
});
