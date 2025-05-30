import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, globalStyles } from '@/styles'
import { S } from '@/app/utils'

interface HeaderProps {
    titleText: string,
    onPress?: () => void,
}

const TitleHeader = ({ titleText, onPress }: HeaderProps) => {
    return (
        <View style={styles.container}>
            <Text style={globalStyles.titleText}>{titleText}</Text>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.moreText}>Vidi više</Text>
            </TouchableOpacity>
        </View>
    )
}

export default TitleHeader

const styles = StyleSheet.create({
    container: {
        marginLeft: S(15),
        marginTop: S(20),
        marginBottom: 0,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    moreText: {
        fontSize: S(14),
        color: COLORS.orange,
        fontWeight: 700,
        marginRight: S(10),
        marginTop: S(10),
    },

})