import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { BankCard } from "./BankCard";
import { ICard } from "@/interfaces/card.interface";
import { FC, useRef } from "react";
import { ViewToken } from "react-native";

interface ICardsSlider {
  cards: (ICard | undefined)[];
  setPaginationIndex: (index: number) => void;
  onAdd: () => void;
}

export const CardsSlider: FC<ICardsSlider> = ({
  cards,
  setPaginationIndex,
  onAdd,
}) => {
  const scrollX = useSharedValue(0);

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (
      viewableItems.length > 0 &&
      viewableItems[0].index !== undefined &&
      viewableItems[0].index !== null
    ) {
      setPaginationIndex(viewableItems[0].index);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
  });
  return (
    <Animated.FlatList
      style={{
        marginBottom: 36,
      }}
      horizontal
      pagingEnabled
      data={cards}
      showsHorizontalScrollIndicator={false}
      onScroll={onScrollHandler}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      renderItem={({ item, index }) => {
        return (
          <BankCard
            key={index}
            item={item}
            index={index}
            arrayLength={cards.length}
            onAdd={onAdd}
            scrollX={scrollX}
          />
        );
      }}
    />
  );
};
