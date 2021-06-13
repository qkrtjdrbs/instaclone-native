import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

export const logUserIn = async (token) => {
  //Async storage simular to local storage
  await AsyncStorage.setItem("token", JSON.stringify(token));
  await AsyncStorage.multiSet([
    ["token", JSON.stringify(token)],
    ["loggedIn", JSON.stringify("yes")],
  ]);
  isLoggedInVar(true);
  tokenVar(token);
};

export const logUserOut = async () => {
  //Async storage simular to local storage
  await AsyncStorage.removeItem("token");
  await AsyncStorage.multiRemove(["token", "loggedIn"]);
  isLoggedInVar(false);
  tokenVar("");
};

const client = new ApolloClient({
  uri: "http://5f43dceb49f9.ngrok.io/graphql",
  cache: new InMemoryCache(),
});

export default client;
