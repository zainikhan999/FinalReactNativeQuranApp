import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native';
import { fetchQuranText } from '../Backend/FetchApi'
/*
The hierarchy in which the data has been shown in the app
data-> surahs
[number (e.g 1),name,eng-name,eng-name-translation,revelationType,
ayyahs:[
number(e.g 1),text,numberinsurah,juz,manzil,page,ruku,hizbquater,sajda]........]
*/
const QuranReading = ({ navigation }) => {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchQuranText();
        setSurahs(data.data.surahs);
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch Surah data.');
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text>Loading Surahs...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.background}
      resizeMode="cover">
      <Text style={styles.title}>The Holy Quran</Text>

      <FlatList
        data={surahs}
        keyExtractor={item => item.number.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('SurahDetails', { surah: item })}
          >
            <Text style={styles.englishName}>{item.englishName} - {item.englishNameTranslation}</Text>
            <Text style={styles.arabicName}>{item.name}</Text>

          </TouchableOpacity>)}

      />

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { fontSize: 16, color: 'red' },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
  },
  title:
  {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 3,
    textAlign: 'center',
    color: '#FFD54F'
  },
  englishName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  arabicName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00796B',
    textAlign: 'right'
  },
});

export default QuranReading;
