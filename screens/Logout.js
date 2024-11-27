import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet,ImageBackground } from 'react-native';
import { auth } from '../Backend/QuranAppAuth'; // Import Firebase auth
import { AuthContext } from './Context/AuthContext'; // Import Auth Context

const Logout = ({ navigation }) => {
  const { setUser } = useContext(AuthContext); // Access setUser from context

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out from Firebase
      setUser(null); // Clear user state in context
      navigation.navigate('Login'); // Navigate to the Login screen
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.background} resizeMode="cover">

    <View style={styles.container}>
      <Text style={styles.title}>Are you sure you want to logout?</Text>
      <Button title="Logout" onPress={handleLogout} color="#FFD54F" />
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});

export default Logout;
