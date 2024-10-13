import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/useAuth";
import { FC } from "react";

export const Header = () => {
  const { user, logout, isLoadingUser } = useAuth();

  return (
    <View
      style={{
        padding: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{
          width: 35,
          height: 35,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 100,
          backgroundColor: Colors.gray,
        }}
        onPress={logout}
      >
        {!isLoadingUser ? (
          <Text>
            {user ? user.firstName.charAt(0) : "N"}
            {user ? user.lastName.charAt(0) : "N"}
          </Text>
        ) : (
          <ActivityIndicator />
        )}
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 20,
        }}
      >
        Home
      </Text>
      <TouchableOpacity
        style={{
          width: 35,
          height: 35,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: Colors.gray,
          borderRadius: 100,
        }}
      >
        <Ionicons name="notifications-outline" size={20} />
      </TouchableOpacity>
    </View>
  );
};
