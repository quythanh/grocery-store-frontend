import { Colors } from "@/constants/Colors"
import { useHidePasswordStore } from "@/store/hidePassword"
import { Feather, FontAwesome6 } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import AuthButton from "@/components/auth/AuthButton"

const Login = () => {
  const inset = useSafeAreaInsets()
  const route = useRouter()
  const { hidePassword, handleHidePassword } = useHidePasswordStore()

  const handleBack = () => {
    route.navigate("/")
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
          >
            <Text style={styles.headerOptionText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>Log In</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.loginForm}>
          <View style={styles.authInputContainer}>
            <TextInput style={styles.authInputField} placeholder="Username" />
          </View>
          <View style={[styles.authInputContainer, { marginTop: 30 }]}>
            <TextInput
              style={[styles.authInputField, { paddingRight: 30 }]}
              placeholder="Password"
              secureTextEntry={hidePassword}
            />
            <TouchableOpacity
              style={{ position: "absolute", right: 20 }}
              onPress={handleHidePassword}
            >
              <Feather
                name={hidePassword ? "eye-off" : "eye"}
                size={22}
                color="#000"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{ marginTop: 20, alignItems: "flex-end" }}
            onPress={() => route.navigate("/")}
          >
            <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
          </TouchableOpacity>
          <AuthButton text="Log In" style={{ marginTop: 40 }} />

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
