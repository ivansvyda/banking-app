import { ICard } from "@/interfaces/card.interface";

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cards: ICard[];
}
