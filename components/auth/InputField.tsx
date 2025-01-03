import { Colors } from "@/constants/Colors"
import { StyleSheet, TextInput, View } from "react-native"

interface InputFieldProps {
  style?: object
  placeholder: string
  value?: string
  onChangeText: (text: string) => void
  keyboardType?:
    | "default"
    | "email-address"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "phone-pad"
}

const InputField = ({
  style,
  placeholder,
  value,
  onChangeText,
  keyboardType,
}: InputFieldProps) => {
  return (
    <View style={[styles.authInputContainer, style]}>
      <TextInput
        style={styles.authInputField}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  )
}

export default InputField

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
