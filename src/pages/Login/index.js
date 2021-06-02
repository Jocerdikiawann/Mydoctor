import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {ILlogo} from '../../assets';
import {Button, Gap, Input, Link} from '../../component';
import {Fire} from '../../config';
import {colors, fonts, showError, storeData, useForm} from '../../utils';

const width_proportion = '80%';
const Login = ({navigation}) => {
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  //fungsi login
  const login = () => {
    dispatch({
      type: 'SET_LOADING',
      value: true,
    });
    Fire.auth()
      .signInWithEmailAndPassword(form.email, form.password)
      .then((res) => {
        dispatch({
          type: 'SET_LOADING',
          value: false,
        });
        Fire.database()
          //penulisan es6
          .ref(`users/${res.user.uid}/`)
          .once('value')
          .then((resDB) => {
            if (resDB.val()) {
              storeData('user', resDB.val());
              navigation.replace('MainApp');
            }
          });
      })
      .catch((err) => {
        dispatch({
          type: 'SET_LOADING',
          value: false,
        });
        showError(err.message);
      });
  };

  return (
    <View style={styles.page}>
      <Gap height={40} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ILlogo />
        <Text style={styles.title}>Masuk dan mulai berkonsultasi</Text>
        <Input
          label="Email Addres"
          value={form.email}
          onChangeText={(value) => setForm('email', value)}
        />
        <Gap height={24} />
        <Input
          label="Password"
          value={form.password}
          onChangeText={(value) => setForm('password', value)}
          secureTextEntry
        />
        <Gap height={10} />
        <Link title="Forgot my password" size={12} />
        <Gap height={40} />
        <Button title="Sign In" onPress={login} />
        <Gap height={30} />
        <Link
          title="Create new account"
          size={16}
          align="center"
          onPress={() => navigation.navigate('Register')}
        />
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 40,
    backgroundColor: colors.white,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginVertical: 40,
    maxWidth: width_proportion,
  },
});
