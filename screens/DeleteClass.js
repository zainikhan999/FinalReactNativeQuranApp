import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ImageBackground, Modal } from 'react-native';
import axios from 'axios';

const BASE_URL = 'https://quranapp-c8c91-default-rtdb.firebaseio.com/';

const DeleteClass = ({ navigation }) => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successModalVisible, setSuccessModalVisible] = useState(false); // Modal visibility state

  useEffect(() => {
    fetchClasses();
  }, []);

  // Fetch available classes from Firebase
  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/classes.json`);
      if (response.status === 200) {
        const data = response.data;
        const formattedClasses = Object.entries(data || {}).map(([id, classData]) => ({
          id,
          ...classData,
        }));
        setClasses(formattedClasses);
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a class
  const handleDelete = async (classId, classTitle) => {
    try {
      await axios.delete(`${BASE_URL}/classes/${classId}.json`);
      setClasses(classes.filter((classItem) => classItem.id !== classId));
      setSuccessModalVisible(true); // Show success modal
    } catch (error) {
      console.error('Error deleting class:', error);
      Alert.alert('Error', 'An error occurred while deleting the class. Please try again.');
    }
  };

  return (
    <ImageBackground source={require('./Home.png')} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.title}>Delete Classes</Text>
        {loading ? (
          <Text style={styles.loadingText}>Loading classes...</Text>
        ) : classes.length === 0 ? (
          <Text style={styles.noClassesText}>No classes available.</Text>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {classes.map((classItem) => (
              <View key={classItem.id} style={styles.card}>
                <View style={styles.cardContent}>
                  <Text style={styles.classTitle}>{classItem.title || 'Class Title'}</Text>
                  <Text style={styles.classTime}>
                    Time: {classItem.startTime || 'N/A'} - {classItem.endTime || 'N/A'}
                  </Text>
                  <Text style={styles.instructor}>Instructor: {classItem.instructor || 'N/A'}</Text>
                  <Text style={styles.classDay}>Day: {classItem.classDay || 'N/A'}</Text>
                  <Text style={styles.classDate}>Date: {classItem.classDate || 'N/A'}</Text>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(classItem.id, classItem.title)}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        )}

        {/* Success Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={successModalVisible}
          onRequestClose={() => setSuccessModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Class deleted successfully!</Text>
              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={() => setSuccessModalVisible(false)}
              >
                <Text style={styles.closeModalButtonText}>Close</Text>
              </TouchableOpacity>
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
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
    textAlign: 'center',
    color: '#FFD54F',
  },
  loadingText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
  noClassesText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginVertical: 10,
    width: '90%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  cardContent: {
    padding: 20,
  },
  classTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  classTime: {
    fontSize: 16,
    color: '#555',
  },
  instructor: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  classDay: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  classDate: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeModalButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeModalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DeleteClass;
