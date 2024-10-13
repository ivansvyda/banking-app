import { FC, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  TextInput,
  Keyboard,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Field } from '../ui/Field';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '@/graphql/queries/GET_USERS';
import { UserCard } from '../UserCard';
import { IRecipient } from '@/interfaces/recipient.interface';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AccountCard } from '../AccountCard';
import { ICard } from '@/interfaces/card.interface';
import { Colors } from '@/constants/Colors';

interface ITransferModal {
  TRRef: any;
}

export const TransferModal: FC<ITransferModal> = ({ TRRef }) => {
  const [step, setStep] = useState(1);

  const [recipient, setRecipient] = useState('');

  const { loading, error, data } = useQuery(GET_USERS);

  const filteredData = () => {
    return data.users.filter(
      (item: IRecipient) =>
        item.firstName.includes(recipient) || item.lastName.includes(recipient)
    );
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  const [selectedRecipient, setSelectedRecipient] = useState<IRecipient>();

  const selectRecipient = (recipient: IRecipient) => {
    setSelectedRecipient(recipient);
    nextStep();
  };

  const [selectedCard, setSelectedCard] = useState<ICard>();

  const selectCard = (card: ICard) => {
    setSelectedCard(card);
    nextStep();
  };

  const [amount, setAmount] = useState(0.0);

  if (step === 1) {
    return (
      <RBSheet
        ref={TRRef}
        draggable
        openDuration={250}
        customStyles={{
          container: {
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
          },
        }}
        height={475}
      >
        <View
          style={{
            paddingVertical: 4,
            paddingHorizontal: 24,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                marginBottom: 12,
              }}
            >
              Transfer
            </Text>
            <TouchableOpacity>
              <Text style={{ textDecorationLine: 'underline' }}>
                New recipient
              </Text>
            </TouchableOpacity>
          </View>
          <Field
            placeholder='Search recipients'
            onChange={(text) => setRecipient(text)}
            value={recipient}
          />
          {!loading ? (
            <FlatList
              data={recipient === '' ? data.users : filteredData()}
              renderItem={(item) => {
                return (
                  <TouchableOpacity onPress={() => selectRecipient(item.item)}>
                    <UserCard user={item.item} />
                  </TouchableOpacity>
                );
              }}
            />
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </RBSheet>
    );
  }

  if (step === 2) {
    return (
      <RBSheet
        ref={TRRef}
        draggable
        openDuration={250}
        customStyles={{
          container: {
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
          },
        }}
        height={475}
      >
        <View
          style={{
            paddingVertical: 4,
            paddingHorizontal: 24,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setSelectedRecipient(undefined);
                previousStep();
              }}
            >
              <Ionicons name='arrow-back' size={16} />
            </TouchableOpacity>
            <UserCard user={selectedRecipient!} size='sm' />
          </View>
          <FlatList
            style={{ marginBottom: 100 }}
            data={selectedRecipient?.cards}
            renderItem={(item) => {
              return (
                <TouchableOpacity onPress={() => selectCard(item.item)}>
                  <AccountCard
                    key={item.index}
                    owner={
                      selectedRecipient!.firstName +
                      ' ' +
                      selectedRecipient!.lastName
                    }
                    card={item.item}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </RBSheet>
    );
  }

  if (step === 3) {
    return (
      <RBSheet
        ref={TRRef}
        draggable
        openDuration={250}
        customStyles={{
          container: {
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
          },
        }}
        height={475}
      >
        <View
          style={{
            paddingVertical: 4,
            paddingHorizontal: 24,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 16,
              marginBottom: 24,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                previousStep();
              }}
            >
              <Ionicons name='arrow-back' size={16} />
            </TouchableOpacity>
            <AccountCard
              owner={
                selectedRecipient!.firstName + ' ' + selectedRecipient!.lastName
              }
              card={selectedCard!}
              size='sm'
            />
          </View>
          <TextInput
            style={{
              backgroundColor: Colors.secondary,
              borderRadius: 10,
              padding: 20,
              fontSize: 20,
              fontWeight: '500',
            }}
            placeholder='€0.00'
          />
        </View>
      </RBSheet>
    );
  }
};
