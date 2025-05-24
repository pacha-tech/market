import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../features/FavoriteSlice';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const plats = [
  { id: 1, nom: 'Riz au poisson', image: require('../../assets/images/photo.png') },
  { id: 2, nom: 'Spaghetti Bolognaise', image: require('../../assets/images/photo.png') },
  { id: 3, nom: 'Poulet Curry', image: require('../../assets/images/photo.png') },
  { id: 4, nom: 'Tarte aux pommes', image: require('../../assets/images/photo.png') },
  { id: 5, nom: 'Pizza Margherita', image: require('../../assets/images/photo.png') },
  { id: 6, nom: 'Lasagnes', image: require('../../assets/images/photo.png') },
  { id: 7, nom: 'Soupe de légumes', image: require('../../assets/images/photo.png') },
  { id: 8, nom: 'Couscous', image: require('../../assets/images/photo.png') },
  { id: 9, nom: 'Tajine', image: require('../../assets/images/photo.png') },
  { id: 10, nom: 'Quiche Lorraine', image: require('../../assets/images/photo.png') },
  { id: 11, nom: 'Chili con carne', image: require('../../assets/images/photo.png') },
];

export default function Choix() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // ✅ Accès aux favoris depuis le bon champ
  //const favoris = useSelector(state => state.favorites.value || []);
  const favoris = useSelector(state => state.favorites?.value) ?? [];


  const toggleFavori = (plat) => {
    const isFavori = favoris.some(p => p.id === plat.id);
    if (isFavori) {
      dispatch(removeFavorite(plat));
    } else {
      dispatch(addFavorite(plat));
    }
  };

  const favorisPlats = plats.filter(p => favoris.some(f => f.id === p.id));
  const nonFavorisPlats = plats.filter(p => !favoris.some(f => f.id === p.id));

  const renderPlat = ({ item }) => {
    const isFavori = favoris.some(p => p.id === item.id);
    return (
      <View style={styles.platItem}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.platNom}>{item.nom}</Text>
        <TouchableOpacity onPress={() => toggleFavori(item)}>
          <Icon
            name={isFavori ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavori ? 'green' : 'gray'}
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Favoris</Text>
        {favorisPlats.length === 0 ? (
          <Text style={styles.emptyText}>Aucun favori sélectionné.</Text>
        ) : (
          <FlatList
            data={favorisPlats}
            keyExtractor={item => item.id.toString()}
            renderItem={renderPlat}
            scrollEnabled={false}
          />
        )}

        <Text style={[styles.title, { marginTop: 30 }]}>Autres plats</Text>
        <FlatList
          data={nonFavorisPlats}
          keyExtractor={item => item.id.toString()}
          renderItem={renderPlat}
          scrollEnabled={false}
        />
      </ScrollView>

      <TouchableOpacity
        onPress={() => navigation.navigate('Ajouter_plat')}
        style={styles.fab}
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: 'green' },
  emptyText: { fontSize: 16, fontStyle: 'italic', color: 'gray', marginBottom: 15 },
  platItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  platNom: { fontSize: 18, flex: 1, marginLeft: 10 },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: 'green',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
