import {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { IUser } from "@/interfaces/user.interface";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

interface IAuthContext {
  user: IUser | null;
  token: string | null;
  login: (email: string, password: string) => void;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => void;
  logout: () => void;
  fetchUser: () => void;
  isLoading: boolean;
  isLoadingUser: boolean;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

interface IAuthProvider {
  children: ReactNode;
}

const AUTHENTICATE = gql(`
  mutation Authenticate($authInput: AuthInput!) {
    authenticate(authInput: $authInput) {
      user {
        id
        firstName
        lastName
        email
        cards {
          id
          cardNumber
          type
          balance
        }
      }
      access_token
    }
  }
`);

const REGISTER = gql(`
  mutation Register($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
       id
       firstName
       lastName
       email
       cards {
          id
          cardNumber
          type
          balance
        }
    }
  }
`);

const GET_USER = gql(`
  {
    profile {
      id
      firstName
      lastName
      email
      cards {
        id
        cardNumber
        type
        balance
      }
    }
  }
`);

export const AuthProvider: FC<IAuthProvider> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  const [authenticate] = useMutation(AUTHENTICATE);
  const [createUser] = useMutation(REGISTER);
  const [getUser] = useLazyQuery(GET_USER);

  const login = (email: string, password: string) => {
    authenticate({
      variables: {
        authInput: {
          email,
          password,
        },
      },
    })
      .then(async (r) => {
        await SecureStore.setItemAsync(
          "token",
          r.data.authenticate.access_token,
        );

        setToken(r.data.authenticate.access_token);

        setUser(r.data.authenticate.user);

        router.replace("/(tabs)");
      })
      .catch((er) => console.log(er));
  };

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => {
    createUser({
      variables: {
        createUserInput: {
          firstName,
          lastName,
          email,
          password,
        },
      },
    }).then(async (r) => {
      login(email, password);
    });
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("token");

    setToken(null);
    setUser(null);

    router.replace("/sign-in");
  };

  const fetchUser = () => {
    setIsLoadingUser(true);
    getUser().then((r) => {
      setUser(r.data.profile);
    });
    setIsLoadingUser(false);
  };

  const fetchInitData = async () => {
    const accessToken = await SecureStore.getItemAsync("token");

    setToken(accessToken);

    if (accessToken) {
      fetchUser();
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchInitData();
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      register,
      logout,
      fetchUser,
      isLoading,
      isLoadingUser,
    }),
    [user, token, isLoading, isLoadingUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
