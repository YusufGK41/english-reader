import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BooksScreen from './screens/BooksScreen';
import QuizScreen from './screens/QuizScreen';
import ReaderScreen from './screens/ReaderScreen';
import WordsScreen from './screens/WordsScreen';

const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Books"
            component={BooksScreen}
            options={{ title: 'Kitaplar', tabBarLabel: 'Kitaplar' }}
          />
          <Tab.Screen
            name="Reader"
            component={ReaderScreen}
            options={{ title: 'Okuyucu', tabBarLabel: 'Okuyucu' }}
          />
          <Tab.Screen
            name="Words"
            component={WordsScreen}
            options={{ title: 'Kelimelerim', tabBarLabel: 'Kelimelerim' }}
          />
          <Tab.Screen
            name="Quiz"
            component={QuizScreen}
            options={{ title: 'Test', tabBarLabel: 'Test' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
