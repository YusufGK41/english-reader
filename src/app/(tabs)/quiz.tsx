import { View, Text, StyleSheet } from 'react-native';

export default function QuizScreen() {
  return (
    <View style={styles.container}>
      <Text>QuizScreen ekranı</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
