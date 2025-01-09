import React from "react"
import { Colors } from "@/constants/Colors"
import { useTokenStore } from "@/store/tokenStore"
import { useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

const RequireLogin = (WrappedComponent: React.ComponentType) => {
  const HOC = (props: any) => {
    const route = useRouter()
    const { token } = useTokenStore()

    if (!token) {
      return (
        <>
          <StatusBar style="dark" />
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              You need to log in to access this page.
            </Text>
            <TouchableOpacity
              style={styles.btnNavigate}
              onPress={() => route.navigate("/auth/landing")}
            >
              <Text style={styles.btnNavigateText}>Log in</Text>
            </TouchableOpacity>
          </View>
        </>
      )
    }

    return <WrappedComponent {...props} />
  }

  return HOC
}

export default RequireLogin

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  errorText: {
    fontSize: 20,
    marginBottom: 20,
  },
  btnNavigate: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: Colors.lightGreen,
    borderRadius: 100,
  },
  btnNavigateText: {
    color: Colors.green,
    fontSize: 18,
    fontWeight: "500",
  },
})
