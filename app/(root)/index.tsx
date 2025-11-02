import { Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'
import { homeStyles } from '@/assets/styles/home.styles'
import useTheme from '@/hooks/useTheme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { useConvexAuth } from "convex/react"


const SplashScreen = () => {
    console.log("CHECKS HERE")
    const {isAuthenticated, isLoading} = useConvexAuth() 

    const {colors} = useTheme()
    const styles = homeStyles(colors)

    if (isLoading) {
        return (
        <LinearGradient colors={colors.gradients.background} style={styles.container}>
            <SafeAreaView style={[styles.safeArea, { justifyContent:'center', alignItems:'center'}]}>
                <ActivityIndicator size='large' color={colors.primary}/>
                <Text style={[styles.title, {opacity:0.2}]}>Welcome</Text>
            </SafeAreaView>
        </LinearGradient>
        )
    }

    if (!isAuthenticated) {
      return <Redirect href={'/(auth)/signin'} />
    }
    else {
        console.log("SIGNEDIN")
        return <Redirect href={'/(tabs)'}/>
    }
}

export default SplashScreen