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
  item: ICard;
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
            [-width * 0.17, 0, width * 0.17],
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
    };
  });

  // @ts-ignore
  return (
    <>
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
      {index === arrayLength - 1 && (
        <TouchableOpacity
          style={{
            width: width,
            height: 200,
            paddingHorizontal: 48,
            marginBottom: 24,
          }}
          onPress={onAdd}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderRadius: 16,
              borderColor: Colors.gray,
            }}
          >
            <Ionicons name="add" size={24} color={Colors.gray} />
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};
