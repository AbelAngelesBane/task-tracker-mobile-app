import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import useTheme from "@/hooks/useTheme";
import { homeStyles } from '@/assets/styles/home.styles'

const LoadingSpinner = () => {
    const {colors} = useTheme()
    const styles = homeStyles(colors)

  return (
    <LinearGradient colors={colors.gradients.background} style={styles.container}>
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary}/>
            <Text style={styles.loadingText}>Fetching...</Text>
            
        </View>


    </LinearGradient>
  )
}

export default LoadingSpinner