import { Image, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText"
import { ThemedView } from "./ThemedView"

export interface CartItemProps {
    name: string;
    price: number;
    unit: string;
    quantity: number;
    imgUrl: string;
}

export default function CartItem({ name, price, quantity, imgUrl, unit }: CartItemProps) {
    return (
        <ThemedView style={styles.wrapper}>
            <Image style={styles.image} src={imgUrl} />

            <View style={styles.info}>
                <ThemedText style={styles.name}>{name}</ThemedText>
                <ThemedText style={styles.price}>$ {price}</ThemedText>
                <ThemedText style={styles.unit}>{unit}</ThemedText>
            </View>

            <View style={styles.quantityAdjustmentWrapper}>
                <ThemedText style={styles.quantity}>{quantity}</ThemedText>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: "#B9E999",
        borderRadius: 18,
        padding: 10,

        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 16
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: "50%"
    },
    info: {
        flexGrow: 1
    },
    name: {
        fontSize: 20,
        fontWeight: 800
    },
    price: {
        fontWeight: 600
    },
    unit: {
        fontSize: 12
    },
    quantityAdjustmentWrapper: {
        padding: 16
    },
    quantity: {
        fontWeight: 600
    }
})
