import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Doctor1} from '../../../assets';
import {colors, fonts} from '../../../utils';
import {Button} from '../../atoms';

const darkProfile = ({onPress, title, desc, photo}) => {
  return (
    <View style={styles.container}>
      <Button type="icon-only" icon="back-light" onPress={onPress} />
      <View style={styles.content}>
        <Text style={styles.name}>{title}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>
      <Image source={photo} style={styles.avatar} />
    </View>
  );
};

export default darkProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cadangan,
    paddingVertical: 30,
    paddingLeft: 20,
    paddingRight: 16,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
  },
  name: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.white,
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    marginTop: 6,
    textAlign: 'center',
    color: colors.text.subTitle,
    textTransform: 'capitalize',
  },
});
