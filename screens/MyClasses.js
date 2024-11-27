import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Button, ImageBackground } from 'react-native';
import axios from 'axios';
import { auth } from '../Backend/QuranAppAuth';

const BASE_URL = 'https://quranapp-c8c91-default-rtdb.firebaseio.com/';

const MyClasses = () => {
  const [registeredClasses, setRegisteredClasses] = useState([]);
  const [userEmail, setEmail] = useState(auth.currentUser?.email || '');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    fetchRegisteredClasses();
  }, []);

  // Fetch registered classes from the registrations document
  const fetchRegisteredClasses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/registrations.json`);
      if (response.status === 200) {
        const data = response.data;
        const userClasses = Object.entries(data || {})
          .filter(([id, classData]) => classData.email === userEmail)
          .map(([id, classData]) => ({ id, ...classData }));
        setRegisteredClasses(userClasses);
      }
    } catch (error) {
      console.error('Error fetching registered classes:', error);
    }
  };

  // Open the modal and set the selected class
  const openModal = (classData) => {
    setSelectedClass(classData);
    setModalVisible(true);
  };

  // Delete the class after confirming
  const handleDeleteClass = async () => {
    if (!selectedClass) return;

    try {
      const { id } = selectedClass;

      // Delete the class from the registrations document
      await axios.delete(`${BASE_URL}/registrations/${id}.json`);
      setRegisteredClasses(registeredClasses.filter((item) => item.id !== id));
      setModalVisible(false);
      setSelectedClass(null);
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  };

  const renderClass = ({ item }) => (
    <View style={styles.classCard}>
      <Text style={styles.classTitle}>Class: {item.classTitle}</Text>
      <TouchableOpacity style={styles.unregisterButton} onPress={() => openModal(item)}>
        <Text style={styles.unregisterText}>Unregister</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.header}>My Registered Classes</Text>
        {registeredClasses.length > 0 ? (
          <FlatList
            data={registeredClasses}
            renderItem={renderClass}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
          />
        ) : (
          <Text style={styles.noClasses}>No registered classes found.</Text>
        )}

        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>
                Are you sure you want to unregister from the class "{selectedClass?.classTitle}"?
              </Text>
              <View style={styles.modalButtons}>
                <Button title="Cancel" onPress={() => setModalVisible(false)} />
                <Button title="Yes, Unregister" onPress={handleDeleteClass} color="#FF6B6B" />
              </View>
            </View>
          </View>
        </Modal>
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
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFD54F',
  },
  list: {
    paddingBottom: 20,
  },
  classCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  classTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  unregisterButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FF6B6B',
    borderRadius: 5,
    alignItems: 'center',
  },
  unregisterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noClasses: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginTop: 50,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default MyClasses;
