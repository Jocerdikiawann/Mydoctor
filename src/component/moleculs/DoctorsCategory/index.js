import React from 'react';
import {StyleSheet, Text,TouchableOpacity} from 'react-native';
import {ILCatAnak, ILCatObat, ILCatPsikiater, ILCatUmum} from '../../../assets';
import {colors, fonts} from '../../../utils';

//props atau properti
const DoctorsCategory = ({category, onPress}) => {
  const Icon = () =>{
    if(category==='dokter umum'){
      return <ILCatUmum style={styles.ilustrasion}/>
    }
    if(category==='psikiater'){
      return <ILCatPsikiater style={styles.ilustrasion}/>
    }
    if(category==='dokter obat'){
      return <ILCatObat style={styles.ilustrasion}/>
    }
    if(category==='dokter anak'){
      return <ILCatAnak style={styles.ilustrasion}/>
    }


    return <ILCatUmum style={styles.ilustrasion}/>
  }
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon/>
      <Text style={styles.label}>Saya butuh</Text>
      <Text style={styles.category}>{category}</Text>
    </TouchableOpacity>
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
