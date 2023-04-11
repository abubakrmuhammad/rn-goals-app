import { useCallback, useState } from 'react';
import { StyleSheet, TextInput, View, Pressable, Text } from 'react-native';
import { useGoalsContext } from '../context/goalsContext';

function GoalsForm() {
  const { addGoal } = useGoalsContext();
  const [inputValue, setInputValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const addGoalHandler = useCallback((goal: string) => {
    if (goal.length === 0) {
      return;
    }

    addGoal(goal);

    setInputValue('');
  }, []);

  const inputStyles = [styles.input, isFocused && styles.focusedInput];

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={inputStyles}
        placeholder='Enter your Goal'
        value={inputValue}
        onChangeText={setInputValue}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <Pressable
        style={styles.addButton}
        onPress={() => addGoalHandler(inputValue)}
      >
        <Text style={styles.text}>Add Goal</Text>
      </Pressable>
    </View>
  );
}

export default GoalsForm;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    gap: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#94a3b8',
    borderBottomWidth: 2,
    borderRadius: 4,
    padding: 12,
    flexGrow: 1,
  },
  focusedInput: {
    borderColor: '#0f172a',
  },
  addButton: {
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 1,
  },
  text: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
