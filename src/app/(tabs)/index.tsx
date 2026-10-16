import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { books } from "@/data/books";
import type { Book } from "@/types/book";

export default function BooksScreen() {
  return (
    <FlatList
      data={books}
      keyExtractor={(book) => book.id}
      renderItem={({ item }) => <BookRow book={item} />}
      ItemSeparatorComponent={Separator}
      contentContainerStyle={styles.content}
    />
  );
}

function BookRow({ book }: { book: Book }) {
  // Link asChild burada kullanılmıyor: Link, içindeki Pressable'ın
  // fonksiyon olan style'ını düz nesneye çevirip basılma efektini bozuyor.
  const openBook = () =>
    router.push({ pathname: "/book/[id]", params: { id: book.id } });

  return (
    <Pressable
      onPress={openBook}
      style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
    >
      <Text style={styles.level}>{book.level}</Text>
      <View style={styles.info}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author ?? "Yazarı bilinmiyor"}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </Pressable>
  );
}

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  separator: {
    height: 12,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  itemPressed: {
    backgroundColor: "#ddd",
  },
  level: {
    fontWeight: "bold",
    backgroundColor: "#2563eb",
    color: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    // iOS'ta Text'in köşeleri bu olmadan yuvarlanmaz
    overflow: "hidden",
  },
  info: {
    flex: 1,
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
