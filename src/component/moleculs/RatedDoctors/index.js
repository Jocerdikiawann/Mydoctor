import React from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import {IconStar, IconStarKosong} from '../../../assets';
import {colors, fonts} from '../../../utils';

const RatedDoctors = ({name, avatar, desc, rate, onPress}) => {
  const IconStaring = () => {
    if (rate === 1) {
      return <IconStar />;
    }
    if (rate === 2) {
      return (
        <>
          <IconStar />
          <IconStar />
        </>
      );
    }
    if (rate === 3) {
      return (
        <>
          <IconStar />
          <IconStar />
          <IconStar />
        </>
      );
    }
    if (rate === 4) {
      return (
        <>
          <IconStar />
          <IconStar />
          <IconStar />
          <IconStar />
        </>
      );
    }
    if (rate === 5) {
      return (
        <>
          <IconStar />
          <IconStar />
          <IconStar />
          <IconStar />
          <IconStar />
        </>
      );
    }
    return <IconStarKosong />;
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={avatar} style={styles.avatar} />
      <View style={styles.profile}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.category}>{desc}</Text>
      </View>
      <View style={styles.rate}>
        <IconStaring />
      </View>
    </TouchableOpacity>
  );
};

export default RatedDoctors;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
  category: {
    fontSize: 12,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginTop: 2,
  },
  profile: {
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginRight: 12,
  },
  rate: {
    flexDirection: 'row',
  },
});
