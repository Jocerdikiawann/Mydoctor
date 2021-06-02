import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {ILNullPhoto} from '../../assets';
import {Button, Gap, Header, Input, Profile} from '../../component';
import {Fire} from '../../config';
import {colors, getData, showError, showSuccess, storeData} from '../../utils';

const UpdateProfile = ({navigation}) => {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    email: '',
  });

  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [photoForDB, setPhotoForDB] = useState('');

  useEffect(() => {
    getData('user').then((res) => {
      const data = res;
      setPhoto({uri: res.photo});
      setProfile(data);
    });
  }, []);

  //fungsi update
  const update = () => {
    console.log('profile: ', profile);
    console.log('New Password: ', password);

    //jika password lebih dari 0 maka tandanya password akan diubah
    if (password.length > 0) {
      //validasi password minimal memiliki 6 karakter
      if (password.length < 6) {
        showError('Password kurang dari 6 karakter!');
      } else {
        //memanggil fungsi update password jika karakter password terpenuhi
        //lalu mengupdate profile data ke firebase beserta password yang di ubah
        updatePassword();
        updateProfileData();
        navigation.replace('MainApp');
      }
    } else {
      //memanggil fungsi update profile data jika password tak di ubah,
      //namun merubah profile nama atau yang lain, selain password
      updateProfileData();
      navigation.replace('MainApp');
    }
  };

  //fungsi mengupdate password
  const updatePassword = () => {
    //kalau panjang password sama dengan 6 karakter
    //mengecek difirebase
    Fire.auth().onAuthStateChanged((user) => {
      if (user) {
        //update password
        user.updatePassword(password).catch((err) => {
          showError(err.message);
        });
      }
    });
  };

  //fungsi updateProfile
  const updateProfileData = () => {
    const data = profile;
    data.photo = photoForDB;
    Fire.database()
      .ref(`users/${profile.uid}/`)
      .update(data)
      .then(() => {
        console.log('success: ', data);
        showSuccess('Berhasil Update data profile!');
        storeData('user', data);
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  //fungsi changeText
  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };

  //fungsi getImage
  const getImage = () => {
    launchImageLibrary(
      //mengoptimalkan dengan fungsi option dari library image picker
      //kurangi quality sekitar 50%/0.5 lalu ukuran tinggi dan lebar 200px
      {quality: 0.5, maxWidth: 200, maxHeight: 200, includeBase64: true},
      (response) => {
        //untuk melihat response dari get image
        console.log('response: ', response);
        //response didcancel didapat dari response bawaan react native
        if (response.didCancel || response.error) {
          //jika di cancel maka tampilkan pesan ini
          showError('Opps, anda tidak memilih foto manapun!');
          //ketika berhasil upload image tampilkan ini
        } else {
          //melihat response apa saja setelah upload
          console.log('response getImage: ', response);
          const source = {uri: response.uri};

          //base 64 itu salah satu image encode, jangan response.data karna ga ada, jadi ganti ke base 64 image encode
          setPhotoForDB(`data:${response.type};base64, ${response.base64}`);
          setPhoto(source);
          // setHasPhoto(true);
        }
      },
    );
  };

  return (
    <View style={styles.page}>
      <Header title="Edit Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile isRemove photo={photo} onPress={getImage} />
          <Gap height={26} />
          <Input
            label="Full Name"
            value={profile.fullName}
            onChangeText={(value) => changeText('fullName', value)}
          />
          <Gap height={24} />
          <Input
            label="Pekerjaan"
            value={profile.profession}
            onChangeText={(value) => changeText('profession', value)}
          />
          <Gap height={24} />
          <Input label="Email" value={profile.email} disable />
          <Gap height={24} />
          <Input
            label="Password"
            value={password}
            onChangeText={(value) => setPassword(value)}
            secureTextEntry
          />
          <Gap height={40} />
          <Button title="Save Profile" onPress={update} />
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  page: {backgroundColor: colors.white, flex: 1},
  content: {padding: 40, paddingTop: 0},
});
