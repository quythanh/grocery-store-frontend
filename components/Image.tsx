import { Image, type ImageProps } from "react-native";

export default function CustomImage({ ...props }: ImageProps) {
    const { src, ...rest } = props;

    return <Image {...rest} src={src?.replace("app.grocery-store.test", "magento.quythanh.tk")} />
}
