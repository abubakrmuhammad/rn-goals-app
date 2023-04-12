import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Pressable,
} from 'react-native';
import { useGoalsContext } from '../context/goalsContext';

function GoalItem(props: { index: number; title: string; id: string }) {
  const { index, id, title } = props;
  const { deleteGoal } = useGoalsContext();

  return (
    <View style={styles.goalItem}>
      <Text>
        {index + 1}. {title}
      </Text>
      {/* delete button */}
      <Pressable
        style={({ pressed }) => [
          { opacity: pressed ? 0.5 : 1 },
          styles.deleteButton,
        ]}
        onPress={() => {
          deleteGoal(id);
        }}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </Pressable>
    </View>
  );
}

function GoalsList() {
  const { goals } = useGoalsContext();

  return (
    <FlatList
      style={styles.goalsList}
      data={goals}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <GoalItem index={index} id={item.id} title={item.title} />
      )}
    />
  );
}

export default GoalsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
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
  goalItem: {
    padding: 12,
    paddingVertical: 18,
    backgroundColor: '#fff',
    color: '#1e293b',
    marginBottom: 8,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: '#f56565',
    borderRadius: 4,
    padding: 8,
    paddingHorizontal: 12,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
