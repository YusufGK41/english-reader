import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const STORAGE_KEY = 'savedWords';

async function readWords(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (raw === null) {
    return [];
  }
  try {
    const list: unknown = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch {
    // Depoda eski/bozuk veri (ör. düz "hello" string) → kırmızı parse hatası
    await AsyncStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

export default function WordsScreen() {
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    readWords()
      .then(setWords)
      .catch((error) => console.warn('Kelimeler okunamadı', error));
  }, []);

  const handleSave = async () => {
    // Yeni listeyi önce hesapla, sonra hem state'e hem depoya yaz.
    // Kaydı setWords(prev => ...) içinde yapmak yan etkidir; React o fonksiyonu iki kez çağırabilir.
    const newWords = [...words, 'hello'];
    setWords(newWords);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newWords));
    } catch (error) {
      console.warn('Kelime kaydedilemedi', error);
    }
  };

  const handleClear = async () => {
    setWords([]);
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn('Liste temizlenemedi', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Kelime sayısı: {words.length}</Text>
      <Text>{words.join(', ')}</Text>
      <Pressable style={styles.btn} onPress={handleSave}>
        <Text>Test: hello ekle</Text>
      </Pressable>
      <Pressable style={styles.btn} onPress={handleClear}>
        <Text>Listeyi temizle</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  btn: {
    padding: 12,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
});
