import { Colors } from "@/constants/Colors"
import { Feather } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import AuthButton from "@/components/auth/AuthButton"
import DatePickerInput from "@/components/auth/DatePickerInput"
import GenderPickerInput from "@/components/auth/GenderPickerInput"
import InputField from "@/components/auth/InputField"
import PasswordInputField from "@/components/auth/PasswordInputField"

const SignUp = () => {
  const inset = useSafeAreaInsets()
  const route = useRouter()

  const handleBack = () => {
    route.back()
  }

  const handleLogIn = () => {
    route.navigate("/auth/login")
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss()
        }}
      >
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
                onPress={handleLogIn}
              >
                <Text style={styles.headerOptionText}>Log In</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.headerTitle}>Sign Up</Text>
          </View>

          <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            <View style={styles.form}>
              <InputField
                placeholder="First name"
                onChangeText={(text) => console.log(text)}
              />

              <InputField
                style={{ marginTop: 30 }}
                placeholder="Last name"
                onChangeText={(text) => console.log(text)}
              />

              <DatePickerInput
                style={{ marginTop: 30 }}
                onChangeText={(text) => console.log(text)}
              />

              <GenderPickerInput
                style={{ marginTop: 30 }}
                onChange={(gender) => console.log(gender)}
              />

              <InputField
                style={{ marginTop: 30 }}
                placeholder="Phone number"
                keyboardType="phone-pad"
                onChangeText={(text) => console.log(text)}
              />

              <InputField
                style={{ marginTop: 30 }}
                placeholder="Email"
                onChangeText={(text) => console.log(text)}
                keyboardType="email-address"
              />

              <PasswordInputField
                style={{ marginTop: 30 }}
                placeholder="Password"
                onChangeText={(text) => console.log(text)}
              />

              <PasswordInputField
                style={{ marginTop: 30 }}
                placeholder="Confirm password"
                onChangeText={(text) => console.log(text)}
              />
            </View>
            <AuthButton text="Sign Up" style={{ marginTop: 40 }} />

            <View style={{ height: 70 }} />
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default SignUp

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

  form: {
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
})
