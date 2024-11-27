

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  ImageBackground,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Backend/QuranAppAuth';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const BASE_URL = 'https://quranapp-c8c91-default-rtdb.firebaseio.com/';

const SignUp = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const SignUpSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),  // Validation for name
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    contact: Yup.string()
      .matches(/^[0-9]+$/, 'Contact must be only digits')
      .required('Contact is required'),
    country: Yup.string().required('Country is required'),
    city: Yup.string().required('City is required'),
  });

  const handleSignUp = async (values) => {
    const { name, email, password, contact, country, city } = values;
    setLoading(true);

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Save additional user data to Firebase Realtime Database
      const userData = { name, email, contact, country, city };
      await axios.put(`${BASE_URL}/users/${userId}.json`, userData);

      setIsSuccess(true);
      setModalMessage('Account created successfully!');
      setModalVisible(true);
    } catch (error) {
      setIsSuccess(false);
      setModalMessage(error.message || 'Failed to create account. Please try again.');
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.header}>Sign Up</Text>
        <Formik
          initialValues={{ name: '', email: '', password: '', contact: '', country: '', city: '' }}
          validationSchema={SignUpSchema}
          onSubmit={handleSignUp}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              {/* Name input field */}
              <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

              <TextInput
                style={styles.input}
                placeholder="Contact"
                keyboardType="phone-pad"
                onChangeText={handleChange('contact')}
                onBlur={handleBlur('contact')}
                value={values.contact}
              />
              {touched.contact && errors.contact && <Text style={styles.errorText}>{errors.contact}</Text>}

              <TextInput
                style={styles.input}
                placeholder="Country"
                onChangeText={handleChange('country')}
                onBlur={handleBlur('country')}
                value={values.country}
              />
              {touched.country && errors.country && <Text style={styles.errorText}>{errors.country}</Text>}

              <TextInput
                style={styles.input}
                placeholder="City"
                onChangeText={handleChange('city')}
                onBlur={handleBlur('city')}
                value={values.city}
              />
              {touched.city && errors.city && <Text style={styles.errorText}>{errors.city}</Text>}

              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Sign Up</Text>}
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContainer, isSuccess ? styles.successModal : styles.errorModal]}>
              {isSuccess && (
                <MaterialIcons name="check-circle" size={50} color="#28a745" style={styles.icon} />
              )}
              <Text style={styles.modalMessage}>{modalMessage}</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setModalVisible(false);
                  if (isSuccess) {
                    navigation.navigate('Login'); // Navigate to Login if success
                  }
                }}
              >
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { width: '90%', backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 10, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: { fontSize: 12, color: 'red' },
  button: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: { color: 'black', fontSize: 16, fontWeight: 'bold' },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  successModal: { borderColor: '#28a745', borderWidth: 3 },
  errorModal: { borderColor: '#dc3545', borderWidth: 3 },
  modalMessage: { fontSize: 18, marginBottom: 15, textAlign: 'center' },
  modalButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: { color: '#fff', fontWeight: 'bold' },
  icon: { marginBottom: 10 },
});

export default SignUp;

