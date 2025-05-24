import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      setMessage('Compte créé avec succès !');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      setMessage('Connexion réussie !');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Authentification</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Créer un compte" onPress={handleSignUp} color="green" />
      <Button title="Se connecter" onPress={handleSignIn} color="blue" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: 'white' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: 'green', textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10 },
  message: { marginTop: 10, textAlign: 'center', color: 'red' },
});

export default AuthScreen;