import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Consulter_stock = () => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('produits')
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProduits(data);
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

  const formatDate = (timestamp) => {
    if (!timestamp) {return '—';}
    // Si c'est un Timestamp Firestore
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stock des produits</Text>
      <FlatList
        data={produits}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.nom}>{item.nom}</Text>
            <Text>Quantité : {item.quantite}</Text>
            <Text>Date d'expiration : {formatDate(item.date_expiration)}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>Aucun produit en stock.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5fcff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: 'green', textAlign: 'center' },
  item: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 12, elevation: 1 },
  nom: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
});

export default Consulter_stock;