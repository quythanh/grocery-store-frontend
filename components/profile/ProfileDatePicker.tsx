import { useEffect, useState } from "react"
import { Colors } from "@/constants/Colors"
import { Feather } from "@expo/vector-icons"
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import DateTimePickerModal from "react-native-modal-datetime-picker"

interface DatePickerInputProps {
  value?: string
  style?: object
  onChangeText: (text: string) => void
}

const convertToDate = (dateStr: string) => {
  const [year, month, day] = dateStr
    .split("-")
    .map((part) => parseInt(part, 10))
  return new Date(year, month - 1, day)
}

const ProfileDatePicker = ({
  value,
  style,
  onChangeText,
}: DatePickerInputProps) => {
  const [date, setDate] = useState("")
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  useEffect(() => {
    if (value) {
      setDate(value)
    }
  }, [value])

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    return `${year}-${month}-${day}`
  }

  const handleConfirm = (date: Date): void => {
    hideDatePicker()

    const formattedDate = formatDate(date)

    setDate(formattedDate)
    onChangeText(formattedDate)
  }

  return (
    <>
      <Text style={styles.label}>Date of birth</Text>
      <TouchableOpacity
        style={[styles.inputWrapper, style]}
        onPress={showDatePicker}
      >
        <TextInput
          style={[styles.inputContainer, { paddingRight: 30 }]}
          placeholder="Date of Birth"
          value={date}
          editable={false}
          onTouchStart={showDatePicker}
        />
        <View style={{ position: "absolute", right: 10 }}>
          <Feather name="calendar" size={22} color="#000" />
        </View>
      </TouchableOpacity>
      <View style={styles.modalContainer}>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={date ? convertToDate(date) : new Date()}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          modalStyleIOS={{
            flex: 1,
            marginBottom: 44,
          }}
          pickerComponentStyleIOS={{
            alignSelf: "center",
          }}
        />
      </View>
    </>
  )
}

export default ProfileDatePicker

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
  },
  inputContainer: {
    flex: 1,
    height: 45,
    paddingLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
})
