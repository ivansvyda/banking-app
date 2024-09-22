import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { FC } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { ICard } from "@/interfaces/card.interface";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

interface IBankCard {
  item: ICard | undefined;
  index: number;
  arrayLength: number;
  onAdd: () => void;
  scrollX: SharedValue<number>;
}

const { width } = Dimensions.get("screen");

export const BankCard: FC<IBankCard> = ({
  item,
  index,
  arrayLength,
  onAdd,
  scrollX,
}) => {
  const rnAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.2, 0, width * 0.2],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
          ),
        },
      ],
      opacity: interpolate(
        scrollX.value,
        [(index - 1) * width, index * width, (index + 1) * width],
        [0.65, 1, 0.65],
        Extrapolation.CLAMP
      ),
    };
  });

  if (!item) {
    return (
      <Animated.View
        style={{
          width: width,
          height: 190,
          paddingHorizontal: 48,
        }}
      >
        <TouchableOpacity
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderRadius: 16,
            borderColor: Colors.gray,
          }}
          onPress={onAdd}
        >
          <Ionicons name="add" size={24} color={Colors.gray} />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      key={index}
      style={[
        {
          width: width,
          justifyContent: "center",
          alignItems: "center",
          gap: 24,
        },
        rnAnimatedStyle,
      ]}
    >
      {item.type === "platinum" ? (
        <Image
          source={require("../assets/cards/PLATINUM.png")}
          style={{
            width: 305,
            height: 190,
            objectFit: "cover",
          }}
        />
      ) : item.type === "gold" ? (
        <Image
          source={require("../assets/cards/GOLD.png")}
          style={{
            width: 305,
            height: 190,
            objectFit: "cover",
          }}
        />
      ) : (
        <Image
          source={require("../assets/cards/BLACK.png")}
          style={{
            width: 305,
            height: 190,
            objectFit: "cover",
          }}
        />
      )}
      <Text style={{ fontSize: 15 }}>
        •••• •••• •••• {item.cardNumber.slice(-4)}
      </Text>
    </Animated.View>
  );
};
