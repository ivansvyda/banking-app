import { gql } from "@apollo/client";

export const TOPUP_CARD = gql`
  mutation TopUpCard($topUpCardInput: TopUpCardInput!) {
    topUpCard(topUpCardInput: $topUpCardInput) {
      id
      cardNumber
      CVV
      expiresIn
      type
      balance
    }
  }
`;
