import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Doctor1, Doctor2, Doctor3} from '../../assets';
import {
  DoctorsCategory,
  Gap,
  HomeProfile,
  NewsItem,
  RatedDoctors,
} from '../../component';
import {Fire} from '../../config';
import {colors, fonts, showError} from '../../utils';

const Doctors = ({navigation}) => {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getNews();
    getCatDoc();
    getTopRatedDoctor();
  }, []);

  const getCatDoc = () => {
    Fire.database()
      .ref('category_doctor/')
      .once('value')
      .then((res) => {
        console.log('category doctor : ', res.val());
        if (res.val()) {
          const data = res.val();
          const filterData = data.filter((el) => el !== null);
          console.log('data hasil filter: ', filterData);
          setCategory(filterData);
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  const getTopRatedDoctor = () => {
    Fire.database()
      .ref('doctors/')
      .orderByChild('rate')
      .limitToLast(3)
      .once('value')
      .then((res) => {
        console.log('Top Rated : ', res.val());
        if (res.val()) {
          const oldData = res.val();
          const data = [];
          Object.keys(oldData).map((key) => {
            data.push({
              id: key,
              data: oldData[key],
            });
          });
          console.log('data hasil parse : ', data);
          setDoctors(data);
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  const getNews = () => {
    Fire.database()
      .ref('news/')
      .once('value')
      .then((res) => {
        console.log('data news: ', res.val());
        if (res.val()) {
          const data = res.val();
          const filterData = data.filter((el) => el !== null);
          console.log('data hasil filter news: ', filterData);
          setNews(filterData);
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapperSection}>
            <Gap height={30} />
            <HomeProfile onPress={() => navigation.navigate('UserProfile')} />
            <Text style={styles.welcome}>
              Mau konsultasi dengan siapa hari ini?
            </Text>
          </View>
          <View style={styles.wrapperScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.category}>
                <Gap width={32} />
                {
                  //mapping data dari json
                  //setiap perulangan tambah key, yang unique
                  category.map((item) => {
                    return (
                      <DoctorsCategory
                        key={item.id}
                        category={item.category}
                        onPress={() =>
                          navigation.navigate('ChooseDoctors', item)
                        }
                      />
                    );
                  })
                }
                <Gap width={22} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
            {doctors.map((doctor) => {
              return (
                <RatedDoctors
                  key={doctor.id}
                  name={doctor.data.fullName}
                  desc={doctor.data.profession}
                  rate={doctor.data.rate}
                  avatar={{uri: doctor.data.photo}}
                  onPress={() => navigation.navigate('DoctorProfile', doctor)}
                />
              );
            })}
            <Text style={styles.sectionLabel}>Good News</Text>
          </View>
          {news.map((item) => {
            return (
              <NewsItem
                key={item.id}
                title={item.title}
                date={item.date}
                image={item.image}
              />
            );
          })}
          <Gap height={30} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Doctors;

const width_proportion = '65%';

const styles = StyleSheet.create({
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
  },
  wrapperSection: {
    paddingHorizontal: 16,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  container: {
    backgroundColor: colors.cadangan,
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
    maxWidth: width_proportion,
  },
  category: {
    flexDirection: 'row',
  },
  wrapperScroll: {
    marginHorizontal: -16,
  },
});
