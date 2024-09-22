import { IUser } from "@/interfaces/user.interface";

export enum CardType {
  PLATINUM = "platinum",
  GOLD = "gold",
  BLACK = "black",
}

export interface ICard {
  id: string;
  cardNumber: string;
  CVV: string;
  expiresIn: string;
  type: CardType;
  balance: number;
  owner: IUser;
}
