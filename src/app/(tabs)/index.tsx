import { Link } from 'expo-router';
import { View, Text, StyleSheet, Pressable } from 'react-native';

// Faz 1'de gerçek kitap verisiyle değişecek
const SAMPLE_BOOKS = [
  { id: 'ornek-a1', title: 'Örnek Kitap', level: 'A1' },
  { id: 'ornek-b1', title: 'Örnek Kitap 2', level: 'B1' },
];

export default function BooksScreen() {
  return (
    <View style={styles.container}>
      {SAMPLE_BOOKS.map((book) => (
        <Link
          key={book.id}
          href={{ pathname: '/book/[id]', params: { id: book.id } }}
          asChild
        >
          <Pressable style={styles.item}>
            <Text style={styles.level}>{book.level}</Text>
            <Text>{book.title}</Text>
          </Pressable>
        </Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  level: {
    fontWeight: 'bold',
  },
});
