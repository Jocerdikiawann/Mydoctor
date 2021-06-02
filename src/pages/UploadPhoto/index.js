import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { IconAddPhoto, IconRemovePhoto, ILNullPhoto } from '../../assets';
import { Button, Gap, Header, Link } from '../../component';
import { Fire } from '../../config';
import { colors, fonts, showError, storeData } from '../../utils';

const UploadPhoto = ({navigation, route}) => {
  //menerima parameter di pages register
  const {fullName, profession, uid} = route.params;
  // console.log('fullName: ', fullName);
  // console.log('profession: ', profession);
  // console.log('email: ', email);
  const [photoForDB, setPhotoForDB] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILNullPhoto);

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
          showError('Oopps, anda tidak memilih foto manapun!');
          //ketika berhasil upload image tampilkan ini
        } else {
          //melihat response apa saja setelah upload
          console.log('response getImage: ', response);
          const source = {uri: response.uri};

          //base 64 itu salah satu image encode, jangan response.data karna ga ada, jadi ganti ke base 64 image encode
          setPhotoForDB(`data:${response.type};base64, ${response.base64}`);
          setPhoto(source);
          setHasPhoto(true);
        }
      },
    );
  };

  //membuat const baru untuk upload photo setelah berhasil register
  const uploadAndContinue = () => {
    Fire.database()
      .ref('users/' + uid + '/')
      .update({photo: photoForDB});
    //memasukan foto kedalam const data
    const data = route.params;
    data.photo = photoForDB;
    //menyimpan data di atas ke local storage
    storeData('user', data);

    navigation.replace('MainApp');
  };

  return (
    <View style={styles.page}>
      <Header title="Upload Photo" />
      <View style={styles.content}>
        <View style={styles.profile}>
          <TouchableOpacity style={styles.photoWrapper} onPress={getImage}>
            <Image source={photo} style={styles.photo} />
            {hasPhoto && <IconRemovePhoto style={styles.addPhoto} />}
            {!hasPhoto && <IconAddPhoto style={styles.addPhoto} />}
          </TouchableOpacity>
          <Text style={styles.texto}>{fullName}</Text>
          <Text style={styles.textox}>{profession}</Text>
        </View>
        <View>
          <Button
            disable={!hasPhoto}
            title="Upload and Continue"
            onPress={uploadAndContinue}
          />
          <Gap height={30} />
          <Link
            title="Skip for this"
            align="center"
            size={16}
            onPress={() => navigation.replace('MainApp')}
          />
        </View>
      </View>
    </View>
  );
};

export default UploadPhoto;

const styles = StyleSheet.create({
  profile: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 40,
    paddingBottom: 64,
    flex: 1,
    justifyContent: 'space-between',
  },
  texto: {
    fontSize: 24,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  textox: {
    fontSize: 18,
    color: colors.text.primary,
    fontFamily: fonts.primary.normal,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  addPhoto: {
    position: 'absolute',
    bottom: 0,
    right: 6,
  },
  photo: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
  },
  photoWrapper: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 130 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
