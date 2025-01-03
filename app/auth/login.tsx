import { useState } from "react"
import { GENERATE_CUSTOMER_TOKEN } from "@/api/graphqlString/auth"
import { Colors } from "@/constants/Colors"
import { getSecureStore, setSecureStore } from "@/store/secureStore"
import { useMutation } from "@apollo/client"
import { Feather, FontAwesome6 } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ALERT_TYPE, Toast } from "react-native-alert-notification"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import AuthButton from "@/components/auth/AuthButton"
import InputField from "@/components/auth/InputField"
import PasswordInputField from "@/components/auth/PasswordInputField"

const Login = () => {
  const inset = useSafeAreaInsets()
  const route = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [generateCustomerToken, { data, loading, error }] = useMutation(
    GENERATE_CUSTOMER_TOKEN
  )

  const handleBack = () => {
    route.back()
  }

  const handleSignUp = () => {
    route.navigate("/auth/signup")
  }

  const handleLogin = async () => {
    try {
      const response = await generateCustomerToken({
        variables: {
          email,
          password,
        },
      })

      await setSecureStore("token", response.data.generateCustomerToken.token)

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Success",
        textBody: "Congrats! You have successfully logged in.",
      })

      route.navigate("/")
    } catch (error) {
      console.log("Error: ", (error as any).message)
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: (error as any).message,
      })
    }
  }

  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      <View style={styles.header}>
        <View style={styles.headerOptions}>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleBack}
          >
            <Feather name="chevron-left" size={30} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 80,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleSignUp}
          >
            <Text style={styles.headerOptionText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>Log In</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.loginForm}>
          <InputField
            placeholder="Email"
            keyboardType="email-address"
            style={{ marginTop: 0 }}
            onChangeText={(text) => setEmail(text)}
          />
          <PasswordInputField
            style={{ marginTop: 20 }}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            style={{ marginTop: 20, alignItems: "flex-end" }}
            onPress={() => route.navigate("/")}
          >
            <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
          </TouchableOpacity>
          <AuthButton
            text="Log In"
            style={{ marginTop: 40 }}
            onClick={handleLogin}
          />

          <View style={styles.loginOptionContainer}>
            <TouchableOpacity style={styles.loginOption}>
              <FontAwesome6 name="google" size={24} color="black" />
              <Text
                style={{
                  fontSize: 18,
                  color: "#000",
                  marginLeft: 10,
                }}
              >
                Continue with Google
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.loginOption, { marginTop: 20 }]}>
              <FontAwesome6 name="facebook-f" size={24} color="black" />
              <Text
                style={{
                  fontSize: 18,
                  color: "#000",
                  marginLeft: 10,
                }}
              >
                Continue with Facebook
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.green,
  },
  header: {
    height: 150,
  },
  headerOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  headerOptionText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "600",
    color: "#fff",
    marginLeft: 30,
  },
  body: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  loginForm: {
    marginTop: 20,
  },
  authInputContainer: {
    backgroundColor: Colors.lightGreen,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  authInputField: {
    fontSize: 18,
    color: "#000",
  },
  forgotPasswordText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "400",
  },

  loginOptionContainer: {
    marginTop: 60,
  },
  loginOption: {
    flexDirection: "row",
    backgroundColor: Colors.lightGreen,
    width: "100%",
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
})
