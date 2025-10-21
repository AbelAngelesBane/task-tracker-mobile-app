import { View, Text } from 'react-native'
import React from 'react'
import useTheme from '@/hooks/useTheme'
import { homeStyles } from '@/assets/styles/home.styles'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

const EmptyState = () => {

    const {colors} = useTheme()

    const styles = homeStyles(colors)


  return (
    <View style={styles.emptyContainer}>
      <LinearGradient 
        colors={colors.gradients.empty}
        style={styles.emptyIconContainer}>
            <Ionicons name='clipboard-outline' size={60} color={colors.textMuted}/>
      </LinearGradient>
    <Text style={styles.emptyText}>EMPTY</Text>
    <Text style={styles.emptySubtext  }>Add your first todo aboce to get started!</Text>
    </View>
  )
}

export default EmptyState