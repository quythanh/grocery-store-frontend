import { Colors } from "@/constants/Colors"
import { StyleSheet, Text, TouchableOpacity } from "react-native"

interface AuthButtonProps {
  text: string,
  style?: any,
  onClick?: () => void
}

const AuthButton = ({ text, style, onClick }: AuthButtonProps) => {
  return (
    <TouchableOpacity style={[styles.authButton, style]} onPress={onClick}>
      <Text style={styles.authButtonText}>{text}</Text>
    </TouchableOpacity>
  )
}

export default AuthButton

const styles = StyleSheet.create({
  authButton: {
    backgroundColor: Colors.green,
    padding: 15,
    borderRadius: 1000,
    alignItems: "center",
  },
  authButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
})
