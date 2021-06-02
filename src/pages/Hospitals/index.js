import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ILBgHospitals} from '../../assets';
import {ListHospitals} from '../../component';
import {Fire} from '../../config';
import {colors, fonts} from '../../utils';

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  useEffect(() => {
    Fire.database()
      .ref('hospitals/')
      .once('value')
      .then((res) => {
        console.log('data: ', res.val());
        if (res.val()) {
          setHospitals(res.val());
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  }, []);

  return (
    <View style={styles.page}>
      <ImageBackground source={ILBgHospitals} style={styles.background}>
        <Text style={styles.title}>Nearby Hospitals</Text>
        <Text style={styles.desc}>Rumah Sakit Tersedia</Text>
      </ImageBackground>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {hospitals.map((item) => {
            return (
              <ListHospitals
                key={item.id}
                type={item.type}
                name={item.title}
                address={item.address}
                image={item.image}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default Hospitals;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.cadangan,
    flex: 1,
  },
  background: {
    height: 240,
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.white,
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    fontFamily: fonts.primary[300],
    color: colors.white,
    marginTop: 6,
    textAlign: 'center',
  },
  content: {
    backgroundColor: colors.white,
    borderRadius: 20,
    marginTop: '-7%',
    flex: 1,
    paddingTop: 14,
  },
});
