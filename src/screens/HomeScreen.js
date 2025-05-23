import React from 'react';
import { StyleSheet, Text, View, ScrollView , Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  const currentDate = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{currentDate}</Text>
      </View>
      <View style={styles.image_container}>
        <Image source={require('../../assets/images/photo.png')} style={styles.image} />
      </View>
      <Text style={styles.welcome}>Bienvenue dans Mon App!</Text>
      <ScrollView contentContainerStyle={styles.cardContainer}>
        <View style={styles.card}>
          <Icon name="cube-outline" size={40} style={styles.icon} />
          <Text style={styles.cardText}>Consulter le stock</Text>
          <Icon name="chevron-forward" size={24} color="#555" />
        </View>
        <View style={styles.card}>
          <Icon name="cube-outline" size={40} style={styles.icon} />
          <Text style={styles.cardText}>Consulter le stock</Text>
          <Icon name="chevron-forward" size={24} color="#555" />
        </View>
        <View style={styles.card}>
          <Icon name="cube-outline" size={40} style={styles.icon} />
          <Text style={styles.cardText}>Consulter le stock</Text>
          <Icon name="chevron-forward" size={24} color="#555" />
        </View>
        <View style={styles.card}>
          <Icon name="cube-outline" size={40} style={styles.icon} />
          <Text style={styles.cardText}>Consulter le stock</Text>
          <Icon name="chevron-forward" size={24} color="#555" />
        </View>
        <View style={styles.card}>
          <Icon name="cube-outline" size={40} style={styles.icon} />
          <Text style={styles.cardText}>Consulter le stock</Text>
          <Icon name="chevron-forward" size={24} color="#555" />
        </View>
        <View style={styles.card}>
          <Icon name="cube-outline" size={40} style={styles.icon} />
          <Text style={styles.cardText}>Consulter le stock</Text>
          <Icon name="chevron-forward" size={24} color="#555" />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5f0f7',
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  dateContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'green',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  image_container: {
    borderRadius: 30,
  },
  image: {
    width: '98%',
    height: 300,
    borderRadius: 30,
  },
  dateText: {
    fontSize: 16,
    color: 'white',
    fontStyle: 'italic',
  },
  welcome: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 30,
    fontWeight: 'bold',
    color: 'green',
  },
  cardContainer: {
    paddingBottom: 20,
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
    fontSize: 25,
    textAlign: 'center',
    flex: 1,
  },
  icon: {
    marginLeft: 10,
    size: 25,
    color: 'green',
  },
});

export default HomeScreen;