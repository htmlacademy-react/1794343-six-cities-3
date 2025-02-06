import { store } from '.';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AuthData = {
  email: string;
  password: string;
};

export type UserData = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
};

export type ReviewData = {
  id: string;
  comment: string;
  rating: number;
};
