import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";



import background from "../../assets/images/auth/landing-bg-image.jpg";
import { Colors } from "@/constants/Colors";
import AuthButton from "@/components/auth/AuthButton";
import { useRouter } from "expo-router";


const Landing = () => {
  const route = useRouter();

  const handleLogin = () => {
    route.navigate("/auth/login");
  }

  return (
    <ImageBackground
      source={background}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Grocery Store</Text>
          <Text
            style={styles.headerSubTitle}
          >{`Find and order ${"\n"}high quality ${"\n"}fruits & vegetables`}</Text>
        </View>

        <View style={styles.authButtons}>
          <AuthButton text="Log in" style={{ marginBottom: 20 }} onClick={handleLogin} />
          <AuthButton text="Sign up" />
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default Landing

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  header: {
    marginTop: "35%",
    marginHorizontal: 20,
  },
  headerTitle: {
    fontSize: 42,
    fontWeight: "700",
    color: "#000",
  },
  headerSubTitle: {
    fontSize: 26,
    fontWeight: "500",
    color: "#000",
    marginTop: 10,
    lineHeight: 38,
  },

  authButtons: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: "20%",
    marginHorizontal: 20,
  },
})