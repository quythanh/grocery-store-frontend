import { Colors } from "@/constants/Colors"
import { ActivityIndicator, Modal, View } from "react-native"

interface LoadingModalProps {
  visible: boolean
}

const LoadingModal = ({ visible }: LoadingModalProps) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            width: 100,
            height: 100,
            backgroundColor: "#fff",
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color={Colors.green} />
        </View>
      </View>
    </Modal>
  )
}

export default LoadingModal
