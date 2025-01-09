import { useEffect, useState } from "react"
import {
  GET_CUSTOMER_INFORMATION,
  UPDATE_CUSTOMER_INFORMATION,
} from "@/api/graphqlString/auth"
import { Colors } from "@/constants/Colors"
import { useCustomerInformationStore } from "@/store/customerInformationStore"
import { deleteSecureStore, getSecureStore } from "@/store/secureStore"
import { useTokenStore } from "@/store/tokenStore"
import { useMutation, useQuery } from "@apollo/client"
import { Feather } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import { ALERT_TYPE, Toast } from "react-native-alert-notification"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import AuthButton from "@/components/auth/AuthButton"
import ProfileDatePicker from "@/components/profile/ProfileDatePicker"
import ProfileGenderPicker from "@/components/profile/ProfileGenderPicker"
import ProfileInputField from "@/components/profile/ProfileInputField"

const ProfileScreen = () => {
  const route = useRouter()
  const inset = useSafeAreaInsets()
  const [isEditing, setIsEditing] = useState(false)
  const { token, setToken, resetToken } = useTokenStore()
  const { informationState, setInformationState, resetInformationState } =
    useCustomerInformationStore()

  const { data, loading, error } = useQuery(GET_CUSTOMER_INFORMATION, {
    skip: !token,
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })

  const [
    updateCustomerInformation,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_CUSTOMER_INFORMATION, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })

  const handleBack = () => {
    route.back()
  }

  const getStoredToken = async () => {
    const storedToken = await getSecureStore("token")
    if (storedToken) {
      setToken(storedToken)
    }
  }

  useEffect(() => {
    getStoredToken()
  }, [])

  useEffect(() => {
    if (data) {
      const { firstname, lastname, email, gender, date_of_birth } =
        data.customer
      setInformationState("firstname", firstname)
      setInformationState("lastname", lastname)
      setInformationState("email", email)
      setInformationState("gender", gender)
      setInformationState("date_of_birth", date_of_birth)
      return
    }
  }, [data, setInformationState])

  const handleLogOut = async () => {
    await deleteSecureStore("token")
    resetToken()
    resetInformationState()
    route.navigate("/")
  }

  const handleChange = (field: string, value: string | number) => {
    setIsEditing(true)
    setInformationState(field, value)
  }

  const handleUpdate = async () => {
    if (!isEditing) {
      return
    }

    try {
      const response = await updateCustomerInformation({
        variables: {
          firstname: informationState.firstname,
          lastname: informationState.lastname,
          email: informationState.email,
          gender: informationState.gender,
          date_of_birth: informationState.date_of_birth,
        },
      })

      if (response) {
        setIsEditing(false)

        const { firstname, lastname, email, gender, date_of_birth } =
          response.data.updateCustomerV2.customer
        setInformationState("firstname", firstname)
        setInformationState("lastname", lastname)
        setInformationState("email", email)
        setInformationState("gender", gender)
        setInformationState("date_of_birth", date_of_birth)

        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "Your information has been updated.",
        })
      }
    } catch (error) {
      console.log("Error: ", (error as any).message)
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: (error as any).message,
      })
    }
  }

  if (!token) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          You need to log in to access this page.
        </Text>
        <TouchableOpacity
          style={styles.btnNavigate}
          onPress={() => route.navigate("/auth/landing")}
        >
          <Text style={styles.btnNavigateText}>Log in</Text>
        </TouchableOpacity>
      </View>
    )
  }

  if (loading || updateLoading) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Loading...</Text>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss()
        }}
      >
        <View style={[styles.container, { paddingTop: inset.top }]}>
          <View style={styles.header}>
            <View style={styles.headerOptions}>
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={handleBack}
              >
                <Feather name="chevron-left" size={30} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={handleLogOut}
              >
                <Feather name="log-out" size={30} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.avatarContainer}>
              <Image
                source={{
                  uri: "https://static.wixstatic.com/media/53e8bb_a1e88e551162485eb4ff962437300872~mv2.jpeg/v1/crop/x_0,y_105,w_1024,h_919/fill/w_840,h_754,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Banana.jpeg",
                }}
                style={styles.avatar}
              />
            </View>
            <Text style={styles.fullname}>
              {informationState.firstname} {informationState.lastname}
            </Text>

            <View style={styles.seperateLine} />

            <ScrollView
              style={[styles.formContainer]}
              showsVerticalScrollIndicator={false}
            >
              <ProfileInputField
                label="First Name"
                placeholder="Enter your first name"
                value={informationState.firstname}
                onChange={(value) => handleChange("firstname", value)}
              />
              <ProfileInputField
                label="Last Name"
                placeholder="Enter your last name"
                value={informationState.lastname}
                onChange={(value) => handleChange("lastname", value)}
              />
              <ProfileInputField
                label="Email"
                placeholder="Enter your email"
                editable={false}
                value={informationState.email}
                onChange={(value) => handleChange("email", value)}
              />
              <ProfileGenderPicker
                value={informationState.gender}
                onChange={(value) => handleChange("gender", Number(value))}
              />
              <ProfileDatePicker
                value={informationState.date_of_birth}
                onChangeText={(value) => handleChange("date_of_birth", value)}
              />
              <AuthButton
                text="Update"
                onClick={handleUpdate}
                style={{ marginTop: 20 }}
              />
              <View style={{ height: Platform.OS === "ios" ? 100 : 20 }} />
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.green,
  },
  header: {
    height: 150,
  },
  headerOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  body: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    position: "absolute",
    top: -75,
    alignSelf: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 70,
  },
  fullname: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.green,
    marginTop: 100,
    textAlign: "center",
  },
  seperateLine: {
    height: 1,
    backgroundColor: "#f2f2f2",
    marginTop: 20,
    marginBottom: 20,
  },
  formContainer: {},

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  errorText: {
    fontSize: 20,
    marginBottom: 20,
  },

  btnNavigate: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: Colors.lightGreen,
    borderRadius: 100,
  },
  btnNavigateText: {
    color: Colors.green,
    fontSize: 18,
    fontWeight: "500",
  },
})
