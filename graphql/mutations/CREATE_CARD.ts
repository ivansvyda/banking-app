import { gql } from "@apollo/client";

export const CREATE_CARD = gql`
  mutation CreateCard($createCardInput: CreateCardInput!) {
    createCard(createCardInput: $createCardInput) {
      id
      cardNumber
      CVV
      expiresIn
      type
      balance
    }
  }
`;
