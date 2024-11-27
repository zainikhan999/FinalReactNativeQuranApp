import './gesture-handler';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, AuthContext } from './screens/Context/AuthContext';
import Login from './screens/Login';
import HomeScreen from './screens/HomeScreen';
import MyClasses from './screens/MyClasses';
import QuranReading from './screens/QuranReading';
import QuranTranslation from './screens/QuranTranslation';
import RegisterForClass from './screens/RegisterForClass';
import SurahDetails from './screens/SurahDetails';
import TranslationDetails from './screens/TranslationDetails';
import Logout from './screens/Logout';
import ClassForm from './screens/ClassForm';
import SignUp from './screens/SignUp';
import Delete from './screens/Delete';
import { setCustomText } from 'react-native-global-props';
import DashboardScreen from './screens/DashboardScreen';
import AddStudentScreen from './screens/AddStudentScreen';
import UpdateStudentScreen from './screens/UpdateStudentScreen';
import ViewStudentsScreen from './screens/ViewStudentsScreen';
import AddClassScreen from './screens/AddClassScreen';
import DeleteClass from './screens/DeleteClass';
import UpdateClass from './screens/UpdateClass';

// Set a global font
setCustomText({
  style: {
    fontFamily: 'KFGQPC Uthmanic Script HAFS Regular.otf', // Make sure this matches the internal font name
  },
});

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  const { user } = useContext(AuthContext); // Access user state from context
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      // Check if the user is admin based on email
      setIsAdmin(user.email === 'admin@gmail.com');
    }
  }, [user]);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName={user ? (isAdmin ? 'AdminDashboard' : 'Home') : 'Login'}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#004d40',
            elevation: 0,
          },
          headerTitle: '',
          drawerStyle: {
            backgroundColor: '#F0F0F0',
            width: 240,
          },
          drawerLabelStyle: {
            fontSize: 18,
            color: '#00796B',
          },
          drawerActiveTintColor: '#FFD54F',
          drawerInactiveTintColor: '#333',
          drawerActiveBackgroundColor: '#e0e0e0',
          drawerItemStyle: {
            marginVertical: 5,
          },
        }}
      >
        {user ? (
          isAdmin ? (
            // Admin screens
            <>
              <Drawer.Screen name="AdminDashboard" component={DashboardScreen} />
              <Drawer.Screen name="AddStudent" component={AddStudentScreen} />
              <Drawer.Screen name="UpdateStudent" component={UpdateStudentScreen} />
              <Drawer.Screen name="ViewStudents" component={ViewStudentsScreen} />
              <Drawer.Screen name="AddClass" component={AddClassScreen} />
              <Drawer.Screen name="UpdateClass" component={UpdateClass} />
              <Drawer.Screen name="DeleteClass" component={DeleteClass} />
              <Drawer.Screen name="Logout" component={Logout} />
            </>
          ) : (
            // Regular user screens
            <>
              <Drawer.Screen name="Home" component={HomeScreen} />
              <Drawer.Screen name="QuranReading" component={QuranReading} />
              <Drawer.Screen
                name="SurahDetails"
                component={SurahDetails}
                options={{
                  drawerItemStyle: { display: 'none' },
                }}
              />
              <Drawer.Screen
                name="TranslationDetails"
                component={TranslationDetails}
                options={{
                  drawerItemStyle: { display: 'none' },
                }}
              />
              <Drawer.Screen
                name="ClassForm"
                component={ClassForm}
                options={{
                  drawerItemStyle: { display: 'none' },
                }}
              />
              <Drawer.Screen name="QuranTranslation" component={QuranTranslation} />
              <Drawer.Screen name="RegisterForClass" component={RegisterForClass} />
              <Drawer.Screen name="MyClasses" component={MyClasses} />
              <Drawer.Screen name="Logout" component={Logout} />
              <Drawer.Screen name="Delete" component={Delete} />
            </>
          )
        ) : (
          // Screens accessible to non-logged-in users
          <>
            <Drawer.Screen name="Login" component={Login} />
            <Drawer.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
