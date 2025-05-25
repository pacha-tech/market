import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';

const Faire_course = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // On suppose que tu as une collection "courses" dans Firestore
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('courses')
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(data);
        setLoading(false);
      });
    return unsubscribe;
  }, []);

  const toggleAchete = async (id, actuel) => {
    await firestore().collection('courses').doc(id).update({ achete: !actuel });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Faire les courses</Text>
      <FlatList
        data={courses}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <TouchableOpacity onPress={() => toggleAchete(item.id, item.achete)}>
              <Icon
                name={item.achete ? 'checkbox-outline' : 'square-outline'}
                size={28}
                color={item.achete ? 'green' : '#aaa'}
              />
            </TouchableOpacity>
            <Text style={[styles.itemText, item.achete && styles.achete]}>
              {item.nom}
            </Text>
            <Text style={styles.qte}>{item.quantite ? `x${item.quantite}` : ''}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 30 }}>Aucun produit à acheter.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5fcff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: 'green', textAlign: 'center' },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    elevation: 1,
  },
  itemText: { fontSize: 17, flex: 1, marginLeft: 12 },
  achete: { textDecorationLine: 'line-through', color: '#aaa' },
  qte: { fontWeight: 'bold', color: '#333', marginLeft: 10 },
});

export default Faire_course;