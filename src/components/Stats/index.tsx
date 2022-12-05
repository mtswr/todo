import { StyleSheet, Text, View } from 'react-native';

interface StatsProps {
    title: string;
    value: number;
    color: string;
}

export function Stats ({title, value, color} : StatsProps) {
    return (
        <View style={styles.container}>
            <Text 
                style={[styles.statsTitle, {color}]}
            >{title}</Text>
            <View style={styles.statsValueContainer}>
                <Text style={styles.statsValue}>{value}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    statsTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: 5,
    },
    statsValueContainer: {
        backgroundColor: '#333333',
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    statsValue: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
});