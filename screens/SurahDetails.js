import React from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground } from 'react-native';

const SurahDetails = ({ route }) => {
  // item---> surah
  const { surah } = route.params;

  return (
    <ImageBackground source={require('../assets/background.png')}
      style={styles.background} resizeMode="cover">

      <Text style={styles.surahTitle}>
        {surah.englishName} - {surah.name}
      </Text>
      <FlatList style={styles.container}
        data={surah.ayahs}
        keyExtractor={item => item.number.toString()}
        renderItem={({ item }) => (
          <View style={{padding:6.2}}>
          <View style={styles.card}>
            <Text style={styles.arabicText}>{item.text}</Text>
            <Text style={styles.ayahNumber}>Ayah {item.numberInSurah}</Text>
          </View>
          </View>
        )}
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
  container: { padding:8,overflow:'scroll'},
  surahTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 3,
    textAlign: 'center',
    color: '#FFD54F'
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 9,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
  },
  arabicText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
    color:'green'
  },
  ayahNumber: {
    fontSize: 14,
    color: '#555',
    marginTop: 5
  },
});

export default SurahDetails;
