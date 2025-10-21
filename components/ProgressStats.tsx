import { View, Text } from 'react-native'
import React from 'react'
import useTheme from '@/hooks/useTheme'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { LinearGradient } from 'expo-linear-gradient'
import { settingStyles } from '@/assets/styles/settings.styles'
import { Ionicons } from '@expo/vector-icons'
import Preferences from './Preferences'

const ProgressStats = () => {

    const {colors} = useTheme()
    const styles = settingStyles(colors)

    const todos =  useQuery(api.todos.getTodos)

    const totalTodos = todos ? todos.length : 0
    const completedTodos = todos ? todos.filter((todo) => todo.isCompleted).length : 0
    const activeTodos = totalTodos - completedTodos
    

  return (
    <LinearGradient
        style={[styles.section]} 
        colors={colors.gradients.surface}>

        <Text style={styles.sectionTitle}>Progress Stats</Text>
        <View style={styles.statsContainer}>

            {/* Total Todo Card */}
            <LinearGradient 
            colors={colors.gradients.background}
            style={[styles.statCard, {borderLeftColor: colors.primary}]}>

            <View style={styles.statIconContainer}>
                <LinearGradient colors={colors.gradients.primary} style={styles.statIcon}>
                    <Ionicons name='list' size={20} color="#ffff"/>
                </LinearGradient>
            </View>

            <View >
                <Text style={styles.statNumber}>{totalTodos}</Text>
                <Text style={styles.statLabel}>Total Todos</Text>
            </View>
            </LinearGradient>

            {/* Completed Todos Card */}
            <LinearGradient 
            colors={colors.gradients.background}
            style={[styles.statCard, {borderLeftColor: colors.success}]}>

            <View style={styles.statIconContainer}>
                <LinearGradient colors={colors.gradients.success} style={styles.statIcon}>
                    <Ionicons name='checkmark-circle' size={20} color="#ffff"/>
                </LinearGradient>
            </View>

            <View >
                <Text style={styles.statNumber}>{completedTodos}</Text>
                <Text style={styles.statLabel}>Completed Todos</Text>
            </View>
            </LinearGradient>

            {/* Active Todos Card */}
            <LinearGradient 
            colors={colors.gradients.background}
            style={[styles.statCard, {borderLeftColor: colors.warning}]}>

            <View style={styles.statIconContainer}>
                <LinearGradient colors={colors.gradients.warning} style={styles.statIcon}>
                    <Ionicons name='checkmark-circle' size={20} color="#ffff"/>
                </LinearGradient>
            </View>

            <View >
                <Text style={styles.statNumber}>{completedTodos}</Text>
                <Text style={styles.statLabel}>Completed Todos</Text>
            </View>
            </LinearGradient>

        </View>
        
        

        

    </LinearGradient>
  )
}

export default ProgressStats