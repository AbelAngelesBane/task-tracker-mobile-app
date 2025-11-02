import { ThemeProvider } from "@/hooks/useTheme"
import { Slot, Stack } from "expo-router"
import { ConvexReactClient} from 'convex/react'
import { ClerkProvider, useAuth } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { StatusBar } from 'expo-status-bar'
import { ConvexProviderWithClerk } from "convex/react-clerk"



const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function Layout() {
  return (
  <ClerkProvider tokenCache={tokenCache} publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
    <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
      <ThemeProvider>
        <Slot/>
        <StatusBar style="dark" /> 
      </ThemeProvider>
    </ConvexProviderWithClerk>
  </ClerkProvider>)

}
 