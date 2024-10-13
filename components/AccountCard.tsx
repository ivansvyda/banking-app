import { Colors } from '@/constants/Colors';
import { CardType, ICard } from '@/interfaces/card.interface';
import { FC } from 'react';
import { View, Text } from 'react-native';

interface IAccountCard {
  owner: string;
  card: ICard;
  size?: 'base' | 'sm';
}

export const AccountCard: FC<IAccountCard> = ({
  owner,
  card,
  size = 'base',
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 16,
        marginTop: size === 'base' ? 24 : 0,
      }}
    >
      <View
        style={{
          width: size === 'base' ? 45 : 40,
          height: size === 'base' ? 45 : 40,
          borderRadius: 10,
          backgroundColor:
            card.type === CardType.PLATINUM
              ? Colors.gray
              : card.type === CardType.GOLD
              ? Colors.gold
              : Colors.tint,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: card.type !== CardType.BLACK ? Colors.tint : 'white',
            fontWeight: '600',
          }}
        >
          {card.type.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View style={{ justifyContent: 'space-between' }}>
        <Text
          style={{ fontWeight: '500', fontSize: size === 'base' ? 16 : 14 }}
        >
          {owner}
        </Text>
        <Text style={{ color: Colors.tabIconDefault }}>
          {card.type.charAt(0).toUpperCase() + card.type.slice(1)} •{' '}
          {card.cardNumber}
        </Text>
      </View>
    </View>
  );
};
