import {Pressable, StyleProp, ViewStyle} from "react-native";
import {FC, ReactNode} from "react";

interface IButton {
    style?: StyleProp<ViewStyle>;
    onPress: () => void;
    children: ReactNode;
}

export const Button: FC<IButton> = ({ style, onPress,children}) => {
    return <Pressable style={[{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        borderRadius: 12,
        backgroundColor: 'black',
    }, style]} onPress={onPress}>
        {children}
    </Pressable>
}