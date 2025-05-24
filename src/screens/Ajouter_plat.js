// src/screens/Ajouter_plat.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, PermissionsAndroid, Platform, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { addFavorite } from '../features/FavoriteSlice';
import { useNavigation } from '@react-navigation/native';

export default function Ajouter_plat() {
  const [nom, setNom] = useState('');
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Permission d’accès à la galerie',
            message: 'Cette application a besoin d’accéder à votre galerie de photos',
            buttonNeutral: 'Demander plus tard',
            buttonNegative: 'Annuler',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert('Permission refusée', "Impossible d'accéder à la galerie.");
      return;
    }

    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 800,
        maxHeight: 800,
        quality: 1,
      },
      (response) => {
        if (response.didCancel) {
          console.log('L’utilisateur a annulé la sélection');
        } else if (response.errorCode) {
          console.log('Erreur image picker: ', response.errorMessage);
          Alert.alert('Erreur', 'Impossible de sélectionner l’image.');
        } else if (response.assets && response.assets.length > 0) {
          setImage(response.assets[0].uri);
        }
      }
    );
  };

  const ajouterPlat = () => {
    if (nom.trim() && image) {
      dispatch(addFavorite({ id: Date.now(), nom: nom.trim(), image: { uri: image } }));
      navigation.goBack();
    } else {
      Alert.alert('Champs manquants', 'Remplis tous les champs !');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter un plat</Text>
      <TextInput
        placeholder="Nom du plat"
        style={styles.input}
        value={nom}
        onChangeText={setNom}
      />
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        <Text style={{ color: '#555' }}>Sélectionner une image</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.preview} />}

      <TouchableOpacity onPress={ajouterPlat} style={styles.button}>
        <Text style={styles.buttonText}>Ajouter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  imagePicker: {
    backgroundColor: '#eee',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15,
  },
  preview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
