
import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { fetchTranslation } from '../Backend/FetchApi';

function TranslationDetails({ route }) {
  const { surah } = route.params;
  const [translations, setTranslations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const data = await fetchTranslation();
        setTranslations(data.data.surahs[surah.number - 1].ayahs);
        setLoading(false);
      } catch (err) {
        setError('Oops, there is some error in loading this data');
        setLoading(false);
      }
    };
    fetchingData();
  }, [surah.number]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading Translation...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.main}>
        <Text style={styles.surahTitle}>
          {surah.englishName} - {surah.name}
        </Text>
        <FlatList
          data={surah.ayahs}
          keyExtractor={(item) => item.number.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              <Text style={styles.ayahNumber}>Ayah {item.numberInSurah}</Text>
              <Text style={styles.arabicText}>{item.text}</Text>
              <Text style={styles.translationText}>{translations[index]?.text}</Text>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
}

export default TranslationDetails;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  surahTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 15,
    textAlign: 'center',
    color: '#FFD54F',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  card: {
    backgroundColor: '#ffffffcc', // Transparent white for a cleaner look
    borderRadius: 10,
    marginVertical: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  ayahNumber: {
    fontSize: 16,
    color: '#555',
    fontStyle: 'italic',
    textAlign: 'left',
    marginBottom: 10,
  },
  arabicText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#4CAF50',
    textAlign: 'right',
    lineHeight: 34,
    marginBottom: 10,
  },
  translationText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'left',
    lineHeight: 28,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: 'black',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
