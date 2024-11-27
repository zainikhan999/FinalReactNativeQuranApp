// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, ImageBackground } from 'react-native';
// import axios from 'axios';

// const BASE_URL = 'https://quranapp-c8c91-default-rtdb.firebaseio.com/';

// const RegisterForClass = ({ navigation }) => {
//   const [classes, setClasses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchClasses();
//   }, []);

//   // Fetch available classes from Firebase
//   const fetchClasses = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/classes.json`);
//       if (response.status === 200) {
//         const data = response.data;
//         const formattedClasses = Object.entries(data || {}).map(([id, classData]) => ({
//           id,
//           ...classData,
//         }));
//         setClasses(formattedClasses);
//       }
//     } catch (error) {
//       console.error('Error fetching classes:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle registration for a class
//   const handleRegister = (classTitle) => {
//     Alert.alert(`Successfully registered for ${classTitle}`);
//     navigation.navigate('ClassForm');
//   };

//   return (
//     <ImageBackground source={require('../assets/background.png')} style={styles.background} resizeMode="cover">
//       <View style={styles.container}>
//         <Text style={styles.title}>Register for Classes</Text>
//         {loading ? (
//           <Text style={styles.loadingText}>Loading classes...</Text>
//         ) : (
//           <ScrollView contentContainerStyle={styles.scrollContainer}>
//             {classes.map((classItem) => (
//               <View key={classItem.id} style={styles.card}>
//                 <Image
//                   source={require('../assets/Mosque.png')} // Default thumbnail
//                   style={styles.thumbnail}
//                 />
//                 <View style={styles.cardContent}>
//                   <Text style={styles.classTitle}>{classItem.title || 'Class Title'}</Text>
//                   <Text style={styles.classTime}>
//                     Time: {classItem.startTime || 'N/A'} - {classItem.endTime || 'N/A'}
//                   </Text>
//                   <Text style={styles.instructor}>Class Date: {classItem.classDate || 'N/A'}</Text>
//                   <Text style={styles.instructor}>Instructor: {classItem.instructor || 'N/A'}</Text>
//                   <Text style={styles.classDay}>Day: {classItem.classDay || 'N/A'}</Text>
//                   <TouchableOpacity
//                     style={styles.registerButton}
//                     onPress={() => handleRegister(classItem.title)}
//                   >
//                     <Text style={styles.registerButtonText}>Register</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             ))}
//           </ScrollView>
//         )}
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   container: {
//     flex: 1,
//     paddingHorizontal: 10, // Padding to prevent edge collisions
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginTop: 20,
//     marginBottom: 15,
//     textAlign: 'center',
//     color: '#FFD54F',
//   },
//   scrollContainer: {
//     paddingBottom: 20,
//     alignItems: 'center', // Center all cards
//   },
//   card: {
//     backgroundColor: '#fff', // White background for clear visibility
//     borderRadius: 15, // Slightly rounded corners
//     marginVertical: 10, // Spacing between cards
//     width: '90%', // Cards take up 90% of the screen width
//     elevation: 5, // Shadow for Android
//     shadowColor: '#000', // Shadow settings for iOS
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//   },
//   thumbnail: {
//     width: '100%',
//     height: 150,
//     borderTopLeftRadius: 15, // Match card's border radius
//     borderTopRightRadius: 15,
//   },
//   cardContent: {
//     padding: 20, // Space inside the card
//   },
//   classTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: '#333',
//   },
//   classTime: {
//     fontSize: 16,
//     color: '#555',
//   },
//   instructor: {
//     fontSize: 16,
//     color: '#555',
//     marginVertical: 5,
//   },
//   classDay: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 10,
//   },
//   registerButton: {
//     backgroundColor: '#FFD54F',
//     paddingVertical: 12,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   registerButtonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
// });



// export default RegisterForClass;
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  Alert, 
  Modal, 
  ImageBackground 
} from 'react-native';
import axios from 'axios';

const BASE_URL = 'https://quranapp-c8c91-default-rtdb.firebaseio.com/';

const RegisterForClass = ({ navigation }) => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

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

  // Handle registration for a class
  const handleRegister = (classItem) => {
    setSelectedClass(classItem);
    setModalVisible(true); // Show the modal
  };

  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.title}>Register for Classes</Text>
        {loading ? (
          <Text style={styles.loadingText}>Loading classes...</Text>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {classes.map((classItem) => (
              <View key={classItem.id} style={styles.card}>
                <Image
                  source={require('../assets/Mosque.png')} // Default thumbnail
                  style={styles.thumbnail}
                />
                <View style={styles.cardContent}>
                  <Text style={styles.classTitle}>{classItem.title || 'Class Title'}</Text>
                  <Text style={styles.classTime}>
                    Time: {classItem.startTime || 'N/A'} - {classItem.endTime || 'N/A'}
                  </Text>
                  <Text style={styles.instructor}>Class Date: {classItem.classDate || 'N/A'}</Text>
                  <Text style={styles.instructor}>Instructor: {classItem.instructor || 'N/A'}</Text>
                  <Text style={styles.classDay}>Day: {classItem.classDay || 'N/A'}</Text>
                  <TouchableOpacity
                    style={styles.registerButton}
                    onPress={() => handleRegister(classItem)}
                  >
                    <Text style={styles.registerButtonText}>Register</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        )}

        {/* Modal for successful registration */}
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Registration Successful!</Text>
              <Text style={styles.modalText}>
                You have successfully registered for {selectedClass?.title}.
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('ClassForm'); // Navigate to ClassForm
                }}
              >
                <Text style={styles.closeButtonText}>Close</Text>
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
  thumbnail: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
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
  registerButton: {
    backgroundColor: '#FFD54F',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#004d40',
  },
  modalText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#FFD54F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default RegisterForClass;

