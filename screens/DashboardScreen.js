// src/screens/DashboardScreen.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ImageBackground } from 'react-native';

const DashboardScreen = ({ navigation }) => {
  return (
    <ImageBackground 
      source={require('./Home.png')} 
      style={styles.background} 
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Dashboard</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddStudent')}>
          <Text style={styles.buttonText}>Add Student</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UpdateStudent')}>
          <Text style={styles.buttonText}>Update Student</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ViewStudents')}>
          <Text style={styles.buttonText}>View Students</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddClass')}>
          <Text style={styles.buttonText}>Add Class</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UpdateClass')}>
          <Text style={styles.buttonText}>Update Class</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DeleteClass')}>
          <Text style={styles.buttonText}>Delete Class</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1, // Ensure the background covers the entire screen
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // No background color to show the image in original color
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#fff', // Change text color for better contrast
  },
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default DashboardScreen;