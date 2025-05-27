import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { globalStyles } from '@/styles';
import { Recipe } from '@/app/types';
import { S, VS } from '@/app/utils';

const InstructionsList = ({ recipe }: { recipe: Recipe[] }) => {
    return (
        <View style={styles.container}>
            <Text style={globalStyles.TitleText}>Priprema</Text>
            {recipe.map((step) => (
                <View style={styles.instructionBox} key={step.step_number}>
                    <View style={styles.stepNumber}><Text style={globalStyles.text}> {step.step_number}</Text></View>
                    <Text style={globalStyles.text}>{step.instructions}</Text>
                </View>
            ))}
        </View>
    )
}

export default InstructionsList

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    instructionBox: {
        flexDirection: 'row',
        padding: S(10),
        marginRight: S(10),
    },
    stepNumber: {
        backgroundColor: 'rgb(189, 201, 191)',
        height: VS(30),
        padding: S(4),
        marginRight: S(5),
        borderRadius: 10,
    }
})