import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import useTheme from '@/hooks/useTheme'
import { settingStyles } from '@/assets/styles/settings.styles'
import { useClerk } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'


const Logout = () => {
  const {colors} = useTheme()
  const styles = settingStyles(colors)
  const { signOut } = useClerk()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignout  = () => {

    setIsLoading(true)

    Alert.alert("Logout","Are you sure you want to signout?",
      [{text:"cancel", style:'cancel'},
        {text:"logout", style:'destructive', onPress:async()=>{
        try {
          await signOut()
          router.replace('/(root)')
        } catch (err) {
          setIsLoading(false)
          console.error(JSON.stringify(err, null, 2))
        }
        }}
      ]
    )
    setIsLoading(false)
  }
  return (
    <LinearGradient colors={colors.gradients.danger} style={styles.section}> 
      {isLoading ? <ActivityIndicator size='small' color={colors.danger}/> :
          <TouchableOpacity onPress={handleSignout}>       
            <View style={styles.settingLeft}>
                <LinearGradient colors={colors.gradients.empty} style={styles.settingIcon}>
                    <Ionicons name='log-out-outline' size={18} color="#ffff"/>
                </LinearGradient>
                <Text style={styles.settingText}>Logout</Text>
            </View>
          </TouchableOpacity>      
      
      }

    </LinearGradient>
  )
}

export default Logout