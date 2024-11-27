import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput, ImageBackground } from 'react-native';
import { auth } from '../Backend/QuranAppAuth'; // Firebase auth import
import { deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'; // Import Firebase methods
import axios from 'axios'; // Axios import

const BASE_URL = 'https://quranapp-c8c91-default-rtdb.firebaseio.com/'; // Your Firebase Realtime Database URL

const Delete = ({ navigation }) => {
  const [warning, setWarning] = useState('');
  const [password, setPassword] = useState(''); // New state for password input

  const handleDeleteAccount = async () => {
    if (!password) {
      setWarning('Please enter your password to delete your account.');
      return;
    }
  
    try {
      const user = auth.currentUser;
      if (user) {
        // Reauthenticate the user with the entered password
        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential); // Reauthentication
  
        // Delete user from Firebase Authentication
        await deleteUser(user);
  
        // Get the user's UID
        const userUid = user.uid;
  
        // URL to delete user from `users`
        const userDeleteUrl = `${BASE_URL}/users/${userUid}.json`;
  
        // Log the URLs to ensure correctness
        console.log('Deleting user from:', userDeleteUrl);
  
        // Delete the user from `users`
        await axios.delete(userDeleteUrl);
  
        // Step 1: Query `registrations` for all entries with the user's email
        const registrationsUrl = `${BASE_URL}/registrations.json`;
        const response = await axios.get(registrationsUrl);
  
        if (response.data) {
          const registrations = response.data;
  
          // Step 2: Loop through registrations and delete those matching the user's email
          for (const key in registrations) {
            if (registrations[key].email === user.email) {
              const registrationDeleteUrl = `${BASE_URL}/registrations/${key}.json`;
              console.log('Deleting registration:', registrationDeleteUrl);
              await axios.delete(registrationDeleteUrl);
            }
          }
        } else {
          console.log('No registrations found for this user.');
        }
  
        // Show success message
        navigation.replace('Login'); // Navigate to login screen
      } else {
        setWarning('No user logged in. Please login first.');
      }
    } catch (error) {
      console.error("Account deletion failed: ", error);
      if (error.code === 'auth/requires-recent-login') {
        setWarning('You need to re-login to delete your account. Please login again and try again.');
      } else {
        setWarning('Error deleting account. Please try again later.');
      }
    }
  };
  

  const handleCancel = () => {
    navigation.replace('HomeScreen'); // Navigate back to the HomeScreen
  };

  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.title}>Delete Account</Text>

        {warning ? <Text style={styles.warningText}>{warning}</Text> : null}

        {/* Password input for reauthentication */}
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <View style={{ gap: 10 }}>
          <TouchableOpacity style={styles.deleteBox} onPress={handleDeleteAccount}>
            <Text style={styles.boxText}>Delete Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelBox} onPress={handleCancel}>
            <Text style={styles.boxText}>Cancel</Text>
          </TouchableOpacity>
        </View>
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
  containerMain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f0f0f0', // Light gray background for the whole screen
  },

  container: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: 'rgba(255,255,255,0.8)', // White background for the content area
    borderRadius: 10,
    padding: 20,
    alignSelf: 'center',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  warningText: {
    color: 'red', // Red color for the warning text
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },

  input: {
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  deleteBox: {
    width: '100%',
    padding: 10,
    backgroundColor: '#D32F2F', // Red color for the delete button
    alignItems: 'center',
    borderRadius: 10,
  },

  cancelBox: {
    width: '100%',
    padding: 10,
    backgroundColor: '#FFD54F', // Yellow color for the cancel button
    alignItems: 'center',
    borderRadius: 10,
  },

  boxText: {
    fontSize: 18,
    color: 'black',
  },
});

export default Delete;