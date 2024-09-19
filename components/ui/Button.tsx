import {
  Pressable,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { FC, ReactNode } from "react";

interface IButton extends TouchableOpacityProps {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  children: ReactNode;
}

export const Button: FC<IButton> = ({ style, onPress, children, ...props }) => {
  return (
    <TouchableOpacity
      style={[
        {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 16,
          borderRadius: 12,
          backgroundColor: "black",
        },
        style,
      ]}
      onPress={onPress}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};
