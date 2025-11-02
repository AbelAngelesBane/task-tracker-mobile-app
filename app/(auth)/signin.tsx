import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'


import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import useTheme from '@/hooks/useTheme'
import { AuthStyles } from '@/assets/styles/auth.styles'




  const  Page = () =>  {

  const {colors} = useTheme()
  const styles = AuthStyles(colors)
  const { signIn, setActive, isLoaded } = useSignIn()
  const [isTextSecured, setTextSecured] = useState(false)
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = useState<undefined | string>()
  const [isDisabled, setIsDisabled] = useState(true)

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    setError(undefined)
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/(tabs)')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
        setError("Signin failed")
        
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError(String(err))
      }
    }
  }

  return (
    
    <LinearGradient colors={colors.gradients.background} style={{flex:1,}}>
      
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={50} extraHeight={50} showsVerticalScrollIndicator={false} >
        <View style={[styles.logoContainer, {marginTop:50}]}>
          <View style={styles.logoContainer}> 
            <Ionicons name='checkmark-done-circle-outline' color={colors.primary} size={60}/>
          </View>
        </View>

      <Text style={styles.logoText}>WHATAPP NOW?</Text>
      <Text style={styles.subLogoText}>SIGN-IN</Text>


      <View style={styles.inputContainer}>
        {error && <Text style={{color:colors.danger, marginHorizontal:10, }}>{error}</Text>}
        <View style={[styles.inputField, error && {borderColor: colors.danger, borderLeftWidth:10, borderLeftColor: colors.danger}]}>
          <TextInput
          style={{flex:1}}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          placeholderTextColor={error ? colors.danger : "#ffff"}
          onChangeText={(emailAddress) => {
            if(emailAddress && password)setIsDisabled(false)
            else{setIsDisabled(true)}
            setEmailAddress(emailAddress)
            setError(undefined)}}
          />
        </View>

        <View style={[styles.inputField, error ? {borderColor: colors.danger, borderLeftWidth:10, borderLeftColor: colors.danger, marginTop:10} : {marginTop:10}]}> 
          <TextInput
          style={{padding:10, flex:1}}
          value={password}
          placeholder="Enter password"
          secureTextEntry={isTextSecured}
          placeholderTextColor={error ? colors.danger : "#ffff"}
          onChangeText={(password) => {
            if(emailAddress && password)setIsDisabled(false)
            else{setIsDisabled(true)}
            setPassword(password)
            console.log("signin:", {emailAddress:emailAddress, password:password})
            setError(undefined)}}
          />
          <TouchableOpacity onPress={()=>{ setTextSecured(!isTextSecured) }}>
            <Ionicons name={isTextSecured ? 'eye-off' : 'eye' }  size={20}/>
          </TouchableOpacity>
          
        </View>
      </View>

      <TouchableOpacity 
        disabled={isDisabled}
        style={[styles.btn, 
          isDisabled ? 
            {backgroundColor:"#3c3c3cff" , marginHorizontal:"20%"} :
            {backgroundColor:"#002b6fff", marginHorizontal:"20%"} ]} onPress={onSignInPress}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.btn}>
        <Link href="/signup">
          <Text style={styles.btnText}>Sign up</Text>
        </Link>
      </View>
      </KeyboardAwareScrollView>

      </SafeAreaView>
    
    </LinearGradient>

  )
}
export default Page
