import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../../Backend/QuranAppAuth'; // Firebase auth
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage

// Create Auth Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to store the current user

  // Load user from AsyncStorage when the app starts
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser)); // Restore user state
        }
      } catch (error) {
        console.error("Failed to load user:", error);
      }
    };

    loadUser(); // Load user from AsyncStorage

    // Firebase listener for authentication state changes
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser); // Update the user state
      try {
        if (currentUser) {
          await AsyncStorage.setItem('user', JSON.stringify(currentUser)); // Save user data to AsyncStorage
        } else {
          await AsyncStorage.removeItem('user'); // Remove user data if logged out
        }
      } catch (error) {
        console.error("Failed to update user:", error);
      }
    });

    return unsubscribe; // Cleanup listener on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
