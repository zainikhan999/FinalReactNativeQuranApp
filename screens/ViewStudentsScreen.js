import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const BASE_URL = 'https://quranapp-c8c91-default-rtdb.firebaseio.com/';

const ViewStudentScreen = ({ navigation }) => {
  const [users, setUsers] = useState(null);  // Array of users
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/users.json`);
        if (response.data) {
          const usersArray = Object.keys(response.data).map(key => ({
            id: key,
            ...response.data[key],
          }));
          setUsers(usersArray);
        } else {
          setUsers([]);
          setModalMessage('No users found.');
          setModalVisible(true);
        }
      } catch (error) {
        setModalMessage('Failed to fetch users. Please try again.');
        setModalVisible(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <ImageBackground source={require('./Home.png')} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            {users && users.length > 0 ? (
              <View style={styles.card}>
                <Text style={styles.header}>Users List</Text>
                {users.map((user) => (
                  <View key={user.id} style={styles.userCard}>
                    <Text style={styles.label}>Name: <Text style={styles.value}>{user.name}</Text></Text>
                    <Text style={styles.label}>Email: <Text style={styles.value}>{user.email}</Text></Text>
                    <Text style={styles.label}>Contact: <Text style={styles.value}>{user.contact}</Text></Text>
                    <Text style={styles.label}>Country: <Text style={styles.value}>{user.country}</Text></Text>
                    <Text style={styles.label}>City: <Text style={styles.value}>{user.city}</Text></Text>
                  </View>
                ))}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={styles.errorText}>No users found.</Text>
            )}
          </>
        )}
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <MaterialIcons name="error" size={50} color="#dc3545" style={styles.icon} />
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { width: '90%', padding: 20 },
  card: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
  },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 16, marginVertical: 5 },
  value: { fontWeight: 'bold' },
  userCard: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  errorText: { fontSize: 16, color: 'red', textAlign: 'center' },
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
  modalMessage: { fontSize: 18, marginBottom: 15, textAlign: 'center' },
  modalButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: { color: '#fff', fontWeight: 'bold' },
  icon: { marginBottom: 10 },
});

export default ViewStudentScreen;
