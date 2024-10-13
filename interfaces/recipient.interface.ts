import { ICard } from '@/interfaces/card.interface';

export interface IRecipient {
  id: string;
  firstName: string;
  lastName: string;
  cards: ICard[];
}
