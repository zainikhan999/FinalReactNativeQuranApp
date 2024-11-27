import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput, ImageBackground, Modal } from 'react-native';
import axios from 'axios';

const BASE_URL = 'https://quranapp-c8c91-default-rtdb.firebaseio.com/';

const UpdateClass = ({ navigation }) => {
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

  // Handle updating a class
  const updateClass = async (classId, updatedClass) => {
    try {
      await axios.put(`${BASE_URL}/classes/${classId}.json`, updatedClass);
      setSuccessModalVisible(true); // Show success modal
      fetchClasses(); // Refresh the list after update
    } catch (error) {
      console.error('Error updating class:', error);
      Alert.alert('Error', 'An error occurred while updating the class. Please try again.');
    }
  };

  // Handle input changes dynamically
  const handleInputChange = (id, field, value) => {
    setClasses((prevClasses) =>
      prevClasses.map((classItem) =>
        classItem.id === id ? { ...classItem, [field]: value } : classItem
      )
    );
  };

  return (
    <ImageBackground source={require('./Home.png')} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.title}>Update Classes</Text>
        {loading ? (
          <Text style={styles.loadingText}>Loading classes...</Text>
        ) : classes.length === 0 ? (
          <Text style={styles.noClassesText}>No classes available.</Text>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {classes.map((classItem) => (
              <View key={classItem.id} style={styles.card}>
                <View style={styles.cardContent}>
                  <TextInput
                    style={styles.input}
                    placeholder="Class Title"
                    value={classItem.title}
                    onChangeText={(text) => handleInputChange(classItem.id, 'title', text)}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Instructor Name"
                    value={classItem.instructor}
                    onChangeText={(text) => handleInputChange(classItem.id, 'instructor', text)}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Start Time (e.g., 10:00 AM)"
                    value={classItem.startTime}
                    onChangeText={(text) => handleInputChange(classItem.id, 'startTime', text)}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="End Time (e.g., 11:00 AM)"
                    value={classItem.endTime}
                    onChangeText={(text) => handleInputChange(classItem.id, 'endTime', text)}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Class Day (e.g., Monday)"
                    value={classItem.classDay}
                    onChangeText={(text) => handleInputChange(classItem.id, 'classDay', text)}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Class Date (e.g., YYYY-MM-DD)"
                    value={classItem.classDate}
                    onChangeText={(text) => handleInputChange(classItem.id, 'classDate', text)}
                  />
                  <TouchableOpacity
                    style={styles.updateButton}
                    onPress={() => updateClass(classItem.id, classItem)}
                  >
                    <Text style={styles.updateButtonText}>Update</Text>
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
              <Text style={styles.modalText}>Class updated successfully!</Text>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  updateButtonText: {
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

export default UpdateClass;
