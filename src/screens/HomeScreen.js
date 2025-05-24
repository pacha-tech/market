import React from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground , TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({navigation}) => {
  const currentDate = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/photo.png')}
        style={styles.imageBackground}
      >
        <Text style={styles.welcome}>MarketFree</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{currentDate}</Text>
        </View>
      </ImageBackground>

      <View style={styles.bottomContainer}>
        <Text style={styles.question}>Que voulez-vous faire ?</Text>
        <ScrollView contentContainerStyle={styles.cardContainer}>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Famille')}>
            <Icon name="people" size={40} style={styles.icon} />
            <Text style={styles.cardText}>Configurer la famille</Text>
            <Icon name="chevron-forward" size={24} color="green" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}  onPress={() => navigation.navigate('Consulter_stock')}>
            <Icon name="cube-outline" size={40} style={styles.icon} />
            <Text style={styles.cardText}>Consulter le stock</Text>
            <Icon name="chevron-forward" size={24} color="green" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Icon name="cart-outline" size={40} style={styles.icon} />
            <Text style={styles.cardText}>Liste des courses</Text>
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
          <TouchableOpacity style={styles.card}>
            <Icon name="document-text-outline" size={40} style={styles.icon} />
            <Text style={styles.cardText}>Historique des achats</Text>
            <Icon name="chevron-forward" size={24} color="green" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Icon name="document-text-outline" size={40} style={styles.icon} />
            <Text style={styles.cardText}>Historique des achats</Text>
            <Icon name="chevron-forward" size={24} color="green" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Icon name="document-text-outline" size={40} style={styles.icon} />
            <Text style={styles.cardText}>Historique des achats</Text>
            <Icon name="chevron-forward" size={24} color="green" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Icon name="document-text-outline" size={40} style={styles.icon} />
            <Text style={styles.cardText}>Historique des achats</Text>
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
    height: 250,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    //borderTopRightRadius: 20,
    //borderTopLeftRadius: 20,
    overflow: 'hidden',
  },
  dateContainer: {
    backgroundColor: 'green',
    width: 200,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginLeft: 205,
    marginTop: 125,
  },
  dateText: {
    fontSize: 16,
    color: 'white',
    fontStyle: 'italic',
  },
  welcome: {
    fontSize: 28,
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
    color: 'white',
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
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
  },
  cardText: {
    fontSize: 20,
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 10,
  },
  icon: {
    marginLeft: 10,
    color: 'green',
  },
});

export default HomeScreen;
