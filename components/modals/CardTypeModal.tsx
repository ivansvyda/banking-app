import { CardType } from '@/interfaces/card.interface';
import { FC, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

interface ICardTypeModal {
  CTRef: any;
  handleCreateCard: (type: CardType) => void;
}

export const CardTypeModal: FC<ICardTypeModal> = ({
  CTRef,
  handleCreateCard,
}) => {
  return (
    <RBSheet
      ref={CTRef}
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
            fontWeight: '600',
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
          <TouchableOpacity
            onPress={() => {
              handleCreateCard(CardType.PLATINUM);
              CTRef.current.close();
            }}
          >
            <Text>Platinum</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleCreateCard(CardType.GOLD);
              CTRef.current.close();
            }}
          >
            <Text>Gold</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleCreateCard(CardType.BLACK);
              CTRef.current.close();
            }}
          >
            <Text>Black</Text>
          </TouchableOpacity>
        </View>
      </View>
    </RBSheet>
  );
};
