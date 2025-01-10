import { useEffect } from "react"

import "@/global.css"

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"
import { AlertNotificationRoot } from "react-native-alert-notification"

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider"

import "react-native-reanimated"

import client from "@/api/apolloClient"
import { getSecureStore } from "@/store/secureStore"
import { useTokenStore } from "@/store/tokenStore"
import { ApolloProvider } from "@apollo/client"

import { useColorScheme } from "@/hooks/useColorScheme"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  })
  const { setToken } = useTokenStore()

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  useEffect(() => {
    const getStoredToken = async () => {
      const storedToken = await getSecureStore("token")
      if (storedToken) {
        setToken(storedToken)
      }
    }

    getStoredToken()
  }, [])

  if (!loaded) {
    return null
  }

  return (
    <ApolloProvider client={client}>
      <GluestackUIProvider mode="light">
        <AlertNotificationRoot>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack>
              <Stack.Screen
                name="auth/landing"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="auth/login"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="auth/signup"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="checkout/index"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="(tabs)"
                options={{ headerShown: false, gestureEnabled: false }}
              />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </AlertNotificationRoot>
      </GluestackUIProvider>
    </ApolloProvider>
  )
}
