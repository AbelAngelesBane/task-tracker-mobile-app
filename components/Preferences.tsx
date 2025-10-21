import { View, Text, Switch } from 'react-native'
import React, { useState } from 'react'
import { settingStyles } from '@/assets/styles/settings.styles'
import useTheme from '@/hooks/useTheme'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

const Preferences = () => {

  const {isDarkMode, toggleDarkMode, colors} = useTheme()
  const styles = settingStyles(colors)
  return (
    <LinearGradient colors={colors.gradients.surface} style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
                <LinearGradient colors={colors.gradients.primary} style={styles.settingIcon}>
                    <Ionicons name='moon' size={18} color="#ffff"/>
                </LinearGradient>
                <Text style={styles.settingText}>Dark Mode</Text>
            </View>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          thumbColor="#ffff"/>
        </View>


    </LinearGradient>
  )
}

export default Preferences