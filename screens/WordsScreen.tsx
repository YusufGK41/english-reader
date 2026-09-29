import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const STORAGE_KEY = 'savedWords';

export default function WordsScreen() {
  const [words, setWords] = useState<string[]>([]);

  const loadWords = async () => {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw === null) {
      setWords([]);
      return;
    }
    try {
      const list = JSON.parse(raw) as string[];
      if (Array.isArray(list)) {
        setWords(list);
      } else {
        setWords([]);
      }
    } catch {
      // Depoda eski/bozuk veri (ör. düz "hello" string) → kırmızı parse hatası
      setWords([]);
      await AsyncStorage.removeItem(STORAGE_KEY);
    }
  };

  useEffect(() => {
    loadWords();
  }, []);

  const handleSave = async () => {
    setWords((prev) => {
      const newWords = [...prev, 'hello'];
      void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newWords));
      return newWords;
    });
  };

  const handleClear = async () => {
    setWords([]);
    await AsyncStorage.removeItem(STORAGE_KEY);
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
