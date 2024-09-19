import { Text, TouchableOpacity, View } from "react-native";
import { FC, ReactNode } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";

interface IAction {
  icon: string;
  name: string;
  onPress: () => void;
}

export const Action: FC<IAction> = ({ icon, name, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        gap: 12,
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 52,
          height: 52,
          borderRadius: 100,
          backgroundColor: Colors.tint,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons name={icon} size={24} color="white" />
      </View>
      <Text
        style={{
          fontSize: 12,
          fontWeight: "500",
        }}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};
