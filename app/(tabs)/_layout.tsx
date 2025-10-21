import { View, Text } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'
import {Ionicons} from '@expo/vector-icons'
import useTheme from '@/hooks/useTheme'

const TabsLayout = () => {
    const {colors} = useTheme()
  return (
    <Tabs screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor:colors.textMuted,
        tabBarStyle:{
            borderTopWidth:2,
            backgroundColor: colors.border,
            paddingTop:10,        
        },
        tabBarLabelStyle:{
            fontSize:12,
            fontWeight:600
        }
        
        }}>
        <Tabs.Screen 
            name='index' 
            options={{title:'todos', 
                headerShown:false,
                tabBarIcon:({color,size}) => (
                    <Ionicons name='flash-outline' size={size} color={color}/>
                )}}
            />

        <Tabs.Screen 
            name='settings' 
            options={{title:'settings', 
                headerShown:false,
                tabBarIcon:({color,size}) => (
                    <Ionicons name='settings' size={size} color={color}/>
                )}}
            />


    </Tabs>
  )
}

export default TabsLayout