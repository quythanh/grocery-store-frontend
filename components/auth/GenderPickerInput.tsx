import { useState } from "react"
import { Colors } from "@/constants/Colors"
import { Feather } from "@expo/vector-icons"
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native"

interface GenderPickerInputProps {
  style?: object
  onChange: (value: string) => void
}

const GenderPickerInput = ({ style, onChange }: GenderPickerInputProps) => {
  const [selectedGender, setSelectedGender] = useState<string | null>(null)
  const [isPickerVisible, setPickerVisible] = useState(false)

  const handleGenderSelect = (gender: string) => {
    onChange(gender)
    setSelectedGender(gender)
    setPickerVisible(false)
  }

  return (
    <>
      <TouchableOpacity
        style={[styles.authInputContainer, style]}
        onPress={() => setPickerVisible(true)}
      >
        <TextInput
          style={[styles.authInputField, { paddingRight: 30 }]}
          placeholder="Gender"
          value={selectedGender || ""}
          editable={false}
          onPress={() => setPickerVisible(true)}
        />
        <TouchableOpacity
          style={{ position: "absolute", right: 20 }}
          onPress={() => setPickerVisible(true)}
        >
          <Feather name="check-circle" size={22} color="#000" />
        </TouchableOpacity>
      </TouchableOpacity>

      {isPickerVisible && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={isPickerVisible}
          onRequestClose={() => setPickerVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setPickerVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={() => handleGenderSelect("Male")}
                >
                  <Text style={styles.optionText}>Male</Text>
                </TouchableOpacity>

                <View
                  style={{ height: 1, backgroundColor: "#ccc", opacity: 0.7 }}
                />

                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={() => handleGenderSelect("Female")}
                >
                  <Text style={styles.optionText}>Female</Text>
                </TouchableOpacity>

                <View
                  style={{ height: 1, backgroundColor: "#ccc", opacity: 0.7 }}
                />

                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={() => handleGenderSelect("Other")}
                >
                  <Text style={styles.optionText}>Other</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </>
  )
}

export default GenderPickerInput

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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  optionButton: {
    padding: 15,
  },
  optionText: {
    fontSize: 18,
    color: "#000",
    textAlign: "center",
  },
})
