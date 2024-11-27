import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { auth } from '../Backend/QuranAppAuth';

const BASE_URL = 'https://quranapp-c8c91-default-rtdb.firebaseio.com/';

export default function ClassForm({ navigation }) {
    const [userName, setName] = useState('');
    const [userEmail, setEmail] = useState(auth.currentUser?.email || '');
    const [contact, setContact] = useState('');
    const [availableClasses, setAvailableClasses] = useState([]);
    const [registeredClasses, setRegisteredClasses] = useState([]);
    const [filteredClasses, setFilteredClasses] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                if (user?.email) {
                    setEmail(user.email);
                    await fetchUserContact(user.email);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
        fetchClasses();
    }, []);

    // Fetch available classes and user registered classes
    const fetchClasses = async () => {
        try {
            // Fetch all available classes
            const classesResponse = await axios.get(`${BASE_URL}/classes.json`);
            if (classesResponse.status === 200) {
                const data = classesResponse.data;
                const classArray = Object.entries(data || {}).map(([id, classData]) => ({
                    id,
                    ...classData,
                }));
                setAvailableClasses(classArray);
            }

            // Fetch the user's registered classes
            const registrationsResponse = await axios.get(`${BASE_URL}/registrations.json`);
            if (registrationsResponse.status === 200) {
                const data = registrationsResponse.data;
                const userClasses = Object.values(data || {}).filter(
                    (registration) => registration.email === userEmail
                );
                setRegisteredClasses(userClasses.map((reg) => reg.classTitle));
            }
        } catch (error) {
            console.error('Error fetching classes or registrations:', error);
        }
    };

    // Filter out registered classes from available classes
    useEffect(() => {
        const filtered = availableClasses.filter(
            (classItem) => !registeredClasses.includes(classItem.title)
        );
        setFilteredClasses(filtered);
    }, [availableClasses, registeredClasses]);

    // Fetch user contact information
    const fetchUserContact = async (email) => {
        try {
            const response = await axios.get(`${BASE_URL}/users.json`);
            if (response.status === 200) {
                const data = response.data;
                const user = Object.values(data || {}).find((user) => user.email === email);
                if (user?.contact) {
                    setContact(user.contact);
                }
            }
        } catch (error) {
            console.error('Error fetching user contact:', error);
        }
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (!userName.trim() || !userEmail.trim() || !contact.trim() || !selectedValue) {
            alert('Please fill all fields.');
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}/registrations.json`, {
                name: userName.trim(),
                email: userEmail.trim(),
                contact: contact.trim(),
                classTitle: selectedValue,
            });

            if (response.status === 200) {
                alert('Class registration successful!');
                navigation.navigate('MyClasses');
            }
        } catch (error) {
            console.error('Error registering class:', error);
            alert('Error submitting class registration. Please try again.');
        }
    };

    return (
        <ImageBackground source={require('../assets/background.png')} style={styles.background} resizeMode="cover">
            <KeyboardAvoidingView behavior="padding" style={styles.containerMain}>
                <Text style={{ fontSize: 30, marginBottom: 20 }}>Register for Class</Text>

                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={userName}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={userEmail}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        editable={false} // Make the email field read-only
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Contact"
                        value={contact}
                        onChangeText={setContact}
                        keyboardType="phone-pad"
                        editable={false} // Make the contact field read-only
                    />
                    <Text style={styles.label}>Select Your Class:</Text>
                    <Picker
                        selectedValue={selectedValue}
                        onValueChange={(itemValue) => setSelectedValue(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select Class" value="" />
                        {filteredClasses.map((classOption) => (
                            <Picker.Item key={classOption.id} label={classOption.title} value={classOption.title} />
                        ))}
                    </Picker>

                    <TouchableOpacity style={styles.box} onPress={handleSubmit}>
                        <Text style={styles.boxText}>Submit</Text>
                    </TouchableOpacity>
                </View>
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    picker: {
        height: 50,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 20,
    },
    box: {
        width: '100%',
        padding: 10,
        backgroundColor: '#FFD54F',
        alignItems: 'center',
        borderRadius: 10,
    },
    boxText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    background: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
