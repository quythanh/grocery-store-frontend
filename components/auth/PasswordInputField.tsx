import { useState } from "react"
import { Colors } from "@/constants/Colors"
import { Feather } from "@expo/vector-icons"
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native"

interface PasswordInputFieldProps {
  style?: object
  placeholder: string
  value?: string
  onChangeText: (text: string) => void
}

const PasswordInputField = ({
  style,
  placeholder,
  value,
  onChangeText,
}: PasswordInputFieldProps) => {
  const [hidePassword, setHidePassword] = useState(true)

  const handleHidePassword = () => {
    setHidePassword(!hidePassword)
  }

  return (
    <View style={[styles.authInputContainer, style]}>
      <TextInput
        style={[styles.authInputField, { paddingRight: 30 }]}
        placeholder={placeholder}
        secureTextEntry={hidePassword}
        value={value}
        onChangeText={onChangeText}
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
  )
}

export default PasswordInputField

const styles = StyleSheet.create({
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
})
