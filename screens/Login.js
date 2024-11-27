import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  View, Text, TextInput, StyleSheet, TouchableOpacity
} from 'react-native';
import { ImageBackground } from 'react-native';
import {
  signInWithEmailAndPassword, onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../Backend/QuranAppAuth';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in:", user);
        navigation.replace("HomeScreen"); // Replace the current screen with HomeScreen
      } else {
        console.log("User is logged out");
        navigation.replace("Login"); // Ensure navigation to Login screen when logged out
      }
    });

    return unsubscribe;
  }, [navigation]); // Add navigation to the dependency array

  const handleLogin = async () => {
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      console.log(`Logged in with: ${userCredentials.user.email}`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.background} resizeMode="cover">
      <KeyboardAvoidingView behavior="padding" style={styles.containerMain}>
        <Text style={{ fontSize: 40, marginBottom: 20, color: '#FFD54F' }}>QuranBliss</Text>

        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <View style={{ gap: 10 }}>
            <TouchableOpacity style={styles.box} onPress={handleLogin}>
              <Text style={styles.boxText}>Login</Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Text */}
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={styles.signupLink}>
  <Text style={styles.signupText}>
    Don't have an account? <Text style={styles.underline}>Sign Up</Text>
  </Text>
</TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  container: {
    width: '90%', // Use a percentage of the parent width for responsiveness
    maxWidth: 400, // Optional: Set a max-width for larger screens
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
    padding: 20, // Add padding for spacing inside the container
    alignSelf: 'center', // Center the container horizontally
  },
  box: {
    width: '100%',
    padding: 10,
    backgroundColor: '#FFD54F',
    alignItems: 'center',
    borderRadius: 10,
  },
  boxText: {
    fontSize: 18,
    color: 'black',
  },
  title: { fontSize: 30, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingLeft: 10, borderRadius: 5, backgroundColor: '#fff' },
  background: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  signupLink: {
    marginTop: 15,
    alignItems: 'center',
  },
  signupText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  underline: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});

export default Login;
