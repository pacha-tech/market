import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

const Moi = () => {
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const currentUser = auth().currentUser;
    setUser(currentUser);
    if (currentUser) {
      firestore().collection('users').doc(currentUser.uid).get().then(doc => {
        if (doc.exists) {
          setFullName(doc.data().fullName || '');
        }
      });
      if (currentUser.photoURL) {
        setPhoto({ uri: currentUser.photoURL });
      }
    }
  }, []);

  const pickImage = async () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 0.5 },
      async (response) => {
        if (response.didCancel) {return;}
        if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri;
          try {
            // Upload to Firebase Storage
            const reference = storage().ref(`avatars/${user.uid}.jpg`);
            await reference.putFile(uri);
            const url = await reference.getDownloadURL();

            // Update user profile
            await user.updateProfile({ photoURL: url });

            // Optionally, update Firestore as well
            await firestore().collection('users').doc(user.uid).update({ photoURL: url });

            // Reload user to get the new photoURL
            await user.reload();
            const refreshedUser = auth().currentUser;
            setPhoto({ uri: refreshedUser.photoURL });

            Alert.alert('Succès', 'Photo de profil mise à jour !');
          } catch (e) {
            Alert.alert('Erreur', e.message);
          }
        }
      }
    );
  };

  const handleNameSave = async () => {
    if (user) {
      await firestore().collection('users').doc(user.uid).update({ fullName });
      setEditingName(false);
      Alert.alert('Succès', 'Nom mis à jour !');
    }
  };

  const handleChangeEmail = () => {
    Alert.prompt(
      "Changer l'email",
      "Entrez le nouvel email",
      async (newEmail) => {
        try {
          await user.updateEmail(newEmail);
          Alert.alert('Succès', 'Email mis à jour !');
        } catch (e) {
          Alert.alert('Erreur', e.message);
        }
      }
    );
  };

  const handleChangePassword = () => {
    Alert.prompt(
      "Changer le mot de passe",
      "Entrez le nouveau mot de passe",
      async (newPassword) => {
        try {
          await user.updatePassword(newPassword);
          Alert.alert('Succès', 'Mot de passe mis à jour !');
        } catch (e) {
          Alert.alert('Erreur', e.message);
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      {/* Photo de profil */}
      <View style={styles.listItem}>
        <View style={styles.avatarRow}>
          <Image
            source={photo ? photo : require('../../assets/images/photo.png')}
            style={styles.avatar}
          />
          <TouchableOpacity onPress={pickImage} style={styles.iconEditPhoto}>
            <Icon name="pencil" size={24} color="green" />
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>Photo de profil</Text>
      </View>

      {/* Nom d'utilisateur */}
      <View style={styles.listItem}>
        <View style={styles.row}>
          <Text style={styles.label}>Nom d'utilisateur</Text>
          {editingName ? (
            <>
              <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
              />
              <TouchableOpacity onPress={handleNameSave}>
                <Icon name="checkmark" size={24} color="green" />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.value}>{fullName}</Text>
              <TouchableOpacity onPress={() => setEditingName(true)}>
                <Icon name="pencil" size={24} color="green" />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      {/* Email */}
      <View style={styles.listItem}>
        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user ? user.email : ''}</Text>
          <TouchableOpacity onPress={handleChangeEmail}>
            <Icon name="pencil" size={24} color="green" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Mot de passe */}
      <View style={styles.listItem}>
        <View style={styles.row}>
          <Text style={styles.label}>Mot de passe</Text>
          <Text style={styles.value}>********</Text>
          <TouchableOpacity onPress={handleChangePassword}>
            <Icon name="pencil" size={24} color="green" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  listItem: { marginBottom: 25 },
  avatarRow: { alignItems: 'center', justifyContent: 'center' },
  avatar: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#eee' },
  iconEditPhoto: { position: 'absolute', bottom: 10, right: 10, backgroundColor: 'white', borderRadius: 12, padding: 2 },
  label: { fontWeight: 'bold', fontSize: 16, marginRight: 10 },
  value: { fontSize: 18, marginRight: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, minWidth: 120, marginRight: 10 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
});

export default Moi;