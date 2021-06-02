import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Doctor1} from '../../assets';
import {Header, List} from '../../component';
import {Fire} from '../../config';
import {colors} from '../../utils';

const ChooseDoctors = ({navigation, route}) => {
  const [listDoctor, setListDoctor] = useState([]);
  const itemCategory = route.params;

  useEffect(() => {
    callDoctorByCategory(itemCategory.category);
  }, []);

  const callDoctorByCategory = (category) => {
    Fire.database()
      .ref('doctors/')
      .orderByChild('category')
      .equalTo(category)
      .once('value')
      .then((res) => {
        console.log('data list Doctor: ', res.val());
        if (res.val()) {
          const oldData = res.val();
          const data = [];
          Object.keys(oldData).map((item) => {
            data.push({
              id: item,
              data: oldData[item],
            });
          });
          console.log('parse list doctor: ', data);
          setListDoctor(data);
        }
      });
  };
  return (
    <View style={styles.page}>
      <Header
        title={`Pilih ${itemCategory.category}`}
        type="dark"
        onPress={() => navigation.goBack()}
      />
      {/* props list doctor di ambil dari index.js ChooseDoctors  */}
      {listDoctor.map((doctor) => {
        return (
          <List
            key={doctor.id}
            type="next"
            profile={{uri: doctor.data.photo}}
            name={doctor.data.fullName}
            desc={doctor.data.gender}
            onPress={() => navigation.navigate('DoctorProfile',doctor)}
          />
        );
      })}
    </View>
  );
};

export default ChooseDoctors;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
