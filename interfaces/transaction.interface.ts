import { ICard } from "@/interfaces/card.interface";
import { IUser } from "@/interfaces/user.interface";

export interface ITransaction {
  id: string;
  amount: number;
  fromCard: ICard;
  toCard: ICard;
  sender: IUser;
  reciever: IUser;
  created_at: Date;
}
