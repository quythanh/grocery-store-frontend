import { useEffect, useState } from "react"
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
  value?: number
  style?: object
  onChange: (value: number) => void
}

const gender = [
  {
    label: "Male",
    value: 1,
  },
  {
    label: "Female",
    value: 2,
  },
]

const ProfileGenderPicker = ({
  value,
  style,
  onChange,
}: GenderPickerInputProps) => {
  const [selectedGender, setSelectedGender] = useState<string | null>(null)
  const [isPickerVisible, setPickerVisible] = useState(false)

  useEffect(() => {
    if (value === 1) {
      setSelectedGender("Male")
    } else {
      setSelectedGender("Female")
    }
  }, [value])

  const handleGenderSelect = (gender: number) => {
    onChange(gender)

    if (gender === 1) {
      setSelectedGender("Male")
    } else {
      setSelectedGender("Female")
    }

    setPickerVisible(false)
  }

  return (
    <>
      <Text style={styles.label}>Gender</Text>
      <TouchableOpacity
        onPress={() => setPickerVisible(true)}
        style={styles.inputWrapper}
      >
        <TextInput
          style={[styles.inputContainer, style]}
          placeholder="Gender"
          value={selectedGender || ""}
          editable={false}
        />
        <Feather
          name="check-circle"
          size={22}
          color="#000"
          style={styles.checkCircleIcon}
        />
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
                  onPress={() => handleGenderSelect(gender[0].value)}
                >
                  <Text style={styles.optionText}>{gender[0].label}</Text>
                </TouchableOpacity>
                <View
                  style={{ height: 1, backgroundColor: "#ccc", opacity: 0.7 }}
                />
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={() => handleGenderSelect(gender[1].value)}
                >
                  <Text style={styles.optionText}>{gender[1].label}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </>
  )
}

export default ProfileGenderPicker

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.green,
    borderRadius: 10,
    marginBottom: 20,
  },
  inputContainer: {
    flex: 1,
    height: 45,
    paddingLeft: 10,
  },
  checkCircleIcon: {
    marginLeft: 10,
    marginRight: 10,
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
