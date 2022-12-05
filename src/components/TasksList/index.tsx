import React from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export interface Task {
    id: number;
    title: string;
    done: boolean;
}

interface TasksListProps {
    tasks: Task[];
    onToggleTaskDone: (id: number) => void;
    onRemoveTask: (id: number) => void;
}

export function TasksList({ tasks, onToggleTaskDone, onRemoveTask }: TasksListProps) {

    return (
        <FlatList
            data={tasks}
            keyExtractor={item => String(item.id)}
            contentContainerStyle={{ paddingBottom: 24 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
                return (
                    <View style={styles.container}>
                        <View style={{ marginRight: 8 }}>
                            {item.done ? (
                                <TouchableOpacity
                                    onPress={() => onToggleTaskDone(item.id)}
                                    activeOpacity={0.7}
                                >
                                    <MaterialIcons
                                        name="check-box"
                                        size={24}
                                        color="#5E60CE"
                                    />
                                </TouchableOpacity>

                            ) : (
                                <TouchableOpacity
                                    onPress={() => onToggleTaskDone(item.id)}
                                >
                                    <MaterialIcons
                                        name="check-box-outline-blank"
                                        size={24}
                                        color="#4EA8DE"
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                        <Text style={[
                            styles.title,
                            item.done ?
                                { textDecorationLine: 'line-through', color: '#808080' } :
                                { textDecorationLine: 'none' }
                        ]}>{item.title}</Text>
                        <View>
                            <TouchableOpacity
                                onPress={() => onRemoveTask(item.id)}
                            >
                                <MaterialCommunityIcons
                                    name="trash-can-outline"
                                    size={24} color="#808080"
                                />
                            </TouchableOpacity>

                        </View>
                    </View>
                )
            }}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: '#262626',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#333333',
        marginBottom: 8,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 14,
        marginRight: 8,
    },
});