import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import {homeStyles} from "../../assets/styles/home.styles"
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import Header from "@/components/Header";
import TodoInput from "@/components/TodoInput";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";
import EmptyState from "@/components/EmptyState";
import { useState } from "react";
import { updateTodo } from "@/convex/todos";

export default function Index() {
  type Todo = Doc<"todos">

  const {colors} = useTheme()
  const todos = useQuery(api.todos.getTodos)

  const [updatedToDo, setEditText] = useState("")
  const [editingId, setEditingId] = useState<Id<"todos"> | null > (null)
  const [isEditing, setIsEditing] = useState(false)
  
  const isLoading = todos === undefined
  const toggleTodo = useMutation(api.todos.toggleTodo)
  const deleteTodo = useMutation(api.todos.deleteTodo)
  const editToDo = useMutation(api.todos.updateTodo)

  if(isLoading) return <LoadingSpinner/>
  
  const handleToggleTodo = async (id:Id<"todos">) =>{
    console.log("ermemmem")
    try {
      await toggleTodo({id})
    } catch (error) {
      console.log("Error toggling todo", error)
      Alert.alert("Error", "Failed to toggle todo")
    }
  }

  const handleDeleteTodo = async (id:Id<'todos'>) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete?", [
      {text:"Cancel", style:"cancel"},
      {text:"Confirm", style:"destructive", onPress: async() => {
        try {
        await deleteTodo({id})
        } catch (error) {
        console.log("Error toggling todo", error)
        Alert.alert("Error", "Failed to delete todo")
        }
      }}
    ])

  }

  const handleUpdateTodo = async (todo:Todo) => {
    setIsEditing(!isEditing)
    setEditingId(todo._id)

  }

  const handleSaveEdit = async () => {
    if(editingId){
      try {
        await editToDo({id:editingId, text:updatedToDo.trim()})
        setEditingId(null)
        setEditText("")
      } catch (error) {
        console.log("Error toggling todo", error)
        Alert.alert("Error", "Failed to delete todo")
      }
    }
  }

  const handleCancelEdit = async () => {
    setEditingId(null)
  }


  console.log("TODOS: ", todos)
  
  const styles = homeStyles(colors)

  const renderToDoItem = ({item}:{item:Todo}) =>{
    const isEditingItem = editingId === item._id
    return (
      <View style={styles.todoItemWrapper}>
        <LinearGradient colors={colors.gradients.surface}
          style={styles.todoItem}
          start={{x:0, y:0}}
          end={{x:1, y:1}}
        >
          <TouchableOpacity 
            style={styles.checkbox} 
            activeOpacity={0.7}
            onPress={() => handleToggleTodo(item._id)}>
              <LinearGradient
                colors={item.isCompleted ? colors.gradients.success : colors.gradients.muted}
                style={[
                  styles.checkboxInner, {borderColor: item.isCompleted ? "transparent" : colors.border}
                ]}>
                {item.isCompleted && <Ionicons name="checkmark" size={18} color="#fff"/>}
              </LinearGradient>

          </TouchableOpacity>

        {isEditingItem ? (<>
          <View style={styles.editContainer}>
            <TextInput 
            style={styles.editInput}
            value={updatedToDo}
            onChangeText={setEditText}
            autoFocus
            multiline
            placeholder="Edit to do"
            placeholderTextColor={colors.textMuted}/>
          
          {/* Handle Save */}
          <View style={styles.editButtons}>
            <TouchableOpacity 
            onPress={handleSaveEdit}
            activeOpacity={0.8}>
              <LinearGradient colors={colors.gradients.success} style={styles.editButton}>
                <Ionicons name="checkmark" size={16} color="#fff" />
                <Text style={styles.editButtonText}>Save</Text>               
              </LinearGradient>
            </TouchableOpacity>
          
            <TouchableOpacity onPress={handleCancelEdit} activeOpacity={0.8}>
              <LinearGradient colors={colors.gradients.muted} style={styles.editButton}>
                <Ionicons name="close" size={16} color="#ffff"/>
                <Text style={styles.editButtonText}>Cancel</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          </View>
        </>) :   
        <View>
              <Text style={[
                styles.todoText, item.isCompleted && {
                  textDecorationLine:"line-through", 
                  color: colors.textMuted, 
                  opacity:0.6}
              ]}>
                {item.text}
              </Text>

              {/* Edit Item */}
              <View style={styles.todoActions}>
                <TouchableOpacity onPress={() => handleUpdateTodo(item)} activeOpacity={0.8}>
                  <LinearGradient colors={colors.gradients.warning} style={styles.actionButton}>
                    <Ionicons name="pencil" size={14} color="#fff"/>
                  </LinearGradient>
                </TouchableOpacity>

              {/* Delete Item */}
                <TouchableOpacity onPress={() => handleDeleteTodo(item._id)} activeOpacity={0.8}>
                  <LinearGradient colors={colors.gradients.danger} style={
                    styles.actionButton
                  }>
                    <Ionicons name="trash" size={14} color="#fff"/>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
          </View> }
        </LinearGradient>
      </View>
    )
  }

  return (
    <LinearGradient colors={colors.gradients.background} style={styles.container}>
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <Header/>
      <TodoInput/>
      <FlatList 
        data={todos} 
        renderItem={renderToDoItem}
        keyExtractor={(item) => item._id}
        style={styles.todoList}
        contentContainerStyle={styles.todoListContent}
        ListEmptyComponent={<EmptyState/>}/>

    </View>
    </SafeAreaView>
    </LinearGradient>

  );
}
