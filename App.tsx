import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, FlatList } from 'react-native';
import { Stats } from './src/components/Stats';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { TasksList } from './src/components/TasksList';
interface Task {
  id: number;
  title: string;
  done: boolean;
}

export default function App() {
  const [isEmpty, setIsEmpty] = useState(true);
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const [createdTasksCount, setCreatedTasksCount] = useState(0);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);

  function handleAddNewTask() {
    if (task === '') return;

    const data = {
      id: new Date().getTime(),
      title: task,
      done: false,
    }

    setTasks(oldState => [...oldState, data]);
    setIsEmpty(false);
    setCreatedTasksCount(oldState => oldState + 1);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));
    const foundItem = updatedTasks.find(item => item.id === id);
    if (!foundItem) return;
    foundItem.done = !foundItem.done;
    setTasks(updatedTasks);
    setCompletedTasksCount(oldState => foundItem.done ? oldState + 1 : oldState - 1);
  }

  function handleRemoveTask(id: number) {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        style="light"
      />
      <View style={styles.header}>
        <Image source={require('./src/assets/logo.png')} />
        <View style={styles.addContainer}>
          <TextInput
            style={styles.addInput}
            placeholder="Adicione uma nova tarefa"
            placeholderTextColor={'#808080'}
            value={task}
            onChangeText={setTask}
          />
          <TouchableOpacity
            style={styles.addButton}
            activeOpacity={0.7}
            onPress={handleAddNewTask}
          >
            <AntDesign name="pluscircleo" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.stats}>
        <Stats
          title="Criadas"
          value={createdTasksCount}
          color="#4EA8DE"
        />
        <Stats
          title="Concluídas"
          value={completedTasksCount}
          color="#8284FA"
        />
      </View>

      <View style={{ paddingHorizontal: 24 }}>
        <View style={styles.line} />
      </View>

      {isEmpty ? (
        <View style={styles.content}>
          <View style={styles.empty}>
            <Image source={require('./src/assets/clipboard.png')} />
            <Text style={styles.emptyTitle}>Você ainda não tem tarefas cadastradas</Text>
            <Text style={styles.emptySubtitle}>Crie tarefas e organize seus itens a fazer</Text>
          </View>
        </View>
      ) : (
        <View style={styles.content}>
          <TasksList
            tasks={tasks}
            onToggleTaskDone={handleToggleTaskDone}
            onRemoveTask={handleRemoveTask}
          />
        </View>
      )}
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  header: {
    backgroundColor: '#0D0D0D',
    width: '100%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stats: {
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  addContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 110,
    paddingTop: 10,
    paddingHorizontal: 24,
  },

  addInput: {
    backgroundColor: '#262626',
    width: 300,
    height: 52,
    borderRadius: 6,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    color: '#FFFFFF',
  },
  addButton: {
    backgroundColor: '#1E6F9F',
    width: 52,
    height: 52,
    borderRadius: 6,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    height: 1,
    backgroundColor: '#333333',
  },
  content: {
    flex: 1,
    marginTop: 25,
    paddingHorizontal: 24,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    marginTop: 48,
  },
  emptyTitle: {
    color: '#808080',
    fontSize: 14,
    marginTop: 16,
    fontWeight: 'bold',
  },
  emptySubtitle: {
    color: '#808080',
    fontSize: 14,
  },
});