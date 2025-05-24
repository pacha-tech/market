import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const Famille = ({ navigation }) => {
  const [familyName, setFamilyName] = useState('');
  const [numChildren, setNumChildren] = useState('');
  const [childrenNames, setChildrenNames] = useState([]);

  // Met à jour le nombre d'enfants et ajuste le tableau des prénoms
  const handleNumChildrenChange = (value) => {
    const num = parseInt(value) || 0;
    setNumChildren(value);
    setChildrenNames(Array(num).fill(''));
  };

  // Met à jour le prénom d'un enfant
  const handleChildNameChange = (index, name) => {
    const updatedNames = [...childrenNames];
    updatedNames[index] = name;
    setChildrenNames(updatedNames);
  };

  const handleSave = () => {
    // Ici tu peux sauvegarder les infos dans Redux ou AsyncStorage
    // Exemple : dispatch({type: 'SET_FAMILY', payload: {...}})
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Configurer la famille</Text>
      <Text style={styles.label}>Nom de la famille :</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom de famille"
        value={familyName}
        onChangeText={setFamilyName}
      />

      <Text style={styles.label}>Nombre d'enfants :</Text>
      <TextInput
        style={styles.input}
        placeholder="0"
        keyboardType="numeric"
        value={numChildren}
        onChangeText={handleNumChildrenChange}
      />

      {childrenNames.map((name, idx) => (
        <View key={idx}>
          <Text style={styles.label}>Prénom de l'enfant {idx + 1} :</Text>
          <TextInput
            style={styles.input}
            placeholder={`Enfant ${idx + 1}`}
            value={name}
            onChangeText={(text) => handleChildNameChange(idx, text)}
          />
        </View>
      ))}

      <Button title="Enregistrer" onPress={handleSave} color="green" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'green',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
});

export default Famille;