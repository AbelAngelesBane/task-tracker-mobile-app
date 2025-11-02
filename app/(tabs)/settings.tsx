import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useTheme from '@/hooks/useTheme'
import { settingStyles } from '@/assets/styles/settings.styles'
import { Ionicons } from '@expo/vector-icons'
import ProgressStats from '@/components/ProgressStats'
import Preferences from '@/components/Preferences'
import { LinearGradient } from 'expo-linear-gradient'
import Logout from '@/components/Logout'

const SettingsScreen = () => {


  const {colors, isDarkMode, toggleDarkMode} = useTheme()

  const styles = settingStyles(colors)


  return (
    <LinearGradient colors={colors.gradients.background} style={styles.container}>
      <SafeAreaView style={[styles.safeArea]}  >

        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <LinearGradient colors={colors.gradients.primary} style={styles.iconContainer}>
              <Ionicons name='settings' size={28} color="#ffff"/>
            </LinearGradient>
            <Text style={styles.title}>Settings</Text>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView} 
          contentContainerStyle={styles.content} 
          showsVerticalScrollIndicator={false}>
            <ProgressStats/>
            <Preferences/>
            <Logout/>
        </ScrollView>

        

      </SafeAreaView>
    </LinearGradient>


  )
}

export default SettingsScreen