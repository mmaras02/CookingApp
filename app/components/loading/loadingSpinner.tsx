import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { COLORS } from "@/styles";

const LoadingSpinner = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={COLORS.orange} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
});

export default LoadingSpinner;
