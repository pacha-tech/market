import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';

const Liste_course = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('courses')
      .where('achete', '==', false) // Affiche seulement les produits à acheter
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

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produits à acheter</Text>
      <FlatList
        data={courses}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Icon name="ellipse-outline" size={24} color="#aaa" style={{ marginRight: 10 }} />
            <Text style={styles.itemText}>{item.nom}</Text>
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
  itemText: { fontSize: 17, flex: 1 },
  qte: { fontWeight: 'bold', color: '#333', marginLeft: 10 },
});

export default Liste_course;