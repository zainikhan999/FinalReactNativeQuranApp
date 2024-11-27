
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { auth } from '../Backend/QuranAppAuth';
import { signOut } from 'firebase/auth';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';  // Import MaterialIcons

const { width, height } = Dimensions.get('window'); // Get device dimensions for responsive layout

const HomeScreen = ({ navigation }) => {
  const [currentTime, setCurrentTime] = useState('');

  // Update the current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date().toLocaleTimeString(); // Get the current time in HH:MM:SS format
      setCurrentTime(time);
    }, 1000); // Update every second (1000ms)

  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Logout');
    } catch (error) {
      alert(error.message);
    }
  };

  const renderCard = (icon, text, route) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate(route)}
    >
      <MaterialIcons name={icon} size={40} color="#004d40" /> {/* Use Material icon here */}
      <Text style={styles.cardText}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.main}>
      <ImageBackground
        source={require('../assets/background.png')}
        style={styles.background}
        resizeMode="cover"
      >
  <ImageBackground
    source={require('../assets/Mosque.png')} // Ensure this is your desired image
    style={styles.boxBackground}
    resizeMode="cover"
    >
<View style={styles.topSection}>

    <View style={styles.infoContent}>
      <Text style={styles.mainCardText}>Current Time: {currentTime}</Text>
    </View>
  
</View>
</ImageBackground>


        {/* Bottom Section with Navigation Cards */}
        <View style={styles.bottomSection}>
          <View style={styles.cardContainer}>
            <View style={styles.row}>
              {renderCard('book', 'Quran Reading', 'QuranReading')} {/* Material Icon for Quran */}
              {renderCard('language', 'Quran Translation', 'QuranTranslation')}  {/* Material Icon for Translation */}
            </View>

            <View style={styles.row}>
              {renderCard('school', 'Online Classes', 'RegisterForClass')}  {/* Material Icon for Classes */}
              {renderCard('class', 'My Classes', 'MyClasses')}  {/* Material Icon for My Classes */}
            </View>
          </View>

          
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  topSection: {
    width: '100%',
    height: height * 0.3, // Ensure height occupies the desired space
    marginBottom: 20,
  },
  
  boxBackground: {
    flex: 1, // Ensures it takes the full container space
    width: '100%', // Stretches the image across the container
    height: '80%', // Ensures no white space vertically
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  infoContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay for readability
    padding: 15,
    borderRadius: 10,
  },
  
  
  mainCardText: {
    fontSize: 20,
    color: '#FFD54F',
    marginBottom: 5,
  },
  
  dateText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  
  timeText: {
    fontSize: 18,
    color: '#FFD54F',
    marginBottom: 5,
  },
  
  prayerText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  
  main: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topSection: {
    width: '100%',
    height: height * 0.3, // 30% of the screen height
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: 'white',
    padding: 10,
    marginBottom: 20,
  },
  infoSection: {
    marginTop: 10,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 18,
    color: '#004d40',
  },
  timeText: {
    fontSize: 22,
    color: '#FFD54F',
  },
  prayerText: {
    fontSize: 20,
    color: '#004d40',
  },
  mainCard: {
    width: '100%',
    padding: 20,
    backgroundColor: '#004d40', // Main card background
    borderRadius: 20,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // Adding shadow for depth
  },
  mainCardText: {
    fontSize: 22,
    color: '#FFD54F',
  },
  bottomSection: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    width: '100%',
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // Distribute space evenly
    marginBottom: 10, // Reduced margin between rows
  },
  card: {
    width: (width - 60) / 2, // Adjust width for two cards per row
    padding: 15,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderRadius: 15,
    elevation: 3, // Adding shadow for depth
  },
  cardText: {
    fontSize: 18,
    color: 'black',
    marginTop: 10,
  },
  signoutText: {
    color: 'red',
    fontSize: 18,
    marginTop: 20,
  },
});

export default HomeScreen;





