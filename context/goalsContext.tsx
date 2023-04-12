import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import { Goal } from '../types';

interface IGoalsContext {
  goals: Goal[];
  addGoal: (goal: string) => void;
  numberOfGoals: number;
  deleteGoal: (goalId: string) => void;
}

const GoalsContext = createContext<IGoalsContext>({} as IGoalsContext);

export const useGoalsContext = () => useContext(GoalsContext);

export function GoalsContextProvider({ children }: PropsWithChildren) {
  const [goals, setGoals] = useState<Goal[]>([]);

  const addGoal = useCallback((goal: string) => {
    setGoals((prevGoals) => [
      ...prevGoals,
      {
        id: Math.random().toString(),
        title: goal,
      },
    ]);
  }, []);

  const deleteGoal = useCallback((goalId: string) => {
    setGoals((prevGoals) => {
      return prevGoals.filter((goal) => goal.id !== goalId);
    });
  }, []);

  const numberOfGoals = goals.length;

  return (
    <GoalsContext.Provider
      value={{
        goals,
        addGoal,
        deleteGoal,
        numberOfGoals,
      }}
    >
      {children}
    </GoalsContext.Provider>
  );
}
