import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Doctor1} from '../../../assets';
import {colors, fonts} from '../../../utils';

const Other = ({text, date, photo}) => {
  return (
    <View style={styles.container}>
      <Image source={photo} style={styles.profilDoc} />
      <View>
        <View style={styles.chatContent}>
          <Text style={styles.text}>{text}</Text>
        </View>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
};

export default Other;

const styles = StyleSheet.create({
  profilDoc: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    marginRight: 12,
  },
  container: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-end',
    paddingLeft: 16,
  },
  chatContent: {
    padding: 12,
    paddingRight: 18,
    marginRight:100,
    backgroundColor: colors.primary,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    color: colors.white,
  },
  date: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginTop: 8,
  },
});
