import React from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';

const HomeScreen = ({ navigation }) => {
  const currentDate = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleSignOut = () => {
    const doSignOut = async () => {
      try {
        await auth().signOut();
      } catch (error) {
        console.log(error.message);
      }
    };
    Alert.alert(
      'Déconnexion',
      'Souhaitez-vous vraiment vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Oui', onPress: doSignOut },
      ]
    );
  };

  // Simuler une photo de profil (à remplacer par l'URL réelle si disponible)
  const profilePhoto = require('../../assets/images/photo.png');

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/photo.png')}
        style={styles.imageBackground}
      >
        {/* Barre du haut avec photo et bouton déconnexion */}
        <View style={styles.headerRow}>
          <Image source={profilePhoto} style={styles.avatar} />
          <TouchableOpacity onPress={handleSignOut} style={styles.iconSignOut}>
            <Icon name="log-out-outline" size={28} color="green" />
          </TouchableOpacity>
        </View>
        <Text style={styles.welcome}>Bonjour, bienvenue sur MarketFree !</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{currentDate}</Text>
        </View>
      </ImageBackground>

      <View style={styles.bottomContainer}>
        <Text style={styles.question}>Que voulez-vous faire ?</Text>
        <ScrollView contentContainerStyle={styles.cardContainer}>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Famille')}>
            <Icon name="people-outline" size={40} style={styles.icon} />
            <Text style={styles.cardText}>Configurer la famille</Text>
            <Icon name="chevron-forward" size={24} color="green" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Consulter_stock')}>
            <Icon name="cube-outline" size={40} style={styles.icon} />
            <Text style={styles.cardText}>Consulter le stock</Text>
            <Icon name="chevron-forward" size={24} color="green" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Liste_course')}>
            <Icon name="book-outline" size={40} style={styles.icon}/>
            <Text style={styles.cardText}>Liste des courses</Text>
            <Icon name="chevron-forward" size={24} color="green" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate('Faire_course')}>
            <Icon name="cart-outline" size={40} style={styles.icon} />
            <Text style={styles.cardText}>Faire les courses</Text>
            <Icon name="chevron-forward" size={24} color="green" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Icon name="bar-chart-outline" size={40} style={styles.icon} />
            <Text style={styles.cardText}>Consommation</Text>
            <Icon name="chevron-forward" size={24} color="green" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Icon name="alert-circle-outline" size={40} style={styles.icon} />
            <Text style={styles.cardText}>Produits expirés</Text>
            <Icon name="chevron-forward" size={24} color="green" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Icon name="document-text-outline" size={40} style={styles.icon} />
            <Text style={styles.cardText}>Historique des achats</Text>
            <Icon name="chevron-forward" size={24} color="green" />
          </TouchableOpacity>
          {/* Ajout d'un bouton d'ajout rapide */}
          <TouchableOpacity style={[styles.card, styles.addCard]}>
            <Icon name="add-circle-outline" size={40} style={styles.iconAdd} />
            <Text style={styles.cardText}>Ajouter un produit</Text>
            <Icon name="chevron-forward" size={24} color="green" />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageBackground: {
    height: 220,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#eee',
    borderWidth: 2,
    borderColor: 'white',
  },
  iconSignOut: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 6,
    elevation: 3,
  },
  dateContainer: {
    backgroundColor: 'green',
    alignSelf: 'flex-end',
    minWidth: 160,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 10,
    paddingHorizontal: 12,
  },
  dateText: {
    fontSize: 15,
    color: 'white',
    fontStyle: 'italic',
  },
  welcome: {
    fontSize: 22,
    textAlign: 'center',
    marginVertical: 6,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: '#0002',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10,
  },
  question: {
    marginVertical: 10,
    textAlign: 'center',
    color: 'green',
    fontSize: 20,
    fontWeight: '600',
  },
  cardContainer: {
    paddingBottom: 30,
    alignItems: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: '#ffffff',
    paddingVertical: 18,
    paddingHorizontal: 10,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.13,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 74,
  },
  addCard: {
    backgroundColor: '#eaffea',
    borderWidth: 1,
    borderColor: 'green',
  },
  cardText: {
    fontSize: 18,
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 10,
  },
  icon: {
    marginLeft: 10,
    color: 'green',
  },
  iconAdd: {
    marginLeft: 10,
    color: '#1db954',
  },
});

export default HomeScreen;