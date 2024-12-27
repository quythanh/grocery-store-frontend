import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, View } from "react-native";

const CartScreen = () => {
    return (
        <ParallaxScrollView
            headerImage={
                <View style={styles.headerContainer}>
                    <ThemedText style={styles.headerText}>Shopping Cart</ThemedText>
                    <ThemedText style={styles.headerSubText}>A total of 2 pieces</ThemedText>
                </View>
            }
            headerBackgroundColor={{ light: "#64A86B", dark: "#1D3D47" }}
        >
        </ParallaxScrollView>
    );
};

export default CartScreen;

const styles = StyleSheet.create({
    headerContainer: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        display: "flex",
        gap: 8,
        paddingHorizontal: 24
    },
    headerText: {
        fontSize: 24,
        fontWeight: 500,
        width: "100%",
        color: '#FFFFFF',
    },
    headerSubText: {
        fontSize: 16,
        color: '#FFFFFF',
        width: "100%",
        textAlign: "right"
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    text: {
        fontSize: 16,
    },
});
