import { View, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'


import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { homeStyles } from '@/assets/styles/home.styles'
import useTheme from '@/hooks/useTheme'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'


const TodoInput = () => {
    const {colors} = useTheme()    
    const styles = homeStyles(colors)

    const [newTodo, setNewTodo] = useState("")
    const addTodo = useMutation(api.todos.addTodo)
    const handleTodo = async () => {
        console.log("reacher her")
        if(newTodo.trim()){
            try {
                await addTodo({text:newTodo.trim()})
                setNewTodo("")
            
            } catch (error) {
                Alert.alert("Error", "Failed add to do")
            }
        }
    }


  return (
    <View style={styles.inputSection}>
      <View style={styles.inputWrapper}>
        <TextInput 
            style={styles.input}
            placeholder='What needs attention'
            value={newTodo}
            onChangeText={setNewTodo}
            onSubmitEditing={handleTodo}
            multiline
            placeholderTextColor={colors.textMuted}/>
        <TouchableOpacity 
            onPress={handleTodo}
            activeOpacity={0.8}
            disabled={!newTodo.trim()}>
            <LinearGradient colors={newTodo.trim() ? colors.gradients.primary : colors.gradients.muted} style={[styles.actionButton, newTodo.trim() && styles.addButtonDisabled]}>
                <Ionicons name='add' size={24} color="#ffffff"/>
            </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TodoInput