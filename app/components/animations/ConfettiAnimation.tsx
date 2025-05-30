import LottieView from "lottie-react-native"
import React from "react";
import { StyleSheet } from 'react-native'

const ConfettiAnimation = React.forwardRef<LottieView, {}>((_, ref) => {
    return (
        <LottieView
            ref={ref}
            source={require('@/assets/confetti.json')}
            autoPlay={false}
            loop={false}
            style={styles.lottie}
            resizeMode='cover'
        />
    )
})

export default ConfettiAnimation

const styles = StyleSheet.create({
    lottie: {
        position: 'absolute',
        top: -210,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 500,
        pointerEvents: 'none',
    },
});