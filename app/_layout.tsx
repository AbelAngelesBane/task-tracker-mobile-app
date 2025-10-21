import { ThemeProvider } from "@/hooks/useTheme";
import { Stack } from "expo-router";
import {ConvexProvider, ConvexReactClient} from 'convex/react'

import { ConvexClient } from "convex/browser";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {
  return (
  <ConvexProvider client={convex}>
  <ThemeProvider>
  <Stack>
     <Stack.Screen name="(tabs)" options={{title: 'home', headerShown:false}}/>
  </Stack>
  </ThemeProvider>
  </ConvexProvider>)

}
 