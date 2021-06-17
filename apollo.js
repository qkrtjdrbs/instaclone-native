import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { offsetLimitPagination } from "@apollo/client/utilities";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

export const logUserIn = async (token) => {
  //Async storage simular to local storage
  await AsyncStorage.setItem("token", JSON.stringify(token));
  isLoggedInVar(true);
  tokenVar(token);
};

export const logUserOut = async () => {
  //Async storage simular to local storage
  await AsyncStorage.removeItem("token");
  isLoggedInVar(false);
  tokenVar("");
};

const httpLink = createHttpLink({
  uri: "http://e7322ea65dd9.ngrok.io/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      //get current token
      token: tokenVar(),
    },
  };
});

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        //It prevents Apollo from distinguishing seeFeed queries according to arguments.
        //It combines old data with new data.
        seeFeed: offsetLimitPagination(),
      },
    },
  },
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

export default client;
