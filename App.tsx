import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import {
  Button,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
} from 'react-native';

type Goal = {
  id: string;
  label: string;
};

export default function App() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const addGoalHandler = useCallback((goal: string) => {
    if (goal.length === 0) {
      return;
    }

    setGoals((prevGoals) => [
      ...prevGoals,
      {
        id: Math.random().toString(),
        label: goal,
      },
    ]);

    setInputValue('');
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>React Native Goals App</Text>
        <Text style={styles.subtitle}>Getting Started with React Native</Text>
      </View>

      <View style={styles.goalsWrapper}>
        <Text style={styles.goalsHeading}>Your Goals</Text>

        {goals.length === 0 && (
          <Text style={styles.placeholderText}>
            Your goals will display here!
          </Text>
        )}

        <FlatList
          style={styles.goalsList}
          keyExtractor={(item) => item.id}
          data={goals}
          renderItem={({ item, index }) => (
            <View style={styles.goalWrapper}>
              <Text>
                {index + 1}. {item.label}
              </Text>
            </View>
          )}
        />
      </View>

      <View style={styles.formWrapper}>
        <TextInput
          style={styles.input}
          placeholder='Enter your Goal'
          value={inputValue}
          onChangeText={setInputValue}
        />

        <Button
          title='Add Goal'
          onPress={() => addGoalHandler(inputValue)}
          // style={styles.addButton}
          color='#0f172a'
        />
      </View>

      <ExpoStatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 32,
  },
  titleWrapper: {
    marginTop: 48,
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    color: '#0f172a',
    fontSize: 28,
    marginBottom: 4,
  },
  subtitle: {
    color: '#475569',
    fontSize: 16,
  },
  formWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    gap: 8,
    marginTop: 'auto',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#94a3b8',
    borderBottomWidth: 2,
    borderRadius: 4,
    padding: 12,
    flexGrow: 1,
  },
  goalsWrapper: {
    width: '100%',
    flexShrink: 1,
  },
  placeholderText: {
    color: '#94a3b8',
    textAlign: 'center',
    marginVertical: 32,
  },
  goalsHeading: {
    color: '#0f172a',
    fontSize: 24,
  },
  goalsList: {
    marginVertical: 12,
  },
  goalWrapper: {
    padding: 12,
    paddingVertical: 18,
    backgroundColor: '#fff',
    color: '#1e293b',
    marginBottom: 8,
    borderRadius: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  addButton: {
    backgroundColor: '#94a3b8',
  },
});
