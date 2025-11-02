import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import useTheme from '@/hooks/useTheme'
import { AuthStyles } from '@/assets/styles/auth.styles'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { api } from "@/convex/_generated/api";
import { useMutation } from 'convex/react'


export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const [error, setError] = useState<string | undefined>()
  const [isVerifyDisabled, setIsVerifyDisabled] = useState(true)
 
  const {colors} = useTheme()
  const styles = AuthStyles(colors)

 const addUserToDb = useMutation(api.authentication.store)

const checkFields = (nextEmail = emailAddress, nextPassword = password, nextConfirm = confirmPassword) => {
  setError('')
  if (!nextPassword || !nextEmail || !nextConfirm) {
    setIsDisabled(true);
  } else if (nextPassword && nextEmail && nextConfirm) {
    if (nextPassword.trim() !== nextConfirm.trim()) {
       setError("Passwords don't match");
      setIsDisabled(true);
    } else {
      setError('');
      setIsDisabled(false);
    }
  }
};

const handleDb =async ()=>{
  try {
    await addUserToDb()
  } catch (error) {
    console.log("SIGNUP ERROR", error)
  }
}


  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    setError('')
    if (!isLoaded) return

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
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

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        await handleDb()
        router.replace('/(tabs)')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
        setError("Signup failed")
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

  if (pendingVerification) {
    return (
      <LinearGradient colors={colors.gradients.background} style={{flex:1}}>
        <SafeAreaView style={styles.safeArea}>
        <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={150} extraHeight={150} showsVerticalScrollIndicator={false} >

          <View style={styles.container}>
            <View style={[styles.logoContainer, {marginTop:50}]}>
            <View style={styles.logoContainer}> 
              <Ionicons name='checkmark-done-circle-outline' color={colors.primary} size={60}/>
            </View>
          </View>
            <View style={styles.inputContainer}> 
              <Text style={styles.logoText}>Verify your email</Text>
              {error && <Text style={{color:colors.danger}}>{error}</Text>}
              <TextInput
                style={styles.inputField}
                value={code}
                keyboardType='number-pad'
                placeholder="Enter your verification code"
                placeholderTextColor="#ffff"
                onChangeText={(code) => {
                  setCode(code)
                  if(!code)setIsVerifyDisabled(true)
                  else setIsVerifyDisabled(false)
                }}
              />
            </View>

            <TouchableOpacity onPress={onVerifyPress} style={[styles.btn, isVerifyDisabled ? 
              {backgroundColor:"#3c3c3cff" , marginHorizontal:"20%"} :
              {backgroundColor:"#002b6fff", marginHorizontal:"20%"} ]}
              disabled={isVerifyDisabled}>
              <Text style={styles.btnText}>Verify</Text>
            </TouchableOpacity>
          </View>

          </KeyboardAwareScrollView>
        </SafeAreaView>
      </LinearGradient>
    )
  }

  return (
    <LinearGradient colors={colors.gradients.background} style={{flex:1}}>
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={150} extraHeight={150} showsVerticalScrollIndicator={false} >
      <View style={styles.container}>
                <View style={[styles.logoContainer, {marginTop:50}]}>
          <View style={styles.logoContainer}> 
            <Ionicons name='checkmark-done-circle-outline' color={colors.primary} size={60}/>
          </View>
        </View>

      <Text style={styles.logoText}>WHATAPP NOW?</Text>
      <Text style={styles.subLogoText}>Sign-Up</Text>
      
      <View style={styles.inputContainer}>
      {true && <Text style={{color:colors.danger, marginHorizontal:10}}>{error}</Text>}

        {/* Email Field */}
        <TextInput
          style={[styles.inputField]}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          onChangeText={(email) => {
            setEmailAddress(email)
            checkFields(email, password, confirmPassword)}}
        />

        {/* Password Field */}
        <View style={styles.inputField}>
        <TextInput
          style={{flex:1}}
          value={password}
          placeholder="Enter password"
          secureTextEntry={true}
          onChangeText={(password) => {
            setPassword(password)
            checkFields(emailAddress, password, confirmPassword); 
          }}
        />
        </View>

        {/* Confirm Password Field */}
        <View style={styles.inputField}>
          <TextInput
            style={{flex:1,}}
            value={confirmPassword}
            placeholder="Confirm password"
            secureTextEntry={true}
            onChangeText={(confirmPassword) => {
              setConfirmPassword(confirmPassword)
              checkFields(emailAddress, password, confirmPassword); 
            }
            }
          />
        </View>

        <TouchableOpacity onPress={onSignUpPress} style={[styles.btn, isDisabled ? 
            {backgroundColor:"#3c3c3cff" , marginHorizontal:"20%"} :
            {backgroundColor:"#002b6fff", marginHorizontal:"20%"} ]}>
          <Text style={styles.btnText}>Continue</Text>
        </TouchableOpacity>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 5, margin:'auto',  }}>
          <Text style={{color:colors.primary}} >Already have an account?</Text>
          <Link href="/signin">
            <Text style={{color:"#ffff"}}>Sign in</Text>
          </Link>
        </View>
      </View>
    </View>

    </KeyboardAwareScrollView>
    </SafeAreaView>
    </LinearGradient>

  )
}