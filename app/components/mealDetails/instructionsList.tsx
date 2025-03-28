import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Recipe } from '@/app/types/Meal'
import globalStyles from '@/styles/global'

const InstructionsList = ({recipe} : {recipe : Recipe[]}) => {
  return (
    <View>
        <Text style={globalStyles.TitleText}>Recipe Instructions</Text>
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
    instructionBox: {
        flexDirection: 'row',
        margin: 10,
    },
    stepNumber: {
        backgroundColor: 'rgb(189, 201, 191)',
        height: 38,
        padding: 5,
        marginRight: 5,
        borderRadius: 10,
    }
})