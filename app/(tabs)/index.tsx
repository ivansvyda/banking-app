import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Header } from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { Action } from "@/components/Action";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { useRef } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { gql, useMutation } from "@apollo/client";
import { CardType } from "@/interfaces/card.interface";
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { BankCard } from "@/components/BankCard";

const actions = [
  {
    icon: "add",
    name: "Top up",
    onPress: () => {},
  },
  {
    icon: "refresh",
    name: "Exchange",
    onPress: () => {},
  },
  {
    icon: "arrow-redo-outline",
    name: "Transfer",
    onPress: () => {},
  },
  {
    icon: "card-outline",
    name: "Details",
    onPress: () => {},
  },
];

const CREATE_CARD = gql(`
    mutation CreateCard($createCardInput: CreateCardInput!) {
        createCard(createCardInput: $createCardInput) {
            id
        }
    }
`);

const { width } = Dimensions.get("screen");

const HomeScreen = () => {
  const { user, fetchUser, isLoadingUser } = useAuth();

  const [createCard] = useMutation(CREATE_CARD);

  const refRBSheet = useRef<any>();

  const scrollX = useSharedValue(0);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
  });

  const newCard = (type: CardType) => {
    createCard({
      variables: {
        createCardInput: {
          type: type,
        },
      },
    }).then((r) => fetchUser());
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#fff",
      }}
    >
      <View>
        <Header />
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 16,
            marginBottom: 40,
            gap: 8,
          }}
        >
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              color: Colors.tint,
            }}
          >
            € 6.815,53
          </Text>
          <Text>Current balance</Text>
        </View>
        {!isLoadingUser ? (
          user && user.cards.length > 0 ? (
            <Animated.FlatList
              style={{
                marginBottom: 36,
              }}
              horizontal
              pagingEnabled
              data={user.cards}
              showsHorizontalScrollIndicator={false}
              onScroll={onScrollHandler}
              renderItem={({ item, index }) => {
                return (
                  <BankCard
                    key={index}
                    item={item}
                    index={index}
                    arrayLength={user.cards.length}
                    onAdd={() => refRBSheet.current.open()}
                    scrollX={scrollX}
                  />
                );
              }}
            />
          ) : (
            <TouchableOpacity
              style={{
                width: width,
                height: 200,
                paddingHorizontal: 48,
                marginBottom: 24,
              }}
              onPress={() => refRBSheet.current.open()}
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
          )
        ) : (
          <ActivityIndicator />
        )}
        <View
          style={{
            paddingHorizontal: 40,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {actions.map((action, idx) => {
            return (
              <Action
                key={idx}
                icon={action.icon}
                name={action.name}
                onPress={action.onPress}
              />
            );
          })}
        </View>
        <View
          style={{
            height: 6,
            marginVertical: 24,
            backgroundColor: Colors.gray,
          }}
        ></View>
        <View
          style={{
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: Colors.tint,
              }}
            >
              Transactions
            </Text>
            <Link
              style={{
                fontSize: 14,
                fontWeight: "500",
                color: Colors.tint,
              }}
              href="/transactions"
            >
              View all
            </Link>
          </View>
        </View>
      </View>
      <RBSheet
        ref={refRBSheet}
        draggable
        openDuration={250}
        customStyles={{
          container: {
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
          },
        }}
      >
        <View
          style={{
            paddingVertical: 4,
            paddingHorizontal: 24,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              marginBottom: 12,
            }}
          >
            Choose card type
          </Text>
          <View
            style={{
              gap: 8,
            }}
          >
            <TouchableOpacity onPress={() => newCard(CardType.PLATINUM)}>
              <Text>Platinum</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => newCard(CardType.GOLD)}>
              <Text>Gold</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => newCard(CardType.BLACK)}>
              <Text>Black</Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
};

export default HomeScreen;
