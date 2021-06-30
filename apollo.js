import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { offsetLimitPagination } from "@apollo/client/utilities";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createUploadLink } from "apollo-upload-client";

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
  uri: "http://c0c66f7a6d47.ngrok.io/graphql",
});

const uploadHttpLink = createUploadLink({
  uri: "http://7b98d5e998a9.ngrok.io/graphql",
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

const onErrorLink = onError((error) => {
  console.log(error);
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

//http link is last link

const client = new ApolloClient({
  link: authLink.concat(onErrorLink).concat(uploadHttpLink),
  cache,
});

export default client;
