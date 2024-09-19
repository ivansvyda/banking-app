import { useFonts } from "expo-font";
import { Slot, Stack, Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { AuthProvider } from "@/providers/AuthProvider";
import * as SecureStore from "expo-secure-store";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const [token, setToken] = useState<string | null>(null);

  const fetchToken = async () => {
    const accessToken = await SecureStore.getItemAsync("token");

    setToken(accessToken);
  };

  useEffect(() => {
    fetchToken();
  }, []);

  if (!loaded) {
    return null;
  }

  const client = new ApolloClient({
    uri: "http://localhost:3000/graphql",
    cache: new InMemoryCache(),
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </ApolloProvider>
  );
};

export default RootLayout;
