import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const HomeScreen = ({ navigation }) => {
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
      <Text style={styles.welcome}>Bienvenue dans Mon App!</Text>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Icon name="cube-outline" size={24} color="#555" style={styles.Icon}/>
          <Text style={styles.cardText}>Consulter le stock</Text>
        </View>
        <View style={styles.card}>
           <Icon name="cube-outline" size={24} color="#555" style={styles.Icon}/>
          <Text style={styles.cardText}>Card 2</Text>
        </View>
        <View style={styles.card}>
           <Icon name="cube-outline" size={24} color="#555" style={styles.Icon}/>
          <Text style={styles.cardText}>Card 2</Text>
        </View>
        <View style={styles.card}>
           <Icon name="cube-outline" size={24} color="#555" style={styles.Icon}/>
          <Text style={styles.cardText}>Card 2</Text>
        </View>;
        <View style={styles.card}>
           <Icon name="cube-outline" size={24} color="#555" style={styles.Icon}/>
          <Text style={styles.cardText}>Card 2</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff',
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  dateContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#ffffff', // fond blanc
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10, // Android
  },
  dateText: {
    fontSize: 14,
    color: '#555',
  },
  welcome: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 30,
    fontWeight: 'bold',
  },
  cardContainer: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: 400,
  },
  card: {
    width: '90%',
    backgroundColor: '#ffffff',
    paddingVertical: 40,
    paddingHorizontal: 5,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5, // for Android shadow
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    fontSize: 25,
    textAlign: 'center',
    marginLeft: 80,
  },
  Icon: {
    marginLeft: 0,
    size: 50,
  }

});

export default HomeScreen;
