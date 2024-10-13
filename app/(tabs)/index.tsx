import {
  ActivityIndicator,
  Alert,
  Dimensions,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Header } from '@/components/Header';
import { Colors } from '@/constants/Colors';
import { Action } from '@/components/Action';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useMutation, useQuery } from '@apollo/client';
import { CardType, ICard } from '@/interfaces/card.interface';
import { GET_CARDS } from '@/graphql/queries/GET_CARDS';
import { CREATE_CARD } from '@/graphql/mutations/CREATE_CARD';
import { TOPUP_CARD } from '@/graphql/mutations/TOPUP_CARD';
import { CardsSlider } from '@/components/CardsSlider';
import { useToast } from 'react-native-toast-notifications';
import { CardTypeModal } from '@/components/modals/CardTypeModal';
import { TransferModal } from '@/components/modals/TransferModal';

const { width } = Dimensions.get('screen');

const HomeScreen = () => {
  const toast = useToast();

  const [cards, setCards] = useState<ICard[]>([]);

  const { loading, error, data } = useQuery(GET_CARDS);
  const [createCard, { loading: loadingCreatedCard }] = useMutation(
    CREATE_CARD,
    {
      onCompleted: (data) => {
        setCards([...cards, data.createCard]);
        toast.show('Card was successfully created!', {
          type: 'success',
        });
      },
    }
  );

  const [topUpCard] = useMutation(TOPUP_CARD, {
    onCompleted: (data) => {
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === data.topUpCard.id ? data.topUpCard : card
        )
      );
    },
  });

  const CTRef = useRef<any>();
  const TRRef = useRef<any>();

  const [paginationIndex, setPaginationIndex] = useState(0);

  const handleCreateCard = async (type: CardType) => {
    await createCard({
      variables: {
        createCardInput: {
          type: type,
        },
      },
    });
  };

  const handleTopUpCard = async (amount: number, id: string) => {
    await topUpCard({
      variables: {
        topUpCardInput: {
          id,
          amount,
        },
      },
    });
  };

  useEffect(() => {
    if (data && data.cards) {
      setCards(data.cards);
    }
  }, [data]);

  const displayCards = [...cards, undefined];

  const actions = [
    {
      icon: 'add',
      name: 'Top up',
      onPress: () => {
        Alert.prompt('Top up balance', '', [
          { text: 'Cancel', style: 'destructive', onPress: () => {} },
          {
            text: 'Submit',
            onPress: (value) => {
              if (value) {
                handleTopUpCard(parseFloat(value), cards[paginationIndex].id);
              }
            },
          },
        ]);
      },
    },
    {
      icon: 'refresh',
      name: 'Exchange',
      onPress: () => {},
    },
    {
      icon: 'arrow-redo-outline',
      name: 'Transfer',
      onPress: () => TRRef.current.open(),
    },
    {
      icon: 'card-outline',
      name: 'Details',
      onPress: () => {
        Alert.alert(
          'Details',
          `Card number: ${cards[paginationIndex].cardNumber
            .replace(/(.{4})/g, '$1 ')
            .trim()}\nCVV: ${cards[paginationIndex].CVV}\nExpires in: ${
            cards[paginationIndex].expiresIn
          }`
        );
      },
    },
  ];

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fff',
      }}
    >
      <View>
        <Header />
        {!loading && !loadingCreatedCard ? (
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
              marginBottom: 40,
              gap: 8,
            }}
          >
            {cards.length > 0 && paginationIndex < cards.length ? (
              <>
                <Text
                  style={{
                    fontSize: 32,
                    fontWeight: 'bold',
                    color: Colors.tint,
                  }}
                >
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'EUR',
                  }).format(cards[paginationIndex].balance)}
                </Text>
                <Text>Current balance</Text>
              </>
            ) : (
              <>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: Colors.tint,
                  }}
                >
                  Create a new card.
                </Text>
                <Text style={{ maxWidth: 250, textAlign: 'center' }}>
                  Use your card for euro operations across the Europe
                </Text>
              </>
            )}
          </View>
        ) : (
          <ActivityIndicator />
        )}
        {!loading && !loadingCreatedCard ? (
          cards.length > 0 ? (
            <CardsSlider
              cards={displayCards}
              setPaginationIndex={setPaginationIndex}
              onAdd={() => CTRef.current.open()}
            />
          ) : (
            <TouchableOpacity
              style={{
                width: width,
                height: 190,
                paddingHorizontal: 48,
                marginBottom: 36,
              }}
              onPress={() => CTRef.current.open()}
            >
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderRadius: 16,
                  borderColor: Colors.gray,
                }}
              >
                <Ionicons name='add' size={24} color={Colors.gray} />
              </View>
            </TouchableOpacity>
          )
        ) : (
          <ActivityIndicator />
        )}
        <View
          style={{
            paddingHorizontal: 40,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {actions.map((action, idx) => {
            return (
              <Action
                key={idx}
                icon={action.icon}
                name={action.name}
                onPress={() => action.onPress()}
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
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: Colors.tint,
              }}
            >
              Transactions
            </Text>
            <Link
              style={{
                fontSize: 14,
                fontWeight: '500',
                color: Colors.tint,
              }}
              href='/transactions'
            >
              View all
            </Link>
          </View>
        </View>
      </View>
      <CardTypeModal CTRef={CTRef} handleCreateCard={handleCreateCard} />
      <TransferModal TRRef={TRRef} />
    </SafeAreaView>
  );
};

export default HomeScreen;
