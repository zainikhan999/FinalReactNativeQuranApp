import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert, ImageBackground, KeyboardAvoidingView, ActivityIndicator, Modal } from 'react-native';
import axios from 'axios';

// Ensure this URL is correct and matches your Firebase setup
const BASE_URL = 'https://quranapp-c8c91-default-rtdb.firebaseio.com/';

export default function AddClassScreen({ navigation }) {
    const [classTitle, setClassTitle] = useState('');
    const [instructorName, setInstructorName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [classDay, setClassDay] = useState('');
    const [classDate, setClassDate] = useState(''); // State for Class Date
    const [loading, setLoading] = useState(false);
    const [successModalVisible, setSuccessModalVisible] = useState(false); // State for success modal

    const handleAddClass = async () => {
        // Validate input fields
        if (!classTitle || !instructorName || !startTime || !endTime || !classDay || !classDate) {
            Alert.alert('Error', 'Please fill all fields.');
            return;
        }

        setLoading(true); // Set loading state

        try {
            // Create a new class object
            const newClass = {
                title: classTitle,
                instructor: instructorName,
                startTime,
                endTime,
                classDay,
                classDate, // Include classDate in the object
            };

            // Send POST request to Firebase
            await axios.post(`${BASE_URL}/classes.json`, newClass);

            setSuccessModalVisible(true); // Show success modal
            resetForm();
        } catch (error) {
            console.error("Error adding class:", error);
            Alert.alert('Error', 'Error adding class. Please try again.');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const resetForm = () => {
        setClassTitle('');
        setInstructorName('');
        setStartTime('');
        setEndTime('');
        setClassDay('');
        setClassDate(''); // Reset classDate field
    };

    return (
        <ImageBackground source={require('./Home.png')} style={styles.background} resizeMode="cover">
            <KeyboardAvoidingView behavior="padding" style={styles.containerMain}>
                <Text style={styles.title}>Add Class</Text>

                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        placeholder="Class Title"
                        value={classTitle}
                        onChangeText={setClassTitle}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Instructor Name"
                        value={instructorName}
                        onChangeText={setInstructorName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Start Time (e.g., 10:00 AM)"
                        value={startTime}
                        onChangeText={setStartTime}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="End Time (e.g., 11:00 AM)"
                        value={endTime}
                        onChangeText={setEndTime}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Class Day (e.g., Monday)"
                        value={classDay}
                        onChangeText={setClassDay}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Class Date (e.g., YYYY-MM-DD)" // Input for class date
                        value={classDate}
                        onChangeText={setClassDate}
                    />

                    <TouchableOpacity style={styles.box} onPress={handleAddClass} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.boxText}>Add Class</Text>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Success Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={successModalVisible}
                    onRequestClose={() => setSuccessModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>Class added successfully!</Text>
                            <TouchableOpacity
                                style={styles.closeModalButton}
                                onPress={() => setSuccessModalVisible(false)}
                            >
                                <Text style={styles.closeModalButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    containerMain: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    container: {
        width: '90%',
        maxWidth: 400,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 10,
        padding: 20,
        alignSelf: 'center',
    },
    title: {
        fontSize: 30,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    box: {
        width: '100%',
        padding: 10,
        backgroundColor: '#FFA000',
        alignItems: 'center',
        borderRadius: 10,
    },
    boxText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
