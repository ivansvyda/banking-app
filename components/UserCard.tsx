import { Colors } from '@/constants/Colors';
import { FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { IRecipient } from '@/interfaces/recipient.interface';

interface IUserCard {
  user: IRecipient;
  size?: 'sm' | 'base';
}

export const UserCard: FC<IUserCard> = ({ user, size = 'base' }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: size === 'base' ? 24 : 0,
      }}
    >
      <View
        style={{
          width: size === 'base' ? 45 : 40,
          height: size === 'base' ? 45 : 40,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
          backgroundColor: Colors.gray,
        }}
      >
        <Text>
          {user.firstName.charAt(0)}
          {user.lastName.charAt(0)}
        </Text>
      </View>
      <View style={{ flexDirection: 'column', gap: 4 }}>
        <Text
          style={{ fontWeight: '500', fontSize: size === 'base' ? 15 : 14 }}
        >
          {user.firstName} {user.lastName}
        </Text>
        <Text style={{ color: Colors.tabIconDefault }}>
          {user.cards.length > 1
            ? `${user.cards.length} accounts`
            : user.cards[0].cardNumber}
        </Text>
      </View>
    </View>
  );
};
