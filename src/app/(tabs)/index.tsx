import { Link } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { books } from "@/data/books";

export default function BooksScreen() {
  return (
    <View style={styles.container}>
      {books.map((book) => (
        <Link
          key={book.id}
          href={{ pathname: "/book/[id]", params: { id: book.id } }}
          asChild
        >
          <Pressable style={styles.item}>
            <Text style={styles.level}>{book.level}</Text>
            <View>
              <Text style={styles.title}>{book.title}</Text>
              <Text style={styles.author}>
                {book.author ?? "Yazarı Bilinmiyor"}
              </Text>
            </View>
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
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  level: {
    fontWeight: "bold",
    backgroundColor: "#2563eb",
    color: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  author: {
    fontSize: 14,
    color: "#666",
  },
});
