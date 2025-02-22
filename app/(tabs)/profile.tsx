import { Fragment, useEffect, useState } from "react"
import {
  GET_CUSTOMER_INFORMATION,
  UPDATE_CUSTOMER_INFORMATION,
} from "@/api/graphqlString/auth"
import { Colors } from "@/constants/Colors"
import { useCustomerInformationStore } from "@/store/customerInformationStore"
import { useIdsStore } from "@/store/idsStore"
import { deleteSecureStore } from "@/store/secureStore"
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
import LoadingModal from "@/components/LoadingModal"
import ProfileDatePicker from "@/components/profile/ProfileDatePicker"
import ProfileGenderPicker from "@/components/profile/ProfileGenderPicker"
import ProfileInputField from "@/components/profile/ProfileInputField"
import RequireLogin from "@/components/RequireLogin"

const ProfileScreen = () => {
  const route = useRouter()
  const inset = useSafeAreaInsets()
  const [isEditing, setIsEditing] = useState(false)
  const { token, resetToken } = useTokenStore()
  const { resetIds } = useIdsStore()
  const { informationState, setInformationState, setInformationField, resetInformationState } =
    useCustomerInformationStore()

  const { data, loading, error } = useQuery(GET_CUSTOMER_INFORMATION, {
    skip: !!informationState.email,
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    fetchPolicy: "no-cache",
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

  useEffect(() => {
    if (data) {
      const { firstname, lastname, email, gender, date_of_birth } =
        data.customer
      
      setInformationState({ firstname, lastname, email, gender, date_of_birth })
    }
  }, [data, setInformationField])

  const handleLogOut = async () => {
    await deleteSecureStore("token")
    await deleteSecureStore("cartId")
    await deleteSecureStore("wishlistId")
    resetToken()
    resetIds()

    resetInformationState()
    route.navigate("/")
  }

  const handleChange = (field: string, value: string | number) => {
    setIsEditing(true)
    setInformationField(field, value)
  }

  const handleUpdate = async () => {
    if (!isEditing) {
      return
    }

    try {
      const response = await updateCustomerInformation({
        variables: {
          ...informationState
        },
      })

      if (response) {
        setIsEditing(false)

        const { firstname, lastname, email, gender, date_of_birth } =
          response.data.updateCustomerV2.customer

        setInformationState({ firstname, lastname, email, gender, date_of_birth })

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

  return (
    <Fragment>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
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

            <TouchableWithoutFeedback
              onPress={() => {
                Keyboard.dismiss()
              }}
            >
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
            </TouchableWithoutFeedback>
          </View>
        </View>
      </KeyboardAvoidingView>
      <LoadingModal visible={loading || updateLoading} />
    </Fragment>
  )
}

export default RequireLogin(ProfileScreen)

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
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 5,
      },
    }),
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
})
