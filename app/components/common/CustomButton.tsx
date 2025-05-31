import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, globalStyles } from '@/styles'
import { S } from '@/app/utils'

interface ButtonProps {
    onPress: () => void,
    buttonText: string,
}

const CustomButton = ({ onPress, buttonText }: ButtonProps) => {
    return (
        <TouchableOpacity style={styles.button}
            onPress={onPress}>
            <Text style={globalStyles.whiteText}>{buttonText}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    button: {
        marginBottom: S(10),
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'center',
        backgroundColor: COLORS.primary,
        padding: S(10),
        borderRadius: S(5),
        minWidth: '95%',
        zIndex: -10,
    },

})