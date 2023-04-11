import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import Constants from 'expo-constants';
import { GoalsContextProvider, useGoalsContext } from './context/goalsContext';
import GoalsList from './components/GoalsList';
import GoalsForm from './components/GoalsForm';

function App() {
  const { numberOfGoals } = useGoalsContext();

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>React Native Goals App</Text>
        <Text style={styles.subtitle}>Getting Started with React Native</Text>
      </View>

      <View style={styles.goalsWrapper}>
        <Text style={styles.goalsHeading}>Your Goals ({numberOfGoals})</Text>

        {numberOfGoals === 0 && (
          <Text style={styles.placeholderText}>
            Your goals will display here!
          </Text>
        )}

        <GoalsList />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.formWrapper}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 16 : 20}
      >
        <GoalsForm />
      </KeyboardAvoidingView>

      <ExpoStatusBar style='auto' />
    </View>
  );
}

export default function AppWithProviders() {
  return (
    <GoalsContextProvider>
      <App />
    </GoalsContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 32,
    ...Platform.select({
      ios: {
        paddingTop: Constants.statusBarHeight,
      },
      android: {
        paddingTop: StatusBar.currentHeight,
      },
    }),
  },
  titleWrapper: {
    marginTop: 16,
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
    marginTop: 'auto',
    paddingBottom: 28,
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
});
