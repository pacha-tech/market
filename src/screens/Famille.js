import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Alert, StyleSheet, Modal, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Famille = () => {
  const [user, setUser] = useState(null);
  const [familleId, setFamilleId] = useState('');
  const [familleNom, setFamilleNom] = useState('');
  const [membres, setMembres] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [membreForm, setMembreForm] = useState({ nom: '', age: '', sexe: '', activite: '' });
  const [menuVisible, setMenuVisible] = useState({ visible: false, index: null });
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const iconRefs = useRef({});

  // Auth listener pour être sûr d'avoir user même si l'app vient de démarrer
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(u => {
      setUser(u);
    });
    return unsubscribe;
  }, []);

  // Récupère familleId de l'utilisateur
  useEffect(() => {
    if (!user) return;
    const unsubscribeUser = firestore().collection('users').doc(user.uid).onSnapshot(doc => {
      if (doc && doc.exists) {
        const data = doc.data();
        if (data && data.familleId) setFamilleId(data.familleId);
      }
    });
    return () => unsubscribeUser();
  }, [user]);

  // Ecoute la famille dès que familleId est dispo
  useEffect(() => {
    if (!familleId) return;
    const unsubscribeFamille = firestore().collection('familles').doc(familleId)
      .onSnapshot(familleDoc => {
        if (familleDoc.exists) {
          const data = familleDoc.data();
          setFamilleNom(data.nom || '');
          setMembres(data.membres || []);
        }
      });
    return () => unsubscribeFamille();
  }, [familleId]);

  const enregistrerFamille = async (nouveauxMembres = membres) => {
    if (!user) return;
    try {
      if (!familleId) {
        const ref = firestore().collection('familles').doc();
        await ref.set({
          nom: familleNom || 'Ma famille',
          membres: nouveauxMembres,
        });
        await firestore().collection('users').doc(user.uid).set({ familleId: ref.id }, { merge: true });
        setFamilleId(ref.id);
      } else {
        await firestore().collection('familles').doc(familleId).update({
          membres: nouveauxMembres,
        });
      }
    } catch (err) {
      Alert.alert('Erreur', 'Impossible de sauvegarder la famille');
    }
  };

  const handleAdd = () => {
    setEditIndex(null);
    setMembreForm({ nom: '', age: '', sexe: '', activite: '' });
    setShowForm(true);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setMembreForm(membres[index]);
    setShowForm(true);
    setMenuVisible({ visible: false, index: null });
  };

  const handleDelete = (index) => {
    Alert.alert(
      'Supprimer',
      'Voulez-vous supprimer ce membre ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer', style: 'destructive', onPress: async () => {
            const nouveauxMembres = membres.filter((_, i) => i !== index);
            await enregistrerFamille(nouveauxMembres);
          }
        }
      ]
    );
    setMenuVisible({ visible: false, index: null });
  };

  const handleSave = async () => {
    if (!membreForm.nom) {
      Alert.alert('Erreur', 'Le nom est obligatoire');
      return;
    }
    let nouveauxMembres;
    if (editIndex !== null) {
      nouveauxMembres = membres.map((m, i) => i === editIndex ? membreForm : m);
    } else {
      nouveauxMembres = [...membres, membreForm];
    }
    await enregistrerFamille(nouveauxMembres);
    setShowForm(false);
    setEditIndex(null);
    setMembreForm({ nom: '', age: '', sexe: '', activite: '' });
  };

  // Affiche le menu contextuel en overlay
  const showMenu = (index) => {
    if (iconRefs.current[index]) {
      iconRefs.current[index].measureInWindow((x, y, width, height) => {
        // On ajuste pour éviter de sortir de l'écran
        const screenHeight = Dimensions.get('window').height;
        let top = y + height;
        if (top + 120 > screenHeight){top = y - 120;}
        setMenuPosition({ top: y - 15 , left: x - 80 });
        setMenuVisible({ visible: true, index });
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Famille : {familleNom}</Text>
      <View style={styles.headerRow}>
        <Text style={styles.label}>Membres</Text>
      </View>
      <FlatList
        data={membres}
        keyExtractor={(item, index) => item.nom + index}
        renderItem={({ item, index }) => (
          <View style={styles.memberRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.memberName}>{item.nom}</Text>
              <Text style={styles.memberInfo}>age: {item.age} ans   |   sexe: {item.sexe}   |   activite: {item.activite}</Text>
            </View>
            <TouchableOpacity
              ref={ref => { iconRefs.current[index] = ref; }}
              onPress={() => showMenu(index)}
            >
              <Icon name="more-vert" size={28} color="#444" />
            </TouchableOpacity>
          </View>
        )}
      />
      {/* Menu contextuel global en overlay */}
      {menuVisible.visible && (
        <View style={[
          styles.menu,
          {
            position: 'absolute',
            top: menuPosition.top,
            left: menuPosition.left,
            zIndex: 9999,
            elevation: 30,
          }
        ]}>
          <TouchableOpacity onPress={() => handleEdit(menuVisible.index)}>
            <Text style={styles.menuItem}>Modifier</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(menuVisible.index)}>
            <Text style={[styles.menuItem, { color: 'red' }]}>Supprimer</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMenuVisible({ visible: false, index: null })}>
            <Text style={styles.menuItem}>Fermer</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* Bouton ajouter en bas à droite */}
      <TouchableOpacity style={styles.fab} onPress={handleAdd}>
        <Icon name="add" size={32} color="white" />
      </TouchableOpacity>
      {/* Modal pour ajouter/modifier */}
      <Modal visible={showForm} transparent animationType="slide">
        <View style={styles.modalBg}>
          <View style={styles.modalContent}>
            <Text style={styles.label}>{editIndex !== null ? 'Modifier' : 'Ajouter'} un membre</Text>
            <TextInput
              placeholder="Nom"
              value={membreForm.nom}
              onChangeText={text => setMembreForm({ ...membreForm, nom: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Âge"
              value={membreForm.age}
              onChangeText={text => setMembreForm({ ...membreForm, age: text })}
              style={styles.input}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Sexe"
              value={membreForm.sexe}
              onChangeText={text => setMembreForm({ ...membreForm, sexe: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Activité professionnelle"
              value={membreForm.activite}
              onChangeText={text => setMembreForm({ ...membreForm, activite: text })}
              style={styles.input}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>{editIndex !== null ? 'Modifier' : 'Ajouter'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowForm(false)}>
                <Text style={{ color: 'green', fontWeight: 'bold' }}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  title: { fontWeight: 'bold', fontSize: 22, marginBottom: 15, color: 'green', textAlign: 'center' },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  label: { fontWeight: 'bold', fontSize: 18 },
  addIcon: { marginLeft: 10 },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    elevation: 1,
    position: 'relative',
  },
  memberName: { fontWeight: 'bold', fontSize: 16 },
  memberInfo: { color: '#555', fontSize: 14 },
  menu: {
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 20,
    zIndex: 999,
    padding: 8,
    minWidth: 110,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  modalBg: {
    flex: 1,
    backgroundColor: '#0006',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '85%',
    elevation: 10,
  },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10 },
  saveBtn: { backgroundColor: 'green', padding: 12, borderRadius: 8, alignItems: 'center', flex: 1, marginRight: 5 },
  cancelBtn: { backgroundColor: '#fff', padding: 12, borderRadius: 8, alignItems: 'center', flex: 1, marginLeft: 5, borderWidth: 1, borderColor: 'green' },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    backgroundColor: 'green',
    borderRadius: 30,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    zIndex: 100,
  },
});

export default Famille;