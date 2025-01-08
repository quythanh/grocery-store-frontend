import { useState } from "react"
import { Colors } from "@/constants/Colors"
import { Feather } from "@expo/vector-icons"
import {
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import DatePicker from "react-native-neat-date-picker"

interface DatePickerInputProps {
  style?: object
  onChangeText: (text: string) => void
}

const DatePickerInput = ({ style, onChangeText }: DatePickerInputProps) => {
  const [date, setDate] = useState("")
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

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
    return `${month}/${day}/${year}`
  }

  const handleConfirm = (arg: any): void => {
    const { date } = arg
    const formattedDate = formatDate(date)

    setDate(formattedDate)
    onChangeText(formattedDate)

    hideDatePicker()
  }

  return (
    <>
      <TouchableOpacity
        style={[styles.authInputContainer, style]}
        onPress={showDatePicker}
      >
        <TextInput
          style={[styles.authInputField, { paddingRight: 30 }]}
          placeholder="Date of Birth"
          value={date}
          editable={false}
          onPress={showDatePicker}
        />
        <View style={{ position: "absolute", right: 20 }}>
          <Feather name="calendar" size={22} color="#000" />
        </View>
      </TouchableOpacity>
      <Modal
        visible={isDatePickerVisible}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <DatePicker
            isVisible={true}
            mode="single"
            onCancel={hideDatePicker}
            onConfirm={handleConfirm}
            colorOptions={{
              headerColor: Colors.green,
              weekDaysColor: Colors.green,
              selectedDateBackgroundColor: Colors.green,
              confirmButtonColor: Colors.green,
            }}
          />
        </View>
      </Modal>
    </>
  )
}

export default DatePickerInput

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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
})
