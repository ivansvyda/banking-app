import { gql } from "@apollo/client";

export const GET_CARDS = gql`
  {
    cards {
      id
      cardNumber
      CVV
      expiresIn
      type
      balance
    }
  }
`;
