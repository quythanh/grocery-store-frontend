import { Colors } from "@/constants/Colors"
import { StyleSheet, Text, TextInput, View } from "react-native"

interface ProfileInputFieldProps {
  label: string
  placeholder: string
  editable?: boolean
  keyboardType?:
    | "default"
    | "email-address"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "phone-pad"
  value: string
  onChange: (value: string) => void
}

const ProfileInputField = ({ ...props }: ProfileInputFieldProps) => {
  return (
    <View style={styles.formGroup}>
      <Text style={styles.formLabel}>{props.label}</Text>
      <TextInput
        placeholder={props.placeholder}
        style={styles.formInput}
        editable={props.editable}
        keyboardType={props.keyboardType}
        value={props.value}
        onChange={(e) => props.onChange(e.nativeEvent.text)}
      />
    </View>
  )
}

export default ProfileInputField

const styles = StyleSheet.create({
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  formInput: {
    height: 45,
    borderWidth: 1,
    borderColor: Colors.green,
    borderRadius: 10,
    padding: 10,
  },
})
